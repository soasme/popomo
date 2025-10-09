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

// Props interface for components that need to select code objects
export interface CodeObjectSelectorProps {
  selectedCodeObjectId: string;
  onSelectionChange: (id: string) => void;
  availableCodeObjects: AnyCodeObject[];
}

// Props for the main code panel
export interface CodePanelProps {
  isVisible: boolean;
}