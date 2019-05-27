/**
 * HTML5Bus
 *
 * load in streamed audio blobs from howl
 */
export default class HTML5Bus {
  /**
   * generate audio element
   */
  constructor(removeLoopBus, id, src, options = { loop: true, volume: 1 }) {
    this.options = options;
    this.removeLoopBus = removeLoopBus;
    this.id = id;
    this.src = src;
    this.audioTag = document.createElement('audio');
    this.audioTag.id = `html5-bus-${id}`;
    this.audioTag.loop = this.options.loop;
    this.audioTag.volume = this.options.volume;
    this.audioTag.src = this.src;
    document.body.appendChild(this.audioTag);
  }

  mute() {
    this.audioTag.volume = 0;
  }

  unmute() {
    this.audioTag.volume = this.options.volume;
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
    this.audioTag.load();
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
