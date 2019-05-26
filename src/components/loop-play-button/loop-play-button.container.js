/**
 * loop-play-button.container
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { playAll, stopAll } from '../../store/player.state';
import PlayButton from '../play-button';
import styles from './loop-play-button.component.css';

class LoopPlayButton extends React.Component {
  static propTypes = {
    playAll: PropTypes.func,
    stopAll: PropTypes.func,
  }

  state = {
    isPlaying: false,
  }

  handlePlay = (e) => {
    e.preventDefault();

    this.state.isPlaying
      ? this.props.stopAll()
      : this.props.playAll();

    this.setState({
      isPlaying: !this.state.isPlaying,
    });
  }

  render() {
    return (
      <div className={styles.z3}>
        <PlayButton
          handleClick={this.handlePlay}
          isPlaying={this.state.isPlaying}
        />
      </div>
    );
  }
}

export default connect(null, { playAll, stopAll })(LoopPlayButton);
