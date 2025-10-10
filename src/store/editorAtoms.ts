import { atom } from 'jotai';
import { CanvasImage } from '@/editorTypes';

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