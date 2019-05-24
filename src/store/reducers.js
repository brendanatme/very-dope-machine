import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import channelsReducer from '../reducers/channelsReducer';
import presetsReducer from '../reducers/presetsReducer';
import modalReducer from '../reducers/modalReducer';
import * as kits from './kits.state';
import * as loops from './loops.state';
import * as pads from './pads.state';

export const rootReducer = combineReducers({
  channels: channelsReducer,
  kits: kits.reducer,
  loops: loops.reducer,
  modal: modalReducer,
  pads: pads.reducer,
  presets: presetsReducer,
  routing: routerReducer,
});
