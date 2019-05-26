import React from 'react';
import PropTypes from 'prop-types';
import { getPlayer } from './create-player';

export const withLoop = (Composed) => {
  return class LoopConnection extends React.Component {
    static propTypes = {
      id: PropTypes.string,
    }

    constructor(props) {
      super(props);

      this.player = getPlayer();
    }

    render() {
      return (
        <Composed
          loop={this.player.loopBusses[this.props.id]}
          {...this.props}
        />
      );
    }
  };
};
