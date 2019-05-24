import React, { Component, PropTypes } from 'react';

export default function connectToRecorder(Composed) {
  return class RecorderConnection extends Component {
    static contextTypes = {
      player: PropTypes.object
    }

    constructor(props, context) {
      super(props);

      this.player = context.player;
    }

    render() {
      return <Composed recorder={this.player.recorder} {...this.props} />;
    }
  };
}
