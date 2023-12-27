import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  tags: ['autodocs'],
  title: 'Components/UI/Spinner',
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};
