'use client';

interface ControlButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export default function ControlButton({ isPlaying, onToggle }: ControlButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-center w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label={isPlaying ? 'Pause' : 'Play'}
    >
      {isPlaying ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 4h4v16H6zm8 0h4v16h-4z"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
      )}
    </button>
  );
}