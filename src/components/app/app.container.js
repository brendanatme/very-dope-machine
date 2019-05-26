/**
 * app.container
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPlayer } from '../../store/player.state';
import AppComponent from './app.component';

class App extends React.Component {
  static propTypes = {
    createPlayer: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.createPlayer();
  }

  render() {
    return <AppComponent {...this.props} />;
  }
}

export default connect(null, { createPlayer })(App);
