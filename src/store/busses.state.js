import Immutable from 'immutable';
import bussesData from '../data/busses.json';

// action types
export const BUS_DUMP = 'bus_dump';

// reducer
export const reducer = function(state = bussesData, { type, payload }) {
  state = Immutable.fromJS(state);
  switch (type) {
    case BUS_DUMP:
      return payload;
    default:
      return state.toJS();
  }
};
