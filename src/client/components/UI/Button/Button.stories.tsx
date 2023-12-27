import type { Meta, StoryObj } from '@storybook/react';

import { AlertCircle } from 'react-feather';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  title: 'Components/UI/Button',
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    color: 'primary',
    label: 'Button',
    variant: 'filled',
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    label: 'Button',
    variant: 'filled',
  },
};

export const Filled = Primary;

export const Outlined: Story = {
  args: {
    color: 'primary',
    label: 'Button',
    variant: 'outlined',
  },
};

export const Text: Story = {
  args: {
    color: 'primary',
    label: 'Button',
    variant: 'text',
  },
};

export const Disabled: Story = {
  args: {
    color: 'primary',
    isDisabled: true,
    label: 'Button',
    variant: 'filled',
  },
};

export const Loading: Story = {
  args: {
    color: 'primary',
    isLoading: true,
    label: 'Button',
    variant: 'filled',
  },
};

export const WithIcon: Story = {
  args: {
    color: 'primary',
    icon: AlertCircle,
    label: 'Button',
    variant: 'filled',
  },
};

export const Fill: Story = {
  args: {
    color: 'primary',
    fill: true,
    label: 'Button',
    variant: 'filled',
  },
};
