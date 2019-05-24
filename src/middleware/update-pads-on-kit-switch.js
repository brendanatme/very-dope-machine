//
// update pads on kit switch
// when a kit switches,
// we need to supply the pads with sounds sources
// from the new selected kit
//
import { IGNORE } from '../constants';
import { SWITCH_KIT } from '../store/kits.state';
import { UPDATE_PAD } from '../store/pads.state';

export default ({ dispatch, getState }) => next => action => {
  // if action is not 'switch_kit',
  // ignore and send on to chain
  // (note: we must return the next action to pass through chain)
  // (if we don't return the result of next(action), we kill the action)
  if (!action.payload || action.type !== SWITCH_KIT || action.meta === IGNORE) {
    return next(action);
  }

  // else this is the switch kit action
  // dispatch action and set ignore flag to prevent infinite loop
  dispatch(Object.assign({}, action, { meta: IGNORE }));

  // now state is updated;
  // get pads and update with new kit sounds
  const { pads, kits } = getState();
  const srcs = kits.all[kits.selected].srcs;
  Object.keys(pads).map(k => {
    dispatch({
      type: UPDATE_PAD,
      payload: Object.assign({}, pads[k], {
        src: srcs[k]
      })
    });
  });
};
