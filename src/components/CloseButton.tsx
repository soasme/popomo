'use client';

interface CloseButtonProps {
  onClick: () => void;
  className?: string;
  title?: string;
}

export default function CloseButton({ onClick, className = "", title = "Close" }: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`text-red-500 hover:text-red-700 transition-colors ${className}`}
      title={title}
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </button>
  );
}