import Immutable from 'immutable';
import padData from '../data/pads.json';
import {
  UPDATE_PAD,
  PAD_DUMP
} from '../constants/actionTypes';

export default function(state = padData, { type, payload }) {
  state = Immutable.fromJS(state);
  switch (type) {
    case UPDATE_PAD:
      return state.mergeIn(payload.id, payload).toJS();
    case PAD_DUMP:
      return payload;
    default:
      return state.toJS();
  }
}
