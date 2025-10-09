'use client';

import { useEffect } from 'react';
import { useAtom } from 'jotai';
import InfiniteCanvas from '@/components/InfiniteCanvas';
import FloatingPanel from '@/components/FloatingPanel';
import VideoProgress from '@/components/VideoProgress';
import HelpDialog from '@/components/HelpDialog';
import { dimensionsAtom, isHelpOpenAtom } from '@/store/editorAtoms';

export default function Home() {
  const [dimensions, setDimensions] = useAtom(dimensionsAtom);
  const [isHelpOpen, setIsHelpOpen] = useAtom(isHelpOpenAtom);

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
