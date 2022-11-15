import React from 'react';
import { Meta } from '@storybook/react';
import { Avatar, AvatarProps } from './index';
import { IconClose } from '../icon';

const meta: Meta = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      options: ['large', 'small', 'default'],
      control: { type: 'select' },
      defaultValue: 'default',
    },
    src: {
      control: { type: 'text' },
      defaultValue: '',
    },
    onError: { action: 'onError' },
    onClick: { action: 'onClick' },
  },
};

const DEFAULT_SRC = 'https://joeschmoe.io/api/v1/random';

export const Docs = (args: AvatarProps) => (
  <>
    <section>
      <Avatar {...args}></Avatar>
    </section>
    <div className="title">test size</div>
    <section className="wrapper">
      <div className="item">
        <div>large</div>
        <Avatar size="large" src={DEFAULT_SRC}></Avatar>
      </div>
      <div className="item">
        <div>default</div>
        <Avatar size="default" src={DEFAULT_SRC}></Avatar>
      </div>
      <div className="item">
        <div>small</div>
        <Avatar size="small" src={DEFAULT_SRC}></Avatar>
      </div>
      <div className="item">
        <div>size 80</div>
        <Avatar size={80} src={DEFAULT_SRC}></Avatar>
      </div>
    </section>
    <div className="title">test icon</div>
    <section className="wrapper">
      <Avatar icon={<IconClose></IconClose>}></Avatar>
    </section>
  </>
);

export default meta;
