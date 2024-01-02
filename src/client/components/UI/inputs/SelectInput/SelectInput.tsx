import classNames from 'classnames';
import { HTMLProps, useMemo, useState } from 'react';
import { Check, ChevronDown } from 'react-feather';

import { Spinner } from '../../Spinner/Spinner';
import { Tag } from '../../Tag/Tag';
import { InputWrapper, InputWrapperProps } from '../InputWrapper/InputWrapper';

export type OptionType<TValue = string> = {
  label: string;
  value: TValue;
};

export interface SelectInputOptionProps<TValue = string> {
  children?: string;
  label?: string;
  onClick?: (value?: string, label?: string) => void;
  selected?: boolean;
  showMultipleSelectedIcon?: boolean;
  value?: TValue;
}

export const SelectInputOption: React.FC<SelectInputOptionProps> = ({
  children,
  label = '',
  onClick,
  selected,
  showMultipleSelectedIcon,
  value,
}) => {
  const resolvedLabel = useMemo(() => children || label, [children, label]);

  return (
    <span
      className={classNames(
        'box-content flex h-5 cursor-pointer justify-between p-2 align-middle text-gray-500 hover:bg-gray-200',
        { 'font-bold text-gray-700': selected },
      )}
      onClick={() => onClick?.(value, resolvedLabel)}
    >
      {resolvedLabel} {selected && showMultipleSelectedIcon && <Check size={16} />}
    </span>
  );
};

export interface SelectInputProps<TValue = string>
  extends InputWrapperProps,
    Pick<HTMLProps<HTMLInputElement>, 'type'> {
  disabled?: boolean;
  invalid?: boolean;
  isLoading?: boolean;
  onSelect?: (value: string) => void;
  options?: OptionType<TValue>[];
  value?: TValue | TValue[];
}

export const SelectInput: React.FC<SelectInputProps> = ({
  disabled,
  invalid,
  isLoading,
  onSelect,
  options,
  value,
  ...inputProps
}): JSX.Element => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const selectedValues = useMemo(() => {
    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }
    return [value];
  }, [value]);

  const selectedOptionsText = useMemo(() => {
    const selectedOptions = selectedValues
      .map((selectedValue) => options?.find((option) => option.value === selectedValue))
      .filter((option) => option) as OptionType[];

    if (selectedOptions.length === 0) {
      return 'No options selected';
    }

    if (selectedOptions.length === 1) {
      return selectedOptions[0].label;
    }

    return selectedOptions.map((option) => (
      <Tag color="secondary" key={option.value}>
        {option.label}
      </Tag>
    ));
  }, [selectedValues, options]);

  const onClickHandler = () => {
    setIsDropdownOpen(!isDropdownOpen && !disabled);
  };

  return (
    <InputWrapper {...inputProps}>
      <div
        className={classNames('relative w-full cursor-pointer focus-within:outline-none', {
          '!cursor-default': disabled,
        })}
        onClick={onClickHandler}
      >
        <div
          className={classNames(
            'block w-full bg-gray-100 p-2 pl-4 text-left text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-transparent',
            { 'border-red-300 text-red-900 focus:border-red-500': invalid },
            { 'bg-gray-100': disabled },
          )}
        >
          <span
            className={classNames('flex h-5 gap-1.5', {
              'text-gray-400': disabled || selectedValues.length === 0,
            })}
          >
            {selectedOptionsText}
          </span>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0.5 flex items-center px-2">
          {isLoading ? <Spinner size={'large'} /> : <ChevronDown color="#4B5563" size={16} />}
        </div>
      </div>
      {isDropdownOpen && (
        <div className="bg-gray-100 text-left text-sm text-gray-800 shadow-sm">
          {options ? (
            options.map((option) => (
              <SelectInputOption
                key={option.value}
                onClick={(value) => value && onSelect?.(value)}
                selected={selectedValues.includes(option.value)}
                showMultipleSelectedIcon={selectedValues.length > 1}
                value={option.value}
              >
                {option.label}
              </SelectInputOption>
            ))
          ) : (
            <SelectInputOption>No options available</SelectInputOption>
          )}
        </div>
      )}
    </InputWrapper>
  );
};
