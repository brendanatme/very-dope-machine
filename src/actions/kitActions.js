import {
  SWITCH_KIT
} from '../constants/actionTypes';

// switch kit
// selects the provided kitId
// of the kits resource
//
// when a kit is switched,
// the sound sources of each pad resource
// must be updated
// to do this, we need to know about the drum pad resource
export function switchKit(kitId) {
  return {
    type: SWITCH_KIT,
    payload: kitId
  };
}
