import classNames from 'classnames';
import { useMemo } from 'react';
import { Icon } from 'react-feather';

export interface TagProps {
  color?: 'error' | 'secondary' | 'success';
  icon?: Icon;
  label?: string;
  size?: 'large' | 'medium' | 'small';
}

export const Tag: React.FC<React.PropsWithChildren<TagProps>> = ({
  children,
  color = 'success',
  icon,
  label,
  size,
}): JSX.Element => {
  const colorClassNames = useMemo(() => {
    if (color === 'success') {
      return 'bg-green-500 text-white';
    } else if (color === 'secondary') {
      return 'bg-gray-200 text-gray-500';
    } else if (color === 'error') {
      return 'bg-red-500 text-white';
    }
  }, [color]);

  const iconSize = useMemo(() => {
    if (size === 'small') {
      return '0.75rem';
    } else if (size === 'medium') {
      return '0.87rem';
    } else {
      return '1rem';
    }
  }, [size]);

  const sizeClassNames = useMemo(() => {
    if (size === 'large') {
      return 'py-1 px-6 text-ls';
    } else if (size === 'medium') {
      return 'py-1 px-5 text-sm';
    } else {
      return 'py-1 px-5 text-xs';
    }
  }, [size]);

  const IconElement = icon!;

  return (
    <div
      className={classNames(
        'flex w-fit select-none items-center justify-center rounded-2xl tracking-wide',
        colorClassNames,
        sizeClassNames,
      )}
    >
      <div
        className={classNames('flex items-center justify-center gap-1', {
          ['gap-2']: size === 'large',
        })}
      >
        {!!icon && <IconElement size={iconSize} />}
        {children || (label && <span>{children || label}</span>)}
      </div>
    </div>
  );
};
