import Immutable from 'immutable';
import kitsData from '../data/kits.json';
import {
  SWITCH_KIT,
  KIT_DUMP
} from '../constants/actionTypes';

export default function(state = kitsData, { type, payload }) {
  state = Immutable.fromJS(state);
  switch (type) {
    case SWITCH_KIT:
      return state.set('selected', payload).toJS();
    case KIT_DUMP:
      return payload;
    default:
      return state.toJS();
  }
}
