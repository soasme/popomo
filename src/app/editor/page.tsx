'use client';

import { useState, useEffect } from 'react';
import InfiniteCanvas from '@/components/InfiniteCanvas';
import FloatingPanel from '@/components/FloatingPanel';
import VideoProgress from '@/components/VideoProgress';
import HelpDialog from '@/components/HelpDialog';

export default function Home() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHelpOpen, setIsHelpOpen] = useState(false);

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
      <FloatingPanel onHelpOpen={() => setIsHelpOpen(true)} />
      <VideoProgress onHelpOpen={() => setIsHelpOpen(true)} />
      <HelpDialog isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}
