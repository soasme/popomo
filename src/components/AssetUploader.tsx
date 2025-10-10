'use client';

import { useRef } from 'react';
import { Asset } from '@/editorTypes';

interface AssetUploaderProps {
  onUpload: (assets: Asset[]) => void;
  isUploading: boolean;
}

export default function AssetUploader({ onUpload, isUploading }: AssetUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const uploadedAssets: Asset[] = [];

    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/png') && !file.type.startsWith('audio/mpeg')) {
        alert(`File ${file.name} is not a PNG or MP3 file. Skipping.`);
        continue;
      }

      try {
        const arrayBuffer = await file.arrayBuffer();
        const asset: Asset = {
          id: crypto.randomUUID(),
          name: file.name,
          type: file.type.startsWith('image/') ? 'image' : 'audio',
          size: file.size,
          data: arrayBuffer,
          createdAt: new Date(),
        };
        uploadedAssets.push(asset);
      } catch (error) {
        console.error('Failed to upload file:', file.name, error);
        alert(`Failed to upload ${file.name}`);
      }
    }

    if (uploadedAssets.length > 0) {
      onUpload(uploadedAssets);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-4 border-b">
      <div className="flex items-center space-x-4">
        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.mp3"
          multiple
          onChange={handleFileUpload}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isUploading ? 'Uploading...' : 'Upload Files'}
        </button>
        <span className="text-sm text-gray-500">
          Supported formats: PNG images, MP3 audio
        </span>
      </div>
    </div>
  );
}