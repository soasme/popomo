import React, { useEffect, useRef } from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  visible: boolean;
  onClose: () => void;
  items: ContextMenuItem[];
}

interface ContextMenuItem {
  label: string;
  onClick: () => void;
  icon?: string;
  disabled?: boolean;
  separator?: boolean;
}

export default function ContextMenu({ x, y, visible, onClose, items }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-40"
      style={{
        left: x,
        top: y,
      }}
    >
      {items.map((item, index) => {
        if (item.separator) {
          return <div key={index} className="border-t border-gray-200 my-1" />;
        }

        return (
          <button
            key={index}
            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors ${
              item.disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'
            }`}
            onClick={() => {
              if (!item.disabled) {
                item.onClick();
                onClose();
              }
            }}
            disabled={item.disabled}
          >
            <div className="flex items-center gap-2">
              {item.icon && <span className="text-gray-500">{item.icon}</span>}
              <span>{item.label}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}