import React from 'react';
import PropTypes from 'prop-types';

export const connectToRecorder = (Composed) => {
  return class RecorderConnection extends React.Component {
    static contextTypes = {
      player: PropTypes.object,
    }

    constructor(props, context) {
      super(props);

      this.player = context.player;
    }

    render() {
      return <Composed recorder={this.player.recorder} {...this.props} />;
    }
  };
};
