import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { z } from 'zod';

export const slideInPuppetSchema = z.object({
  image: z.string(),
  pos: z.string().regex(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?$/, "Position must be in format 'x,y,z'"),
  rotate: z.string().regex(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?$/, "Rotation must be in format 'x,y,z'").default("0,0,0"),
  enterRotate: z.string().regex(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?$/, "Enter rotation must be in format 'x,y,z'").default("0,0,0"),
  duration: z.number().positive(),
  ease: z.string(),
  from: z.enum(['bottom', 'top', 'left', 'right']),
  scale: z.number().default(1.0),
});

type SlideInPuppetProps = z.infer<typeof slideInPuppetSchema>;

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

export const SlideInPuppet: React.FC<SlideInPuppetProps> = ({
  image,
  pos,
  rotate,
  enterRotate,
  duration,
  ease,
  from,
  scale,
}) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  
  const [targetX, targetY, targetZ] = pos.split(',').map(Number);
  const [rotateX, rotateY, rotateZ] = rotate.split(',').map(Number);
  const [enterRotateX, enterRotateY, enterRotateZ] = enterRotate.split(',').map(Number);
  
  const animationFrames = Math.round(duration * videoConfig.fps);
  
  const enterFromPos = getOffsetPosition(from, videoConfig);
  const enterFromX = targetX + enterFromPos.x;
  const enterFromY = targetY + enterFromPos.y;
  
  let currentX = targetX;
  let currentY = targetY;
  let currentZ = targetZ;
  let currentRotateX = rotateX;
  let currentRotateY = rotateY;
  let currentRotateZ = rotateZ;
  
  if (frame < animationFrames) {
    const progress = frame / animationFrames;
    const easing = getEasingFunction(ease);
    
    currentX = interpolate(
      progress,
      [0, 1],
      [enterFromX, targetX],
      easing
    );
    
    currentY = interpolate(
      progress,
      [0, 1],
      [enterFromY, targetY],
      easing
    );
    
    currentRotateX = interpolate(
      progress,
      [0, 1],
      [enterRotateX, rotateX],
      easing
    );
    
    currentRotateY = interpolate(
      progress,
      [0, 1],
      [enterRotateY, rotateY],
      easing
    );
    
    currentRotateZ = interpolate(
      progress,
      [0, 1],
      [enterRotateZ, rotateZ],
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