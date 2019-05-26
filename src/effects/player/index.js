/**
 * effects/player
 *
 * TODO: expose public methods:
 *
 * createPlayer
 *
 *    provide application with ability
 *    to create player and pass parameters
 *
 * withPlayer
 *
 *    provide public methods for components:
 *
 *    - playSound
 *    - stopSound
 *    - startRecording
 *    - stopRecording
 *
 * getPlayer
 *
 *    provide public methods for redux action creators:
 *
 *    - updateBPM
 *    - addLoop
 *    - updateLoop
 *    - removeLoop
 *    - addSoundToBus
 *    - removeSoundFromBus
 *    - updateSoundInBus
 */
export { createPlayer, getPlayer } from './create-player';
export { withLoop } from './with-loop';
export { withPlayer } from './with-player';
