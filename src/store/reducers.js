import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as busses from './busses.state';
import * as kits from './kits.state';
import * as loops from './loops.state';
import * as pads from './pads.state';
import * as player from './player.state';
import * as presets from './presets.state';

export const rootReducer = combineReducers({
  busses: busses.reducer,
  kits: kits.reducer,
  loops: loops.reducer,
  pads: pads.reducer,
  player: player.reducer,
  presets: presets.reducer,
  routing: routerReducer,
});
