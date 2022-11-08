import React from 'react';
import { Meta } from '@storybook/react';
import { Button } from './index';

const meta: Meta = {
  title: 'Components/Button',
  component: Button,
};

type DocsProps = {
  primary: string;
  secondary: string;
  ghost: string;
  danger: string;
};

export const Docs = ({ primary, secondary, ghost, danger }: DocsProps) => (
  <>
    <Button></Button>
  </>
);

export default meta;
