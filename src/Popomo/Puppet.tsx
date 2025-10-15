import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { z } from 'zod';

export const puppetSchema = z.object({
  image: z.string(),
  pos: z.string().regex(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?$/, "Position must be in format 'x,y,z'"),
  rotate: z.string().regex(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?$/, "Rotation must be in format 'x,y,z'").default("0,0,0"),
  enterDuration: z.number().positive(),
  enterEase: z.string(),
  enterFrom: z.enum(['bottom', 'top', 'left', 'right']),
  exitDuration: z.number().positive(),
  exitEase: z.string(),
  exitTo: z.enum(['bottom', 'top', 'left', 'right']),
  scale: z.number().default(1.0),
});

type PuppetProps = z.infer<typeof puppetSchema>;

// Easing functions
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

// Calculate offset position based on direction and viewport size
const getOffsetPosition = (direction: 'bottom' | 'top' | 'left' | 'right', videoConfig: { width: number; height: number }) => {
  const offset = 200; // Distance outside viewport
  
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

export const Puppet: React.FC<PuppetProps> = ({
  image,
  pos,
  rotate,
  enterDuration,
  enterEase,
  enterFrom,
  exitDuration,
  exitEase,
  exitTo,
  scale,
}) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  
  // Parse position
  const [targetX, targetY, targetZ] = pos.split(',').map(Number);
  
  // Parse rotation
  const [rotateX, rotateY, rotateZ] = rotate.split(',').map(Number);
  
  // Calculate frame ranges
  const enterFrames = Math.round(enterDuration * videoConfig.fps);
  const exitStartFrame = videoConfig.durationInFrames - Math.round(exitDuration * videoConfig.fps);
  
  // Get enter animation start position
  const enterFromPos = getOffsetPosition(enterFrom, videoConfig);
  const enterFromX = targetX + enterFromPos.x;
  const enterFromY = targetY + enterFromPos.y;
  
  // Get exit animation end position
  const exitToPos = getOffsetPosition(exitTo, videoConfig);
  const exitToX = targetX + exitToPos.x;
  const exitToY = targetY + exitToPos.y;
  
  // Calculate current position
  let currentX = targetX;
  let currentY = targetY;
  let currentZ = targetZ;
  
  if (frame < enterFrames) {
    // Enter animation
    const enterProgress = frame / enterFrames;
    const enterEasing = getEasingFunction(enterEase);
    
    currentX = interpolate(
      enterProgress,
      [0, 1],
      [enterFromX, targetX],
      enterEasing
    );
    
    currentY = interpolate(
      enterProgress,
      [0, 1],
      [enterFromY, targetY],
      enterEasing
    );
    
  } else if (frame >= exitStartFrame) {
    // Exit animation
    const exitProgress = (frame - exitStartFrame) / (videoConfig.durationInFrames - exitStartFrame);
    const exitEasing = getEasingFunction(exitEase);
    
    currentX = interpolate(
      exitProgress,
      [0, 1],
      [targetX, exitToX],
      exitEasing
    );
    
    currentY = interpolate(
      exitProgress,
      [0, 1],
      [targetY, exitToY],
      exitEasing
    );
  }
  
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