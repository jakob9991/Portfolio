import React from 'react';

interface CodeOutputProps {
  code: string;
  label?: string;
  className?: string;
}

export const CodeOutput: React.FC<CodeOutputProps> = ({
  code,
  label = 'STDOUT:',
  className = ''
}) => {
  const lines = code.split('\n');

  return (
    <div className={`bg-[#0a0a0a] rounded-lg border border-white/5 p-4 group-hover:border-green-500/20 transition-colors ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] text-gray-600">{label}</span>
        <div className="h-px flex-1 bg-white/5"></div>
      </div>
      <div className="font-mono text-xs text-green-500/70 space-y-1">
        {lines.map((line, i) => (
          <div key={i} className="code-line flex gap-2">
            <span className="text-gray-700">{i + 1}</span>
            <span className="text-gray-500">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
