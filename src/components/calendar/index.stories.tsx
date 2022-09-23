import React from 'react';
import { Meta } from '@storybook/react';
import { Calendar } from './index';

const meta: Meta = {
  title: 'Components/Calendar',
  component: Calendar,
};

type DocsProps = {};

export const Docs = () => (
  <>
    <div>
      <Calendar></Calendar>
    </div>
  </>
);

Docs.args = {};

export default meta;
