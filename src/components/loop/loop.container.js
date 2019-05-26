/**
 * loop.container
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withLoop } from '../../effects/player';
import { removeLoop } from '../../store/loops.state';
import CloseButton from '../close-button';
import PlayButton from '../play-button';
import styles from './loop.component.css';

class Loop extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    loop: PropTypes.object,
    name: PropTypes.string,
    removeLoop: PropTypes.func,
  }

  state = {
    isPlaying: false,
  }

  handlePlay = (e) => {
    e.preventDefault();

    this.state.isPlaying
      ? this.props.loop.stop()
      : this.props.loop.play();

    this.setState({
      isPlaying: !this.state.isPlaying,
    });
  }

  handleClose = (e) => {
    e.preventDefault();

    /**
     * TODO: destroying the bus is a side-effect
     * it should happen as part of the removeLoop action
     */
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

const connectedLoop = withLoop(Loop);

export default connect(null, { removeLoop })(connectedLoop);
