import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface InstallProgressProps {
  items: Array<{
    icon: React.ReactNode;
    name: string;
    version: string;
  }>;
  className?: string;
}

export const InstallProgress: React.FC<InstallProgressProps> = ({ items, className = '' }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="install-line flex items-center gap-3 text-sm">
          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
          <span className="text-gray-600">{index + 1}</span>
          <span className="text-gray-500">└─</span>
          <span className="text-2xl">{item.icon}</span>
          <span className="text-white">{item.name}</span>
          <span className="text-cyan-400">{item.version}</span>
        </div>
      ))}
    </div>
  );
};
