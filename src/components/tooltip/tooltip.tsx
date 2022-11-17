import classNames from 'classnames';
import RcTooltip from 'rc-tooltip';
import type { placements as Placements } from 'rc-tooltip/lib/placements';
import type { TooltipProps as RcTooltipProps } from 'rc-tooltip/lib/Tooltip';
import type { AlignType } from 'rc-trigger/lib/interface';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import React from 'react';
import { ConfigContext } from '../config-provider/context';
// import type { PresetColorType } from '../_util/colors';
// import { PresetColorTypes } from '../_util/colors';
// import { getTransitionName } from '../_util/motion';
import getPlacements, { AdjustOverflow, PlacementsConfig } from '../_util/placements';
import { cloneElement, isValidElement, isFragment } from '../_util/reactNode';
import { getTransitionName } from '../_util/motion';
import { BaseProps } from '../../types';
// import type { LiteralUnion } from '../_util/type';
// import warning from '../_util/warning';
// export { AdjustOverflow, PlacementsConfig };
import './style/index.less';

export type TooltipPlacement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';

// https://github.com/react-component/tooltip
// https://github.com/yiminghe/dom-align
export interface TooltipAlignConfig {
  points?: [string, string];
  offset?: [number | string, number | string];
  targetOffset?: [number | string, number | string];
  overflow?: { adjustX: boolean; adjustY: boolean };
  useCssRight?: boolean;
  useCssBottom?: boolean;
  useCssTransform?: boolean;
}
// remove this after RcTooltip switch visible to open.
interface LegacyTooltipProps
  extends Partial<Omit<RcTooltipProps, 'visible' | 'defaultVisible' | 'children' | 'onVisibleChange' | 'afterVisibleChange'>> {
  open?: RcTooltipProps['visible'];
  defaultOpen?: RcTooltipProps['defaultVisible'];
  onOpenChange?: RcTooltipProps['onVisibleChange'];
  afterOpenChange?: RcTooltipProps['afterVisibleChange'];
}

export interface AbstractTooltipProps extends LegacyTooltipProps, BaseProps {
  color?: string;
  placement?: TooltipPlacement;
  builtinPlacements?: typeof Placements;
  openClassName?: string;
  arrowPointAtCenter?: boolean;
  // autoAdjustOverflow?: boolean | AdjustOverflow;
  // getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
}

export type RenderFunction = () => React.ReactNode;

// export interface TooltipPropsWithOverlay extends AbstractTooltipProps {
//   title?: React.ReactNode | RenderFunction;
// }

// export interface TooltipPropsWithTitle extends AbstractTooltipProps {
//   title: React.ReactNode | RenderFunction;
// }

// export declare type TooltipProps = TooltipPropsWithTitle | TooltipPropsWithOverlay;

export interface TooltipProps extends AbstractTooltipProps {
  title?: React.ReactNode | RenderFunction;
}

const autoAdjustOverflow = false;

const splitObject = <T extends React.CSSProperties>(obj: T, keys: (keyof T)[]): Record<'picked' | 'omitted', T> => {
  const picked: T = {} as T;
  const omitted: T = { ...obj };
  keys.forEach((key) => {
    if (obj && key in obj) {
      picked[key] = obj[key];
      delete omitted[key];
    }
  });
  return { picked, omitted };
};

// Fix Tooltip won't hide at disabled button
// mouse events don't trigger at disabled button in Chrome
// https://github.com/react-component/tooltip/issues/18
// function getDisabledCompatibleChildren(element: React.ReactElement<any>, prefixCls: string) {
//   const elementType = element.type as any;
//   if (
//     ((elementType.__ANT_BUTTON === true || element.type === 'button') && element.props.disabled) ||
//     (elementType.__ANT_SWITCH === true && (element.props.disabled || element.props.loading)) ||
//     (elementType.__ANT_RADIO === true && element.props.disabled)
//   ) {
//     // Pick some layout related style properties up to span
//     // Prevent layout bugs like https://github.com/ant-design/ant-design/issues/5254
//     const { picked, omitted } = splitObject(element.props.style, [
//       'position',
//       'left',
//       'right',
//       'top',
//       'bottom',
//       'float',
//       'display',
//       'zIndex',
//     ]);
//     const spanStyle: React.CSSProperties = {
//       display: 'inline-block', // default inline-block is important
//       ...picked,
//       cursor: 'not-allowed',
//       width: element.props.block ? '100%' : undefined,
//     };
//     const buttonStyle: React.CSSProperties = {
//       ...omitted,
//       pointerEvents: 'none',
//     };
//     const child = cloneElement(element, {
//       style: buttonStyle,
//       className: null,
//     });
//     return (
//       <span style={spanStyle} className={classNames(element.props.className, `${prefixCls}-disabled-compatible-wrapper`)}>
//         {child}
//       </span>
//     );
//   }
//   return element;
// }

