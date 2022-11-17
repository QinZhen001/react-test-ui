import React, { FC } from 'react';
import { ConfigContext } from '../config-provider/context';
import classNames from 'classnames';
import type { AvatarSize } from './context';
import { BaseProps } from '../../types';
import './style/index.less';

export interface AvatarProps extends BaseProps {
  /** Shape of avatar, options: `circle`, `square` */
  // shape?: 'circle' | 'square';
  /*
   * Size of avatar, options: `large`, `small`, `default`
   * or a custom number size
   * */
  size?: AvatarSize;
  // gap?: number;
  /** Src of image avatar */
  src?: React.ReactNode;
  /** Srcset of image avatar */
  srcSet?: string;
  // draggable?: boolean;
  /** Icon to be used in avatar */
  icon?: React.ReactNode;
  crossOrigin?: '' | 'anonymous' | 'use-credentials';
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
  /* callback when img load error */
  /* return false to prevent Avatar show default fallback behavior, then you can do fallback by your self */
  onError?: () => boolean;
}

export const Avatar: FC<AvatarProps> = (props) => {
  // const groupSize = React.useContext(SizeContext);

  const [scale, setScale] = React.useState(1);
  const [mounted, setMounted] = React.useState(false);
  const [isImgExist, setIsImgExist] = React.useState(true);

  const avatarNodeRef = React.useRef<HTMLSpanElement>(null);
  const avatarChildrenRef = React.useRef<HTMLSpanElement>(null);
  // const avatarNodeMergeRef = composeRef<HTMLSpanElement>(ref, avatarNodeRef);

  const { getPrefixCls } = React.useContext(ConfigContext);

  // const setScaleParam = () => {
  //   if (!avatarChildrenRef.current || !avatarNodeRef.current) {
  //     return;
  //   }
  //   const childrenWidth = avatarChildrenRef.current.offsetWidth; // offsetWidth avoid affecting be transform scale
  //   const nodeWidth = avatarNodeRef.current.offsetWidth;
  //   // denominator is 0 is no meaning
  //   if (childrenWidth !== 0 && nodeWidth !== 0) {
  //     const { gap = 4 } = props;
  //     if (gap * 2 < nodeWidth) {
  //       setScale(
  //         nodeWidth - gap * 2 < childrenWidth
  //           ? (nodeWidth - gap * 2) / childrenWidth
  //           : 1
  //       );
  //     }
  //   }
  // };

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    setIsImgExist(true);
    setScale(1);
  }, [props.src]);

  // React.useEffect(() => {
  //   setScaleParam();
  // }, [props.gap]);

  const handleImgLoadError = () => {
    const { onError } = props;
    const errorFlag = onError ? onError() : undefined;
    if (errorFlag !== false) {
      setIsImgExist(false);
    }
  };

  const {
    prefixCls: customizePrefixCls,
    // shape = 'circle',
    size = 'default',
    src,
    srcSet,
    icon,
    className,
    // alt,
    // draggable,
    children,
    crossOrigin,
    ...others
  } = props;

  const shape = 'circle';
  // const size = customSize === 'default' ? groupSize : customSize;

  // const needResponsive = Object.keys(
  //   typeof size === 'object' ? size || {} : {}
  // ).some((key) => ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].includes(key));
  // const screens = useBreakpoint(needResponsive);
  // const responsiveSizeStyle: React.CSSProperties = React.useMemo(() => {
  //   if (typeof size !== 'object') {
  //     return {};
  //   }

  //   const currentBreakpoint: Breakpoint = responsiveArray.find(
  //     (screen) => screens[screen]
  //   )!;
  //   const currentSize = size[currentBreakpoint];

  //   return currentSize
  //     ? {
  //         width: currentSize,
  //         height: currentSize,
  //         lineHeight: `${currentSize}px`,
  //         fontSize: icon ? currentSize / 2 : 18,
  //       }
  //     : {};
  // }, [screens, size]);

  const prefixCls = getPrefixCls('avatar', customizePrefixCls);

  const sizeCls = classNames({
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-sm`]: size === 'small',
  });

  const hasImageElement = React.isValidElement(src);

  const classString = classNames(
    prefixCls,
    sizeCls,
    {
      [`${prefixCls}-${shape}`]: !!shape,
      [`${prefixCls}-image`]: hasImageElement || (src && isImgExist),
      [`${prefixCls}-icon`]: !!icon,
    },
    className
  );

  const sizeStyle: React.CSSProperties =
    typeof size === 'number'
      ? {
          width: size,
          height: size,
          lineHeight: `${size}px`,
          fontSize: icon ? size / 2 : 18,
        }
      : {};

  let childrenToRender: React.ReactNode;
  if (typeof src === 'string' && isImgExist) {
    childrenToRender = (
      <img
        src={src}
        // draggable={draggable}
        srcSet={srcSet}
        onError={handleImgLoadError}
        crossOrigin={crossOrigin}
      />
    );
  } else if (hasImageElement) {
    childrenToRender = src;
  } else if (icon) {
    childrenToRender = icon;
  } else if (mounted || scale !== 1) {
    const transformString = `scale(${scale}) translateX(-50%)`;
    const childrenStyle: React.CSSProperties = {
      msTransform: transformString,
      WebkitTransform: transformString,
      transform: transformString,
    };

    const sizeChildrenStyle: React.CSSProperties =
      typeof size === 'number'
        ? {
            lineHeight: `${size}px`,
          }
        : {};

    childrenToRender = (
      <span className={`${prefixCls}-string`} ref={avatarChildrenRef} style={{ ...sizeChildrenStyle, ...childrenStyle }}>
        {children}
      </span>
    );
  } else {
    childrenToRender = (
      <span className={`${prefixCls}-string`} style={{ opacity: 0 }} ref={avatarChildrenRef}>
        {children}
      </span>
    );
  }

  // The event is triggered twice from bubbling up the DOM tree.
  // see https://codesandbox.io/s/kind-snow-9lidz
  delete others.onError;

  return (
    <span {...others} style={{ ...sizeStyle, ...others.style }} className={classString}>
      {childrenToRender}
    </span>
  );
};

export default Avatar;
