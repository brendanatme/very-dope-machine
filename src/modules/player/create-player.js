//
// createPlayer.js
//
// wrap provided Component in Player component
// which will then give access to audio player object
// to children, via context
//
// usage: createPlayer(channelIds)(MyComponent);
//
import React from 'react';
import PropTypes from 'prop-types';
import Player from './player';

export const createPlayerFactory = (channelIds) => {
  const player = new Player(channelIds);
  return (Composed) => {
    return class PlayerConnection extends React.Component {
      static childContextTypes = {
        player: PropTypes.object,
      }

      getChildContext() {
        return { player };
      }

      render() {
        return <Composed {...this.props} />;
      }
    };
  };
};
