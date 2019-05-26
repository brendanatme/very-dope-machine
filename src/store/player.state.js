import Immutable from 'immutable';
import { createPlayer as createPlayerObject, getPlayer } from '../effects/player';
import { ADD_LOOP } from './loops.state';

const playerData = { bpm: 90 };

// action types
export const UPDATE_BPM = 'update_bpm';
export const PLAYER_DUMP = 'player_dump';
export const PLAYER_CREATED = 'player_created';
export const START_RECORDING = 'start_recording';
export const STOP_RECORDING = 'stop_recording';

// actions
export const updateBpm = (bpm) => (dispatch) => {
  bpm = parseInt(bpm, 10);
  getPlayer().updateBpm(bpm);
  dispatch({
    payload: bpm,
    type: UPDATE_BPM,
  });
};

export const createPlayer = () => (dispatch, getState) => {
  const state = getState();
  createPlayerObject(state.busses, state.player.bpm);
  dispatch({ type: PLAYER_CREATED });
};

/**
 * startRecording
 *
 * start recording audio
 * and pass the recorder a callback
 * to update the UI when finished recording
 *
 * @param {function} onStop
 */
export const startRecording = (onStop) => (dispatch) => {
  getPlayer().recorder.startRecording(onStop);
  dispatch({ type: START_RECORDING });
};

/**
 * stopRecording
 *
 * stop recording audio
 * assign the resulting audio
 * to a loop
 */
export const stopRecording = () => (dispatch) => {
  const player = getPlayer();
  player.stopRecording().then((payload) => {
    player.addLoopBus(payload.id, payload.url);
    dispatch({ type: ADD_LOOP, payload });
  });
  dispatch({ type: STOP_RECORDING });
};

export const reducer = function(state = playerData, { type, payload }) {
  state = Immutable.fromJS(state);
  switch (type) {
    case UPDATE_BPM:
      return state.set('bpm', payload).toJS();
    case PLAYER_DUMP:
      return payload;
    default:
      return state.toJS();
  }
};
