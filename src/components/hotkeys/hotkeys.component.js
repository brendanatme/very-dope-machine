/**
 * hotkeys
 *
 * display hotkeys to user in modal
 */
import React from 'react';
// just copying list styles from here that are already used
// TODO break these out into abstract list styles
import styles from './hotkeys.component.css';

const Hotkeys = () => (
  <div className={styles.hotkeys}>
    <h4>HOTKEYS</h4>
    <div className={styles.grid}>
      <div className={styles.grid_pad}>1</div>
      <div className={styles.grid_pad}>2</div>
      <div className={styles.grid_pad}>3</div>
      <div className={styles.grid_pad}>4</div>

      <div className={styles.grid_pad}>q</div>
      <div className={styles.grid_pad}>w</div>
      <div className={styles.grid_pad}>e</div>
      <div className={styles.grid_pad}>r</div>

      <div className={styles.grid_pad}>a</div>
      <div className={styles.grid_pad}>s</div>
      <div className={styles.grid_pad}>d</div>
      <div className={styles.grid_pad}>f</div>

      <div className={styles.grid_pad}>z</div>
      <div className={styles.grid_pad}>x</div>
      <div className={styles.grid_pad}>c</div>
      <div className={styles.grid_pad}>v</div>
    </div>

    <ul className={styles.ul_reset}>
      <li className={styles.item}>Space - RECORD</li>
      <li className={styles.item}>p - VIEW PADS</li>
      <li className={styles.item}>k - VIEW KITS</li>
      <li className={styles.item}>l - SAVE/LOAD PRESETS</li>
      <li className={styles.item}>h - VIEW HOTKEYS</li>
    </ul>
  </div>
);

export default Hotkeys;
