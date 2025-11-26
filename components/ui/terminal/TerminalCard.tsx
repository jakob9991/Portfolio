import React from 'react';

interface TerminalCardProps {
  children: React.ReactNode;
  hoverBorderColor?: string;
  className?: string;
}

export const TerminalCard: React.FC<TerminalCardProps> = ({
  children,
  hoverBorderColor = 'border-white/10',
  className = ''
}) => {
  return (
    <div className={`bg-[#0f1219]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden group hover:${hoverBorderColor} transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};
