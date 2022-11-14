import React from 'react';
import { Meta } from '@storybook/react';
import Icon, { IconProps } from './icon';
import { IconArrowLeft } from './icons/index';

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
    <div>
      <div></div>
    </div>
  </>
);

Docs.args = {};

export default meta;
