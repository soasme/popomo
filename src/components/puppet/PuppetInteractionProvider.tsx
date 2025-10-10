import PuppetContextMenu from './PuppetContextMenu';
import PuppetRenameManager from './PuppetRenameManager';

interface PuppetInteractionProviderProps {
  children?: React.ReactNode;
}

export default function PuppetInteractionProvider({ children }: PuppetInteractionProviderProps) {
  const { handleRename, RenameDialog } = PuppetRenameManager();

  return (
    <>
      {children}
      <PuppetContextMenu onRename={handleRename} />
      {RenameDialog}
    </>
  );
}