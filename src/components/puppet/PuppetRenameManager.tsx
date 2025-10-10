import { useAtom } from 'jotai';
import { renameDialogAtom, puppetsAtom, canvasImagesAtom, contextMenuAtom } from '@/store/editorAtoms';
import { Puppet } from '@/editorTypes';
import RenameDialog from '../RenameDialog';

export default function PuppetRenameManager() {
  const [renameDialog, setRenameDialog] = useAtom(renameDialogAtom);
  const [puppets, setPuppets] = useAtom(puppetsAtom);
  const [canvasImages] = useAtom(canvasImagesAtom);
  const [, setContextMenu] = useAtom(contextMenuAtom);

  const handleRename = (puppetId: string) => {
    const puppet = puppets.find(p => p.id === puppetId);
    const currentName = puppet?.name || `Puppet ${puppetId.slice(0, 8)}`;
    
    setRenameDialog({
      isOpen: true,
      puppetId,
      currentName,
    });
    setContextMenu({ visible: false, x: 0, y: 0, puppetId: null });
  };

  const handleRenamePuppet = (newName: string) => {
    if (!renameDialog.puppetId) return;
    
    const puppetId = renameDialog.puppetId;
    
    setPuppets(prevPuppets => {
      const existingPuppet = prevPuppets.find(p => p.id === puppetId);
      if (existingPuppet) {
        return prevPuppets.map(p => 
          p.id === puppetId 
            ? { ...p, name: newName }
            : p
        );
      } else {
        const canvasImage = canvasImages.find(img => img.id === puppetId);
        if (canvasImage) {
          const newPuppet: Puppet = {
            id: puppetId,
            name: newName,
            type: 'puppet' as const,
            position: { x: canvasImage.x, y: canvasImage.y },
            rotation: 0,
            scale: 1,
            assetId: canvasImage.assetId,
            visible: true,
          };
          return [...prevPuppets, newPuppet];
        }
      }
      return prevPuppets;
    });
  };

  return {
    handleRename,
    RenameDialog: (
      <RenameDialog
        isOpen={renameDialog.isOpen}
        currentName={renameDialog.currentName}
        onClose={() => setRenameDialog({ isOpen: false, puppetId: null, currentName: '' })}
        onRename={handleRenamePuppet}
      />
    ),
  };
}