//
// Recorder
//
// get stream output from channels (using howler library)
// record into blob
// give to loop channel for playback
//
// any component connected
// by the connectToRecorder method
// has access to the startRecording() and stopRecording() methods
//

class Recorder {
  isSetup = false

  // wait to setup until a React component has called us
  // then we can be sure Howl has set up
  // and we can get passed redux actionCreators for the looop resource
  constructor(player) {
    this.player = player;
    this.loopCount = 0;
  }

  // onStop passed from connected component
  setupConnections({ addLoop, removeLoop, onStop }) {
    const dest = window.Howler.ctx.createMediaStreamDestination();

    this.addLoop = addLoop;
    this.removeLoop = removeLoop;

    this.chunks = [];
    this.recorder = new MediaRecorder(dest.stream);
    window.Howler.masterGain.connect(dest);

    // push each chunk (blobs) in an array
    this.recorder.ondataavailable = e => this.chunks.push(e.data);

    // Make blob out of our chunks,
    // and generate audio file in memory
    this.recorder.onstop = () => {
      const recordedBlob = new Blob(this.chunks, { type: 'audio/ogg; codecs=opus' });
      const recordedUrl = URL.createObjectURL(recordedBlob);

      this.chunks = [];

      // we've finished a recording
      // now let's create a channel for it
      // and a loop
      // and link it to the channel
      const id = `L${++this.loopCount}`;
      this.player.addLoopChannel(id, recordedUrl);
      this.addLoop({
        id,
        name: `Loop ${this.loopCount}`
      });

      if (typeof onStop === 'function') {
        onStop();
      }
    };

    this.isSetup = true;
  }

  startRecording(onStop) {
    if (!this.isSetup) {
      this.setupConnections(onStop);
    }
    this.recorder.start();
  }

  stopRecording() {
    this.recorder.stop();
  }
}

export default Recorder;
