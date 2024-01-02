import classNames from 'classnames';
import { HTMLProps } from 'react';
import { Search } from 'react-feather';

import { Spinner } from '../../Spinner/Spinner';
import { InputWrapper, InputWrapperProps } from '../InputWrapper/InputWrapper';

export interface TextInputProps
  extends InputWrapperProps,
    Pick<HTMLProps<HTMLInputElement>, 'type'> {
  disabled?: boolean;
  invalid?: boolean;
  isLoading?: boolean;
  onChange?: (value: string) => void;
  value?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  disabled,
  invalid,
  isLoading,
  onChange,
  type,
  value,
  ...inputProps
}): JSX.Element => {
  return (
    <InputWrapper {...inputProps}>
      <div className="relative w-full focus-within:outline-none">
        {(type === 'search' || type === undefined) && (
          <div className="pointer-events-none absolute inset-y-0 flex items-center px-2">
            <Search color="#4B5563" size={16} />
          </div>
        )}
        <input
          autoComplete="off"
          className={classNames(
            'block w-full bg-gray-100 p-2 text-left text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-transparent',
            { 'pl-9': type === 'search' || type === undefined },
            { 'border-red-300 text-red-900 focus:border-red-500': invalid },
            { 'bg-gray-100': disabled },
          )}
          disabled={disabled}
          onChange={(event) => onChange?.(event.target.value)}
          type={type}
          value={value}
        />
        {isLoading && (
          <div className="absolute bottom-2.5 right-4">
            <Spinner size={'large'} />
          </div>
        )}
      </div>
    </InputWrapper>
  );
};
