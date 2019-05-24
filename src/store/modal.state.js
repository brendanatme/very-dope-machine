import Immutable from 'immutable';

// data
const modalData = {
  isOpen: false,
  content: null,
};

// action types
export const OPEN_MODAL = 'open_modal';
export const CLOSE_MODAL = 'close_modal';

// actions
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
};

export const openModal = (content) => ({
  type: OPEN_MODAL,
  payload: content
});

// reducer
export const reducer = function(state = modalData, { type, payload }) {
  state = Immutable.fromJS(state);
  switch (type) {
    case OPEN_MODAL:
      return state
        .set('isOpen', true)
        .set('content', payload)
        .toJS();
    case CLOSE_MODAL:
      return state
        .set('isOpen', false)
        .set('content', null)
        .toJS();
    default:
      return state.toJS();
  }
};
