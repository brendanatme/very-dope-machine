import Lockr from 'lockr';
import { NAMESPACE } from '../constants/appKeys';
import {
  ADD_PRESET,
  REMOVE_PRESET,
  LOAD_PRESET,
  KIT_DUMP,
  PAD_DUMP,
  CHANNEL_DUMP
} from '../constants/actionTypes';

// localStorage added in middelware/writeToStorage
export function addPreset(i) {
  return {
    type: ADD_PRESET,
    payload: i
  };
}

export function removePreset(i) {
  Lockr.rm(`${NAMESPACE}_${i}`);

  return {
    type: REMOVE_PRESET,
    payload: i
  };
}

function loadPresetAction(i) {
  return {
    type: LOAD_PRESET,
    payload: i
  };
}

// thunk
export function loadPreset(i) {
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
      payload: channels
    });

    dispatch(loadPresetAction(i));
  };
}
