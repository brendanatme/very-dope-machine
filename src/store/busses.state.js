import Immutable from 'immutable';
import bussesData from '../data/busses.json';

// action types
export const ADD_SOUND = 'add_sound';
export const PLAY_SOUND = 'play_sound';
export const STOP_SOUND = 'stop_sound';
export const UPDATE_SOUND = 'update_sound';
export const REMOVE_SOUND = 'remove_sound';
export const BUS_DUMP = 'bus_dump';

// actions
// NOTE: none of these are being used. Why are they here
export const addSound = (soundSettings) => ({
  type: ADD_SOUND,
  payload: soundSettings
});

export const playSound = (soundSettings) => ({
  type: PLAY_SOUND,
  payload: soundSettings
});

export const updateSound = (soundSettings) => ({
  type: UPDATE_SOUND,
  payload: soundSettings
});

export const removeSound = (soundSettings) => ({
  type: REMOVE_SOUND,
  payload: soundSettings
});

export const stopCurrentSound = (id) => ({
  type: STOP_SOUND,
  payload: id
});

// reducer
export const reducer = function(state = bussesData, { type, payload }) {
  state = Immutable.fromJS(state);
  switch (type) {
    case REMOVE_SOUND:
      return state.deleteIn([
        payload.busId,
        'inputs'
      ], payload.id).toJS();
    case ADD_SOUND:
      return state.setIn([
        payload.busId,
        'inputs',
        payload.id
      ], payload).toJS();
    case PLAY_SOUND:
      return state.updateIn([
        payload.busId,
        'play'
      ], () => payload.id).toJS();
    case UPDATE_SOUND:
      return state.updateIn([
        payload.busId,
        'inputs',
        payload.id
      ], () => payload).toJS();
    case STOP_SOUND:
      return state.updateIn([
        payload,
        'play'
      ], () => '').toJS();
    case BUS_DUMP:
      return payload;
    default:
      return state.toJS();
  }
};
