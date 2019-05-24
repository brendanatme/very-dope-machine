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
import classNames from 'classnames';
import { connect } from 'react-redux';
import { connectToRecorder } from '../modules/player';
import { addLoop, removeLoop } from '../actions/loopActions';
import RecCircle from './RecCircle';
import styles from '../styles/components/recorder.css';

class Recorder extends React.Component {
  static propTypes = {
    recorder: PropTypes.object,
    addLoop: PropTypes.func,
    removeLoop: PropTypes.func
  }

  state = {
    isRecording: false
  }

  startRecording() {
    const { addLoop, removeLoop } = this.props;

    // pass props to recorder that recorder needs
    // since recorder is not hooked up to react/redux
    this.props.recorder.startRecording({
      addLoop,
      removeLoop,
      onStop: () => { this.setState({ isRecording: false }); }
    });

    // when we start recording,
    // we also start playing
    this.setState({ isRecording: true });
  }

  // stop recording
  // exit record mode
  // update state to reflect
  stopRecording() {
    this.props.recorder.stopRecording();
  }

  // when spacebar is pressed:
  // if recording, stop
  // else start recording
  toggleRecord = (e) => {
    e.preventDefault();

    if (this.state.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

  render() {
    const recBtn = classNames({
      [styles.record_btn]: true,
      [styles.is_recording]: this.state.isRecording
    });

    return (
      <div className={styles.footer}>
        <KeyHandler
          keyEventName={KEYUP}
          keyValue=" "
          onKeyHandle={this.toggleRecord}
        />
        <button className={recBtn}
          onClick={this.toggleRecord}>
          {this.state.isRecording && (<RecCircle />)}
          <div className={styles.overlay} />
          <span className={styles.btn_text}>REC</span>
        </button>
      </div>
    );
  }
}

const ReduxRecorder = connect(null, { addLoop, removeLoop })(Recorder);

export default connectToRecorder(ReduxRecorder);
