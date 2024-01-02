import type { Meta, StoryObj } from '@storybook/react';

import { InputWrapper } from './InputWrapper';

const meta: Meta<typeof InputWrapper> = {
  component: InputWrapper,
  tags: ['autodocs'],
  title: 'Components/UI/InputWrappers/InputWrapper',
};

export default meta;
type Story = StoryObj<typeof InputWrapper>;

export const Default: Story = {
  args: {
    label: 'InputWrapper',
  },
};
