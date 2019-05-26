/**
 * createPlayer
 * instantiate player
 *
 * usage:
 * createPlayer(busIds);
 *
 * getPlayer
 * and provide access to the player object
 *
 * usage:
 * const player = getPlayer();
 */
import Player from './player';

let player;

export const createPlayer = (busIds, bpm) => {
  player = new Player(busIds, bpm);
};

export const getPlayer = () => player;
