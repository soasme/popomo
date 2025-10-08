'use client';

import CloseButton from './CloseButton';

interface Asset {
  id: string;
  name: string;
  type: 'image' | 'audio';
  size: number;
  data: ArrayBuffer;
  createdAt: Date;
}

interface AssetCardProps {
  asset: Asset;
  onDelete: (id: string) => void;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const createImagePreview = (data: ArrayBuffer): string => {
  const blob = new Blob([data], { type: 'image/png' });
  return URL.createObjectURL(blob);
};

const AssetIcon = ({ type }: { type: 'image' | 'audio' }) => {
  if (type === 'image') {
    return (
      <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
      </svg>
    );
  }
  
  return (
    <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
    </svg>
  );
};


export default function AssetCard({ asset, onDelete }: AssetCardProps) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      {asset.type === 'image' && (
        <div className="mb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={createImagePreview(asset.data)}
            alt={asset.name}
            className="w-full h-32 object-cover rounded-md border"
          />
        </div>
      )}
      
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2 min-w-0 flex-1">
          <AssetIcon type={asset.type} />
          <span className="text-sm font-medium truncate min-w-0" title={asset.name}>
            {asset.name}
          </span>
        </div>
        <CloseButton onClick={() => onDelete(asset.id)} title="Delete asset" />
      </div>
      
      <div className="text-xs text-gray-500 space-y-1">
        <div>Size: {formatFileSize(asset.size)}</div>
        <div>Type: {asset.type}</div>
        <div>Added: {asset.createdAt.toLocaleDateString()}</div>
      </div>
    </div>
  );
}

export type { Asset };