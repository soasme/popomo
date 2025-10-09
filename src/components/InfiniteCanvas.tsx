'use client';

import { Stage, Layer } from 'react-konva';
import { useRef, useState, useCallback } from 'react';
import Konva from 'konva';
import Camera from './Camera';
import InfiniteCanvasTimeline from './InfiniteCanvasTimeline';
import InfiniteCanvasGrid from './InfiniteCanvasGrid';
import { InfiniteCanvasProps } from '@/editorTypes';

export default function InfiniteCanvas({ width, height }: InfiniteCanvasProps) {
  const stageRef = useRef<Konva.Stage>(null);
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(0.5);

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
    setStagePos({
      x: e.target.x(),
      y: e.target.y(),
    });
  }, []);

  return (
    <InfiniteCanvasTimeline>
      <Stage
        ref={stageRef}
        width={width}
        height={height}
        x={stagePos.x}
        y={stagePos.y}
        scaleX={scale}
        scaleY={scale}
        draggable
        onWheel={handleWheel}
        onDragEnd={handleDragEnd}
        className="bg-gray-50"
      >
        <Layer>
          <InfiniteCanvasGrid />
          <Camera />
        </Layer>
      </Stage>
    </InfiniteCanvasTimeline>
  );
}