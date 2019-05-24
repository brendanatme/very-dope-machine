import React, { Component, PropTypes } from 'react';

export default function connectToLoop(Composed) {
  class LoopConnection extends Component {
    static propTypes = {
      id: PropTypes.string
    }

    static contextTypes = {
      player: PropTypes.object
    }

    constructor(props, context) {
      super(props);

      this.player = context.player;
    }

    render() {
      return (
        <Composed
          channel={this.player.loopChannels[this.props.id]}
          {...this.props}
        />
      );
    }
  }

  return LoopConnection;
}
