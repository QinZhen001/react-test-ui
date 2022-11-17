import React from 'react';
import { Meta } from '@storybook/react';
import { IconProps, IconArrowLeft, Icon, IconClose, IconAreaYes, IconAreaInfo, IconAreaError } from './index';

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
    color: {
      control: 'text',
      defaultValue: 'red',
    },
  },
};

export const Docs = (props: IconProps) => (
  <>
    <div className="title">test props</div>
    <section className="wrapper">
      <div className="item">
        <IconArrowLeft {...props}></IconArrowLeft>
      </div>
    </section>
    <div className="title">all icons</div>
    <section className="wrapper">
      <div className="item">
        <div>IconAreaYes</div>
        <IconAreaYes></IconAreaYes>
      </div>
      <div className="item">
        <div>IconAreaInfo</div>
        <IconAreaInfo></IconAreaInfo>
      </div>
      <div className="item">
        <div>IconAreaError</div>
        <IconAreaError></IconAreaError>
      </div>
      <div className="item">
        <div>IconClose</div>
        <IconClose></IconClose>
      </div>
    </section>
  </>
);

Docs.args = {};

export default meta;
