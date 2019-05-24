import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as channels from './channels.state';
import * as kits from './kits.state';
import * as loops from './loops.state';
import * as modal from './modal.state';
import * as pads from './pads.state';
import * as presets from './presets.state';

export const rootReducer = combineReducers({
  channels: channels.reducer,
  kits: kits.reducer,
  loops: loops.reducer,
  modal: modal.reducer,
  pads: pads.reducer,
  presets: presets.reducer,
  routing: routerReducer,
});
