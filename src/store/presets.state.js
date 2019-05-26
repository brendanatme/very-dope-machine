import Lockr from 'lockr';
import Immutable from 'immutable';
import { NAMESPACE } from '../constants';
import { BUS_DUMP } from './busses.state';
import { PAD_DUMP } from './pads.state';
import { PLAYER_DUMP } from './player.state';
import { KIT_DUMP } from './kits.state';

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
    busses,
    kits,
    pads,
    player,
  } = Lockr.get(`${NAMESPACE}_${i}`);

  return dispatch => {
    dispatch({
      payload: kits,
      type: KIT_DUMP,
    });

    dispatch({
      payload: pads,
      type: PAD_DUMP,
    });

    dispatch({
      payload: busses,
      type: BUS_DUMP,
    });

    dispatch({
      payload: player,
      type: PLAYER_DUMP,
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
