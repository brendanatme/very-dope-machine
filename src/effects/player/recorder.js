/**
 * recorder
 *
 * get stream output from busses (using howler library)
 * record into blob
 * give to loop bus for playback
 *
 * TODO: tie into BPMs to trim recording according to bars
 */
export default class Recorder {
  isSetup = false

  /**
   * use to track loop bus names and ids
   */
  loopCount = 0;

  constructor(clickTrackBus) {
    this.clickTrackBus = clickTrackBus;
  }

  /**
   * @todo when we begin recording, setup a click track according to the bpms
   */
  playClickTrack() {
    const ms = this.convertBpmToMs();
    let beat = 1;

    this.clickTrackBus.play({ id: 'downbeat' });
    this.clickTrackPlayer = window.setInterval(() => {
      beat++;
      const id = beat % 4 === 1
        ? 'downbeat'
        : 'upbeat';
      this.clickTrackBus.play({ id });
    }, ms);
  }

  stopClickTrack() {
    window.clearInterval(this.clickTrackPlayer);
  }

  updateBpm(bpm) {
    this.bpm = bpm;
  }

  convertBpmToMs() {
    return (60 / this.bpm) * 1000;
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
      console.log(this.chunks); // eslint-disable-line
      const recordedBlob = new Blob(this.chunks, { type: 'audio/ogg; codecs=opus' });

      /**
       * store this data on the object
       * to be accessed by this.stopRecording
       */
      this.latestLoopId = `L${++this.loopCount}`;
      this.latestRecordedUrl = URL.createObjectURL(recordedBlob);

      /**
       * reset chunks after finished recording
       */
      this.chunks = [];
    };

    this.isSetup = true;
  }

  /**
   * @todo when the recorder starts:
   * - play a click track according to BPM
   * - after 1 bar, begin recording
   * @param {function?} onStop
   */
  startRecording(onStop) {
    if (!this.isSetup) {
      this.setupConnections();
    }

    this.onStop = onStop;

    this.playClickTrack();

    setTimeout(() => {
      this.recorder.start();
    }, this.convertBpmToMs() * 4);
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
