//
// Player
//
// thin wrapper around bus objects and record object
// provides interface for all connected components
// to communicate with busses based on the bus ID,
// or to communicate with the recorder
//
import Bus from './bus';
import HTML5Bus from './html5-bus';
import Recorder from './recorder';

export default class Player {
  busses = {}
  loopBusses = {}
  recorder = {}

  constructor(busses) {
    Object.keys(busses).map(k => {
      this.busses[k] = new Bus();
    });
    this.recorder = new Recorder(this);
  }

  addLoopBus(id, src) {
    this.loopBusses[id] = new HTML5Bus(this, id, src);
  }

  removeLoopBus(id) {
    delete this.loopBusses[id];
  }

  add(soundProps, busId) {
    this.busses[busId].add(soundProps);
  }

  remove(soundProps, busId) {
    this.busses[busId].remove(soundProps);
  }

  update(soundProps, busId) {
    this.busses[busId].update(soundProps);
  }

  play(soundProps, busId) {
    this.busses[busId].play(soundProps);
  }

  stopAll() {
    Object.keys(this.busses).map(k => {
      this.busses[k].stop();
    });
  }
}
