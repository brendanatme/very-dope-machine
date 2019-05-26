import Immutable from 'immutable';
import { getPlayer } from '../effects/player';

// data
const loopsData = {};

// action types
export const ADD_LOOP = 'add_loop';
export const REMOVE_LOOP = 'remove_loop';

// actions

/**
 * addLoop
 *
 * add a loop to display
 * and add this loop to the player as well
 *
 * @param {{id: string, name: string, url: string}} payload
 */
export const addLoop = (payload) => ({
  type: ADD_LOOP,
  payload: {
    id: payload.id,
    name: payload.name,
  },
});

/**
 * removeLoop
 *
 * destroy loop on player object
 * and update UI
 *
 * @param {string} id loop id
 */
export const removeLoop = (id) => (dispatch) => {
  getPlayer().loopBusses[id].destroy();

  dispatch({
    type: REMOVE_LOOP,
    payload: id,
  });
};

// reducer
export const reducer = function(state = loopsData, { type, payload }) {
  state = Immutable.fromJS(state);
  switch (type) {
    case ADD_LOOP:
      return state
        .set(payload.id, payload)
        .toJS();
    case REMOVE_LOOP:
      return state
        .delete(payload)
        .toJS();
    default:
      return state.toJS();
  }
};
