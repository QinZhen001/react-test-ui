import React from 'react';
import { Meta } from '@storybook/react';
import message from './index';
import { Button } from '../button';
import { randomString } from '../../../.storybook/utils';

const meta: Meta = {
  title: 'Components/Message',
  // component: message,
  // argTypes: {
  //   type: {
  //     options: alertTypes,
  //     control: { type: 'select' },
  //     defaultValue: 'success',
  //   },
  //   showIcon: {
  //     control: { type: 'boolean' },
  //     defaultValue: false,
  //   },
  //   message: {
  //     control: { type: 'text' },
  //     defaultValue: 'I am message',
  //   },
  //   closable: {
  //     control: { type: 'boolean' },
  //     defaultValue: false,
  //   },
  //   closeText: {
  //     control: { type: 'text' },
  //     defaultValue: '',
  //   },
  //   onClose: { action: 'onClose' },
  //   onClick: { action: 'onClick' },
  // },
};

export const Docs = (args) => {
  const info = () => {
    message.info('info: ' + randomString(10), () => console.log('close'));
  };
  const success = () => {
    message.success('success: ' + randomString(10), () => console.log('close'));
  };
  const error = () => {
    message.error('error: ' + randomString(10), () => console.log('close'));
  };
  const warning = () => {
    message.warning('warning: ' + randomString(10), () => console.log('close'));
  };
  // const loading = () => {};

  return (
    <>
      <section className="wrapper">
        <Button size="small" className="inner" onClick={info}>
          message info
        </Button>
        <Button size="small" className="inner" success onClick={success}>
          message success
        </Button>
        <Button size="small" className="inner" error onClick={error}>
          message error
        </Button>
        <Button size="small" className="inner" warning onClick={warning}>
          message warning
        </Button>
        {/* <Button size="small" onClick={loading}>
          message loading
        </Button> */}
      </section>
    </>
  );
};

export default meta;
