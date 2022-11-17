import React, { FC } from 'react';
import { IconProps, Icon } from '../icon';

const defaultViewBox = '0 0 22 22';
const defaultElement = (
  <path
    d="M11 .5C5.202.5.5 5.202.5 11S5.202 21.5 11 21.5 21.5 16.798 21.5 11 16.798.5 11 .5Zm-.75 5.438c0-.104.084-.188.188-.188h1.124c.104 0 .188.084.188.188v6.375a.188.188 0 0 1-.188.187h-1.124a.188.188 0 0 1-.188-.188V5.939ZM11 16.25A1.125 1.125 0 1 1 11 14a1.125 1.125 0 0 1 0 2.25Z"
    fillRule="evenodd"
  />
);

export const IconAreaInfo: FC<IconProps> = (props) => {
  const { element, viewBox, ...resProps } = props;
  const mergedEle = element || defaultElement;
  const mergedviewBox = viewBox || defaultViewBox;

  return <Icon element={mergedEle} viewBox={mergedviewBox} {...resProps}></Icon>;
};
