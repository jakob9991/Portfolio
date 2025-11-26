import React from 'react';

interface TerminalPromptProps {
  command?: string;
  args?: string[];
  className?: string;
}

export const TerminalPrompt: React.FC<TerminalPromptProps> = ({
  command,
  args = [],
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-2 font-mono text-sm ${className}`}>
      <span className="text-green-400">❯</span>
      {command && <span className="text-gray-400">{command}</span>}
      {args.map((arg, i) => (
        <span key={i} className="text-cyan-400">{arg}</span>
      ))}
    </div>
  );
};
