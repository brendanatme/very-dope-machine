//
// Player
//
// thin wrapper around channel objects and record object
// provides interface for all connected components
// to communicate with channels based on the channel ID,
// or to communicate with the recorder
//
import Channel from './channel';
import HTML5Channel from './html5-channel';
import Recorder from './recorder';

export default class Player {
  channels = {}
  loopChannels = {}
  recorder = {}

  constructor(channels) {
    Object.keys(channels).map(k => {
      this.channels[k] = new Channel();
    });
    this.recorder = new Recorder(this);
  }

  addLoopChannel(id, src) {
    this.loopChannels[id] = new HTML5Channel(this, id, src);
  }

  removeLoopChannel(id) {
    delete this.loopChannels[id];
  }

  add(soundProps, channelId) {
    this.channels[channelId].add(soundProps);
  }

  remove(soundProps, channelId) {
    this.channels[channelId].remove(soundProps);
  }

  update(soundProps, channelId) {
    this.channels[channelId].update(soundProps);
  }

  play(soundProps, channelId) {
    this.channels[channelId].play(soundProps);
  }

  stopAll() {
    Object.keys(this.channels).map(k => {
      this.channels[k].stop();
    });
  }
}
