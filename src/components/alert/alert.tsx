import React, { FC, useState, useRef } from 'react';
import { BaseProps } from '../../types';
import { ConfigContext } from '../config-provider/context';
import { tuple } from '../_util/type';
import CSSMotion from 'rc-motion';
// change import icon path test tree shaking
import { IconAreaYes } from '../icon/components/icon-area-success';
import { IconAreaInfo } from '../icon/components/icon-area-info';
import { IconAreaError } from '../icon/components/icon-area-error';
import { IconClose } from '../icon/components/icon-close';
import type { IconProps } from '../icon';
import classNames from 'classnames';
import './style/index.less';

export const alertTypes = tuple('success', 'info', 'warning', 'error');
export type AlertType = typeof alertTypes[number];

export interface AlertProps extends BaseProps {
  /** Type of Alert styles, options:`success`, `info`, `warning`, `error` */
  type?: AlertType;
  /** Whether Alert can be closed */
  closable?: boolean;
  /** Close text to show */
  closeText?: React.ReactNode;
  /** Content of Alert */
  message?: React.ReactNode;
  /** Callback when close Alert */
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  /** Trigger when animation ending of Alert */
  afterClose?: () => void;
  showIcon?: boolean; // 前面的图标
  // banner?: boolean;
  icon?: React.ReactNode;
  /** Custom closeIcon */
  closeIcon?: React.ReactNode;
  action?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

interface IconNodeProps {
  type: AlertProps['type'];
  icon: AlertProps['icon'];
  prefixCls: AlertProps['prefixCls'];
}

const iconMap: Record<NonNullable<AlertProps['type']>, FC<IconProps>> = {
  success: IconAreaYes,
  info: IconAreaInfo,
  error: IconAreaError,
  warning: IconAreaInfo,
};

interface CloseIconProps {
  isClosable: boolean;
  prefixCls: AlertProps['prefixCls'];
  closeText: AlertProps['closeText'];
  closeIcon: AlertProps['closeIcon'];
  handleClose: AlertProps['onClose'];
}

const CloseIcon: React.FC<CloseIconProps> = (props) => {
  const { isClosable, closeText, prefixCls, closeIcon, handleClose } = props;
  return isClosable ? (
    <span onClick={handleClose} className={`${prefixCls}-close-icon`} tabIndex={0}>
      {closeText ? <span className={`${prefixCls}-close-text`}>{closeText}</span> : closeIcon}
    </span>
  ) : null;
};

export const Alert: FC<AlertProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    message,
    className = '',
    style,
    onClick,
    afterClose,
    showIcon,
    closable,
    closeText,
    closeIcon = <IconClose />,
    action,
    onClose,
    type = 'info',
    ...restProps
  } = props;

  const [closed, setClosed] = useState(false);
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('alert', customizePrefixCls);
  const alertCls = classNames(
    prefixCls,
    `${prefixCls}-${type}`,
    {
      [`${prefixCls}-no-icon`]: !showIcon,
    },
    className
  );

  const isClosable = closeText ? true : closable;

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClosed(true);
    onClose?.(e);
  };

  return (
    <CSSMotion
      visible={!closed}
      motionName={`${prefixCls}-motion`}
      motionAppear={false}
      motionEnter={false}
      onLeaveStart={(node) => ({
        maxHeight: node.offsetHeight,
      })}
      onLeaveEnd={afterClose}
    >
      {({ className: motionClassName, style: motionStyle }) => (
        <div
          data-show={!closed}
          className={classNames(alertCls, motionClassName)}
          style={{ ...style, ...motionStyle }}
          onClick={onClick}
          role="alert"
        >
          {showIcon
            ? iconMap[type]({
                className: `${prefixCls}-icon`,
              })
            : null}
          <div className={`${prefixCls}-content`}>{message ? <div className={`${prefixCls}-message`}>{message}</div> : null}</div>
          {action ? <div className={`${prefixCls}-action`}>{action}</div> : null}
          <CloseIcon
            isClosable={!!isClosable}
            closeText={closeText}
            prefixCls={prefixCls}
            closeIcon={closeIcon}
            handleClose={handleClose}
          />
        </div>
      )}
    </CSSMotion>
  );
};

export default Alert;
