import Immutable from 'immutable';
import channelsData from '../data/channels.json';
import {
  ADD_SOUND,
  PLAY_SOUND,
  STOP_SOUND,
  UPDATE_SOUND,
  REMOVE_SOUND,
  CHANNEL_DUMP
} from '../constants/actionTypes';

export default function(state = channelsData, { type, payload }) {
  state = Immutable.fromJS(state);
  switch (type) {
    case REMOVE_SOUND:
      return state.deleteIn([
        payload.channelId,
        'inputs'
      ], payload.id).toJS();
    case ADD_SOUND:
      return state.setIn([
        payload.channelId,
        'inputs',
        payload.id
      ], payload).toJS();
    case PLAY_SOUND:
      return state.updateIn([
        payload.channelId,
        'play'
      ], () => payload.id).toJS();
    case UPDATE_SOUND:
      return state.updateIn([
        payload.channelId,
        'inputs',
        payload.id
      ], () => payload).toJS();
    case STOP_SOUND:
      return state.updateIn([
        payload,
        'play'
      ], () => '').toJS();
    case CHANNEL_DUMP:
      return payload;
    default:
      return state.toJS();
  }
}
