'use client';

import { useEffect, useRef } from 'react';
import * as Blockly from 'blockly';
import { BLOCKLY_CATEGORIES, FLYOUT_WORKSPACE_CONFIG } from './BlocklyConst';
import { initializeCustomBlocks } from './BlocklyCustomBlocks';

interface BlocklyMiddleLaneProps {
  onBlockSelect?: (blockType: string) => void;
  isVisible?: boolean;
  scrollToCategory?: string | null;
}

export default function BlocklyMiddleLane({ 
  onBlockSelect, 
  isVisible = true,
  scrollToCategory 
}: BlocklyMiddleLaneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement>>({});
  const onBlockSelectRef = useRef(onBlockSelect);

  // Update the ref when onBlockSelect changes
  useEffect(() => {
    onBlockSelectRef.current = onBlockSelect;
  }, [onBlockSelect]);

  // Initialize custom blocks on component mount
  useEffect(() => {
    initializeCustomBlocks();
  }, []);

  // Create all blocks organized by category
  useEffect(() => {
    if (!containerRef.current) return;

    // Clear container
    containerRef.current.innerHTML = '';

    BLOCKLY_CATEGORIES.forEach((category) => {
      // Create category header
      const categoryHeader = document.createElement('div');
      categoryHeader.className = 'px-3 py-2 bg-gray-100 border-b border-gray-200 sticky top-0 z-10';
      categoryHeader.innerHTML = `
        <h4 class="text-sm font-bold text-gray-700" style="color: ${category.color}">
          ${category.name}
        </h4>
      `;
      categoryHeader.id = `category-${category.name}`;
      containerRef.current!.appendChild(categoryHeader);
      categoryRefs.current[category.name] = categoryHeader;

      // Create blocks container for this category
      const blocksContainer = document.createElement('div');
      blocksContainer.className = 'pb-3';
      containerRef.current!.appendChild(blocksContainer);

      category.blocks.forEach((blockType) => {
        try {
          // Create a block div
          const blockDiv = document.createElement('div');
          blockDiv.className = 'mx-2 my-2 cursor-pointer hover:bg-blue-50 transition-colors duration-150';
          blockDiv.style.border = 'none';
          blockDiv.style.minHeight = '40px';
          blocksContainer.appendChild(blockDiv);

          // Create a mini workspace for this block
          const miniWorkspace = Blockly.inject(blockDiv, FLYOUT_WORKSPACE_CONFIG);

          // Create the block
          const block = miniWorkspace.newBlock(blockType);
          block.initSvg();
          block.render();
          block.moveBy(5, 5);

          // Resize the workspace to fit the block
          const blockSize = block.getHeightWidth();
          const width = Math.max(blockSize.width + 20, 200);
          const height = blockSize.height + 20;
          
          blockDiv.style.width = `${width}px`;
          blockDiv.style.height = `${height}px`;
          Blockly.svgResize(miniWorkspace);

          // Add click handler
          blockDiv.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            onBlockSelectRef.current?.(blockType);
          });

          // Add drag support for dragging to main workspace
          blockDiv.draggable = true;
          blockDiv.addEventListener('dragstart', (e) => {
            e.dataTransfer?.setData('text/plain', blockType);
            e.dataTransfer!.effectAllowed = 'copy';
            blockDiv.style.opacity = '0.5';
          });

          blockDiv.addEventListener('dragend', () => {
            blockDiv.style.opacity = '1';
          });

          // Prevent the mini-workspace from interfering with drag and remove borders
          const svgElement = blockDiv.querySelector('svg');
          if (svgElement) {
            svgElement.style.pointerEvents = 'none';
            svgElement.style.border = 'none';
            svgElement.style.outline = 'none';
          }

        } catch (error) {
          console.warn(`Failed to create block: ${blockType}`, error);
        }
      });
    });

  }, []); // Remove onBlockSelect dependency to prevent re-rendering on block clicks

  // Handle scrolling to category when scrollToCategory prop changes
  useEffect(() => {
    if (!scrollToCategory || !containerRef.current) return;

    const categoryElement = categoryRefs.current[scrollToCategory];
    if (categoryElement) {
      const container = containerRef.current;
      
      // Get the category element's position relative to the container
      const categoryOffsetTop = categoryElement.offsetTop;
      
      // Scroll to that position
      container.scrollTo({
        top: categoryOffsetTop,
        behavior: 'smooth'
      });
    }
  }, [scrollToCategory]);

  if (!isVisible) {
    return (
      <div className="w-64 h-full bg-white border-r border-gray-200 flex items-center justify-center">
        <p className="text-gray-500 text-sm">Hidden</p>
      </div>
    );
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col" style={{ height: '500px' }}>
      <div className="p-3 bg-gray-50 border-b border-gray-200 flex-shrink-0">
        <h3 className="text-sm font-semibold text-gray-700">All Blocks</h3>
      </div>
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto"
        style={{ height: '450px' }}
      >
      </div>
    </div>
  );
}