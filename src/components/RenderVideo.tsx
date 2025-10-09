'use client';

import { useState, useRef, useEffect } from 'react';

interface RenderVideoProps {
  onProgress: (progress: number) => void;
  onComplete: (videoData: { projectName: string; resolution: string; totalTime: string }) => void;
  onError?: (error: string) => void;
}

export default function RenderVideo({ onProgress, onComplete, onError }: RenderVideoProps) {
  const [isRendering, setIsRendering] = useState(false);
  const renderIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRender = () => {
    if (isRendering) return;
    
    setIsRendering(true);
    onProgress(0);
    
    // Get project settings
    const savedConfig = localStorage.getItem('projectConfig');
    let projectName = 'Untitled Project';
    let resolution = '16:9';
    let totalTime = '00:01:00';
    
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        projectName = config.projectName || 'Untitled Project';
        resolution = config.resolution || '16:9';
        totalTime = config.videoLength || '00:01:00';
      } catch (error) {
        console.error('Failed to parse project config:', error);
        onError?.('Failed to load project settings');
        return;
      }
    }
    
    // Simulate rendering progress
    let currentProgress = 0;
    renderIntervalRef.current = setInterval(() => {
      currentProgress += Math.random() * 2; // Random progress increment
      if (currentProgress >= 100) {
        setIsRendering(false);
        clearInterval(renderIntervalRef.current!);
        
        // Complete rendering
        onProgress(100);
        onComplete({ projectName, resolution, totalTime });
        return;
      }
      onProgress(currentProgress);
    }, 200);
  };

  const cancelRender = () => {
    if (renderIntervalRef.current) {
      clearInterval(renderIntervalRef.current);
      renderIntervalRef.current = null;
    }
    setIsRendering(false);
    onProgress(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (renderIntervalRef.current) {
        clearInterval(renderIntervalRef.current);
      }
    };
  }, []);

  return {
    isRendering,
    startRender,
    cancelRender
  };
}