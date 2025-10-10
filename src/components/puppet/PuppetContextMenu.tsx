import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { contextMenuAtom, activePuppetAtom } from '@/store/editorAtoms';
import ContextMenu from '../ContextMenu';

interface PuppetContextMenuProps {
  onRename: (puppetId: string) => void;
}

export default function PuppetContextMenu({ onRename }: PuppetContextMenuProps) {
  const [contextMenu, setContextMenu] = useAtom(contextMenuAtom);
  const [activePuppet] = useAtom(activePuppetAtom);

  useEffect(() => {
    if (!activePuppet) {
      setContextMenu({ visible: false, x: 0, y: 0, puppetId: null });
    }
  }, [activePuppet, setContextMenu]);

  const contextMenuItems = [
    {
      label: 'Rename...',
      onClick: () => {
        if (contextMenu.puppetId) {
          onRename(contextMenu.puppetId);
        }
      },
    },
  ];

  return (
    <ContextMenu
      x={contextMenu.x}
      y={contextMenu.y}
      visible={contextMenu.visible}
      onClose={() => setContextMenu({ visible: false, x: 0, y: 0, puppetId: null })}
      items={contextMenuItems}
    />
  );
}