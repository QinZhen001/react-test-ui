import React, { FC, useMemo, useRef } from 'react';
import { ConfigContext } from '../config-provider/context';
import { cloneElement } from '../_util/index';
import CSSMotion from 'rc-motion';
import classNames from 'classnames';
import { BaseProps } from '../../types';
import './style/index.less';

export interface BadgeProps extends BaseProps {
  /** Number to show in badge */
  count?: number | string;
  showZero?: boolean;
  /** Max count to show */
  overflowCount?: number;
  /** Whether to show red dot without number */
  dot?: boolean;
  scrollNumberPrefixCls?: string;
  className?: string;
  // status?: PresetStatusColorType;
  // color?: LiteralUnion<PresetColorType, string>;
  // text?: React.ReactNode;
  size?: 'default' | 'small';
  offset?: [number | string, number | string];
  // title?: string;
  children?: React.ReactNode;
}

export const Badge: FC<BadgeProps> = ({
  prefixCls: customizePrefixCls,
  scrollNumberPrefixCls: customizeScrollNumberPrefixCls,
  children,
  count,
  overflowCount = 99,
  dot = false,
  size = 'default',
  offset,
  style,
  className,
  showZero = false,
  ...restProps
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('badge', customizePrefixCls);

  // ================================ Misc ================================
  const numberedDisplayCount = ((count as number) > (overflowCount as number) ? `${overflowCount}+` : count) as string | number | null;

  const isZero = numberedDisplayCount === '0' || numberedDisplayCount === 0;
  // const ignoreCount = count === null || isZero;
  const showAsDot = dot && !isZero;
  const mergedCount = showAsDot ? '' : numberedDisplayCount;

  const isHidden = useMemo(() => {
    const isEmpty = mergedCount === null || mergedCount === undefined || mergedCount === '';
    return (isEmpty || (isZero && !showZero)) && !showAsDot;
  }, [mergedCount, isZero, showZero, showAsDot]);

  // Count should be cache in case hidden change it
  // const countRef = useRef(count);
  // if (!isHidden) {
  //   countRef.current = count;
  // }
  // const livingCount = countRef.current;

  // We need cache count since remove motion should not change count display
  // const displayCountRef = useRef(mergedCount);
  // if (!isHidden) {
  //   displayCountRef.current = mergedCount;
  // }
  // const displayCount = displayCountRef.current;

  // We will cache the dot status to avoid shaking on leaved motion
  const isDotRef = useRef(showAsDot);
  if (!isHidden) {
    isDotRef.current = showAsDot;
  }

  // =============================== Styles ===============================
  const mergedStyle = useMemo<React.CSSProperties>(() => {
    if (!offset) {
      return { ...style };
    }
    const offsetStyle: React.CSSProperties = {
      marginTop: offset[1],
      right: parseInt(offset[0] as string, 10),
    };

    return {
      ...offsetStyle,
      ...style,
    };
  }, [offset, style]);

  const isDot = isDotRef.current;
  const badgeClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-not-a-wrapper`]: !children,
      [`${prefixCls}-dot`]: isDot,
      [`${prefixCls}-count`]: !isDot,
      [`${prefixCls}-count-sm`]: size === 'small',
      [`${prefixCls}-children`]: !!children,
      [`${prefixCls}-multiple-words`]: !isDot && numberedDisplayCount && numberedDisplayCount.toString().length > 1,
    },
    className
  );

  const badgeWrapperClassName = classNames({
    [`${prefixCls}-has-child`]: !!children,
  });

  return (
    <span className={badgeWrapperClassName}>
      {children}
      <span {...restProps} style={mergedStyle} className={badgeClassName}>
        {!isHidden && !isDot ? numberedDisplayCount : null}
      </span>
    </span>
  );
};

export default Badge;
