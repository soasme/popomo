// Import all custom block definitions
import './timing';
import './events';

// Initialize custom blocks (the import statements above register them automatically)
export const initializeCustomBlocks = () => {
  // Blocks are registered by importing the files above
  console.log('Custom Blockly blocks loaded');
};