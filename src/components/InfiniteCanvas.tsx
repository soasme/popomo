'use client';

import { Stage, Layer } from 'react-konva';
import { useRef, useState, useCallback, useEffect } from 'react';
import { useAtom } from 'jotai';
import Konva from 'konva';
import Camera from './Camera';
import InfiniteCanvasTimeline from './InfiniteCanvasTimeline';
import InfiniteCanvasGrid from './InfiniteCanvasGrid';
import InfiniteCanvasUploader from './InfiniteCanvasUploader';
import { InfiniteCanvasProps } from '@/editorTypes';
import { activePuppetAtom } from '@/store/editorAtoms';
import { PuppetInteractionProvider, InfiniteCanvasShapesWithContextMenu } from './puppet';

export default function InfiniteCanvas({ width, height }: InfiniteCanvasProps) {
  const stageRef = useRef<Konva.Stage>(null);
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(0.5);
  const [, setActivePuppet] = useAtom(activePuppetAtom);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePuppet(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setActivePuppet]);


  const handleWheel = useCallback((e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    
    const stage = stageRef.current;
    if (!stage) return;

    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();
    if (!pointer) return;

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const direction = e.evt.deltaY > 0 ? -1 : 1;
    const scaleBy = 1.02;
    const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setScale(newScale);

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    setStagePos(newPos);
  }, []);

  const handleDragEnd = useCallback((e: Konva.KonvaEventObject<DragEvent>) => {
    if (e.target === stageRef.current) {
      setStagePos({
        x: e.target.x(),
        y: e.target.y(),
      });
    }
  }, []);

  const handleStageClick = useCallback((e: Konva.KonvaEventObject<MouseEvent>) => {
    if (e.target === stageRef.current) {
      setActivePuppet(null);
    }
  }, [setActivePuppet]);


  return (
    <InfiniteCanvasTimeline>
      <div className="relative">
        <InfiniteCanvasUploader stageRef={stageRef} />
        <Stage
          ref={stageRef}
          width={width}
          height={height}
          x={stagePos.x}
          y={stagePos.y}
          scaleX={scale}
          scaleY={scale}
          draggable={true}
          onWheel={handleWheel}
          onDragEnd={handleDragEnd}
          onClick={handleStageClick}
          onTap={handleStageClick}
          className="bg-gray-50"
        >
          <Layer>
            <InfiniteCanvasGrid />
            <Camera />
            <InfiniteCanvasShapesWithContextMenu />
          </Layer>
        </Stage>
        
        <PuppetInteractionProvider />
      </div>
    </InfiniteCanvasTimeline>
  );
}