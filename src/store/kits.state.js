import Immutable from 'immutable';
import kitsData from '../data/kits.json';

// kits
export const SWITCH_KIT = 'switch_kit';
export const KIT_DUMP = 'kit_dump';

// switch kit
// selects the provided kitId
// of the kits resource
//
// when a kit is switched,
// the sound sources of each pad resource
// must be updated
// to do this, we need to know about the drum pad resource
export const switchKit = (kitId) => ({
  type: SWITCH_KIT,
  payload: kitId,
});

export const reducer = function(state = kitsData, { type, payload }) {
  state = Immutable.fromJS(state);
  switch (type) {
    case SWITCH_KIT:
      return state.set('selected', payload).toJS();
    case KIT_DUMP:
      return payload;
    default:
      return state.toJS();
  }
};
