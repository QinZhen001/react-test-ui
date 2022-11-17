import React, { FC, useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/context';
import { BaseProps } from '../../types/index';
import './style/index.less';

export interface IconProps extends BaseProps {
  rotate?: number; // 旋转角度
  spin?: boolean; // 是否有旋转动画
  viewBox?: string;
  element?: React.SVGProps<SVGElement>;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
  color?: string;
}

interface SvgComponentProps extends React.SVGProps<SVGSVGElement> {
  element?: React.SVGProps<SVGElement>;
}

export const svgBaseProps = {
  width: '16px',
  height: '16px',
  fill: 'currentColor',
  focusable: false,
};

const SvgComponent = (props: SvgComponentProps) => {
  const { element, ...resProps } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon" {...resProps}>
      {element}
    </svg>
  );
};

export const Icon: FC<IconProps> = (props) => {
  const { className, viewBox = '0 0 1024 1024', spin, rotate, onClick, color, style = {}, ...restProps } = props;

  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('icon');

  const svgClassString = classNames(prefixCls, className, {
    [`${prefixCls}-spin`]: !!spin,
  });

  if (rotate) {
    style.msTransform = `rotate(${rotate}deg)`;
    style.transform = `rotate(${rotate}deg)`;
  }

  if (color) {
    style.color = color;
  }

  const innerSvgProps = {
    ...svgBaseProps,
    ...restProps,
    className: svgClassString,
    style,
    viewBox,
  };

  return <SvgComponent {...innerSvgProps} onClick={onClick}></SvgComponent>;
};

export default Icon;
