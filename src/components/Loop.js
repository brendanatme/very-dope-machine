import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { connectToLoop } from '../modules/player';
import CloseButton from './CloseButton';
import PlayButton from './PlayButton';
import { removeLoop } from '../actions/loopActions';
import styles from '../styles/components/loop.css';

class Loop extends Component {
  static propTypes = {
    removeLoop: PropTypes.func,
    channel: PropTypes.object,
    name: PropTypes.string,
    id: PropTypes.string
  }

  constructor(props) {
    super(props);

    this.handlePlay = this.handlePlay.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  state = {
    isPlaying: false
  }

  handlePlay(e) {
    e.preventDefault();
    this.state.isPlaying?
      this.props.channel.stop():
      this.props.channel.play();

    this.setState({
      isPlaying: !this.state.isPlaying
    });
  }

  handleClose(e) {
    e.preventDefault();
    this.props.channel.destroy();
    this.props.removeLoop(this.props.id);
  }

  render() {
    return(
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
