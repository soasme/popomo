'use client';

import { useState, useEffect, useRef } from 'react';
import ControlButton from './ControlButton';

interface VideoProgressProps {
  totalTime?: string;
  onHelpOpen?: () => void;
}

function timeStringToSeconds(timeStr: string): number {
  const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

function secondsToTimeString(seconds: number, includeDecimal = false): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  
  if (includeDecimal) {
    const wholeSeconds = Math.floor(s);
    const decimal = Math.floor((s - wholeSeconds) * 10);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${wholeSeconds.toString().padStart(2, '0')}.${decimal}`;
  } else {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${Math.floor(s).toString().padStart(2, '0')}`;
  }
}

export default function VideoProgress({ totalTime: propTotalTime, onHelpOpen }: VideoProgressProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(propTotalTime || '00:01:00');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadConfigFromStorage = () => {
      const savedConfig = localStorage.getItem('projectConfig');
      console.log('VideoProgress: Loading config from localStorage:', savedConfig);
      if (savedConfig) {
        try {
          const parsedConfig = JSON.parse(savedConfig);
          console.log('VideoProgress: Parsed config:', parsedConfig);
          if (parsedConfig.videoLength) {
            console.log('VideoProgress: Setting total time to:', parsedConfig.videoLength);
            setTotalTime(parsedConfig.videoLength);
          }
        } catch (error) {
          console.error('Failed to parse saved project config:', error);
        }
      } else {
        console.log('VideoProgress: No saved config found, using default');
      }
    };

    loadConfigFromStorage();

    const handleConfigUpdate = (e: CustomEvent) => {
      console.log('VideoProgress: Received config update event:', e.detail);
      if (e.detail && e.detail.videoLength) {
        setTotalTime(e.detail.videoLength);
      }
    };

    window.addEventListener('projectConfigUpdated', handleConfigUpdate as EventListener);
    return () => window.removeEventListener('projectConfigUpdated', handleConfigUpdate as EventListener);
  }, []);

  const totalSeconds = timeStringToSeconds(totalTime);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCurrentTime(value);
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            return totalSeconds;
          }
          return prev + 0.1;
        });
      }, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, totalSeconds]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const progressPercentage = totalSeconds > 0 ? (currentTime / totalSeconds) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-40">
      <div className="max-w-4xl mx-auto flex items-center gap-4">
        <span className="text-sm font-mono text-gray-600 min-w-[80px]">
          {secondsToTimeString(currentTime, true)}
        </span>
        
        <ControlButton isPlaying={isPlaying} onToggle={handlePlayPause} />
        
        <div className="flex-1 relative">
          <input
            type="range"
            min="0"
            max={totalSeconds}
            step="0.1"
            value={currentTime}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${progressPercentage}%, #e5e7eb ${progressPercentage}%, #e5e7eb 100%)`
            }}
          />
          <style jsx>{`
            .slider::-webkit-slider-thumb {
              appearance: none;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: #3b82f6;
              cursor: pointer;
              border: 2px solid white;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }
            .slider::-moz-range-thumb {
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: #3b82f6;
              cursor: pointer;
              border: 2px solid white;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }
          `}</style>
        </div>
        
        <span className="text-sm font-mono text-gray-600 min-w-[80px]">
          {totalTime}
        </span>
        
        <button
          onClick={onHelpOpen}
          className="ml-2 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          title="Keyboard Shortcuts (?)"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}