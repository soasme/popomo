'use client';

import { useState } from 'react';
import BlocklyNavbar from './BlocklyNavbar';
import BlocklyBlocks from './BlocklyBlocks';
import BlocklyProgramingArea from './BlocklyProgramingArea';
import { BlocklyWorkspaceProps } from '@/editorTypes';

export default function BlocklyWorkspace({ isVisible }: BlocklyWorkspaceProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<string | undefined>();

  const handleCategorySelect = (category: string) => {
    // Toggle category selection - if same category is clicked, deselect it
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleBlockSelect = (blockType: string) => {
    setSelectedBlock(blockType);
    // Clear the selected block after a short delay to allow for adding multiple blocks
    setTimeout(() => setSelectedBlock(undefined), 100);
  };

  const handleWorkspaceChange = (event: any) => {
    // Handle workspace changes if needed
    console.log('Workspace changed:', event);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="w-full h-full flex">
      {/* Left: Category Navigation */}
      <BlocklyNavbar
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
      
      {/* Middle: Block Selection (always visible to prevent disappearing) */}
      <BlocklyBlocks
        selectedCategory={selectedCategory}
        onBlockSelect={handleBlockSelect}
        isVisible={true} // Always keep visible to fix middle lane disappearing
      />
      
      {/* Right: Programming Area */}
      <BlocklyProgramingArea
        isVisible={true}
        onWorkspaceChange={handleWorkspaceChange}
        selectedBlock={selectedBlock}
      />
    </div>
  );
}