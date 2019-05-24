/**
 * kit-switcher.component
 */
import React from 'react';
import PropTypes from 'prop-types';
// TODO: pull only .forIn from lodash
import _ from 'lodash';
import KeyHandler, { KEYDOWN } from 'react-key-handler';
import classNames from 'classnames';
import styles from './kit-switcher.component.css';

const KitList = ({
  allKits,
  makeSelectKit,
  selectedKitKey,
}) => {
  let items = [];

  _.forIn(allKits, (kit, key) => {
    items.push(
      <li key={key}
        className={classNames({
          [styles.item]: true,
          [styles.selected]: selectedKitKey === key
        })}
        onClick={makeSelectKit(key)}>
        {kit.name}
      </li>
    );
  });

  return <ul className={styles.ul_reset}>{items}</ul>;
};

KitList.propTypes = {
  allKits: PropTypes.object,
  makeSelectKit: PropTypes.func,
  selectedKitKey: PropTypes.string,
};

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
