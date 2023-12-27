import classNames from 'classnames';
import { useMemo } from 'react';
import { Icon } from 'react-feather';

import { Spinner } from '../Spinner/Spinner';

export interface ButtonProps {
  color?: 'primary' | 'secondary';
  fill?: boolean;
  icon?: Icon;
  isDisabled?: boolean;
  isLoading?: boolean;
  label?: string;
  onClick?: () => void;
  size?: 'large' | 'medium' | 'small';
  variant?: 'filled' | 'outlined' | 'text';
}

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  color = 'primary',
  fill = false,
  icon,
  isDisabled = false,
  isLoading = false,
  label = '',
  onClick,
  size = 'medium',
  variant = 'filled',
}): JSX.Element => {
  const colorClassNames = useMemo(() => {
    if (color === 'primary') {
      if (variant === 'filled') {
        return 'bg-green-500 text-white';
      } else if (variant === 'outlined' || variant === 'text') {
        return 'text-green-500';
      }
    } else if (color === 'secondary') {
      return 'bg-gray-200 text-gray-500';
    }
  }, [color, variant]);

  const cursorClassNames = useMemo(() => {
    if (isDisabled) {
      return 'cursor-not-allowed';
    } else if (isLoading) {
      return 'cursor-wait';
    } else if (!onClick) {
      return 'cursor-default';
    } else {
      return 'cursor-pointer';
    }
  }, [isDisabled, isLoading, onClick]);

  const disabledClassNames = useMemo(() => {
    if (isDisabled) {
      return 'opacity-50';
    }
  }, [isDisabled]);

  const fillClassNames = useMemo(() => {
    if (fill) {
      return 'w-full';
    }
  }, [fill]);

  const iconSize = useMemo(() => {
    if (size === 'small') {
      return '16px';
    } else if (size === 'medium') {
      return '18px';
    } else {
      return '20px';
    }
  }, [size]);

  const loadingClassNames = useMemo(() => {
    if (isLoading) {
      return 'opacity-75';
    }
  }, [isLoading]);

  const sizeClassNames = useMemo(() => {
    if (size === 'large') {
      return 'py-1.5 px-4 text-ls';
    } else if (size === 'medium') {
      return 'py-1 px-4 text-sm';
    } else {
      return 'py-1 px-3 text-xs';
    }
  }, [size]);

  const variantClassNames = useMemo(() => {
    if (variant === 'filled') {
      return 'text-white';
    } else if (variant === 'outlined') {
      return '!bg-transparent border border-gray-200 font-semibold';
    } else {
      return '!bg-transparent font-semibold uppercase';
    }
  }, [variant]);

  const IconElement = icon!;

  return (
    <div
      className={classNames(
        'flex w-fit select-none items-center justify-center rounded-2xl tracking-wide',
        colorClassNames,
        cursorClassNames,
        disabledClassNames,
        fillClassNames,
        loadingClassNames,
        sizeClassNames,
        variantClassNames,
      )}
    >
      <div
        className={classNames('flex items-center justify-center gap-1', {
          ['gap-2']: size === 'large',
        })}
      >
        {isLoading && <Spinner size={size} />}
        {!!icon && !isLoading && <IconElement size={iconSize} />}
        {children || (label && <span>{children || label}</span>)}
      </div>
    </div>
  );
};