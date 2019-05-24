import Immutable from 'immutable';
import presetData from '../data/presets.json';
import {
  ADD_PRESET,
  REMOVE_PRESET,
  LOAD_PRESET
} from '../constants/actionTypes';

export default function(state = presetData, { type, payload }) {
  state = Immutable.fromJS(state);
  switch (type) {
    case ADD_PRESET:
      return state
        .updateIn(['all'], arr => arr.push(payload))
        .toJS();
    case REMOVE_PRESET:
      return state
        .updateIn(['all'], arr => arr.filter((val, i) => i !== payload))
        .toJS();
    case LOAD_PRESET:
      return state
        .set('selected', payload)
        .toJS();
    default:
      return state.toJS();
  }
}
