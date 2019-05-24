import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import DrumPadScreen from './components/drum-pad-screen';
import KitSwitcherScreen from './components/kit-switcher-screen';
import PresetsScreen from './components/presets-screen';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={DrumPadScreen} />
    <Route path="kits" component={KitSwitcherScreen} />
    <Route path="presets" component={PresetsScreen} />
  </Route>
);
