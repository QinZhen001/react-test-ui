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
      <div className="title">test type</div>
      <Button type="primary">type primary</Button>
      <Button type="secondary">type secondary</Button>
      <Button type="outline">type outline</Button>
    </div>
    <div style={{ padding: '10px' }}>
      <div className="title">test size</div>
      <Button size="small">size small</Button>
      <Button size="middle">size middle</Button>
      <Button size="large">size large</Button>
    </div>
    <div style={{ padding: '10px' }}>
      <div className="title">test primary</div>
      <Button type="primary">primary default</Button>
      <Button type="primary" success>
        primary success
      </Button>
      <Button type="primary" warning>
        primary warning
      </Button>
      <Button type="primary" error>
        primary error
      </Button>
    </div>
    <div style={{ padding: '10px' }}>
      <div className="title">test secondary</div>
      <Button type="secondary">secondary default</Button>
      <Button type="secondary" success>
        primary success
      </Button>
      <Button type="secondary" warning>
        primary warning
      </Button>
      <Button type="secondary" error>
        primary error
      </Button>
    </div>
  </>
);

export default meta;
