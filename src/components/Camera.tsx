'use client';

import { useState, useEffect } from 'react';
import { Rect } from 'react-konva';

interface CameraProps {
  x?: number;
  y?: number;
}

type Resolution = '9:16' | '16:9' | '1:1';

interface ProjectConfig {
  projectName: string;
  resolution: Resolution;
  fps: number;
  videoLength: string;
}

const defaultConfig: ProjectConfig = {
  projectName: 'Untitled Project',
  resolution: '16:9',
  fps: 30,
  videoLength: '00:01:00',
};

const getResolutionDimensions = (resolution: Resolution, baseHeight: number = 1080) => {
  switch (resolution) {
    case '16:9':
      return { width: baseHeight * (16/9), height: baseHeight };
    case '9:16':
      return { width: baseHeight * (9/16), height: baseHeight };
    case '1:1':
      return { width: baseHeight, height: baseHeight };
    default:
      return { width: baseHeight * (16/9), height: baseHeight };
  }
};

export default function Camera({ x = 0, y = 0 }: CameraProps) {
  const [config, setConfig] = useState<ProjectConfig>(defaultConfig);

  useEffect(() => {
    const loadConfig = () => {
      const savedConfig = localStorage.getItem('projectConfig');
      if (savedConfig) {
        try {
          const parsedConfig = JSON.parse(savedConfig);
          setConfig({ ...defaultConfig, ...parsedConfig });
        } catch (error) {
          console.error('Failed to parse saved project config:', error);
        }
      }
    };

    loadConfig();

    const handleConfigUpdate = (event: CustomEvent) => {
      setConfig(event.detail);
    };

    window.addEventListener('projectConfigUpdated', handleConfigUpdate as EventListener);
    
    return () => {
      window.removeEventListener('projectConfigUpdated', handleConfigUpdate as EventListener);
    };
  }, []);

  const dimensions = getResolutionDimensions(config.resolution);

  return (
    <Rect
      x={x}
      y={y}
      width={dimensions.width}
      height={dimensions.height}
      stroke="#ff0000"
      strokeWidth={2}
      fill="transparent"
      dash={[5, 5]}
    />
  );
}