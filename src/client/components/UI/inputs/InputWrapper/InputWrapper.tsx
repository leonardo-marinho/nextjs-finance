import classNames from 'classnames';
import { FieldError } from 'react-hook-form';

export interface InputWrapperProps {
  error?: FieldError;
  label: string;
  maxLength?: number;
  required?: boolean;
  valueLength?: number;
}

export const InputWrapper: React.FC<React.PropsWithChildren<InputWrapperProps>> = ({
  children,
  error,
  label,
  maxLength,
  required,
  valueLength,
}): JSX.Element => {
  return (
    <div className="flex flex-col">
      <label className="field-label mt-1 flex-1 justify-self-end text-base text-gray-500">
        {label} {required && '*'}
      </label>
      {children}
      <div className={classNames('flex justify-between text-right')}>
        {error && <p className="ml-1 mr-5 mt-1 text-sm text-red-600">{error.message}</p>}
        {maxLength && maxLength > 0 && (
          <p className="mt-1 flex-1 justify-self-end text-xs text-gray-500">{`${
            valueLength || 0
          }/${maxLength}`}</p>
        )}
      </div>
    </div>
  );
};