export const Tooltip = React.forwardRef<unknown, TooltipProps>((props, ref) => {
  const { getPrefixCls } = React.useContext(ConfigContext);

  const [open, setOpen] = useMergedState(false, {
    value: props.open,
    defaultValue: props.defaultOpen,
  });

  const isNoTitle = () => {
    const { title } = props;
    return !title && title !== 0;
  };

  const onOpenChange = (vis: boolean) => {
    setOpen(isNoTitle() ? false : vis);
    if (!isNoTitle()) {
      props.onOpenChange?.(vis);
    }
  };

  const getTooltipPlacements = () => {
    const { builtinPlacements, arrowPointAtCenter = false } = props;
    return (
      builtinPlacements ||
      getPlacements({
        arrowPointAtCenter,
        autoAdjustOverflow,
      })
    );
  };

  // 动态设置动画点
  const onPopupAlign = (domNode: HTMLElement, align: AlignType) => {
    const placements = getTooltipPlacements();
    // 当前返回的位置
    const placement = Object.keys(placements).find(
      (key) => placements[key].points![0] === align.points?.[0] && placements[key].points![1] === align.points?.[1]
    );
    if (!placement) {
      return;
    }
    // 根据当前坐标设置动画点
    const rect = domNode.getBoundingClientRect();

    const transformOrigin = { top: '50%', left: '50%' };

    if (/top|Bottom/.test(placement)) {
      transformOrigin.top = `${rect.height - align.offset![1]}px`;
    } else if (/Top|bottom/.test(placement)) {
      transformOrigin.top = `${-align.offset![1]}px`;
    }
    if (/left|Right/.test(placement)) {
      transformOrigin.left = `${rect.width - align.offset![0]}px`;
    } else if (/right|Left/.test(placement)) {
      transformOrigin.left = `${-align.offset![0]}px`;
    }
    domNode.style.transformOrigin = `${transformOrigin.left} ${transformOrigin.top}`;
  };

  const getOverlay = () => {
    const { title } = props;
    if (title === 0) {
      return title;
    }
    return title || '';
  };

  const { placement = 'top', mouseEnterDelay = 0.1, mouseLeaveDelay = 0.1, ...otherProps } = props;
  const { prefixCls: customizePrefixCls, openClassName, getTooltipContainer, overlayClassName, color, overlayInnerStyle, children } = props;
  const prefixCls = getPrefixCls('tooltip', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();

  // let tempOpen = open;
  // // Hide tooltip when there is no title
  // if (!('open' in props) && !('visible' in props) && isNoTitle()) {
  //   tempOpen = false;
  // }

  // const child = getDisabledCompatibleChildren(
  //   isValidElement(children) && !isFragment(children) ? children : <span>{children}</span>,
  //   prefixCls
  // );

  const child = isValidElement(children) && !isFragment(children) ? children : <span>{children}</span>;

  // const childProps = child.props;
  // const childCls =
  //   !childProps.className || typeof childProps.className === 'string'
  //     ? classNames(childProps.className, {
  //         [openClassName || `${prefixCls}-open`]: true,
  //       })
  //     : childProps.className;

  // const customOverlayClassName = classNames(overlayClassName, {
  //   [`${prefixCls}-${color}`]: color &&
  // });

  let formattedOverlayInnerStyle = overlayInnerStyle;
  const arrowContentStyle: React.CSSProperties = {};

  if (color) {
    formattedOverlayInnerStyle = { ...overlayInnerStyle, backgroundColor: color };
    arrowContentStyle.backgroundColor = color;
  }

  return (
    <RcTooltip
      {...otherProps}
      placement={placement}
      mouseEnterDelay={mouseEnterDelay}
      mouseLeaveDelay={mouseLeaveDelay}
      prefixCls={prefixCls}
      // overlayClassName={overlayClassName}
      getTooltipContainer={getTooltipContainer}
      ref={ref}
      // builtinPlacements={getTooltipPlacements()}
      overlay={getOverlay()}
      visible={open}
      onVisibleChange={onOpenChange}
      onPopupAlign={onPopupAlign}
      overlayInnerStyle={formattedOverlayInnerStyle}
      arrowContent={<span className={`${prefixCls}-arrow-content`} style={arrowContentStyle} />}
      motion={{
        motionName: getTransitionName(rootPrefixCls, 'zoom-big-fast', props.transitionName),
        motionDeadline: 1000,
      }}
    >
      {/* {open ? cloneElement(child, { className: childCls }) : child} */}
      {child}
    </RcTooltip>
  );
});

export default Tooltip;
