import React, { FC, useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider/context';
import { BaseProps } from '../../types/index';
import './style/index.less';

export interface IconProps extends BaseProps {
  rotate?: number; // 旋转角度
  spin?: boolean; // 是否有旋转动画
  viewBox?: string;
  pathElement?: React.SVGProps<SVGPathElement>;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}

interface SvgComponentProps extends React.SVGProps<SVGSVGElement> {
  pathElement?: React.SVGProps<SVGPathElement>;
}

export const svgBaseProps = {
  width: '1em',
  height: '1em',
  fill: 'currentColor',
  focusable: false,
};

const SvgComponent = (props: SvgComponentProps) => {
  const { pathElement, ...resProps } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon" {...resProps}>
      {pathElement}
    </svg>
  );
};

export const Icon: FC<IconProps> = (props) => {
  const {
    className,
    viewBox = '0 0 1024 1024',
    spin,
    rotate,
    onClick,
    style = {},
    ...restProps
  } = props;

  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('icon');

  const svgClassString = classNames(prefixCls, {
    [`${prefixCls}-spin`]: !!spin,
  });

  if (rotate) {
    style.msTransform = `rotate(${rotate}deg)`;
    style.transform = `rotate(${rotate}deg)`;
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
