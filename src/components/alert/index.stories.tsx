import React from 'react';
import { Meta } from '@storybook/react';
import { Alert, AlertProps, alertTypes } from './alert';

const meta: Meta = {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    type: {
      options: alertTypes,
      control: { type: 'select' },
      defaultValue: 'success',
    },
    showIcon: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    message: {
      control: { type: 'text' },
      defaultValue: 'I am message',
    },
    closable: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    closeText: {
      control: { type: 'text' },
      defaultValue: '',
    },
    onClose: { action: 'onClose' },
    onClick: { action: 'onClick' },
  },
};

export const Docs = (args: AlertProps) => (
  <>
    <section>
      <Alert {...args}></Alert>
    </section>
    <section>
      <div className="title">test type</div>
      <Alert type="success" message="Alert success" showIcon></Alert>
      <Alert type="info" message="Alert info" showIcon></Alert>
      <Alert type="warning" message="Alert warning" showIcon></Alert>
      <Alert type="error" message="Alert error" showIcon></Alert>
    </section>
    <section>
      <div className="title">test close</div>
      <Alert type="success" message="I can close" closable></Alert>
      <Alert type="success" message="I can close" closeText="close"></Alert>
    </section>
    <section>
      <div className="title">test action</div>
      <Alert type="info" message="with action" action={<button>custom btn</button>}></Alert>
    </section>
  </>
);

export default meta;
