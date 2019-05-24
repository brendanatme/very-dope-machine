import React, { Component, PropTypes } from 'react';
import KeyHandler, { KEYDOWN, KEYUP } from 'react-key-handler';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { connectToPlayer } from '../modules/player';
import { openModal } from '../actions/modalActions';
import MidiConnection from './MidiConnection';
import PadCircle from './PadCircle';
import styles from '../styles/components/drum_pad.css';

let HAS_TOUCH = false;
const getTouch = function() {
  HAS_TOUCH = true;
  window.removeEventListener('touchstart', getTouch);
};
window.addEventListener('touchstart', getTouch);

class DrumPad extends Component {
  static propTypes = {
    id: PropTypes.string,
    src: PropTypes.string,
    inputKey: PropTypes.string,
    channelId: PropTypes.string,
    volume: PropTypes.number,
    openModal: PropTypes.func,
    playSound: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.bindKeys = this.bindKeys.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    isPressed: false,
    isEditing: false
  }

  handleClick(e) {
    e.preventDefault();

    if (HAS_TOUCH) {
      this.handleKeyDown();
      return this.handleKeyUp();
    }

    this.setState({ isEditing: true });

    this.props.openModal({
      type: 'DrumPadForm',
      props: {
        id: this.props.id
      },
      onClose: () => this.setState({ isEditing: false })
    });
  }

  handleKeyDown() {
    // prevent unwanted drum rolls
    if (this.state.isPressed) {
      return;
    }

    // imperatively call animation and audio play
    this.props.playSound();
    this.anim.play();

    this.setState({ isPressed: true });
  }

  handleKeyUp() {
    this.setState({ isPressed: false });
  }

  bindKeys() {
    if (this.props.inputKey) {
      return (
        <div>
          <KeyHandler
            keyEventName={KEYDOWN}
            keyValue={this.props.inputKey}
            onKeyHandle={this.handleKeyDown}
          />
          <KeyHandler
            keyEventName={KEYUP}
            keyValue={this.props.inputKey}
            onKeyHandle={this.handleKeyUp}
          />
        </div>
      );
    }
  }

  render() {
    const cssState = classNames({
      [styles.drum_pad]: true,
      [styles.is_pressed]: this.state.isPressed,
      [styles.is_editing]: this.state.isEditing,
      [styles.has_touch]: HAS_TOUCH
    });

    // need reference to circle
    // to imperatively call animations
    // on keyDown
    return (
      <div
        onClick={this.handleClick}
        className={cssState}>
        {this.bindKeys()}
        <MidiConnection
          inputKey={this.props.midiInput}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
        />
        <PadCircle ref={circle => {this.anim = circle;}} />
        <div className={styles.pad_key}>{this.props.inputKey}</div>
      </div>
    );
  }
}

const ChannelDrumPad = connectToPlayer()(DrumPad);

export default connect(null, { openModal })(ChannelDrumPad);
