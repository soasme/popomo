'use client';

import { CodeObjectSelectorProps } from '@/editorTypes';

export default function CodeObjectSelector({ 
  selectedCodeObjectId, 
  onSelectionChange, 
  availableCodeObjects 
}: CodeObjectSelectorProps) {
  // Default camera object
  const cameraOption = { id: 'camera', name: 'Camera', type: 'camera' };

  return (
    <div className="flex items-center space-x-3">
      <label htmlFor="code-object-select" className="text-sm font-medium text-gray-700">
        Control:
      </label>
      <select
        id="code-object-select"
        value={selectedCodeObjectId}
        onChange={(e) => onSelectionChange(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[150px]"
      >
        <option value="camera">{cameraOption.name} (Default)</option>
        {availableCodeObjects
          .filter(obj => obj.type === 'puppet')
          .map((codeObject) => (
            <option key={codeObject.id} value={codeObject.id}>
              {codeObject.name}
            </option>
          ))}
      </select>
      {selectedCodeObjectId !== 'camera' && (
        <span className="text-xs text-gray-500">
          {availableCodeObjects.find(obj => obj.id === selectedCodeObjectId)?.name || 'Unknown'}
        </span>
      )}
    </div>
  );
}