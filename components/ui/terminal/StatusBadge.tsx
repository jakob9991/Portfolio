import React from 'react';

interface StatusBadgeProps {
  status: 'online' | 'active' | 'running' | 'completed' | 'archived' | 'reachable';
  label?: string;
  animated?: boolean;
  className?: string;
}

const statusConfig = {
  online: { color: 'green', text: 'ONLINE' },
  active: { color: 'green', text: 'ACTIVE' },
  running: { color: 'green', text: 'RUNNING' },
  reachable: { color: 'green', text: 'REACHABLE' },
  completed: { color: 'emerald', text: 'COMPLETED' },
  archived: { color: 'gray', text: 'ARCHIVED' }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  animated = true,
  className = ''
}) => {
  const config = statusConfig[status];
  const displayText = label || config.text;

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-${config.color}-500/5 border border-${config.color}-500/20 ${className}`}>
      {animated ? (
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${config.color}-400 opacity-75`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 bg-${config.color}-500`}></span>
        </span>
      ) : (
        <span className={`w-2 h-2 rounded-full bg-${config.color}-500`}></span>
      )}
      <span className={`text-[10px] font-mono text-${config.color}-400 font-bold uppercase tracking-wider`}>
        {displayText}
      </span>
    </div>
  );
};
