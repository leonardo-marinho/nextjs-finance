import type { Meta, StoryObj } from '@storybook/react';

import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  tags: ['autodocs'],
  title: 'Components/UI/Inputs/TextInput',
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    label: 'TextInput',
    type: 'text',
  },
};

export const Search: Story = {
  args: {
    label: 'Search',
    type: 'search',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
  },
};

export const Date: Story = {
  args: {
    label: 'Date',
    type: 'date',
  },
};
