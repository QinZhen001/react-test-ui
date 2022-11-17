import React from 'react';
import { Meta } from '@storybook/react';
import { Badge, BadgeProps } from './index';
import { Avatar } from '../avatar';

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

const squareStyle = {
  width: '50px',
  height: '50px',
  display: 'inline-block',
  background: '#586376',
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
    <div className="title">test overflowCount</div>
    <section className="wrapper">
      <div className="item">
        <Badge count={999} overflowCount={99}></Badge>
      </div>
    </section>
    <div className="title">test color</div>
    <section className="wrapper">
      <Badge count={0} showZero style={{ background: '#FAAD15' }}>
        <Avatar size="large" />
      </Badge>
    </section>
    <div className="title">test children</div>
    <section className="wrapper">
      <div className="item">
        <Badge count={0} showZero>
          <Avatar size="large" />
        </Badge>
      </div>
      <div className="item">
        <Badge count={12}>
          {/* square */}
          <span style={squareStyle}></span>
        </Badge>
      </div>
    </section>
    <div className="title">test offset</div>
    <section className="wrapper">
      <Badge count={10} offset={[-12, -2]}>
        <span style={squareStyle}></span>
      </Badge>
    </section>
  </>
);

export default meta;
