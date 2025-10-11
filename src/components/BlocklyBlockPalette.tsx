'use client';

import { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly';
import { BLOCKLY_CATEGORIES, FLYOUT_WORKSPACE_CONFIG } from './BlocklyConst';
import { initializeCustomBlocks } from './BlocklyCustomBlocks';

interface BlocklyBlockPaletteProps {
  onBlockSelect?: (blockType: string) => void;
  isVisible?: boolean;
}

export default function BlocklyBlockPalette({ 
  onBlockSelect, 
  isVisible = true 
}: BlocklyBlockPaletteProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement>>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Initialize custom blocks on component mount
  useEffect(() => {
    initializeCustomBlocks();
  }, []);

  // Create all blocks organized by category
  useEffect(() => {
    if (!containerRef.current) return;

    // Clear container
    containerRef.current.innerHTML = '';
    categoryRefs.current = {};

    // Create all categories and blocks
    const createBlocks = async () => {
      for (const category of BLOCKLY_CATEGORIES) {
        // Create category header
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'px-2 py-2 bg-gray-100 border-b border-gray-200 sticky top-0 z-10';
        categoryHeader.innerHTML = `
          <h3 class="text-xs font-semibold text-gray-700" style="color: ${category.color}">
            ${category.name}
          </h3>
        `;
        categoryHeader.id = `category-${category.name}`;
        containerRef.current!.appendChild(categoryHeader);
        categoryRefs.current[category.name] = categoryHeader;

        // Create blocks container for this category
        const blocksContainer = document.createElement('div');
        blocksContainer.className = 'pb-2';
        containerRef.current!.appendChild(blocksContainer);

        for (const blockType of category.blocks) {
          try {
            // Create a block div
            const blockDiv = document.createElement('div');
            blockDiv.className = 'mx-1 my-1 cursor-pointer hover:bg-blue-50 rounded-md transition-colors duration-150';
            blockDiv.style.minHeight = '40px';
            blockDiv.style.display = 'block';
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
            const width = Math.max(blockSize.width + 20, 180);
            const height = blockSize.height + 20;
            
            blockDiv.style.width = `${width}px`;
            blockDiv.style.height = `${height}px`;
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

            // Prevent the mini-workspace from interfering with drag
            const svgElement = blockDiv.querySelector('svg');
            if (svgElement) {
              svgElement.style.pointerEvents = 'none';
            }

            // Small delay to ensure proper rendering
            await new Promise(resolve => setTimeout(resolve, 10));

          } catch (error) {
            console.warn(`Failed to create block: ${blockType}`, error);
          }
        }
      }

      // Force scroll container to recalculate
      if (containerRef.current) {
        containerRef.current.style.height = 'auto';
        containerRef.current.scrollTop = 0;
        
        // Trigger a reflow
        void containerRef.current.offsetHeight;
      }
    };

    createBlocks();
  }, [onBlockSelect]);

  // Handle category navigation from left panel
  const scrollToCategory = (categoryName: string) => {
    const categoryElement = categoryRefs.current[categoryName];
    if (categoryElement && containerRef.current) {
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const categoryRect = categoryElement.getBoundingClientRect();
      
      // Calculate scroll position to bring category header to top
      const scrollTop = container.scrollTop + (categoryRect.top - containerRect.top);
      container.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
      
      setActiveCategory(categoryName);
    }
  };

  // Handle scroll to update active category
  const handleScroll = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    // Find which category is currently most visible
    let closestCategory = null;
    let closestDistance = Infinity;

    BLOCKLY_CATEGORIES.forEach((category) => {
      const categoryElement = categoryRefs.current[category.name];
      if (categoryElement) {
        const categoryRect = categoryElement.getBoundingClientRect();
        const distance = Math.abs(categoryRect.top - containerRect.top);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestCategory = category.name;
        }
      }
    });

    if (closestCategory !== activeCategory) {
      setActiveCategory(closestCategory);
    }
  };

  if (!isVisible) {
    return (
      <div className="flex h-full bg-white border-r border-gray-200">
        <div className="w-20 h-full bg-gray-50 border-r border-gray-200 flex items-center justify-center">
          <p className="text-gray-400 text-xs text-center">Hidden</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex">
      {/* Left Panel - Category Navigation */}
      <div className="w-16 h-full bg-gray-50 border-r border-gray-200 flex flex-col py-1 overflow-y-auto">
        {BLOCKLY_CATEGORIES.map((category) => (
          <button
            key={category.name}
            onClick={() => scrollToCategory(category.name)}
            className={`
              w-14 h-14 mx-1 mb-1 rounded-lg flex flex-col items-center justify-center text-xs font-medium
              transition-all duration-200 hover:scale-105 flex-shrink-0
              ${activeCategory === category.name 
                ? 'bg-white shadow-md border-2' 
                : 'bg-gray-100 hover:bg-gray-200'
              }
            `}
            style={{ 
              borderColor: activeCategory === category.name ? category.color : 'transparent',
              color: category.color 
            }}
          >
            <div 
              className="w-4 h-4 rounded mb-1"
              style={{ backgroundColor: category.color }}
            />
            <span className="text-gray-700 text-[8px] leading-tight text-center">
              {category.name}
            </span>
          </button>
        ))}
      </div>

      {/* Middle Lane - All Blocks Scrollable List */}
      <div className="flex-1 h-full bg-white flex flex-col">
        <div className="p-2 bg-gray-50 border-b border-gray-200 flex-shrink-0">
          <h3 className="text-xs font-semibold text-gray-700">All Blocks</h3>
        </div>
        <div 
          ref={containerRef}
          className="flex-1 overflow-y-auto p-1"
          onScroll={handleScroll}
        >
          {/* Blocks will be dynamically inserted here */}
        </div>
      </div>
    </div>
  );
}