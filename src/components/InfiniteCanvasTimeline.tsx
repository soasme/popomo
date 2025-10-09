'use client';

import { useRef, useEffect, useCallback } from 'react';
import { createTimeline, type Timeline } from 'animejs/timeline';

interface InfiniteCanvasTimelineProps {
  children: React.ReactNode | ((getTimeline: () => Timeline | null) => React.ReactNode);
}

function parseTimeToMilliseconds(timeString: string): number {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return (hours * 3600 + minutes * 60 + seconds) * 1000;
}

function getProjectConfig() {
  if (typeof window === 'undefined') return null;
  
  const savedConfig = localStorage.getItem('projectConfig');
  if (savedConfig) {
    try {
      return JSON.parse(savedConfig);
    } catch (error) {
      console.error('Failed to parse project config:', error);
    }
  }
  
  return {
    projectName: 'Untitled Project',
    resolution: '16:9',
    fps: 30,
    videoLength: '00:01:00',
  };
}

export default function InfiniteCanvasTimeline({ children }: InfiniteCanvasTimelineProps) {
  const timelineRef = useRef<Timeline | null>(null);

  const initializeTimeline = useCallback(() => {
    const config = getProjectConfig();
    if (!config) return;

    const duration = parseTimeToMilliseconds(config.videoLength);

    timelineRef.current = createTimeline({
      duration,
      autoplay: false,
      loop: false
    });
  }, []);

  useEffect(() => {
    initializeTimeline();

    const handleConfigUpdate = () => {
      initializeTimeline();
    };

    window.addEventListener('projectConfigUpdated', handleConfigUpdate);

    return () => {
      window.removeEventListener('projectConfigUpdated', handleConfigUpdate);
      if (timelineRef.current) {
        timelineRef.current.pause();
      }
    };
  }, [initializeTimeline]);

  const getTimeline = useCallback(() => {
    return timelineRef.current;
  }, []);

  return (
    <div data-timeline-wrapper>
      {typeof children === 'function' ? children(getTimeline) : children}
    </div>
  );
}

export { InfiniteCanvasTimeline };