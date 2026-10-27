import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
}) => {
  const isLight = variant === 'light';

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Brand Emblem */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-950 p-2 shadow-md shadow-emerald-900/20 ring-1 ring-emerald-500/30 shrink-0`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white"
        >
          {/* Shield Boundary */}
          <path
            d="M12 2L4 5V11C4 16.5 7.4 21.6 12 23C16.6 21.6 20 16.5 20 11V5L12 2Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-emerald-300"
          />
          {/* Leaf & Air Flow */}
          <path
            d="M12 7C9.5 9.5 9 13.5 12 16.5C15 13.5 14.5 9.5 12 7Z"
            fill="currentColor"
            className="text-emerald-400"
          />
          <path
            d="M12 11V16.5"
            stroke="#064e3b"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Pure droplet highlight */}
          <circle cx="12" cy="7.5" r="1.25" fill="#ffffff" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center">
          <span
            className={`font-extrabold tracking-tight font-sans ${titleSizes[size]} ${
              isLight ? 'text-white' : 'text-slate-900'
            }`}
          >
            Enviro<span className="text-emerald-600">Tech</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5 -mt-0.5">
          <span
            className={`text-[10px] font-bold tracking-widest uppercase ${
              isLight ? 'text-emerald-300' : 'text-emerald-700'
            }`}
          >
            Mold Pros
          </span>
          <span
            className={`text-[9px] ${
              isLight ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            • Peterborough, ON
          </span>
        </div>
      </div>
    </div>
  );
};
