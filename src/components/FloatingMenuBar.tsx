'use client';

import { useState } from 'react';

interface FloatingMenuBarProps {
  onBlocklyOpen: () => void;
  onProjectSettingsOpen: () => void;
  onAssetsOpen: () => void;
}

export default function FloatingMenuBar({ onBlocklyOpen, onProjectSettingsOpen, onAssetsOpen }: FloatingMenuBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed top-4 left-4 z-40">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="p-3 hover:bg-gray-50 rounded-lg transition-colors"
            title="Open Menu"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        ) : (
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">Tools</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              <button
                onClick={onProjectSettingsOpen}
                className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-green-50 rounded-md transition-colors group"
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
                <span className="text-sm font-medium text-gray-700">
                  Project Settings
                </span>
              </button>
              <button
                onClick={onAssetsOpen}
                className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-purple-50 rounded-md transition-colors group"
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
                <span className="text-sm font-medium text-gray-700">
                  Assets
                </span>
              </button>
              <button
                onClick={onBlocklyOpen}
                className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-blue-50 rounded-md transition-colors group"
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
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 8.172V5L8 4z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Blockly Editor
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}