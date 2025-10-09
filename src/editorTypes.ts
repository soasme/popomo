// ================================
// CODE OBJECTS
// ================================

// Base interface for code objects that can be controlled by code blocks
export interface CodeObject {
  id: string;
  name: string;
  type: string;
}

// Camera is a special type of code object
export interface Camera extends CodeObject {
  type: 'camera';
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  zoom: number;
}

// Puppet is another type of code object  
export interface Puppet extends CodeObject {
  type: 'puppet';
  position: { x: number; y: number };
  rotation: number;
  scale: number;
  assetId?: string;
  visible: boolean;
}

// Union type for all possible code objects
export type AnyCodeObject = Camera | Puppet;

// ================================
// ASSETS
// ================================

export interface Asset {
  id: string;
  name: string;
  type: 'image' | 'audio';
  size: number;
  data: ArrayBuffer;
  createdAt: Date;
}

// ================================
// PROJECT SETTINGS
// ================================

export type Resolution = '9:16' | '16:9' | '1:1';
export type FPS = 12 | 24 | 30 | 60;

export interface ProjectConfig {
  projectName: string;
  resolution: Resolution;
  fps: FPS;
  videoLength: string;
}

// ================================
// COMPONENT PROPS
// ================================

// Main editor panels
export type ActivePanel = 'settings' | 'assets' | 'blockly' | null;

export interface FloatingPanelProps {
  onHelpOpen?: () => void;
}

export interface CodePanelProps {
  isVisible: boolean;
}

export interface BlocklyWorkspaceProps {
  isVisible: boolean;
}

export interface AssetsPanelProps {
  isActive: boolean;
}

// Asset related components
export interface AssetCardProps {
  asset: Asset;
  onDelete: (id: string) => void;
}

// Canvas related components
export interface InfiniteCanvasProps {
  width: number;
  height: number;
}

// Dialog components
export interface HelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

// Code object selector
export interface CodeObjectSelectorProps {
  selectedCodeObjectId: string;
  onSelectionChange: (id: string) => void;
  availableCodeObjects: AnyCodeObject[];
}

// ================================
// BLOCKLY COMPONENT PROPS
// ================================

export interface BlocklyCategory {
  name: string;
  color: string;
}

export interface BlocklyNavbarProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string) => void;
  categories?: BlocklyCategory[];
}

export interface BlocklyBlocksProps {
  selectedCategory: string | null;
  onBlockSelect?: (blockType: string) => void;
  isVisible?: boolean;
}

export interface BlocklyProgramingAreaProps {
  isVisible: boolean;
  onWorkspaceChange?: (event: any) => void;
  selectedBlock?: string;
}