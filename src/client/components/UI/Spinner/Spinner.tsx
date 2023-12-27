import { useMemo } from 'react';

export interface SpinnerProps {
  size?: 'large' | 'medium' | 'small';
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'medium' }): JSX.Element => {
  const resolvedSize = useMemo(() => {
    if (size === 'small') return '12px';
    if (size === 'medium') return '14px';
    if (size === 'large') return '16px';
  }, [size]);

  return (
    <svg
      className="text-gray aspect-square animate-spin cursor-wait overflow-hidden"
      height={resolvedSize}
      viewBox={'0 0 24 24'}
      width={resolvedSize}
    >
      <g id="spinner">
        <circle
          cx="12"
          cy="12"
          fill="white"
          fillOpacity={0.2}
          r="10"
          stroke="white"
          strokeOpacity={0.4}
          strokeWidth="4"
        />
        <path
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          fill="gray"
          fillOpacity={0.8}
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
};
