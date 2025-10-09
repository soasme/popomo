'use client';

import { useState, useEffect } from 'react';
import CloseButton from './CloseButton';
import RenderVideo from './RenderVideo';

interface DownloadProgressToastProps {
  isVisible: boolean;
  onClose: () => void;
}

const downloadVideo = (projectName: string, resolution: string, totalTime: string) => {
  // In a real implementation, this would download the actual rendered video
  // For now, we'll simulate the download
  console.log(`Downloading video: ${projectName} (${resolution}, 1080p)`);
  
  // Create a download link for demo purposes
  const element = document.createElement('a');
  element.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(`Video: ${projectName}\nResolution: ${resolution}\nLength: ${totalTime}`);
  element.download = `${projectName}.mp4`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export default function DownloadProgressToast({ isVisible, onClose }: DownloadProgressToastProps) {
  const [progress, setProgress] = useState(0);
  
  const renderVideo = RenderVideo({
    onProgress: setProgress,
    onComplete: ({ projectName, resolution, totalTime }) => {
      downloadVideo(projectName, resolution, totalTime);
      onClose();
    },
    onError: (error) => {
      console.error('Render error:', error);
      onClose();
    }
  });

  useEffect(() => {
    if (isVisible && !renderVideo.isRendering) {
      renderVideo.startRender();
    }
  }, [isVisible, renderVideo]);

  const handleClose = () => {
    renderVideo.cancelRender();
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 min-w-[300px]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-800">Rendering Video</h3>
        <CloseButton onClick={handleClose} title="Cancel rendering" />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>Progress</span>
          <span>{progress.toFixed(1)}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}