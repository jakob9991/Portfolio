import React from 'react';

interface TerminalHeaderProps {
  dots?: 'small' | 'normal';
  title?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  dots = 'normal',
  title,
  className = '',
  style,
}) => {
  const dotSize = dots === 'small' ? 'w-2.5 h-2.5' : 'w-3 h-3';

  return (
    <div className={`h-10 bg-[#151921] border-b border-white/5 flex items-center px-4 justify-between ${className}`} style={style}>
      <div className="flex gap-2">
        <div className={`${dotSize} rounded-full bg-red-500/80`}></div>
        <div className={`${dotSize} rounded-full bg-yellow-500/80`}></div>
        <div className={`${dotSize} rounded-full bg-green-500/80`}></div>
      </div>
      {title && (
        <div className="text-[10px] font-mono text-gray-500 flex items-center gap-2">
          {title}
        </div>
      )}
      <div className="w-10"></div>
    </div>
  );
};
