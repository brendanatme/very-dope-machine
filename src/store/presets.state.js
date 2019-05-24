import Lockr from 'lockr';
import Immutable from 'immutable';
import { NAMESPACE } from '../constants';
import { PAD_DUMP } from './pads.state';
import { KIT_DUMP } from './kits.state';
import { CHANNEL_DUMP } from './channels.state';

// data
const presetData = {
  all: [],
  selected: 0,
};

// action types
export const ADD_PRESET = 'add_preset';
export const REMOVE_PRESET = 'remove_preset';
export const LOAD_PRESET = 'load_preset';

// actions
// localStorage added in middelware/writeToStorage
export const addPreset = (i) => ({
  type: ADD_PRESET,
  payload: i,
});

export const removePreset = (i) => {
  Lockr.rm(`${NAMESPACE}_${i}`);

  return {
    type: REMOVE_PRESET,
    payload: i,
  };
};

const loadPresetAction = (i) => ({
  type: LOAD_PRESET,
  payload: i,
});

// thunk
export const loadPreset = (i) => {
  const {
    kits,
    pads,
    channels
  } = Lockr.get(`${NAMESPACE}_${i}`);

  return dispatch => {
    dispatch({
      type: KIT_DUMP,
      payload: kits
    });

    dispatch({
      type: PAD_DUMP,
      payload: pads
    });

    dispatch({
      type: CHANNEL_DUMP,
      payload: channels,
    });

    dispatch(loadPresetAction(i));
  };
};

export const reducer = function(state = presetData, { type, payload }) {
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
};
