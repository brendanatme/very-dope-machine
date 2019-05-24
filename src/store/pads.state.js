import Immutable from 'immutable';
import padData from '../data/pads.json';

export const UPDATE_PAD = 'update_pad';
export const PAD_DUMP = 'pad_dump';

// update a pad's settings
// include the pad's ID
// @param pad {Object}
export const updatePad = (pad) => ({
  type: UPDATE_PAD,
  payload: pad,
});

export const reducer = function(state = padData, { type, payload }) {
  state = Immutable.fromJS(state);
  switch (type) {
    case UPDATE_PAD:
      return state.mergeIn(payload.id, payload).toJS();
    case PAD_DUMP:
      return payload;
    default:
      return state.toJS();
  }
};
