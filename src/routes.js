import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import DrumPadScreen from './components/drum-pad-screen';
import KitSwitcher from './components/kit-switcher';
import Presets from './components/Presets';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={DrumPadScreen} />
    <Route path="kits" component={KitSwitcher} />
    <Route path="presets" component={Presets} />
  </Route>
);
