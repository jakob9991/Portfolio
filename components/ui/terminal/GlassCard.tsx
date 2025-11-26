import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverEffect = true
}) => {
  return (
    <div className={`bg-[#0a0d14]/60 backdrop-blur-xl border border-white/5 rounded-lg p-4 ${hoverEffect ? 'hover:border-cyan-500/30' : ''} transition-all ${className}`}>
      {children}
    </div>
  );
};
