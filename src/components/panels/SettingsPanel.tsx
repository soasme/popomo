'use client';

import { useState, useEffect } from 'react';

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

export default function SettingsPanel() {
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
    
    window.dispatchEvent(new CustomEvent('projectConfigUpdated', { 
      detail: config 
    }));
  };

  return (
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

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}