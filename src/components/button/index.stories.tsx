import React from 'react';
import { Meta } from '@storybook/react';
import Button, { ButtonProps, buttonTypes, sizeTypes } from './index';

const meta: Meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    type: {
      options: buttonTypes,
      control: { type: 'select' },
      defaultValue: 'primary',
    },
    size: {
      options: sizeTypes,
      control: { type: 'select' },
      defaultValue: 'middle',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    onClick: { action: 'clicked' },
  },
};

export const Docs = (args: ButtonProps) => (
  <>
    <div style={{ padding: '10px' }}>
      <Button {...args}>custom button</Button>
    </div>
    <div style={{ padding: '10px' }}>
      <p>test type</p>
      <Button type="primary">type primary</Button>
      <Button type="secondary">type secondary</Button>
      <Button type="outline">type outline</Button>
    </div>
    <div style={{ padding: '10px' }}>
      <p>test size</p>
      <Button size="small">size small</Button>
      <Button size="middle">size middle</Button>
      <Button size="large">size large</Button>
    </div>
  </>
);

export default meta;
