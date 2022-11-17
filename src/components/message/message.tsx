import React from 'react';
import { IconClose, IconProps } from '../icon';
import { tuple } from '../_util/type';
import { iconPrefixCls } from '../_util';
import classNames from 'classnames';
import RCNotification from 'rc-notification';
import { IconAreaYes } from '../icon/components/icon-area-success';
import { IconAreaInfo } from '../icon/components/icon-area-info';
import { IconAreaError } from '../icon/components/icon-area-error';
import type { NoticeContent, NotificationInstance as RCNotificationInstance } from 'rc-notification/lib/Notification';
import { BaseProps } from '../../types/index';
import { globalConfig } from '../config-provider/index';
import './style/index.less';

export type MessageType = PromiseLike<any>;
export interface ThenableArgument {
  (val: any): void;
}

export const typeList = tuple('info', 'success', 'error', 'warning', 'loading');
export type NoticeType = typeof typeList[number];
// export const typeLissat = Object.keys(typeToIcon) as NoticeType[];
type ConfigContent = React.ReactNode;
type ConfigDuration = number | (() => void);
type JointContent = ConfigContent | ArgsProps;
export type ConfigOnClose = () => void;

export interface ArgsProps extends BaseProps {
  content: any;
  duration?: number;
  type?: NoticeType;
  rootPrefixCls?: string;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  onClose?: () => void;
  icon?: React.ReactNode;
  key?: string | number;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export interface MessageInstance {
  info(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
  success(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
  error(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
  warning(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
  loading(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
  open(args: ArgsProps): MessageType;
}

export interface MessageApi extends MessageInstance {
  warn(content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose): MessageType;
  config(options: ConfigOptions): void;
  destroy(messageKey?: React.Key): void;
  useMessage(): [MessageInstance, React.ReactElement];
}

export interface ConfigOptions {
  top?: number;
  duration?: number;
  prefixCls?: string;
  getContainer?: () => HTMLElement;
  transitionName?: string;
  maxCount?: number;
}

const typeToIcon = {
  success: IconAreaYes,
  info: IconAreaInfo,
  error: IconAreaError,
  warning: IconAreaInfo,
  // loading: IconClose,
};

let messageInstance: RCNotificationInstance | null;
let defaultDuration = 3;
let defaultTop: number;
let key = 1;
let localPrefixCls = '';
let transitionName = 'move-up';
let hasTransitionName = false;
let getContainer: () => HTMLElement;
let maxCount: number;

export function getKeyThenIncreaseKey() {
  return key++;
}

function getRCNotificationInstance(
  args: ArgsProps,
  callback: (info: { prefixCls: string; rootPrefixCls: string; instance: RCNotificationInstance }) => void
) {
  const { prefixCls: customizePrefixCls, getPopupContainer: getContextPopupContainer } = args;
  const { getPrefixCls, getRootPrefixCls } = globalConfig();
  const prefixCls = getPrefixCls('message', customizePrefixCls);
  const rootPrefixCls = getRootPrefixCls(args.rootPrefixCls, prefixCls);

  if (messageInstance) {
    callback({
      prefixCls,
      rootPrefixCls,
      instance: messageInstance,
    });
    return;
  }

  const instanceConfig = {
    prefixCls,
    transitionName: hasTransitionName ? transitionName : `${rootPrefixCls}-${transitionName}`,
    style: { top: defaultTop }, // 覆盖原来的样式
    getContainer: getContainer || getContextPopupContainer,
    maxCount,
  };

  RCNotification.newInstance(instanceConfig, (instance: any) => {
    if (messageInstance) {
      callback({
        prefixCls,
        rootPrefixCls,
        instance: messageInstance,
      });
      return;
    }
    messageInstance = instance;
    callback({ prefixCls, rootPrefixCls, instance });
  });
}

function getRCNoticeProps(args: ArgsProps, prefixCls: string): NoticeContent {
  const duration = args.duration !== undefined ? args.duration : defaultDuration;
  const IconComponent = typeToIcon[args.type!]({
    className: iconPrefixCls,
  });
  const messageClass = classNames(`${prefixCls}-custom-content`, {
    [`${prefixCls}-${args.type}`]: args.type,
  });
  return {
    key: args.key,
    duration,
    style: args.style || {},
    className: args.className,
    content: (
      // <ConfigProvider iconPrefixCls={iconPrefixCls}>
      <div className={messageClass}>
        {args.icon || IconComponent}
        <span>{args.content}</span>
      </div>
      // </ConfigProvider>
    ),
    onClose: args.onClose,
    onClick: args.onClick,
  };
}

function notice(args: ArgsProps): MessageType {
  const target = args.key || getKeyThenIncreaseKey();
  const closePromise = new Promise((resolve) => {
    const callback = () => {
      if (typeof args.onClose === 'function') {
        args.onClose();
      }
      return resolve(true);
    };
    getRCNotificationInstance(args, ({ prefixCls, instance }) => {
      instance.notice(getRCNoticeProps({ ...args, key: target, onClose: callback }, prefixCls));
    });
  });
  const result: any = () => {
    if (messageInstance) {
      messageInstance.removeNotice(target);
    }
  };
  result.then = (filled: ThenableArgument, rejected: ThenableArgument) => closePromise.then(filled, rejected);
  result.promise = closePromise;

  return result;
}

function isArgsProps(content: JointContent): content is ArgsProps {
  return Object.prototype.toString.call(content) === '[object Object]' && !!(content as ArgsProps).content;
}

export function attachTypeApi(originalApi: MessageApi, type: NoticeType) {
  originalApi[type] = (content: JointContent, duration?: ConfigDuration, onClose?: ConfigOnClose) => {
    if (isArgsProps(content)) {
      return originalApi.open({ ...content, type });
    }

    if (typeof duration === 'function') {
      onClose = duration;
      duration = undefined;
    }

    return originalApi.open({ content, duration, type, onClose });
  };
}

function setMessageConfig(options: ConfigOptions) {
  if (options.top !== undefined) {
    defaultTop = options.top;
    messageInstance = null; // delete messageInstance for new defaultTop
  }
  if (options.duration !== undefined) {
    defaultDuration = options.duration;
  }

  if (options.prefixCls !== undefined) {
    localPrefixCls = options.prefixCls;
  }
  if (options.getContainer !== undefined) {
    getContainer = options.getContainer;
    messageInstance = null; // delete messageInstance for new getContainer
  }
  if (options.transitionName !== undefined) {
    transitionName = options.transitionName;
    messageInstance = null; // delete messageInstance for new transitionName
    hasTransitionName = true;
  }
  if (options.maxCount !== undefined) {
    maxCount = options.maxCount;
    messageInstance = null;
  }
}

export const message: any = {
  open: notice,
  config: setMessageConfig,
  destroy(messageKey?: React.Key) {
    if (messageInstance) {
      if (messageKey) {
        const { removeNotice } = messageInstance;
        removeNotice(messageKey);
      } else {
        const { destroy } = messageInstance;
        destroy();
        messageInstance = null;
      }
    }
  },
};

typeList.forEach((type) => attachTypeApi(message, type));

message.warn = message.warning;

export default message as MessageApi;
