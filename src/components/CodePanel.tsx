'use client';

import { useState } from 'react';
import { useAtom } from 'jotai';
import BlocklyWorkspace from './BlocklyWorkspace';
import CodeObjectSelector from './CodeObjectSelector';
import { CodePanelProps, AnyCodeObject, Puppet } from '@/editorTypes';
import { puppetsAtom, canvasImagesAtom } from '@/store/editorAtoms';

export default function CodePanel({ isVisible, selectedCodeObjectId = 'camera' }: CodePanelProps) {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <BlocklyWorkspace isVisible={isVisible} selectedCodeObjectId={selectedCodeObjectId} />
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
  const [puppets] = useAtom(puppetsAtom);
  const [canvasImages] = useAtom(canvasImagesAtom);

  // Combine puppets and canvas images that don't have corresponding puppets
  const filteredCanvasImages = canvasImages.filter(canvasImage => 
    !puppets.some(puppet => puppet.id === canvasImage.id)
  );
  
  console.log('📊 Dropdown data:');
  console.log('  - Real puppets:', puppets.map(p => `${p.name} (${p.id.slice(0, 8)})`));
  console.log('  - Canvas images:', canvasImages.map(img => `Image ${img.id.slice(0, 8)}`));
  console.log('  - Filtered canvas images:', filteredCanvasImages.map(img => `Image ${img.id.slice(0, 8)}`));
  
  const tempPuppets = filteredCanvasImages.map(canvasImage => ({
    id: canvasImage.id,
    name: `Puppet ${canvasImage.id.slice(0, 8)}`,
    type: 'puppet' as const,
    position: { x: canvasImage.x, y: canvasImage.y },
    rotation: 0,
    scale: 1,
    assetId: canvasImage.assetId,
    visible: true,
  } as Puppet));

  const allObjects = [...puppets, ...tempPuppets];
  
  // Remove any duplicates by ID (safety check)
  const availableCodeObjects: AnyCodeObject[] = allObjects.filter(
    (obj, index, arr) => arr.findIndex(item => item.id === obj.id) === index
  );
  
  console.log('  - Final objects:', availableCodeObjects.map(obj => `${obj.name} (${obj.id.slice(0, 8)})`));

  return {
    selectedCodeObjectId,
    setSelectedCodeObjectId,
    availableCodeObjects
  };
}