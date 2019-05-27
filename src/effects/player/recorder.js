/**
 * recorder
 *
 * get stream output from busses (using howler library)
 * record into blob
 * give to loop bus for playback
 *
 * TODO: tie into BPMs to trim recording according to bars
 */
import { barToMs, bpmToMs } from './helpers';

export default class Recorder {
  isSetup = false

  bytesPerMs = 12.5;

  /**
   * use to track loop bus names and ids
   */
  loopCount = 0;

  constructor(clickTrackBus, playAllLoops, stopAllLoops) {
    this.clickTrackBus = clickTrackBus;
    this.playAllLoops = playAllLoops;
    this.stopAllLoops = stopAllLoops;
  }

  /**
   * when we begin recording, setup a click track according to the bpms
   */
  playClickTrack() {
    const ms = bpmToMs(this.bpm);

    this.clickTrackBus.play();
    this.clickTrackPlayer = window.setInterval(() => {
      this.clickTrackBus.stop();
      this.clickTrackBus.play();
    }, ms);
  }

  stopClickTrack() {
    window.clearInterval(this.clickTrackPlayer);
  }

  updateBpm(bpm) {
    this.bpm = bpm;
  }

  convertBytesToMs(size) {
    return size / this.bytesPerMs;
  }

  roundMsToNearestBar(length) {
    const bar = barToMs(this.bpm);
    const bars = Math.floor(length / bar);
    if (bars === 0) {
      return length;
    } else {
      return bars * bar;
    }
  }

  /**
   * trim blob to nearest bar
   * deterime amount of bars based on size of blob
   * and slice up to that point
   * @param {Blob} blob
   */
  trimBlobToNearestBar(blob) {
    let method = 'slice';

    if (blob.mozSlice) {
      method = 'mozSlice';
    }

    if (blob.webkitSlice) {
      method = 'webkitSlice';
    }

    const sizeInMs = this.convertBytesToMs(blob.size);
    const endInMs = this.roundMsToNearestBar(sizeInMs);
    const endInBytes = Math.floor(endInMs * this.bytesPerMs);

    return blob[method](0, endInBytes, 'audio/ogg; codecs=opus');
  }

  setupConnections() {
    const dest = window.Howler.ctx.createMediaStreamDestination();

    this.chunks = [];
    this.recorder = new MediaRecorder(dest.stream);
    window.Howler.masterGain.connect(dest);

    /**
     * push each chunk (blobs) in an array
     */
    this.recorder.ondataavailable = e => this.chunks.push(e.data);

    /**
     * Make blob out of our chunks,
     * and generate audio file in memory
     * @todo trim audio to the nearest bar
     */
    this.recorder.onstop = () => {
      const recordedBlob = new Blob(this.chunks, { type: 'audio/ogg; codecs=opus' });
      const trimmedBlob = this.trimBlobToNearestBar(recordedBlob);

      /**
       * store this data on the object
       * to be accessed by this.stopRecording
       */
      this.latestLoopId = `L${++this.loopCount}`;
      this.latestRecordedUrl = URL.createObjectURL(trimmedBlob);

      /**
       * reset chunks after finished recording
       */
      this.chunks = [];
    };

    this.isSetup = true;
  }

  /**
   * startRecording
   * @param {function?} onStop
   */
  startRecording(onStop) {
    if (!this.isSetup) {
      this.setupConnections();
    }

    this.onStop = onStop;

    this.playClickTrack();

    setTimeout(() => {
      this.playAllLoops();
      this.recorder.start();
    }, bpmToMs(this.bpm) * 4);
  }

  /**
   * stopRecording
   *
   * give recorder time to stop recording and run 'onstop' callback
   * return info to be used in redux store to create loop
   *
   * see store/player.state
   *
   * @todo: when recorder stops:
   * - stop playing click track
   */
  stopRecording() {
    this.stopClickTrack();
    this.stopAllLoops();
    this.recorder.stop();

    if (typeof this.onStop === 'function') {
      this.onStop();
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: this.latestLoopId,
          name: `Loop ${this.loopCount}`,
          url: this.latestRecordedUrl,
        });
      }, 60);
    });
  }
}
