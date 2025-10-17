import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { z } from 'zod';

export const slideOutPuppetSchema = z.object({
  image: z.string(),
  pos: z.string().regex(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?$/, "Position must be in format 'x,y,z'"),
  rotate: z.string().regex(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?$/, "Rotation must be in format 'x,y,z'").default("0,0,0"),
  exitRotate: z.string().regex(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?$/, "Exit rotation must be in format 'x,y,z'").default("0,0,0"),
  duration: z.number().positive(),
  ease: z.string(),
  to: z.enum(['bottom', 'top', 'left', 'right']),
  scale: z.number().default(1.0),
});

type SlideOutPuppetProps = z.infer<typeof slideOutPuppetSchema>;

const getEasingFunction = (ease: string) => {
  switch (ease) {
    case 'easeIn':
      return { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t: number) => t * t } as const;
    case 'easeOut':
      return { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t: number) => 1 - (1 - t) * (1 - t) } as const;
    case 'easeInOut':
      return { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2 } as const;
    case 'linear':
    default:
      return { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
  }
};

const getOffsetPosition = (direction: 'bottom' | 'top' | 'left' | 'right', videoConfig: { width: number; height: number }) => {
  const offset = 200;
  
  switch (direction) {
    case 'bottom':
      return { x: 0, y: videoConfig.height + offset };
    case 'top':
      return { x: 0, y: -offset };
    case 'left':
      return { x: -offset, y: 0 };
    case 'right':
      return { x: videoConfig.width + offset, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
};

export const SlideOutPuppet: React.FC<SlideOutPuppetProps> = ({
  image,
  pos,
  rotate,
  exitRotate,
  duration,
  ease,
  to,
  scale,
}) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  
  const [targetX, targetY, targetZ] = pos.split(',').map(Number);
  const [rotateX, rotateY, rotateZ] = rotate.split(',').map(Number);
  const [exitRotateX, exitRotateY, exitRotateZ] = exitRotate.split(',').map(Number);
  
  const animationFrames = Math.round(duration * videoConfig.fps);
  const startFrame = videoConfig.durationInFrames - animationFrames;
  
  const exitToPos = getOffsetPosition(to, videoConfig);
  const exitToX = targetX + exitToPos.x;
  const exitToY = targetY + exitToPos.y;
  
  let currentX = targetX;
  let currentY = targetY;
  let currentZ = targetZ;
  let currentRotateX = rotateX;
  let currentRotateY = rotateY;
  let currentRotateZ = rotateZ;
  
  if (frame >= startFrame) {
    const progress = (frame - startFrame) / animationFrames;
    const easing = getEasingFunction(ease);
    
    currentX = interpolate(
      progress,
      [0, 1],
      [targetX, exitToX],
      easing
    );
    
    currentY = interpolate(
      progress,
      [0, 1],
      [targetY, exitToY],
      easing
    );
    
    currentRotateX = interpolate(
      progress,
      [0, 1],
      [rotateX, exitRotateX],
      easing
    );
    
    currentRotateY = interpolate(
      progress,
      [0, 1],
      [rotateY, exitRotateY],
      easing
    );
    
    currentRotateZ = interpolate(
      progress,
      [0, 1],
      [rotateZ, exitRotateZ],
      easing
    );
  }
  
  return (
    <div
      style={{
        position: 'absolute',
        left: currentX,
        top: currentY,
        transformStyle: 'preserve-3d',
        transform: `translate(-50%, -50%) translateZ(${currentZ}px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) rotateZ(${currentRotateZ}deg) scale(${scale})`,
      }}
    >
      <Img src={staticFile(image)} />
    </div>
  );
};