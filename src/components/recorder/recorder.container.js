/**
 * recorder.container
 */
//
// Recorder
//
// allow user to record loops
// start stop recording by pressing space
// or clicking button
//
// connect to recorder audio resource
// which gives access to:
// - this.props.recorder.startRecording(onRecordingStop)
// - this.props.recorder.stopRecording()
// - this.props.recorder.play()
// - this.props.recorder.pause()
//
import React from 'react';
import PropTypes from 'prop-types';
import KeyHandler, { KEYUP } from 'react-key-handler';
import { connect } from 'react-redux';
import { startRecording, stopRecording } from '../../store/player.state';
import RecCircle from '../rec-circle';
import styles from './recorder.component.css';

class Recorder extends React.Component {
  static propTypes = {
    startRecording: PropTypes.func,
    stopRecording: PropTypes.func
  }

  state = {
    isRecording: false
  }

  startRecording() {
    this.props.startRecording(() => {
      this.setState({ isRecording: false });
    });

    this.setState({ isRecording: true });
  }

  /**
   * stop recording
   * exit record mode
   * update state to reflect
   */
  stopRecording() {
    this.props.stopRecording();
  }

  /**
   * when spacebar is pressed:
   * if recording, stop
   * else start recording
   */
  toggleRecord = (e) => {
    e.preventDefault();

    if (this.state.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

  render() {
    return (
      <div className={styles.recorder}>
        <KeyHandler
          keyEventName={KEYUP}
          keyValue=" "
          onKeyHandle={this.toggleRecord}
        />
        <button
          className={`${styles.record_btn} ${this.state.isRecording ? styles.is_recording : ''}`}
          onClick={this.toggleRecord}
        >
          {this.state.isRecording && (<RecCircle />)}
          <div className={styles.overlay} />
          <span className={styles.btn_text}>REC</span>
        </button>
      </div>
    );
  }
}

export default connect(null, { startRecording, stopRecording })(Recorder);
