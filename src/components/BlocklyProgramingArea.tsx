'use client';

import { useEffect, useRef } from 'react';
import * as Blockly from 'blockly';
import { BlocklyProgramingAreaProps } from '@/editorTypes';

export default function BlocklyProgramingArea({ 
  isVisible, 
  onWorkspaceChange,
  selectedBlock 
}: BlocklyProgramingAreaProps) {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspace = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    if (isVisible && blocklyDiv.current && !workspace.current) {
      // Initialize Blockly workspace without toolbox (since we're handling it separately)
      workspace.current = Blockly.inject(blocklyDiv.current, {
        toolbox: null, // No toolbox - we'll handle blocks via our custom components
        zoom: {
          controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,
        },
        trashcan: true,
        grid: {
          spacing: 20,
          length: 3,
          colour: '#ccc',
          snap: true
        },
        scrollbars: true,
        horizontalLayout: false,
        toolboxPosition: 'start',
      });

      // Add change listener
      if (onWorkspaceChange) {
        workspace.current.addChangeListener(onWorkspaceChange);
      }

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