/**
 * withPlayer
 *
 * connect composed component
 * to audio player object
 *
 * usage: provide withPlayer with a component
 *
 * example:
 * withPlayer(MyComponent);
 *
 * connected component will then have access to:
 * this.props.playSound()
 *
 * TODO: this is not just a with-player HOC,
 * this also does stuff specific to drum-pad adding and remove sound from busses
 * break this out even more
 */
import React from 'react';
import PropTypes from 'prop-types';
import { getPlayer } from './create-player';

export const withPlayer = (Composed) => {
  return class PlayerConnection extends React.Component {
    static propTypes = {
      busId: PropTypes.string,
      id: PropTypes.string,
      src: PropTypes.string,
    }

    constructor(props) {
      super(props);

      this.player = getPlayer();
    }

    componentDidMount() {
      if (this.props.src && this.props.busId) {
        this.player.addSoundToBus(this.props, this.props.busId);
      }
    }

    componentWillReceiveProps(nextProps) {
      /**
       * component will receive props
       * if bus has changed
       * - remove sounds from old bus
       * - add sound to new bus
       */
      if (nextProps.busId !== this.props.busId) {
        this.player.removeSoundFromBus(this.props, this.props.busId);
        this.player.addSoundToBus(nextProps, nextProps.busId);

      /**
       * else if sound has changed
       * - remove old sound from bus
       * - add new sound to bus
       */
      } else if (nextProps.src !== this.props.src) {
        this.player.removeSoundFromBus(this.props, this.props.busId);
        this.player.addSoundToBus(nextProps, nextProps.busId);

      /**
       * else if other settings have changed
       * - update sound
       */
      } else if (nextProps !== this.props) {
        this.player.updateSoundInBus(nextProps, nextProps.busId);
      }
    }

    componentWillUnmount() {
      if (this.props.src && this.props.busId) {
        this.player.removeSoundFromBus(this.props, this.props.busId);
      }
    }

    playSound = () => {
      this.player.playSoundInBus(
        { id: this.props.id },
        this.props.busId,
      );
    }

    render() {
      const {
        bpm, // eslint-disable-line
        ...props
      } = this.props;

      return (
        <Composed
          playSound={this.playSound}
          {...props}
        />
      );
    }
  };
};
