import Immutable from 'immutable';

// data
const loopsData = {};

// action types
export const ADD_LOOP = 'add_loop';
export const REMOVE_LOOP = 'remove_loop';

// actions
export const addLoop = (payload) => ({
  type: ADD_LOOP,
  payload,
});

export const removeLoop = (payload) => ({
  type: REMOVE_LOOP,
  payload,
});

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
