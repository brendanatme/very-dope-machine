import React, { Component, PropTypes } from 'react';

const MIDI_INPUT = '[object MIDIInput]';

const iterate = (iterator, cb) => {
  for (
    let item = iterator.next();
    item && !item.done;
    item = iterator.next()
  ) {
    cb(item.value);
  }
};

const arrayFromIterator = iterator => {
  let arr = [];
  iterate(iterator, item => arr.push(item));
  return arr;
};

class MidiConnection extends Component {
  static propTypes = {
    inputKey: PropTypes.number,
    onKeyDown: PropTypes.function,
    onKeyUp: PropTypes.function
  }

  constructor(props) {
    super(props);

    this.inputs = [];
    this.browserSupportsMidi = false;

    if (navigator.requestMIDIAccess) {
      this.browserSupportsMidi = true;
    }
  }

  componentWillMount() {
    if (!this.browserSupportsMidi) return;

    navigator.requestMIDIAccess()
      .then(midi => this.connectMidi(midi));
  }

  componentWillUnmount() {
    if (!this.browserSupportsMidi) return;
    this.disconnectInstruments();
  }

  connectMidi(midi) {
    this.midi = midi;
    this.midi.onstatechange = this.handleMidiConnection.bind(this);
    this.connectInstruments();
  }

  connectInstruments() {
    this.disconnectInstruments();
    this.inputs = arrayFromIterator(this.midi.inputs.values());
    this.inputs.map(input => input.onmidimessage = this.handleMidiMessage.bind(this));
  }

  disconnectInstruments() {
    this.inputs.length && this.inputs.map(input => input.onmidimessage = null);
  }

  handleMidiConnection(e) {
    const isConnected = e.port.state === 'connected' ?
      true:
      false;

    if (e.port.toString() !== MIDI_INPUT) {
      return;
    }

    isConnected ?
      this.connectInstruments():
      this.disconnectInstruments();
  }

  handleMidiMessage(message) {
    const [ eventCode, inputKey ] = message.data;

    if (this.props.inputKey !== inputKey) return;

    if (eventCode === 153 && this.props.onKeyDown) {
      this.props.onKeyDown();
    }

    if (eventCode === 137 && this.props.onKeyUp) {
      this.props.onKeyUp();
    }
  }

  render() {
    return <span />;
  }
}

export default MidiConnection;
