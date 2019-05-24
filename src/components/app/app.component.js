/**
 * app.component
 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { createPlayer } from '../../modules/player';
import channelData from '../../data/channels.json';
import transition from '../../styles/mixins/page.css';
import Nav from '../nav';
import Modal from '../modal';
import styles from './app.component.css';

const App = props => (
  <div className={styles.app}>
    <Nav />
    <main role="main" className={styles.main}>
      <ReactCSSTransitionGroup
        transitionName={transition}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={250}>
        {React.cloneElement(props.children, { key: props.location.pathname })}
      </ReactCSSTransitionGroup>
    </main>
    <Modal />
  </div>
);

App.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object,
};

export default createPlayer(channelData)(App);
