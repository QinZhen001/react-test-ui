import React from 'react';
import { Meta } from '@storybook/react';
import { Button } from 'antd';
import { ConfigProvider } from '../anti/config-provider';

const meta: Meta = {
  title: 'Components/NewButton',
  component: Button,
};

export const Docs = (args) => (
  <>
    <ConfigProvider>
      <Button type="primary">131312</Button>
    </ConfigProvider>
  </>
);

export default meta;
