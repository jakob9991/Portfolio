import React from 'react';
import { TerminalHeader } from './TerminalHeader';
import { TerminalPrompt } from './TerminalPrompt';

interface SectionHeaderProps {
  terminalTitle: React.ReactNode;
  command?: string;
  args?: string[];
  title: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  terminalTitle,
  command,
  args = [],
  title,
  subtitle,
  className = ''
}) => {
  return (
    <div className={`bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden ${className}`}>
      <TerminalHeader title={terminalTitle} />

      <div className="p-6 md:p-8 font-mono">
        {command && <TerminalPrompt command={command} args={args} className="mb-4" />}

        <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-4">
          {title}
        </h2>

        {subtitle && (
          <p className="text-gray-400 text-sm leading-relaxed">
            <span className="text-gray-600">#</span> {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
