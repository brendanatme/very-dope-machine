import Immutable from 'immutable';
import modalData from '../data/modal.json';
import {
  OPEN_MODAL,
  CLOSE_MODAL
} from '../constants/actionTypes';

export default function(state = modalData, { type, payload }) {
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
}
