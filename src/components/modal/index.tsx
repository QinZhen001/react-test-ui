import type { ModalStaticFunctions } from './confirm';
import confirm, { withConfirm, withError, withInfo, withSuccess, withWarn } from './confirm';
// import destroyFns from './destroyFns';
import type { ModalFuncProps } from './Modal';
import OriginModal from './Modal';
// import useModal from './useModal';

// export { ModalFuncProps, ModalProps } from './Modal';

function modalWarn(props: ModalFuncProps) {
  return confirm(withWarn(props));
}

type ModalType = typeof OriginModal &
  ModalStaticFunctions & {
    // useModal: typeof useModal;
    destroyAll: () => void;
    // config: typeof modalGlobalConfig;
  };

export const Modal = OriginModal as ModalType;

// Modal.useModal = useModal;

Modal.info = function infoFn(props: ModalFuncProps) {
  return confirm(withInfo(props));
};

Modal.success = function successFn(props: ModalFuncProps) {
  return confirm(withSuccess(props));
};

Modal.error = function errorFn(props: ModalFuncProps) {
  return confirm(withError(props));
};

Modal.warning = modalWarn;
Modal.warn = modalWarn;

Modal.confirm = function confirmFn(props: ModalFuncProps) {
  return confirm(withConfirm(props));
};

Modal.destroyAll = function destroyAllFn() {
  while (destroyFns.length) {
    const close = destroyFns.pop();
    if (close) {
      close();
    }
  }
};

// Modal.config = modalGlobalConfig;

export default Modal;
