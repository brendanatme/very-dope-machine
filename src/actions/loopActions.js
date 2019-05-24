import {
  ADD_LOOP,
  REMOVE_LOOP
} from '../constants/actionTypes';

export function addLoop(payload) {
  return {
    type: ADD_LOOP,
    payload
  };
}

export function removeLoop(payload) {
  return {
    type: REMOVE_LOOP,
    payload
  };
}
