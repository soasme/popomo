'use client';

import { useState, useEffect } from 'react';
import InfiniteCanvas from '@/components/InfiniteCanvas';
import FloatingPanel from '@/components/FloatingPanel';
import VideoProgress from '@/components/VideoProgress';

export default function Home() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <InfiniteCanvas width={dimensions.width} height={dimensions.height} />
      <FloatingPanel />
      <VideoProgress />
    </div>
  );
}
