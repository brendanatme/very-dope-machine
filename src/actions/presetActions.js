import Lockr from 'lockr';
import { NAMESPACE } from '../constants/appKeys';
import { PAD_DUMP } from '../store/pads.state';
import { KIT_DUMP } from '../store/kits.state';
import {
  ADD_PRESET,
  REMOVE_PRESET,
  LOAD_PRESET,
  CHANNEL_DUMP,
} from '../constants/actionTypes';

// localStorage added in middelware/writeToStorage
export const addPreset = (i) => {
  return {
    type: ADD_PRESET,
    payload: i
  };
};

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
      payload: channels
    });

    dispatch(loadPresetAction(i));
  };
};
