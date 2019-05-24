//
// Bus
//
// controls the playback of multiple sounds
// only plays one sound at a time
//
// currently connected to Howl player
// TODO: break out specific sound implementation
// into HOC
//
import { Howl } from 'howler';

export default class Bus {
  // sounds hash
  // key: Src {String}
  // val: Sound {Object}
  sounds = {}

  // currentSound: Src {String}
  currentSound = ''

  // add a sound to a bus
  // load it in howl instance
  // @param howlSettings {Object}
  add({ id, src, volume, startTime, endTime }) {
    if (!src) { return; }
    this.sounds[id] = new Howl({ src, volume, sprite: {
      'clip': [startTime, endTime]
    }});
  }

  // remove a sound from a bus
  // @param howlSettings {Object}
  remove({ id }) {
    if (!id) { return; }
    if (this.currentSound === id) {
      this.stop(this.currentSound);
    }
    delete this.sounds[id];
  }

  // update settings for a sound
  // volume, start, etc
  // (volume, pitch, etc)
  // since howl does not let us
  // update starts on the fly,
  // let's destroy our old sound instance
  // and create a new one
  // @param howlSettings {Object}
  update({ id, src, volume, startTime, endTime }) {
    if (!id) { return; }
    this.remove({ id });
    this.add({ id, src, volume, startTime, endTime });
  }

  // play a sound
  // @param howlSettings {Object}
  play({ id }) {
    // Bus accepts input from DrumPad
    // not all pads have sounds
    if (!id) { return; }
    if (this.currentSound) {
      this.stop(this.currentSound);
    }
    this.sounds[id].once('end', () => {
      this.currentSound = '';
    });
    this.currentSound = id;
    this.sounds[id].play('clip');
  }

  // stop a sound
  // either the one specified,
  // or default to the currently-playing one
  // if no src given
  // @param id {String}
  stop(id) {
    if (id) {
      this.sounds[id].stop();
    } else if (this.currentSound) {
      this.sounds[this.currentSound].stop();
    }
  }
}
