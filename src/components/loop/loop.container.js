/**
 * loop.container
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { connectToLoop } from '../../modules/player';
import { removeLoop } from '../../store/loops.state';
import CloseButton from '../close-button';
import PlayButton from '../play-button';
import styles from './loop.component.css';

class Loop extends React.Component {
  static propTypes = {
    bus: PropTypes.object,
    id: PropTypes.string,
    name: PropTypes.string,
    removeLoop: PropTypes.func,
  }

  state = {
    isPlaying: false,
  }

  handlePlay = (e) => {
    e.preventDefault();

    this.state.isPlaying
      ? this.props.bus.stop()
      : this.props.bus.play();

    this.setState({
      isPlaying: !this.state.isPlaying,
    });
  }

  handleClose = (e) => {
    e.preventDefault();

    this.props.bus.destroy();
    this.props.removeLoop(this.props.id);
  }

  render() {
    return (
      <div className={styles.loop}>
        <div>{this.props.name}</div>
        <CloseButton handleClick={this.handleClose} />
        <PlayButton
          isPlaying={this.state.isPlaying}
          handleClick={this.handlePlay}
        />
      </div>
    );
  }
}

const connectedLoop = connectToLoop(Loop);

export default connect(null, { removeLoop })(connectedLoop);
