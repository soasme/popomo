import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { z } from 'zod';

export const springBouncePuppetSchema = z.object({
  image: z.string(),
  pos: z.string().regex(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?$/, "Position must be in format 'x,y,z'"),
  rotate: z.string().regex(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?$/, "Rotation must be in format 'x,y,z'").default("0,0,0"),
  axis: z.enum(['x', 'y', 'z']).default('y'),
  distance: z.number().positive().default(100),
  duration: z.number().positive().default(1.0),
  scale: z.number().default(1.0),
});

type SpringBouncePuppetProps = z.infer<typeof springBouncePuppetSchema>;

const getEasingFunction = () => {
  return { 
    extrapolateLeft: 'clamp', 
    extrapolateRight: 'clamp', 
    easing: (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2 
  } as const;
};

export const SpringBouncePuppet: React.FC<SpringBouncePuppetProps> = ({
  image,
  pos,
  rotate,
  axis,
  distance,
  duration,
  scale,
}) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  
  const [targetX, targetY, targetZ] = pos.split(',').map(Number);
  const [rotateX, rotateY, rotateZ] = rotate.split(',').map(Number);
  
  const totalFrames = Math.round(duration * videoConfig.fps);
  const halfFrames = totalFrames / 2;
  
  let offsetX = 0;
  let offsetY = 0;
  let offsetZ = 0;
  
  const cycleFrame = frame % totalFrames;
  const easing = getEasingFunction();
  
  if (cycleFrame <= halfFrames) {
    const progress = cycleFrame / halfFrames;
    const offset = interpolate(
      progress,
      [0, 1],
      [-distance, distance],
      easing
    );
    
    switch (axis) {
      case 'x':
        offsetX = offset;
        break;
      case 'y':
        offsetY = offset;
        break;
      case 'z':
        offsetZ = offset;
        break;
    }
  } else {
    const progress = (cycleFrame - halfFrames) / halfFrames;
    const offset = interpolate(
      progress,
      [0, 1],
      [distance, -distance],
      easing
    );
    
    switch (axis) {
      case 'x':
        offsetX = offset;
        break;
      case 'y':
        offsetY = offset;
        break;
      case 'z':
        offsetZ = offset;
        break;
    }
  }
  
  const currentX = targetX + offsetX;
  const currentY = targetY + offsetY;
  const currentZ = targetZ + offsetZ;
  
  return (
    <div
      style={{
        position: 'absolute',
        left: currentX,
        top: currentY,
        transformStyle: 'preserve-3d',
        transform: `translate(-50%, -50%) translateZ(${currentZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
      }}
    >
      <Img src={staticFile(image)} />
    </div>
  );
};