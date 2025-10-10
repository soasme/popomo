import { atom } from 'jotai';
import { CanvasImage, Puppet } from '@/editorTypes';

export const dimensionsAtom = atom({
  width: 0,
  height: 0,
});

export const isHelpOpenAtom = atom(false);

export const canvasOffsetAtom = atom({ x: 0, y: 0 });

export const canvasScaleAtom = atom(1);

export const selectedToolAtom = atom<string | null>(null);

export const currentProjectAtom = atom<string | null>(null);

export const canvasImagesAtom = atom<CanvasImage[]>([]);

export const activePuppetAtom = atom<string | null>(null);

export const puppetsAtom = atom<Puppet[]>([]);

export const contextMenuAtom = atom<{
  visible: boolean;
  x: number;
  y: number;
  puppetId: string | null;
}>({
  visible: false,
  x: 0,
  y: 0,
  puppetId: null,
});

export const renameDialogAtom = atom<{
  isOpen: boolean;
  puppetId: string | null;
  currentName: string;
}>({
  isOpen: false,
  puppetId: null,
  currentName: '',
});