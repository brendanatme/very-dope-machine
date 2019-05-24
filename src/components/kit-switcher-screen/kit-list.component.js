import React from 'react';
import PropTypes from 'prop-types';
import forIn from 'lodash.forin';
import styles from './kit-switcher.component.css';

const KitList = ({
  allKits,
  makeSelectKit,
  selectedKitKey,
}) => {
  let items = [];

  forIn(allKits, (kit, key) => {
    items.push(
      <li key={key}
        className={`${styles.item} ${selectedKitKey === key ? styles.selected : ''}`}
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

export default KitList;
