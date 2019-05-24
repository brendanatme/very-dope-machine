import React, { cloneElement } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Nav from './Nav';
import Modal from './Modal';
import { createPlayer } from '../modules/player';
import channelData from '../data/channels.json';
import styles from '../styles/components/app.css';
import transition from '../styles/mixins/page.css';


const App = props => {
  const path = props.location.pathname;

  return (
    <div className={styles.app}>
      <Nav />
      <main role="main" className={styles.main}>
        <ReactCSSTransitionGroup
          transitionName={transition}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={250}>
          {cloneElement(props.children, { key: path })}
        </ReactCSSTransitionGroup>
      </main>
      <Modal />
    </div>
  );
};

export default createPlayer(channelData)(App);
