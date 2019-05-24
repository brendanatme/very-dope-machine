//
// connectToPlayer
//
// connect composed component
// to audio player object
//
// usage: provide connectToPlayer with a property map,
// then a component
//
// connectToPlayer takes up to six properties:
// - id, src, busId, volume, startTime, endTime
//
// example:
// connectToPlayer({
//  src: 'mySrcProp',
//  busId: 'someOtherProp',
//  volume: 'aVolumeProperty'
// })(MyComponent);
//
// connected component will then have access to:
// this.props.playSound()
//
import React from 'react';
import PropTypes from 'prop-types';

export const connectToPlayerFactory = (propsMap = {
  id: 'id',
  src: 'src',
  busId: 'busId',
  volume: 'volume',
  startTime: 'startTime',
  endTime: 'endTime'
}) => (Composed) => {
  return class PlayerConnection extends React.Component {
    static contextTypes = {
      player: PropTypes.object
    }

    constructor(props, context) {
      super(props, context);

      this.player = context.player;
    }

    getNormalizedProps(props) {
      return {
        id: props[propsMap.id],
        src: props[propsMap.src],
        busId: props[propsMap.busId],
        volume: props[propsMap.volume],
        startTime: props[propsMap.startTime],
        endTime: props[propsMap.endTime]
      };
    }

    componentDidMount() {
      const props = this.getNormalizedProps(this.props);

      if (props.src && props.busId) {
        this.player.add(props, props.busId);
      }
    }

    componentWillUnmount() {
      const props = this.getNormalizedProps(this.props);

      if (props.src && props.busId) {
        this.player.remove(props, props.busId);
      }
    }

    componentWillReceiveProps(nextProps) {
      const props = this.getNormalizedProps(this.props);
      nextProps = this.getNormalizedProps(nextProps);

      // component will receive props
      // if bus has changed
      // - remove sounds from old bus
      // - add sound to new bus
      if (nextProps.busId !== props.busId) {
        this.player.remove(props, props.busId);
        this.player.add(nextProps, nextProps.busId);

        // else if sound has changed
        // - remove old sound from bus
        // - add new sound to bus
      } else if (nextProps.src !== props.src) {
          this.player.remove(props, props.busId);
          this.player.add(nextProps, nextProps.busId);

        // else if other settings have changed
        // - update sound
      } else if (nextProps !== props) {
        this.player.update(nextProps, nextProps.busId);
      }
    }

    render() {
      return (
        <Composed
          playSound={() => { this.player.play(
            { id: this.props[propsMap.id] },
            this.props[propsMap.busId]
          ); }}
          {...this.props}
        />
      );
    }
  };
};
