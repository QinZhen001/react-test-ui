import React, { FC } from 'react';
import { IconProps, Icon } from '../icon';

const defaultViewBox = '0 0 22 22';
const defaultElement = (
  <path
    d="M11 .5C5.202.5.5 5.202.5 11S5.202 21.5 11 21.5 21.5 16.798 21.5 11 16.798.5 11 .5Zm4.535 7.071L10.6 14.415a.745.745 0 0 1-1.212 0l-2.922-4.05a.188.188 0 0 1 .152-.298h1.1c.238 0 .466.115.606.312l1.67 2.316 3.684-5.11a.75.75 0 0 1 .607-.312h1.099c.152 0 .241.174.152.298Z"
    fillRule="evenodd"
  />
);

export const IconAreaYes: FC<IconProps> = (props) => {
  const { element, viewBox, ...resProps } = props;
  const mergedEle = element || defaultElement;
  const mergedviewBox = viewBox || defaultViewBox;

  return <Icon element={mergedEle} viewBox={mergedviewBox} {...resProps}></Icon>;
};
