import Immutable from 'immutable';

const bpmData = { bpm: 90 };

// action types
export const UPDATE_BPM = 'update_bpm';
export const BPM_DUMP = 'bpm_dump';

// actions
export const updateBpm = (bpm) => ({
  type: UPDATE_BPM,
  payload: parseInt(bpm, 10),
});

export const reducer = function(state = bpmData, { type, payload }) {
  state = Immutable.fromJS(state);
  switch (type) {
    case UPDATE_BPM:
      return state.set('bpm', payload).toJS();
    case BPM_DUMP:
      return payload;
    default:
      return state.toJS();
  }
};
