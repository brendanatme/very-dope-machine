/**
 * HTML5Bus
 *
 * load in streamed audio blobs from howl
 */
export default class HTML5Bus {
  /**
   * generate audio element
   */
  constructor(removeLoopBus, id, src) {
    this.removeLoopBus = removeLoopBus;
    this.id = id;
    this.src = src;
    this.audioTag = document.createElement('audio');
    this.audioTag.id = `html5-bus-${id}`;
    this.audioTag.loop = true;
    this.audioTag.src = this.src;
    document.body.appendChild(this.audioTag);
  }

  /**
   * play sound
   */
  play() {
    this.audioTag.play();
  }

  /**
   * stop sound
   */
  stop() {
    this.audioTag.pause();
    //this.audioTag.seek(0); // TODO: why commented out?
  }

  /**
   * destroy called
   * stop sound and destroy leftover html
   */
  destroy() {
    this.stop();
    this.audioTag.remove();
    this.removeLoopBus(this.id);
  }
}
