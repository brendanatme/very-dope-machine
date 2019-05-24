//
// HTML5Bus
//
// uses HTML5 Audio to proxy sound playback
// (instead of web audio API)
// this is so we can load in streamed audio blobs
// (which currently isn't possible using the web audio API)
// (ironically)
//
export default class HTML5Bus {
  // generate audio element
  constructor(player, id, src) {
    this.player = player;
    this.id = id;
    this.src = src;
    this.audioTag = document.createElement('audio');
    this.audioTag.id = `html5-bus-${id}`;
    this.audioTag.loop = true;
    this.audioTag.src = this.src;
    document.body.appendChild(this.audioTag);
  }

  // play sound
  play() {
    this.audioTag.play();
  }

  // stop sound
  stop() {
    this.audioTag.pause();
    //this.audioTag.seek(0); // TODO: why commented out?
  }

  // when removing loop,
  // stop sound and destroy leftover html
  destroy() {
    this.stop();
    this.audioTag.remove();
    this.player.removeLoopBus(this.id);
  }
}
