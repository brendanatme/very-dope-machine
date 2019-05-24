import {
  ADD_SOUND,
  PLAY_SOUND,
  STOP_SOUND,
  UPDATE_SOUND,
  REMOVE_SOUND
} from '../constants/actionTypes';

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
