'use client';

import { useCallback, useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import Konva from 'konva';
import { Asset, CanvasImage, InfiniteCanvasUploaderProps } from '@/editorTypes';
import { useAssetDB } from '@/hooks/useAssetDB';
import { canvasImagesAtom, activePuppetAtom } from '@/store/editorAtoms';

export default function InfiniteCanvasUploader({ 
  stageRef
}: InfiniteCanvasUploaderProps) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [canvasImages, setCanvasImages] = useAtom(canvasImagesAtom);
  const [, setActivePuppet] = useAtom(activePuppetAtom);
  const { saveAssets, loadAssets, deleteAsset } = useAssetDB();

  useEffect(() => {
    const loadExistingAssets = async () => {
      try {
        const loadedAssets = await loadAssets();
        setAssets(loadedAssets);
      } catch (error) {
        console.error('Failed to load assets:', error);
      }
    };
    loadExistingAssets();
  }, [loadAssets]);



  useEffect(() => {
    const handleGlobalDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleGlobalDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      const stage = stageRef.current;
      if (!stage) return;

      const files = Array.from(e.dataTransfer?.files || []);
      const pngFiles = files.filter(file => file.type === 'image/png');

      if (pngFiles.length === 0) {
        return;
      }

      const stageContainer = stage.container();
      const stageRect = stageContainer.getBoundingClientRect();
      
      if (e.clientX >= stageRect.left && e.clientX <= stageRect.right && 
          e.clientY >= stageRect.top && e.clientY <= stageRect.bottom) {
        
        const stagePos = {
          x: e.clientX - stageRect.left,
          y: e.clientY - stageRect.top
        };

        const stageTransform = stage.getAbsoluteTransform().copy();
        stageTransform.invert();
        const canvasPos = stageTransform.point(stagePos);

        handleDropFiles(pngFiles, canvasPos);
      }
    };

    document.addEventListener('dragover', handleGlobalDragOver);
    document.addEventListener('drop', handleGlobalDrop);

    return () => {
      document.removeEventListener('dragover', handleGlobalDragOver);
      document.removeEventListener('drop', handleGlobalDrop);
    };
  }, [stageRef, assets, saveAssets, deleteAsset]);

  const handleDropFiles = async (pngFiles: File[], canvasPos: { x: number; y: number }) => {
    const assetsToSave: Asset[] = [];

    for (let index = 0; index < pngFiles.length; index++) {
      const file = pngFiles[index];
      
      try {
        const arrayBuffer = await file.arrayBuffer();
        
        const existingAsset = assets.find(asset => asset.name === file.name);
        if (existingAsset) {
          await deleteAsset(existingAsset.id);
          setAssets(prev => prev.filter(asset => asset.id !== existingAsset.id));
        }

        const assetId = crypto.randomUUID();
        const asset: Asset = {
          id: assetId,
          name: file.name,
          type: 'image',
          size: file.size,
          data: arrayBuffer,
          createdAt: new Date(),
        };

        assetsToSave.push(asset);

        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const canvasImageId = crypto.randomUUID();
            const newCanvasImage: CanvasImage = {
              id: canvasImageId,
              assetId: assetId,
              image: img,
              x: canvasPos.x + (index * 20),
              y: canvasPos.y + (index * 20),
            };
            
            setCanvasImages(prev => [...prev, newCanvasImage]);
            setActivePuppet(canvasImageId);
          };
          img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
        
      } catch (error) {
        console.error('Failed to process file:', file.name, error);
      }
    }

    if (assetsToSave.length > 0) {
      try {
        await saveAssets(assetsToSave);
        setAssets(prev => [...prev, ...assetsToSave]);
      } catch (error) {
        console.error('Failed to save assets:', error);
      }
    }
  };

  return null;
}