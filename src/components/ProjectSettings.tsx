'use client';

import { useState, useEffect } from 'react';

interface ProjectSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

type Resolution = '9:16' | '16:9' | '1:1';
type FPS = 12 | 24 | 30 | 60;

interface ProjectConfig {
  projectName: string;
  resolution: Resolution;
  fps: FPS;
  videoLength: string;
}

const defaultConfig: ProjectConfig = {
  projectName: 'Untitled Project',
  resolution: '16:9',
  fps: 30,
  videoLength: '00:01:00',
};

export default function ProjectSettings({ isOpen, onClose }: ProjectSettingsProps) {
  const [config, setConfig] = useState<ProjectConfig>(defaultConfig);

  useEffect(() => {
    const savedConfig = localStorage.getItem('projectConfig');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig({ ...defaultConfig, ...parsedConfig });
      } catch (error) {
        console.error('Failed to parse saved project config:', error);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('projectConfig', JSON.stringify(config));
    console.log('Project settings saved:', config);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('projectConfigUpdated', { 
      detail: config 
    }));
    
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-96 max-w-[90vw]">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Project Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={config.projectName}
              onChange={(e) => setConfig({ ...config, projectName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter project name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resolution
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['9:16', '16:9', '1:1'] as Resolution[]).map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setConfig({ ...config, resolution: ratio })}
                  className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                    config.resolution === ratio
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              FPS (Frames Per Second)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {([12, 24, 30, 60] as FPS[]).map((fps) => (
                <button
                  key={fps}
                  onClick={() => setConfig({ ...config, fps })}
                  className={`px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
                    config.fps === fps
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {fps}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video Length
            </label>
            <input
              type="text"
              value={config.videoLength}
              onChange={(e) => setConfig({ ...config, videoLength: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="00:00:00"
              pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-lg">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}