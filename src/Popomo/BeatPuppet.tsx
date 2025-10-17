import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { z } from 'zod';

export const beatPuppetSchema = z.object({
  image: z.string(),
  pos: z.string().regex(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?$/, "Position must be in format 'x,y,z'"),
  rotate: z.string().regex(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?,-?\d+(\.\d+)?$/, "Rotation must be in format 'x,y,z'").default("0,0,0"),
  bpm: z.number().positive().default(120),
  speed: z.number().positive().default(1.0),
  distance: z.number().positive().default(50),
  scale: z.number().default(1.0),
});

type BeatPuppetProps = z.infer<typeof beatPuppetSchema>;

export const BeatPuppet: React.FC<BeatPuppetProps> = ({
  image,
  pos,
  rotate,
  bpm,
  speed,
  distance,
  scale,
}) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  
  const [targetX, targetY, targetZ] = pos.split(',').map(Number);
  const [rotateX, rotateY, rotateZ] = rotate.split(',').map(Number);
  
  const beatsPerSecond = bpm / 60;
  const framesPerBeat = videoConfig.fps / beatsPerSecond;
  const animationFrames = framesPerBeat / speed;
  
  const currentBeatProgress = (frame % animationFrames) / animationFrames;
  
  let offsetY = 0;
  
  if (currentBeatProgress <= 0.3) {
    offsetY = interpolate(
      currentBeatProgress,
      [0, 0.3],
      [0, -distance],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t: number) => 1 - (1 - t) * (1 - t) }
    );
  } else if (currentBeatProgress <= 0.5) {
    offsetY = -distance;
  } else {
    offsetY = interpolate(
      currentBeatProgress,
      [0.5, 1],
      [-distance, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (t: number) => t * t }
    );
  }
  
  const currentX = targetX;
  const currentY = targetY + offsetY;
  const currentZ = targetZ;
  
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