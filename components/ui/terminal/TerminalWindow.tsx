import React from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

interface TerminalWindowProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  glowOnHover?: boolean;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  children,
  title,
  className = '',
  glowOnHover = false
}) => {
  return (
    <div className={`bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl shadow-2xl overflow-hidden ${glowOnHover ? 'group' : ''} ${className}`}>
      {glowOnHover && (
        <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-sky-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"></div>
      )}

      {/* Terminal Header */}
      <div className="h-10 bg-[#151921] border-b border-white/5 flex items-center px-4 justify-between relative">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        {title && (
          <div className="text-[10px] font-mono text-gray-500 flex items-center gap-2">
            <TerminalIcon className="w-3 h-3" />
            {title}
          </div>
        )}
        <div className="w-10"></div>
      </div>

      {/* Content */}
      {children}
    </div>
  );
};
