import React from 'react';
import { Meta } from '@storybook/react';

const Button = ({ children }) => {
  return (
    <button>
      Button
      {children}
    </button>
  );
};

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
    <Button>1111</Button>
  </>
);

// Docs.args = {
//   primary: "确定",
//   secondary: "取消",
//   ghost: "ghost",
//   danger: "danger",
// };

export default meta;
