import React, { FC, useContext } from 'react';
import { ConfigContext } from '../config-provider/context';
import classNames from 'classnames';
import { BaseProps } from '../../types/index';
import { tuple } from '../_util/type';
import './style/index.less';

export const buttonTypes = tuple('primary', 'secondary', 'outline');
export type ButtonType = typeof buttonTypes[number];
export const buttonShapes = tuple('default', 'circle', 'round');
export type ButtonShape = typeof buttonShapes[number];
export const buttonHTMLTypes = tuple('submit', 'button', 'reset');
export type ButtonHTMLType = typeof buttonHTMLTypes[number];
export const sizeTypes = tuple('small', 'middle', 'large');
export type SizeType = typeof sizeTypes[number];

export interface ButtonProps extends BaseProps, Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'> {
  type?: ButtonType;
  icon?: React.ReactNode;
  shape?: ButtonShape;
  size?: SizeType;
  disabled?: boolean;
  loading?: boolean | { delay?: number };
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLElement>;
  error?: boolean;
  success?: boolean;
  warning?: boolean;
  // block?: boolean;
  children?: React.ReactNode;
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    loading = false,
    prefixCls: customizePrefixCls,
    type = 'primary',
    shape = 'default',
    size = 'middle',
    disabled,
    className,
    children,
    icon,
    htmlType = 'button',
    error = false,
    success = false,
    warning = false,
    ...rest
  } = props;

  // const [innerLoading, setLoading] = React.useState<Loading>(!!loading);
  const { getPrefixCls } = useContext(ConfigContext);
  // const buttonRef = (ref as any) || React.createRef<HTMLElement>();
  const prefixCls = getPrefixCls('btn', customizePrefixCls);
  const sizeClassNameMap = { large: 'lg', small: 'sm', middle: undefined };
  const sizeFullname = size;
  const sizeCls = sizeFullname ? sizeClassNameMap[sizeFullname] || '' : '';

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-${shape}`]: shape !== 'default' && shape, // Note: Shape also has `default`
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      // [`${prefixCls}-icon-only`]: !children && children !== 0 && !!iconType,
      // [`${prefixCls}-background-ghost`]: ghost && !isUnBorderedButtonType(type),
      // [`${prefixCls}-loading`]: innerLoading,
      // [`${prefixCls}-two-chinese-chars`]:
      //   hasTwoCNChar && autoInsertSpace && !innerLoading,
      // [`${prefixCls}-block`]: block,
      // [`${prefixCls}-dangerous`]: !!danger,
      // [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-disabled`]: !!disabled,
      [`${prefixCls}-error`]: !!error,
      [`${prefixCls}-success`]: !!success,
      [`${prefixCls}-warning`]: !!warning,
      // linkButtonRestProps.href !== undefined && mergedDisabled,
    },
    // compactItemClassnames,
    className
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    const { onClick } = props;
    // https://github.com/ant-design/ant-design/issues/30207
    // if (innerLoading || mergedDisabled) {
    //   e.preventDefault();
    //   return;
    // }
    (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e);
  };

  const buttonNode = (
    <button {...rest} type={htmlType} className={classes} onClick={handleClick} disabled={disabled}>
      {icon}
      {/* {kids} */}
      {children}
    </button>
  );

  return buttonNode;
};

export default Button;
