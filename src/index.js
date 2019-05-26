/* eslint-disable import/default */
import React from 'react';
import Lockr from 'lockr';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from './store';
import { NAMESPACE } from './constants';
import { LOAD_PRESET } from './store/presets.state';
import { SWITCH_KIT } from './store/kits.state';
import App from './components/app';
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
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('app')
);
