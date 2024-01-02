import classNames from 'classnames';
import { useMemo } from 'react';

export interface SpinnerProps {
  light?: boolean;
  size?: 'large' | 'medium' | 'small';
}

export const Spinner: React.FC<SpinnerProps> = ({
  light = false,
  size = 'medium',
}): JSX.Element => {
  const resolvedSize = useMemo(() => {
    if (size === 'small') return '0.75rem';
    if (size === 'medium') return '0.87rem';
    if (size === 'large') return '1rem';
  }, [size]);

  const colorClass = useMemo(() => (light ? 'text-white' : 'text-dark'), [light]);

  return (
    <svg
      className={classNames('-ml-1 mr-3 animate-spin', colorClass)}
      fill="none"
      viewBox="0 0 24 24"
      width={resolvedSize}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        className="opacity-75"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        fill="currentColor"
      ></path>
    </svg>
  );
};
