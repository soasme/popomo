'use client';

import { useEffect, useRef } from 'react';
import * as Blockly from 'blockly';
import { BlocklyBlocksProps } from '@/editorTypes';

export default function BlocklyBlocks({ 
  selectedCategory, 
  onBlockSelect, 
  isVisible = true 
}: BlocklyBlocksProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const getBlocksForCategory = (category: string) => {
    switch (category) {
      case 'Logic':
        return ['controls_if', 'logic_compare', 'logic_operation', 'logic_negate', 'logic_boolean'];
      case 'Loops':
        return ['controls_repeat_ext', 'controls_whileUntil', 'controls_for'];
      case 'Math':
        return ['math_number', 'math_arithmetic', 'math_single'];
      case 'Text':
        return ['text', 'text_join', 'text_length'];
      case 'Variables':
        return ['variables_get', 'variables_set'];
      case 'Functions':
        return ['procedures_defnoreturn', 'procedures_callnoreturn'];
      default:
        return [];
    }
  };

  useEffect(() => {
    if (!containerRef.current || !selectedCategory) return;

    // Clear container
    containerRef.current.innerHTML = '';

    const blockTypes = getBlocksForCategory(selectedCategory);

    blockTypes.forEach((blockType) => {
      try {
        // Create a small div for each block
        const blockDiv = document.createElement('div');
        blockDiv.style.margin = '8px';
        blockDiv.style.cursor = 'pointer';
        containerRef.current!.appendChild(blockDiv);

        // Create a mini workspace for this single block
        const miniWorkspace = Blockly.inject(blockDiv, {
          toolbox: null,
          readOnly: true,
          scrollbars: false,
          zoom: { controls: false, wheel: false },
          trashcan: false,
        });

        // Create the block
        const block = miniWorkspace.newBlock(blockType);
        block.initSvg();
        block.render();
        block.moveBy(5, 5);

        // Resize the workspace to fit the block
        const blockSize = block.getHeightWidth();
        blockDiv.style.width = `${Math.max(blockSize.width + 20, 200)}px`;
        blockDiv.style.height = `${blockSize.height + 20}px`;
        Blockly.svgResize(miniWorkspace);

        // Add click handler
        blockDiv.addEventListener('click', () => {
          onBlockSelect?.(blockType);
        });

        // Add drag support
        blockDiv.draggable = true;
        blockDiv.addEventListener('dragstart', (e) => {
          e.dataTransfer?.setData('text/plain', blockType);
          e.dataTransfer!.effectAllowed = 'copy';
          blockDiv.style.opacity = '0.5';
        });

        blockDiv.addEventListener('dragend', () => {
          blockDiv.style.opacity = '1';
        });

        // Add hover effect for better UX
        blockDiv.addEventListener('mouseenter', () => {
          blockDiv.style.backgroundColor = '#f0f9ff';
        });

        blockDiv.addEventListener('mouseleave', () => {
          blockDiv.style.backgroundColor = 'transparent';
        });

        // Prevent the mini-workspace from interfering with drag
        const svgElement = blockDiv.querySelector('svg');
        if (svgElement) {
          svgElement.style.pointerEvents = 'none';
        }

      } catch (error) {
        console.warn(`Failed to create block: ${blockType}`, error);
      }
    });
  }, [selectedCategory, onBlockSelect]);

  if (!isVisible || !selectedCategory) {
    return (
      <div className="w-64 h-full bg-white border-r border-gray-200 flex items-center justify-center">
        <p className="text-gray-500 text-sm">Select a category to see blocks</p>
      </div>
    );
  }

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-3 bg-gray-50 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700">{selectedCategory} Blocks</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <div ref={containerRef}></div>
      </div>
    </div>
  );
}