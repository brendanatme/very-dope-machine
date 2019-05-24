//
// createPlayer.js
//
// wrap provided Component in Player component
// which will then give access to audio player object
// to children, via context
//
// usage: createPlayer(busIds)(MyComponent);
//
import React from 'react';
import PropTypes from 'prop-types';
import Player from './player';

export const createPlayerFactory = (busIds) => {
  const player = new Player(busIds);
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
