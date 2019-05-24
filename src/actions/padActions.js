import {
  UPDATE_PAD
} from '../constants/actionTypes';

// update a pad's settings
// include the pad's ID
// @param pad {Object}
export function updatePad(pad) {
  return {
    type: UPDATE_PAD,
    payload: pad
  };
}
