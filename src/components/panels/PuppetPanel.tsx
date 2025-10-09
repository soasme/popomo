'use client';

import { useState, useEffect } from 'react';

interface Puppet {
  id: string;
  name: string;
  type: string;
}

interface PuppetPanelProps {
  isActive: boolean;
}

export default function PuppetPanel({ isActive }: PuppetPanelProps) {
  const [puppets, setPuppets] = useState<Puppet[]>([]);

  useEffect(() => {
    if (isActive) {
      // Load puppets when panel becomes active
      // For now, start with empty list
      setPuppets([]);
    }
  }, [isActive]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-auto p-4">
        {puppets.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No puppets created yet. Puppets will be displayed here when available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {puppets.map((puppet) => (
              <div
                key={puppet.id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium text-gray-900">{puppet.name}</h3>
                <p className="text-sm text-gray-600">{puppet.type}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}