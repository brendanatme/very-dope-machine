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
// - id, src, channelId, volume, startTime, endTime
//
// example:
// connectToPlayer({
//  src: 'mySrcProp',
//  channelId: 'someOtherProp',
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
  channelId: 'channelId',
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
        channelId: props[propsMap.channelId],
        volume: props[propsMap.volume],
        startTime: props[propsMap.startTime],
        endTime: props[propsMap.endTime]
      };
    }

    componentDidMount() {
      const props = this.getNormalizedProps(this.props);

      if (props.src && props.channelId) {
        this.player.add(props, props.channelId);
      }
    }

    componentWillUnmount() {
      const props = this.getNormalizedProps(this.props);

      if (props.src && props.channelId) {
        this.player.remove(props, props.channelId);
      }
    }

    componentWillReceiveProps(nextProps) {
      const props = this.getNormalizedProps(this.props);
      nextProps = this.getNormalizedProps(nextProps);

      // component will receive props
      // if channel has changed
      // - remove sounds from old channel
      // - add sound to new channel
      if (nextProps.channelId !== props.channelId) {
        this.player.remove(props, props.channelId);
        this.player.add(nextProps, nextProps.channelId);

        // else if sound has changed
        // - remove old sound from channel
        // - add new sound to channel
      } else if (nextProps.src !== props.src) {
          this.player.remove(props, props.channelId);
          this.player.add(nextProps, nextProps.channelId);

        // else if other settings have changed
        // - update sound
      } else if (nextProps !== props) {
        this.player.update(nextProps, nextProps.channelId);
      }
    }

    render() {
      return (
        <Composed
          playSound={() => { this.player.play(
            { id: this.props[propsMap.id] },
            this.props[propsMap.channelId]
          ); }}
          {...this.props}
        />
      );
    }
  };
};
