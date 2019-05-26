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

  /**
   * @todo when we begin recording, setup a click track according to the bpms
   */
  setupClickTrack() {

  }

  updateBpm(bpm) {
    this.bpm = bpm;
  }

  /**
   * onStop passed from connected component
   */
  setupConnections(onStop) {
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
     */
    this.recorder.onstop = () => {
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

      if (typeof onStop === 'function') {
        onStop();
      }
    };

    this.isSetup = true;
  }

  /**
   * @todo when the recorder starts, play a click track according to BPM
   * @param {function?} onStop
   */
  startRecording(onStop) {
    if (!this.isSetup) {
      this.setupConnections(onStop);
    }
    this.recorder.start();
  }

  /**
   * stopRecording
   *
   * give recorder time to stop recording and run 'onstop' callback
   *
   * return info to be used in redux store to create loop
   *
   * see store/player.state
   */
  stopRecording() {
    this.recorder.stop();

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
