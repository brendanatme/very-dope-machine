//
// writeToStorage
//
// after an action is dispatched and reduced,
// write store to localStorage
//
import Lockr from 'lockr';

import { NAMESPACE } from '../constants/appKeys';
import { ADD_PRESET, LOAD_PRESET } from '../constants/actionTypes';

export default function writeToStorageFactory(excludeReducers) {
  return ({ getState }) => next => action => {
    if (action.type !== ADD_PRESET && action.type !== LOAD_PRESET) {
      return next(action);
    } else {
      next(action);
    }

    let state = getState();

    if (action.type === ADD_PRESET) {
      const filteredState = Object.keys(state)
      .filter(key => !excludeReducers.includes(key))
      .reduce((obj, key) => {
        obj[key] = state[key];
        return obj;
      }, {});

      Lockr.set(`${NAMESPACE}_${action.payload}`, filteredState);
      Lockr.set(`${NAMESPACE}_presets`, state.presets);
    }

    if (action.type === LOAD_PRESET) {
      Lockr.set(`${NAMESPACE}_presets`, state.presets);
    }
  };
}
