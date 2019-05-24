import {
  CLOSE_MODAL,
  OPEN_MODAL
} from '../constants/actionTypes';

export const closeModal = (onClose) => {
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

export const openModal = (content) => ({
  type: OPEN_MODAL,
  payload: content
});
