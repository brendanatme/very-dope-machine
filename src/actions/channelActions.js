import {
  ADD_SOUND,
  PLAY_SOUND,
  STOP_SOUND,
  UPDATE_SOUND,
  REMOVE_SOUND
} from '../constants/actionTypes';

export function addSound(soundSettings) {
  return {
    type: ADD_SOUND,
    payload: soundSettings
  };
}

export function playSound(soundSettings) {
  return {
    type: PLAY_SOUND,
    payload: soundSettings
  };
}

export function updateSound(soundSettings) {
  return {
    type: UPDATE_SOUND,
    payload: soundSettings
  };
}

export function removeSound(soundSettings) {
  return {
    type: REMOVE_SOUND,
    payload: soundSettings
  };
}

export function stopCurrentSound(id) {
  return {
    type: STOP_SOUND,
    payload: id
  };
}
