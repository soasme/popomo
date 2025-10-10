'use client';

import { Image as KonvaImage } from 'react-konva';
import { useAtom } from 'jotai';
import { canvasImagesAtom } from '@/store/editorAtoms';

export default function InfiniteCanvasShapes() {
  const [canvasImages] = useAtom(canvasImagesAtom);

  return (
    <>
      {canvasImages.map((imageData) => (
        // eslint-disable-next-line react/jsx-pascal-case
        <KonvaImage
          key={imageData.id}
          image={imageData.image}
          x={imageData.x}
          y={imageData.y}
          draggable={true}
        />
      ))}
    </>
  );
}