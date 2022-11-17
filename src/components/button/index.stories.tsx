import React from 'react';
import { Meta } from '@storybook/react';
import Button, { ButtonProps, buttonTypes, sizeTypes } from './index';
import { IconAreaYes } from '../icon';

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
    <Button {...args}>custom button</Button>
    <div className="title">type</div>
    <section className="wrapper">
      <Button type="primary" className="inner">
        type primary
      </Button>
      <Button type="secondary" className="inner">
        type secondary
      </Button>
      <Button type="outline" className="inner">
        type outline
      </Button>
    </section>
    <div className="title">size</div>
    <section className="wrapper">
      <Button size="small" className="inner">
        size small
      </Button>
      <Button size="middle" className="inner">
        size middle
      </Button>
      <Button size="large" className="inner">
        size large
      </Button>
    </section>
    <div className="title">primary</div>
    <section className="wrapper">
      <Button type="primary" className="inner">
        primary default
      </Button>
      <Button type="primary" success className="inner">
        primary success
      </Button>
      <Button type="primary" warning className="inner">
        primary warning
      </Button>
      <Button type="primary" error className="inner">
        primary error
      </Button>
    </section>
    <div className="title">primary disabled</div>
    <section className="wrapper">
      <Button type="primary" disabled className="inner">
        primary default disabled
      </Button>
      <Button type="primary" success disabled className="inner">
        primary success disabled
      </Button>
      <Button type="primary" warning disabled className="inner">
        primary warning disabled
      </Button>
      <Button type="primary" error disabled className="inner">
        primary error disabled
      </Button>
    </section>
    <div className="title">secondary</div>
    <section className="wrapper">
      <Button type="secondary" className="inner">
        secondary default
      </Button>
      <Button type="secondary" success className="inner">
        primary success
      </Button>
      <Button type="secondary" warning className="inner">
        primary warning
      </Button>
      <Button type="secondary" error className="inner">
        primary error
      </Button>
    </section>
    <div className="title">secondary disabled</div>
    <section className="wrapper">
      <Button type="secondary" disabled className="inner">
        secondary default disabled
      </Button>
      <Button type="secondary" success disabled className="inner">
        primary success disabled
      </Button>
      <Button type="secondary" warning disabled className="inner">
        primary warning disabled
      </Button>
      <Button type="secondary" error disabled className="inner">
        primary error disabled
      </Button>
    </section>
    <div className="title">with icon</div>
    <section className="wrapper">
      <Button icon={<IconAreaYes color="white"></IconAreaYes>}>primary</Button>
    </section>
  </>
);

export default meta;
