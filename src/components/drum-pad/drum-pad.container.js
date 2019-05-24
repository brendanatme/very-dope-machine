/**
 * drum-pad.container
 */
import React from 'react';
import PropTypes from 'prop-types';
import KeyHandler, { KEYDOWN, KEYUP } from 'react-key-handler';
import { connect } from 'react-redux';
import { hasTouch } from '../../helpers';
import { connectToPlayer } from '../../modules/player';
import { openModal } from '../../store/modal.state';
import MidiConnection from '../midi-connection';
import PadCircle from '../pad-circle';
import styles from './drum-pad.component.css';
// TODO: split component from container
// import DrumPadComponent from './drum-pad.component';

class DrumPad extends React.Component {
  static propTypes = {
    busId: PropTypes.string,
    id: PropTypes.string,
    inputKey: PropTypes.string,
    midiInput: PropTypes.number,
    openModal: PropTypes.func,
    playSound: PropTypes.func,
    src: PropTypes.string,
    volume: PropTypes.number,
  }

  state = {
    isPressed: false,
    isEditing: false
  }

  handleClick = (e) => {
    e.preventDefault();

    if (hasTouch()) {
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

  handleKeyDown = () => {
    // prevent unwanted drum rolls
    if (this.state.isPressed) {
      return;
    }

    // imperatively call animation and audio play
    this.props.playSound();
    this.anim.play();

    this.setState({ isPressed: true });
  }

  handleKeyUp = () => {
    this.setState({ isPressed: false });
  }

  bindKeys = () => {
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
    const isPressed = this.state.isPressed ? styles.is_pressed : '';
    const isEditing = this.state.isEditing ? styles.is_editing : '';
    const isTouch = hasTouch() ? styles.has_touch : '';

    // need reference to circle
    // to imperatively call animations
    // on keyDown
    return (
      <div
        onClick={this.handleClick}
        className={`${styles.drum_pad} ${isPressed} ${isEditing} ${isTouch}`}>
        {this.bindKeys()}
        <MidiConnection
          inputKey={this.props.midiInput}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
        />
        <PadCircle ref={circle => { this.anim = circle; }} />
        <div className={styles.pad_key}>{this.props.inputKey}</div>
      </div>
    );
  }
}

const BusDrumPad = connectToPlayer()(DrumPad);

export default connect(null, { openModal })(BusDrumPad);
