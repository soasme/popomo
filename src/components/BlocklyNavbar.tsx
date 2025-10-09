'use client';

import { BlocklyNavbarProps } from '@/editorTypes';

export default function BlocklyNavbar({ 
  selectedCategory, 
  onCategorySelect, 
  categories 
}: BlocklyNavbarProps) {
  const defaultCategories = [
    { name: 'Logic', color: '#5C81A6' },
    { name: 'Loops', color: '#5CA65C' },
    { name: 'Math', color: '#5C68A6' },
    { name: 'Text', color: '#5CA68D' },
    { name: 'Variables', color: '#A55B80' },
    { name: 'Functions', color: '#995BA5' },
  ];

  const categoriesToUse = categories || defaultCategories;

  return (
    <div className="w-24 h-full bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="p-2 bg-gray-100 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-700 text-center">Categories</h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        {categoriesToUse.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategorySelect(category.name)}
            className={`w-full px-2 py-3 text-center text-xs font-medium border-b border-gray-200 transition-colors ${
              selectedCategory === category.name
                ? 'bg-blue-50 text-blue-700 border-l-4 border-l-blue-500'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            style={{
              backgroundColor: selectedCategory === category.name ? undefined : undefined,
              borderLeftColor: selectedCategory === category.name ? category.color : undefined
            }}
          >
            <div className="flex flex-col items-center space-y-1">
              <div 
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: category.color }}
              />
              <span className="leading-tight">{category.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}