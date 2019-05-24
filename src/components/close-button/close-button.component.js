/**
 * close-button.component
 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './close-button.component.css';

const CloseButton = ({ handleClick }) => (
  <div className={styles.close_hover}>
    <div
      className={styles.close_button}
      onClick={handleClick}
    />
  </div>
);

CloseButton.propTypes = {
  handleClick: PropTypes.func,
};

export default CloseButton;
