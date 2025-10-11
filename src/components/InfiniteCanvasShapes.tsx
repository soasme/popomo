'use client';

import { Image as KonvaImage, Group, Rect } from 'react-konva';
import { useAtom } from 'jotai';
import { canvasImagesAtom, activePuppetAtom } from '@/store/editorAtoms';
import Konva from 'konva';

export default function InfiniteCanvasShapes() {
  const [canvasImages, setCanvasImages] = useAtom(canvasImagesAtom);
  const [activePuppet, setActivePuppet] = useAtom(activePuppetAtom);

  const handleImageClick = (imageId: string) => {
    setActivePuppet(imageId);
  };

  const handleImageDragStart = (imageId: string) => {
    setActivePuppet(imageId);
  };

  const handleImageDragEnd = (imageId: string, e: Konva.KonvaEventObject<DragEvent>) => {
    setActivePuppet(imageId);
    
    setCanvasImages(prevImages => 
      prevImages.map(img => 
        img.id === imageId 
          ? { ...img, x: e.target.x(), y: e.target.y() }
          : img
      )
    );
  };

  return (
    <>
      {canvasImages.map((imageData) => {
        const isActive = activePuppet === imageData.id;
        
        return (
          <Group
            key={imageData.id}
            x={imageData.x}
            y={imageData.y}
            draggable={true}
            onClick={() => handleImageClick(imageData.id)}
            onTap={() => handleImageClick(imageData.id)}
            onDragStart={() => handleImageDragStart(imageData.id)}
            onDragEnd={(e) => handleImageDragEnd(imageData.id, e)}
          >
            {isActive && (
              <Rect
                x={-2}
                y={-2}
                width={imageData.image.width + 4}
                height={imageData.image.height + 4}
                stroke="#3b82f6"
                strokeWidth={2}
                fill="transparent"
                listening={false}
              />
            )}
            <KonvaImage
              image={imageData.image}
              x={0}
              y={0}
            />
          </Group>
        );
      })}
    </>
  );
}