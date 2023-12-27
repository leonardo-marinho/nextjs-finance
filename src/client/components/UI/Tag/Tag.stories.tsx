import type { Meta, StoryObj } from '@storybook/react';

import { Bell } from 'react-feather';

import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  component: Tag,
  tags: ['autodocs'],
  title: 'Components/UI/Tag',
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Success: Story = {
  args: {
    color: 'success',
    label: 'Tag',
  },
};

export const Error: Story = {
  args: {
    color: 'error',
    label: 'Tag',
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    label: 'Tag',
  },
};

export const Large: Story = {
  args: {
    label: 'Tag',
    size: 'large',
  },
};

export const Medium: Story = {
  args: {
    label: 'Tag',
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    label: 'Tag',
    size: 'small',
  },
};

export const WithIcon: Story = {
  args: {
    icon: Bell,
    label: 'Tag',
  },
};
