'use client';

import { useState, useEffect } from 'react';
import InfiniteCanvas from '@/components/InfiniteCanvas';
import FloatingMenuBar from '@/components/FloatingMenuBar';
import BlocklyMenu from '@/components/BlocklyMenu';
import ProjectSettings from '@/components/ProjectSettings';
import AssetManager from '@/components/AssetManager';
import VideoProgress from '@/components/VideoProgress';

export default function Home() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isBlocklyOpen, setIsBlocklyOpen] = useState(false);
  const [isProjectSettingsOpen, setIsProjectSettingsOpen] = useState(false);
  const [isAssetManagerOpen, setIsAssetManagerOpen] = useState(false);

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
      <FloatingMenuBar 
        onBlocklyOpen={() => setIsBlocklyOpen(true)}
        onProjectSettingsOpen={() => setIsProjectSettingsOpen(true)}
        onAssetsOpen={() => setIsAssetManagerOpen(true)}
      />
      <BlocklyMenu
        isOpen={isBlocklyOpen}
        onClose={() => setIsBlocklyOpen(false)}
      />
      <ProjectSettings
        isOpen={isProjectSettingsOpen}
        onClose={() => setIsProjectSettingsOpen(false)}
      />
      <AssetManager
        isOpen={isAssetManagerOpen}
        onClose={() => setIsAssetManagerOpen(false)}
      />
      <VideoProgress />
    </div>
  );
}
