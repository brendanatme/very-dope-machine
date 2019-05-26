/**
 * Player
 *
 * thin wrapper around bus objects and record object
 * provides interface for all connected components
 * to communicate with busses based on the bus ID,
 * or to communicate with the recorder
 */
import Bus from './bus';
import HTML5Bus from './html5-bus';
import Recorder from './recorder';

export default class Player {
  bpm = 0
  busses = {}
  loopBusses = {}
  recorder = {}

  constructor(busses, bpm) {
    Object.keys(busses).map(k => {
      this.busses[k] = new Bus();
    });

    /**
     * build clicktrack in html5 bus
     * so as not to get recorded
     */
    this.loopBusses.clickTrack = new HTML5Bus(
      this.removeLoopBus,
      'click-track',
      '/audio/Audiomatics - Perc 2.mp3',
      {
        loop: false,
        volume: 0.1,
      },
    );

    this.recorder = new Recorder(this.loopBusses.clickTrack);
    this.updateBpm(bpm);
  }

  updateBpm(bpm) {
    this.bpm = bpm;
    this.recorder.updateBpm(bpm);
  }

  addLoopBus = (id, src) => {
    this.loopBusses[id] = new HTML5Bus(this.removeLoopBus, id, src);
  }

  removeLoopBus = (id) => {
    delete this.loopBusses[id];
  }

  addSoundToBus(soundProps, busId) {
    this.busses[busId].add(soundProps);
  }

  removeSoundFromBus(soundProps, busId) {
    this.busses[busId].remove(soundProps);
  }

  updateSoundInBus(soundProps, busId) {
    this.busses[busId].update(soundProps);
  }

  playSoundInBus(soundProps, busId) {
    this.busses[busId].play(soundProps);
  }

  stopAll() {
    Object.keys(this.busses).map(k => {
      this.busses[k].stop();
    });
  }

  startRecording = (onStop) => {
    this.recorder.startRecording(onStop);
  }

  stopRecording = () => {
    return this.recorder.stopRecording();
  }
}
