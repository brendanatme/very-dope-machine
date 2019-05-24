/* eslint-disable import/default */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import Lockr from 'lockr';
import { configureStore } from './store';
import routes from './routes';
import { NAMESPACE } from './constants/appKeys';
import { LOAD_PRESET } from './constants/actionTypes';
import { SWITCH_KIT } from './store/kits.state';
require('./favicon.ico'); // Tell webpack to load favicon.ico
import './styles/global.css'; // Import global CSS (ignore CSS Modules)

// initialize store data
const presets = Lockr.get(`${NAMESPACE}_presets`);
const store = configureStore({ presets });
const { kits } = store.getState();
store.dispatch({
  type: SWITCH_KIT,
  payload: kits.selected,
});
if (presets && presets.all) {
  store.dispatch({
    type: LOAD_PRESET,
    payload: presets.selected,
  });
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('app')
);
