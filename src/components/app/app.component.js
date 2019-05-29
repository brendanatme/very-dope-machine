/**
 * app.component
 */
import React from 'react';
import { Route } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import { Routes } from '../../constants';
import transition from '../../styles/mixins/page.css';
import DrumPadScreen from '../drum-pad-screen';
import KitSwitcherScreen from '../kit-switcher-screen';
import PresetsScreen from '../presets-screen';
import Nav from '../nav';
import styles from './app.component.css';
import WelcomeModal from '../welcome-modal';

const App = () => (
  <div className={styles.app}>
    <Nav />
    <main role="main" className={styles.main}>
      <CSSTransitionGroup
        transitionName={transition}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={250}>
        <Route path={Routes.PADS} component={DrumPadScreen} exact={true} />
        <Route path={Routes.KITS} component={KitSwitcherScreen} />
        <Route path={Routes.PRESETS} component={PresetsScreen} />
      </CSSTransitionGroup>
    </main>
    <WelcomeModal />
  </div>
);

export default App;
