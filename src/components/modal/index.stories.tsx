import React from 'react';
import { Meta } from '@storybook/react';
import { Modal } from './index';
import { Button } from '../button';

const meta: Meta = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    title: {
      control: { type: 'text' },
      defaultValue: 'title',
    },
  },
};

const defaultProps = {
  title: 'This is message',
  content: <div>some messages...some messages...</div>,
  closable: true,
  onOk() {
    console.log('OK');
  },
  onCancel() {
    console.log('Cancel');
  },
  afterClose() {
    console.log('afterClose');
  },
};

export const Docs = (args) => {
  const info = () => {
    Modal.info(defaultProps);
  };
  const success = () => {
    Modal.success(defaultProps);
  };
  const error = () => {
    Modal.error(defaultProps);
  };
  const warning = () => {
    Modal.warning(defaultProps);
  };

  return (
    <>
      <Modal {...args}>
        <div>Some contents...</div>
      </Modal>
      <div className="with type">
        <section className="wrapper">
          <Button size="small" className="inner" onClick={info}>
            modal info
          </Button>
          <Button size="small" className="inner" success onClick={success}>
            modal success
          </Button>
          <Button size="small" className="inner" error onClick={error}>
            modal error
          </Button>
          <Button size="small" className="inner" warning onClick={warning}>
            modal warning
          </Button>
        </section>
      </div>
    </>
  );
};

export default meta;
