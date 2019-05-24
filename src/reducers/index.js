import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import padsReducer from './padsReducer';
import kitsReducer from './kitsReducer';
import channelsReducer from './channelsReducer';
import loopsReducer from './loopsReducer';
import presetsReducer from './presetsReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  pads: padsReducer,
  kits: kitsReducer,
  channels: channelsReducer,
  loops: loopsReducer,
  presets: presetsReducer,
  modal: modalReducer
});

export default rootReducer;
