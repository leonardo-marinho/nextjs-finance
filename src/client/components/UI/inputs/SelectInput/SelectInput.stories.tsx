import type { Meta, StoryObj } from '@storybook/react';

import { OptionType, SelectInput } from './SelectInput';

const options: OptionType[] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
];

const meta: Meta<typeof SelectInput> = {
  component: SelectInput,
  tags: ['autodocs'],
  title: 'Components/UI/Inputs/SelectInput',
};

export default meta;
type Story = StoryObj<typeof SelectInput>;

export const SingleValue: Story = {
  args: {
    label: 'SelectInput',
    options,
    value: 'option2',
  },
};

export const MultipleValues: Story = {
  args: {
    label: 'SelectInput',
    options,
    value: ['option1', 'option2'],
  },
};

export const NoValue: Story = {
  args: {
    label: 'SelectInput',
    options,
  },
};

export const NoOptions: Story = {
  args: {
    label: 'SelectInput',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    label: 'SelectInput',
    options,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'SelectInput',
    options: options,
    value: 'option2',
  },
};

export const DisabledMultipleValues: Story = {
  args: {
    disabled: true,
    label: 'SelectInput',
    options: options,
    value: ['option1', 'option2'],
  },
};
