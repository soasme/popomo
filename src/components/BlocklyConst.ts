// ================================
// BLOCKLY CONSTANTS AND CONFIGURATION
// ================================

export interface BlocklyCategory {
  name: string;
  color: string;
  blocks: string[];
}

// Category definitions with their blocks and colors
export const BLOCKLY_CATEGORIES: BlocklyCategory[] = [
  {
    name: 'Logic',
    color: '#5C81A6',
    blocks: ['controls_if', 'logic_compare', 'logic_operation', 'logic_negate', 'logic_boolean']
  },
  {
    name: 'Loops',
    color: '#5CA65C',
    blocks: ['controls_repeat_ext', 'controls_whileUntil', 'controls_for']
  },
  {
    name: 'Math',
    color: '#5C68A6',
    blocks: ['math_number', 'math_arithmetic', 'math_single']
  },
  {
    name: 'Text',
    color: '#5CA68D',
    blocks: ['text', 'text_join', 'text_length']
  },
  {
    name: 'Variables',
    color: '#A55B80',
    blocks: ['variables_get', 'variables_set']
  },
  {
    name: 'Functions',
    color: '#995BA5',
    blocks: ['procedures_defnoreturn', 'procedures_callnoreturn']
  },
  {
    name: 'Events',
    color: '#FFAB19',
    blocks: ['event_when_program_starts', 'event_when_cue_received', 'event_emit_cue', 'event_wait_for_cue']
  },
  {
    name: 'Timing',
    color: '#FF6B6B',
    blocks: ['wait_seconds', 'at_timestamp']
  }
];

// Helper function to get blocks for a specific category
export const getBlocksForCategory = (categoryName: string): string[] => {
  const category = BLOCKLY_CATEGORIES.find(cat => cat.name === categoryName);
  return category ? category.blocks : [];
};

// Helper function to get category by name
export const getCategoryByName = (categoryName: string): BlocklyCategory | undefined => {
  return BLOCKLY_CATEGORIES.find(cat => cat.name === categoryName);
};

// Generate full Blockly toolbox configuration
export const generateBlocklyToolbox = () => {
  return {
    kind: 'categoryToolbox',
    contents: BLOCKLY_CATEGORIES.map(category => ({
      kind: 'category',
      name: category.name,
      colour: category.color,
      contents: category.blocks.map(blockType => ({
        kind: 'block',
        type: blockType
      }))
    }))
  };
};

// Default workspace configuration
export const DEFAULT_WORKSPACE_CONFIG = {
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
  },
  trashcan: true,
  scrollbars: true,
};

// Flyout workspace configuration (for block palette)
export const FLYOUT_WORKSPACE_CONFIG = {
  toolbox: null,
  readOnly: true,
  scrollbars: false,
  zoom: { controls: false, wheel: false },
  trashcan: false,
};