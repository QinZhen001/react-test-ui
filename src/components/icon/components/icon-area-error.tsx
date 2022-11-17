import React, { FC } from 'react';
import { IconProps, Icon } from '../icon';

const defaultViewBox = '0 0 22 22';
const defaultElement = (
  <path
    d="M11 .5C5.202.5.5 5.202.5 11S5.202 21.5 11 21.5 21.5 16.798 21.5 11 16.798.5 11 .5Zm3.877 14.49-1.547-.008L11 12.205 8.673 14.98l-1.55.007a.187.187 0 0 1-.187-.188c0-.044.016-.086.044-.122l3.05-3.632-3.05-3.63a.188.188 0 0 1 .143-.31l1.55.007L11 9.889l2.327-2.775 1.547-.007c.103 0 .188.082.188.188a.195.195 0 0 1-.045.121l-3.044 3.63 3.047 3.634a.188.188 0 0 1-.143.31Z"
    fillRule="evenodd"
  />
);

export const IconAreaError: FC<IconProps> = (props) => {
  const { element, viewBox, ...resProps } = props;
  const mergedEle = element || defaultElement;
  const mergedviewBox = viewBox || defaultViewBox;

  return <Icon element={mergedEle} viewBox={mergedviewBox} {...resProps}></Icon>;
};
