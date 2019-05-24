/**
 * kit-switcher.component
 */
import React from 'react';
import PropTypes from 'prop-types';
import KeyHandler, { KEYDOWN } from 'react-key-handler';
import KitList from './kit-list.component';
import styles from './kit-switcher.component.css';

const KitSwitcher = ({
  allKits,
  handleKeyDown,
  makeSelectKit,
  selectedKitKey,
}) => (
  <div className={styles.center_screen}>
    <div>
      <h4>DRUM KITS</h4>
      <KitList
        allKits={allKits}
        makeSelectKit={makeSelectKit}
        selectedKitKey={selectedKitKey}
      />
      <KeyHandler
        keyEventName={KEYDOWN}
        keyValue="ArrowUp"
        onKeyHandle={handleKeyDown}
      />
      <KeyHandler
        keyEventName={KEYDOWN}
        keyValue="ArrowDown"
        onKeyHandle={handleKeyDown}
      />
    </div>
  </div>
);

KitSwitcher.propTypes = {
  allKits: PropTypes.object,
  handleKeyDown: PropTypes.func,
  makeSelectKit: PropTypes.func,
  selectedKitKey: PropTypes.string,
};

export default KitSwitcher;
