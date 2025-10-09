'use client';

import { useState, useEffect } from 'react';
import BlocklyWorkspace from './BlocklyWorkspace';
import AssetsPanel from './panels/AssetsPanel';
import SettingsPanel from './panels/SettingsPanel';
import PuppetPanel from './panels/PuppetPanel';

type ActivePanel = 'settings' | 'assets' | 'blockly' | 'puppets' | null;

interface FloatingPanelProps {
  onHelpOpen?: () => void;
}

export default function FloatingPanel({ onHelpOpen }: FloatingPanelProps) {
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activePanel !== null) {
        event.preventDefault();
        setActivePanel(null);
      } else if (event.altKey && (event.key === '1' || event.code === 'Digit1')) {
        event.preventDefault();
        setActivePanel(activePanel === 'blockly' ? null : 'blockly');
      } else if (event.altKey && (event.key === '2' || event.code === 'Digit2')) {
        event.preventDefault();
        setActivePanel(activePanel === 'assets' ? null : 'assets');
      } else if (event.altKey && (event.key === '3' || event.code === 'Digit3')) {
        event.preventDefault();
        setActivePanel(activePanel === 'puppets' ? null : 'puppets');
      } else if (event.key === '?') {
        event.preventDefault();
        onHelpOpen?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onHelpOpen, activePanel]);

  const openPanel = (panel: ActivePanel) => {
    setActivePanel(panel);
  };

  if (activePanel === null) {
    return (
      <div className="fixed top-4 left-4 z-40">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-3 space-y-2">
            <button
              onClick={() => openPanel('blockly')}
              className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-blue-50 rounded-md transition-colors group"
              title="Blockly Editor (Alt+1)"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center group-hover:bg-blue-200">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 18l-6-6 6-6M16 6l6 6-6 6"
                  />
                </svg>
              </div>
            </button>
            <button
              onClick={() => openPanel('assets')}
              className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-purple-50 rounded-md transition-colors group"
              title="Assets (Alt+2)"
            >
              <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center group-hover:bg-purple-200">
                <svg
                  className="w-4 h-4 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
            </button>
            <button
              onClick={() => openPanel('puppets')}
              className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-orange-50 rounded-md transition-colors group"
              title="Puppets (Alt+3)"
            >
              <div className="w-8 h-8 bg-orange-100 rounded-md flex items-center justify-center group-hover:bg-orange-200">
                <svg
                  className="w-4 h-4 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </button>
            <button
              onClick={() => openPanel('settings')}
              className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-green-50 rounded-md transition-colors group"
              title="Project Settings"
            >
              <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center group-hover:bg-green-200">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getPanelTitle = () => {
    switch (activePanel) {
      case 'blockly': return 'Code';
      case 'assets': return 'Assets';
      case 'puppets': return 'Puppets';
      case 'settings': return 'Project Settings';
      default: return '';
    }
  };

  const renderPanelContent = () => {
    switch (activePanel) {
      case 'blockly':
        return <BlocklyWorkspace isVisible={true} />;
      case 'assets':
        return <AssetsPanel isActive={true} />;
      case 'puppets':
        return <PuppetPanel isActive={true} />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed top-4 left-4 z-40">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 w-[800px] h-[600px] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{getPanelTitle()}</h2>
          <button
            onClick={() => setActivePanel(null)}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="flex-1">
          {renderPanelContent()}
        </div>
      </div>
    </div>
  );
}