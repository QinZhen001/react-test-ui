import React, { FC } from 'react';
import { BaseProps } from '../../type/index';

export interface IconProps extends BaseProps {
  name: string;
}

export const Icon: FC<IconProps> = ({ name }) => {
  return <i className={'el-icon-' + name}></i>;
};
