import React from 'react';
import { Meta } from '@storybook/react';
import { Badge, BadgeProps } from './index';

const meta: Meta = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    size: {
      options: ['default', 'small'],
      control: { type: 'select' },
      defaultValue: 'default',
    },
    count: {
      control: { type: 'number' },
      defaultValue: 9,
    },
  },
};

export const Docs = (args: BadgeProps) => (
  <>
    <section>
      <Badge {...args}></Badge>
    </section>
    <div className="title">test size</div>
    <section className="wrapper">
      <div className="item">
        <div>size default</div>
        <Badge count={12} size="default"></Badge>
      </div>
      <div className="item">
        <div>size small</div>
        <Badge count={12} size="small"></Badge>
      </div>
    </section>
  </>
);

export default meta;
