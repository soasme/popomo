'use client';

import { useState, useCallback } from 'react';
import { useAtom } from 'jotai';
import BlocklyNavbar from './BlocklyNavbar';
import BlocklyMiddleLane from './BlocklyMiddleLane';
import BlocklyProgramingArea from './BlocklyProgramingArea';
import { BlocklyWorkspaceProps, Puppet } from '@/editorTypes';
import { puppetsAtom, canvasImagesAtom, workspaceStatesAtom } from '@/store/editorAtoms';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

export default function BlocklyWorkspace({ isVisible, selectedCodeObjectId }: BlocklyWorkspaceProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<string | undefined>();
  const [puppets, setPuppets] = useAtom(puppetsAtom);
  const [canvasImages] = useAtom(canvasImagesAtom);
  const [, setWorkspaceStates] = useAtom(workspaceStatesAtom);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleBlockSelect = (blockType: string) => {
    setSelectedBlock(blockType);
    setTimeout(() => setSelectedBlock(undefined), 100);
  };

  const handleWorkspaceChange = useCallback((event: unknown) => {
    // Get the workspace from the event
    const eventObj = event as { workspaceId?: string };
    const workspace = eventObj.workspaceId ? Blockly.Workspace.getById(eventObj.workspaceId) : null;
    if (!workspace || !selectedCodeObjectId) {
      return;
    }

    try {
      // Save workspace state for all code objects (including camera)
      const workspaceState = Blockly.serialization.workspaces.save(workspace);
      console.log('🔄 SAVING workspace state for', selectedCodeObjectId, ':', workspaceState);
      setWorkspaceStates(prevStates => {
        const newStates = {
          ...prevStates,
          [selectedCodeObjectId]: workspaceState
        };
        console.log('📦 All workspace states after save:', newStates);
        return newStates;
      });

      // Generate and save code for puppet objects only (not camera)
      if (selectedCodeObjectId !== 'camera') {
        const code = javascriptGenerator.workspaceToCode(workspace);
        
        // Check if this is an existing puppet
        const existingPuppet = puppets.find(puppet => puppet.id === selectedCodeObjectId);
        
        if (existingPuppet) {
          // Update existing puppet's code
          setPuppets(prevPuppets => 
            prevPuppets.map(puppet => 
              puppet.id === selectedCodeObjectId 
                ? { ...puppet, code }
                : puppet
            )
          );
        } else {
          // Check if this is a canvas image that needs to become a puppet
          const canvasImage = canvasImages.find(img => img.id === selectedCodeObjectId);
          if (canvasImage) {
            // Create a new puppet from the canvas image with the code
            const newPuppet: Puppet = {
              id: selectedCodeObjectId,
              name: `Puppet ${selectedCodeObjectId.slice(0, 8)}`,
              type: 'puppet' as const,
              position: { x: canvasImage.x, y: canvasImage.y },
              rotation: 0,
              scale: 1,
              assetId: canvasImage.assetId,
              visible: true,
              code
            };
            setPuppets(prevPuppets => [...prevPuppets, newPuppet]);
          }
        }
      }
    } catch (error) {
      console.warn('Failed to save workspace state:', error);
    }
  }, [selectedCodeObjectId, setPuppets, puppets, canvasImages, setWorkspaceStates]);

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
        selectedCodeObjectId={selectedCodeObjectId}
        puppets={puppets}
      />
    </div>
  );
}