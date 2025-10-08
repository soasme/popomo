'use client';

import { Rect } from 'react-konva';

interface InfiniteCanvasGridProps {
  gridSize?: number;
  gridExtent?: number;
  backgroundColor?: string;
  borderColor?: string;
  lineColor?: string;
  borderWidth?: number;
}

export default function InfiniteCanvasGrid({
  gridSize = 100,
  gridExtent = 5000,
  backgroundColor = '#f8f9fa',
  borderColor = '#e9ecef',
  lineColor = '#dee2e6',
  borderWidth = 1,
}: InfiniteCanvasGridProps) {
  const gridCount = Math.floor((gridExtent * 2) / gridSize);

  return (
    <>
      <Rect
        x={-gridExtent}
        y={-gridExtent}
        width={gridExtent * 2}
        height={gridExtent * 2}
        fill={backgroundColor}
        stroke={borderColor}
        strokeWidth={borderWidth}
      />
      {Array.from({ length: gridCount }, (_, i) => (
        <Rect
          key={`h-${i}`}
          x={-gridExtent}
          y={i * gridSize - gridExtent}
          width={gridExtent * 2}
          height={1}
          fill={lineColor}
        />
      ))}
      {Array.from({ length: gridCount }, (_, i) => (
        <Rect
          key={`v-${i}`}
          x={i * gridSize - gridExtent}
          y={-gridExtent}
          width={1}
          height={gridExtent * 2}
          fill={lineColor}
        />
      ))}
    </>
  );
}