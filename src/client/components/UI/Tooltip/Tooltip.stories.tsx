import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip } from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  tags: ['autodocs'],
  title: 'Components/UI/Tooltip',
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    children: 'Hover me',
    label: 'Tooltip',
  },
};

export const WithHelpCursor: Story = {
  args: {
    children: 'Hover me',
    label: 'Tooltip',
    showHelpCursor: true,
  },
};

export const WithoutHelpCursor: Story = {
  args: {
    children: 'Hover me',
    label: 'Tooltip',
    showHelpCursor: false,
  },
};
