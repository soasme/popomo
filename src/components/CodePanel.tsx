'use client';

import { useState, useEffect } from 'react';
import BlocklyWorkspace from './BlocklyWorkspace';
import CodeObjectSelector from './CodeObjectSelector';
import { CodePanelProps, AnyCodeObject, Puppet } from '@/editorTypes';

export default function CodePanel({ isVisible }: CodePanelProps) {
  const [selectedCodeObjectId, setSelectedCodeObjectId] = useState<string>('camera');
  const [availableCodeObjects, setAvailableCodeObjects] = useState<AnyCodeObject[]>([]);

  // Load available code objects (puppets) when component mounts
  useEffect(() => {
    // For now, initialize with empty array
    // This would typically load from a store or API
    const initialPuppets: Puppet[] = [];
    setAvailableCodeObjects(initialPuppets);
  }, []);

  const handleSelectionChange = (id: string) => {
    setSelectedCodeObjectId(id);
    // Here you would typically dispatch an action to update the global state
    // so other components know which code object is currently selected
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <BlocklyWorkspace isVisible={isVisible} />
      </div>
    </div>
  );
}

// Export the selector component separately for use in the panel header
export { CodeObjectSelector };
export type { CodePanelProps };
export { useState as useCodeObjectState };

// Hook to get the current selection state for the panel header
export function useCodeObjectSelection() {
  const [selectedCodeObjectId, setSelectedCodeObjectId] = useState<string>('camera');
  const [availableCodeObjects, setAvailableCodeObjects] = useState<AnyCodeObject[]>([]);

  // Load available code objects
  useEffect(() => {
    const initialPuppets: Puppet[] = [];
    setAvailableCodeObjects(initialPuppets);
  }, []);

  return {
    selectedCodeObjectId,
    setSelectedCodeObjectId,
    availableCodeObjects
  };
}