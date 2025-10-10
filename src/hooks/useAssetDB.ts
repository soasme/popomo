'use client';

import { useState, useCallback } from 'react';
import { Asset } from '@/editorTypes';

export function useAssetDB() {
  const [isLoading, setIsLoading] = useState(false);

  const openDB = useCallback((): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('PopomoAssets', 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('assets')) {
          const store = db.createObjectStore('assets', { keyPath: 'id' });
          store.createIndex('type', 'type', { unique: false });
        }
      };
    });
  }, []);

  const saveAssets = useCallback(async (assets: Asset[]): Promise<void> => {
    setIsLoading(true);
    try {
      const db = await openDB();
      const transaction = db.transaction(['assets'], 'readwrite');
      const store = transaction.objectStore('assets');
      
      for (const asset of assets) {
        await store.add(asset);
      }
    } finally {
      setIsLoading(false);
    }
  }, [openDB]);

  const loadAssets = useCallback(async (): Promise<Asset[]> => {
    setIsLoading(true);
    try {
      const db = await openDB();
      const transaction = db.transaction(['assets'], 'readonly');
      const store = transaction.objectStore('assets');
      
      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
      });
    } finally {
      setIsLoading(false);
    }
  }, [openDB]);

  const deleteAsset = useCallback(async (id: string): Promise<void> => {
    setIsLoading(true);
    try {
      const db = await openDB();
      const transaction = db.transaction(['assets'], 'readwrite');
      const store = transaction.objectStore('assets');
      await store.delete(id);
    } finally {
      setIsLoading(false);
    }
  }, [openDB]);

  return {
    saveAssets,
    loadAssets,
    deleteAsset,
    isLoading,
  };
}