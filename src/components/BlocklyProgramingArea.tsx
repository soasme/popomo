'use client';

import { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import * as Blockly from 'blockly';
import { BlocklyProgramingAreaProps } from '@/editorTypes';
import { DEFAULT_WORKSPACE_CONFIG } from './BlocklyConst';
import { initializeCustomBlocks } from './BlocklyCustomBlocks';
import { workspaceStatesAtom } from '@/store/editorAtoms';

export default function BlocklyProgramingArea({ 
  isVisible, 
  onWorkspaceChange,
  selectedBlock,
  selectedCodeObjectId,
  puppets = []
}: BlocklyProgramingAreaProps) {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspace = useRef<Blockly.WorkspaceSvg | null>(null);
  const [workspaceStates] = useAtom(workspaceStatesAtom);
  const isLoadingRef = useRef(false);

  // Initialize custom blocks on component mount
  useEffect(() => {
    initializeCustomBlocks();
  }, []);

  useEffect(() => {
    if (isVisible && blocklyDiv.current && !workspace.current) {
      // Initialize Blockly workspace without toolbox (since we're handling it separately)
      workspace.current = Blockly.inject(blocklyDiv.current, {
        // No toolbox - we'll handle blocks via our custom components
        ...DEFAULT_WORKSPACE_CONFIG,
        grid: {
          spacing: 20,
          length: 3,
          colour: '#ccc',
          snap: true
        },
        horizontalLayout: false,
        toolboxPosition: 'start',
      });

      // Change listener will be added in a separate effect to handle updates

      // Trigger resize after a short delay to ensure proper rendering
      setTimeout(() => {
        if (workspace.current) {
          Blockly.svgResize(workspace.current);
        }
      }, 50);
    }

    // Cleanup function
    return () => {
      if (!isVisible && workspace.current) {
        workspace.current.dispose();
        workspace.current = null;
      }
    };
  }, [isVisible, onWorkspaceChange]);

  // Handle adding blocks when selectedBlock changes
  useEffect(() => {
    if (selectedBlock && workspace.current) {
      try {
        const block = workspace.current.newBlock(selectedBlock);
        block.initSvg();
        block.render();
        block.moveBy(50, 50); // Position the block slightly offset
      } catch (error) {
        console.warn(`Failed to create block of type: ${selectedBlock}`, error);
      }
    }
  }, [selectedBlock]);

  // Handle resize when visibility changes
  useEffect(() => {
    if (isVisible && workspace.current) {
      setTimeout(() => {
        if (workspace.current) {
          Blockly.svgResize(workspace.current);
        }
      }, 100);
    }
  }, [isVisible]);

  // Manage change listener - update when callback changes
  useEffect(() => {
    if (!workspace.current || !onWorkspaceChange) {
      return;
    }

    console.log('🔗 Adding new change listener for updated callback');

    const wrappedChangeHandler = (event: unknown) => {
      if (!isLoadingRef.current) {
        console.log('🔄 Workspace changed, calling handler');
        onWorkspaceChange(event);
      } else {
        console.log('🚫 Workspace changed during loading, ignoring');
      }
    };

    // Add the change listener
    workspace.current.addChangeListener(wrappedChangeHandler);

    // Cleanup: remove the listener when effect re-runs or component unmounts
    return () => {
      console.log('🗑️ Removing old change listener');
      if (workspace.current) {
        workspace.current.removeChangeListener(wrappedChangeHandler);
      }
    };
  }, [onWorkspaceChange]); // Re-run when callback changes

  // Load workspace state when selectedCodeObjectId changes
  useEffect(() => {
    if (!workspace.current || !selectedCodeObjectId) {
      console.log('❌ Cannot load - missing workspace or selectedCodeObjectId');
      return;
    }

    // Get the saved state for this code object
    const savedState = workspaceStates[selectedCodeObjectId];
    console.log('🔍 LOADING workspace state for', selectedCodeObjectId);
    console.log('📦 Available workspace states:', Object.keys(workspaceStates));
    console.log('💾 Saved state for', selectedCodeObjectId, ':', savedState);
    
    // Set loading flag to prevent change handler during load
    isLoadingRef.current = true;
    
    if (savedState) {
      try {
        console.log('🟢 Loading saved blocks for', selectedCodeObjectId);
        // Clear the workspace first
        workspace.current.clear();
        // Load the saved state
        Blockly.serialization.workspaces.load(savedState, workspace.current);
        console.log('✅ Successfully loaded blocks for', selectedCodeObjectId);
      } catch (error) {
        console.warn('❌ Failed to load workspace state for', selectedCodeObjectId, error);
      }
    } else {
      // No saved state, clear the workspace
      console.log('🟡 No saved state for', selectedCodeObjectId, '- clearing workspace');
      workspace.current.clear();
    }
    
    // Re-enable change handler after a short delay
    setTimeout(() => {
      isLoadingRef.current = false;
      console.log('🔓 Re-enabled change handler for', selectedCodeObjectId);
    }, 100);
  }, [selectedCodeObjectId, workspaceStates, puppets]);

  // Handle drop events for dragged blocks
  useEffect(() => {
    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      const blockType = event.dataTransfer?.getData('text/plain');
      
      if (blockType && workspace.current) {
        try {
          const block = workspace.current.newBlock(blockType);
          block.initSvg();
          block.render();
          
          // Calculate drop position relative to workspace
          const rect = blocklyDiv.current?.getBoundingClientRect();
          if (rect) {
            const x = event.clientX - rect.left - 50; // Offset for better positioning
            const y = event.clientY - rect.top - 50;
            block.moveBy(x, y);
          } else {
            block.moveBy(50, 50); // Default position
          }
        } catch (error) {
          console.warn(`Failed to create block of type: ${blockType}`, error);
        }
      }
    };

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
      event.dataTransfer!.dropEffect = 'copy';
    };

    const divElement = blocklyDiv.current;
    if (divElement) {
      divElement.addEventListener('drop', handleDrop);
      divElement.addEventListener('dragover', handleDragOver);

      return () => {
        divElement.removeEventListener('drop', handleDrop);
        divElement.removeEventListener('dragover', handleDragOver);
      };
    }
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="flex-1 h-full relative">
      <div ref={blocklyDiv} className="w-full h-full" />
    </div>
  );
}