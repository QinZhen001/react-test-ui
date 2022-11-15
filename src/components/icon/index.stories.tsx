import React from 'react';
import { Meta } from '@storybook/react';
import { IconProps, IconArrowLeft, Icon, IconClose } from './index';

const meta: Meta = {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    rotate: {
      control: 'number',
      defaultValue: 0,
    },
    spin: {
      control: 'boolean',
      defaultValue: false,
    },
    onClick: { action: 'clicked' },
    style: {
      control: 'object',
      defaultValue: {
        // color: 'red',
      },
    },
  },
};

// type DocsProps = {};

export const Docs = (props: IconProps) => (
  <>
    <div>
      <IconArrowLeft {...props}></IconArrowLeft>
    </div>
    <div className="wrapper">
      <div className="item">
        <p>IconClose</p>
        <IconClose></IconClose>
      </div>
      <div className="item">
        <p>IconClose</p>
        <IconClose></IconClose>
      </div>
      <div className="item">
        <p>IconClose</p>
        <IconClose></IconClose>
      </div>
      <div className="item">
        <p>IconClose</p>
        <IconClose></IconClose>
      </div>
    </div>
  </>
);

Docs.args = {};

export default meta;
