import React from 'react';

function MicIcon({ width = 24, height = 24, className = '' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <circle cx="12" cy="12" r="12" fill="currentColor" opacity="1" />
      <path
        d="M12 7C10.9 7 10 7.9 10 9V13C10 14.1 10.9 15 12 15C13.1 15 14 14.1 14 13V9C14 7.9 13.1 7 12 7Z"
        fill={className.includes('mic-icon') ? 'currentColor' : '#FFFFFF'}
      />
      <path
        d="M16 11C16 13.2091 14.2091 15 12 15C9.79086 15 8 13.2091 8 11H7C7 13.7614 9.23858 16 12 16C14.7614 16 17 13.7614 17 11H16Z"
        fill={className.includes('mic-icon') ? 'currentColor' : '#FFFFFF'}
      />
      <rect
        x="11.5"
        y="16"
        width="1"
        height="2"
        fill={className.includes('mic-icon') ? 'currentColor' : '#FFFFFF'}
      />
    </svg>
  );
}

export default MicIcon;
