import Immutable from 'immutable';
import loopsData from '../data/loops.json';
import {
  ADD_LOOP,
  REMOVE_LOOP
} from '../constants/actionTypes';

export default function(state = loopsData, { type, payload }) {
  state = Immutable.fromJS(state);
  switch (type) {
    case ADD_LOOP:
      return state
        .set(payload.id, payload)
        .toJS();
    case REMOVE_LOOP:
      return state
        .delete(payload)
        .toJS();
    default:
      return state.toJS();
  }
}
