'use client';

import { useState, useEffect } from 'react';
import AssetCard, { type Asset } from '../AssetCard';
import AssetUploader from '../AssetUploader';
import { useAssetDB } from '@/hooks/useAssetDB';

interface AssetsPanelProps {
  isActive: boolean;
}

export default function AssetsPanel({ isActive }: AssetsPanelProps) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { saveAssets, loadAssets, deleteAsset } = useAssetDB();

  useEffect(() => {
    if (isActive) {
      handleLoadAssets();
    }
  }, [isActive]);

  const handleLoadAssets = async () => {
    try {
      const loadedAssets = await loadAssets();
      setAssets(loadedAssets);
    } catch (error) {
      console.error('Failed to load assets:', error);
    }
  };

  const handleUpload = async (newAssets: Asset[]) => {
    setIsUploading(true);
    try {
      await saveAssets(newAssets);
      setAssets(prev => [...prev, ...newAssets]);
    } catch (error) {
      console.error('Failed to save assets:', error);
      alert('Failed to save some assets');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAsset(id);
      setAssets(prev => prev.filter(asset => asset.id !== id));
    } catch (error) {
      console.error('Failed to delete asset:', error);
      alert('Failed to delete asset');
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <AssetUploader onUpload={handleUpload} isUploading={isUploading} />
      <div className="flex-1 overflow-auto p-4">
        {assets.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No assets uploaded yet. Click "Upload Files" to add PNG images or MP3 audio files.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assets.map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}