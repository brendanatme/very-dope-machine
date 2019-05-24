//
// createPlayer.js
//
// wrap provided Component in Player component
// which will then give access to audio player object
// to children, via context
//
// usage: createPlayer(channelIds)(MyComponent);
//
import React, { PropTypes } from 'react';
import Player from './Player';

export default function createPlayerFactory(channelIds) {
  const player = new Player(channelIds);
  return function createPlayer(Composed) {
    return class PlayerConnection extends React.Component {
      static childContextTypes = {
        player: PropTypes.object
      }

      getChildContext() {
        return { player: player };
      }

      render() {
        return <Composed {...this.props} />;
      }
    };
  };
}
