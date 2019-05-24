import {
  CLOSE_MODAL,
  OPEN_MODAL
} from '../constants/actionTypes';

export function closeModal(onClose) {
  if (onClose && typeof onClose === 'function') {
    onClose();
  }

  return {
    type: CLOSE_MODAL,
    payload: {
      content: null
    }
  };
}

export function openModal(content) {
  return {
    type: OPEN_MODAL,
    payload: content
  };
}
