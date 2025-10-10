'use client';

import { useState } from 'react';
import BlocklyNavbar from './BlocklyNavbar';
import BlocklyMiddleLane from './BlocklyMiddleLane';
import BlocklyProgramingArea from './BlocklyProgramingArea';
import { BlocklyWorkspaceProps } from '@/editorTypes';

export default function BlocklyWorkspace({ isVisible }: BlocklyWorkspaceProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<string | undefined>();

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleBlockSelect = (blockType: string) => {
    setSelectedBlock(blockType);
    setTimeout(() => setSelectedBlock(undefined), 100);
  };

  const handleWorkspaceChange = (event: any) => {
    // Handle workspace changes if needed
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="w-full h-full flex overflow-hidden">
      <BlocklyNavbar
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
      
      <div className="h-full overflow-hidden">
        <BlocklyMiddleLane
          onBlockSelect={handleBlockSelect}
          isVisible={true}
          scrollToCategory={selectedCategory}
        />
      </div>
      
      <BlocklyProgramingArea
        isVisible={true}
        onWorkspaceChange={handleWorkspaceChange}
        selectedBlock={selectedBlock}
      />
    </div>
  );
}