import React from 'react';
import { Meta } from '@storybook/react';
import notification, { ArgsProps } from './index';
import { Button } from '../button';

const meta: Meta = {
  title: 'Components/Notification',
  // component: message,
};

const defaultProps = {
  message: 'Notification Title',
  description: 'This is the description of the notification',
  onClick: () => {
    console.log('Notification Clicked!');
  },
};

export const Docs = (args: ArgsProps) => {
  const withProps = () => {
    notification.open({ ...defaultProps, btn: <Button size="small">btn</Button> });
  };

  const primary = () => {
    notification.open(defaultProps);
  };
  const info = () => {
    notification.info(defaultProps);
  };
  const success = () => {
    notification.success(defaultProps);
  };
  const error = () => {
    notification.error(defaultProps);
  };
  const warning = () => {
    notification.warning(defaultProps);
  };

  return (
    <>
      <div className="title">with props</div>
      <section className="wrapper">
        <Button size="small" className="inner" type="secondary" onClick={withProps}>
          some props
        </Button>
      </section>
      <div className="title">with type</div>
      <section className="wrapper">
        <Button size="small" className="inner" type="secondary" onClick={primary}>
          notification default
        </Button>
        <Button size="small" className="inner" onClick={info}>
          notification info
        </Button>
        <Button size="small" className="inner" success onClick={success}>
          notification success
        </Button>
        <Button size="small" className="inner" error onClick={error}>
          notification error
        </Button>
        <Button size="small" className="inner" warning onClick={warning}>
          notification warning
        </Button>
        {/* <Button size="small" onClick={loading}>
          message loading
        </Button> */}
      </section>
    </>
  );
};

export default meta;
