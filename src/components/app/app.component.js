/**
 * app.component
 */
import React from 'react';
import { Route } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import { createPlayer } from '../../modules/player';
import { Routes } from '../../constants';
import bussesData from '../../data/busses.json';
import transition from '../../styles/mixins/page.css';
import DrumPadScreen from '../drum-pad-screen';
import KitSwitcherScreen from '../kit-switcher-screen';
import PresetsScreen from '../presets-screen';
import Nav from '../nav';
import Modal from '../modal';
import styles from './app.component.css';

const App = () => (
  <div className={styles.app}>
    <Nav />
    <main role="main" className={styles.main}>
      <CSSTransitionGroup
        transitionName={transition}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={250}>
        <Route exact={true} path={Routes.PADS} component={DrumPadScreen} />
        <Route path={Routes.KITS} component={KitSwitcherScreen} />
        <Route path={Routes.PRESETS} component={PresetsScreen} />
      </CSSTransitionGroup>
    </main>
    <Modal />
  </div>
);

export default createPlayer(bussesData)(App);
