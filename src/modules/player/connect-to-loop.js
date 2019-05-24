import React from 'react';
import PropTypes from 'prop-types';

export const connectToLoop = (Composed) => {
  return class LoopConnection extends React.Component {
    static propTypes = {
      id: PropTypes.string,
    }

    static contextTypes = {
      player: PropTypes.object,
    }

    constructor(props, context) {
      super(props);

      this.player = context.player;
    }

    render() {
      return (
        <Composed
          bus={this.player.loopBusses[this.props.id]}
          {...this.props}
        />
      );
    }
  };
};
