import React, { FC } from 'react';
import { IconProps, Icon } from '../icon';

const defaultViewBox = '0 0 16 16';
const defaultElement = (
  <path
    d="M9.214 8 15.366.666a.186.186 0 0 0-.143-.307h-1.87c-.11 0-.216.05-.288.134L7.99 6.543 2.916.492a.375.375 0 0 0-.288-.134H.758a.186.186 0 0 0-.143.307L6.767 8 .615 15.334a.186.186 0 0 0 .143.307h1.87c.11 0 .216-.05.288-.134l5.075-6.05 5.074 6.05c.07.084.176.134.288.134h1.87c.16 0 .247-.186.143-.307L9.214 8Z"
    fillRule="evenodd"
  />
);

export const IconClose: FC<IconProps> = (props) => {
  const { element, viewBox, ...resProps } = props;
  const mergedEle = element || defaultElement;
  const mergedviewBox = viewBox || defaultViewBox;

  return <Icon element={mergedEle} viewBox={mergedviewBox} {...resProps}></Icon>;
};
