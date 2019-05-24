import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import DrumPadScreen from './components/DrumPadScreen';
import KitSwitcher from './components/KitSwitcher';
import Presets from './components/Presets';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={DrumPadScreen} />
    <Route path="kits" component={KitSwitcher} />
    <Route path="presets" component={Presets} />
  </Route>
);
