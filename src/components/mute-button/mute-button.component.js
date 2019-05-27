/**
 * mute-button.component
 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './mute-button.component.css';

const MuteButton = ({ isMuted, handleClick }) => (
  <button
    className={`${styles.mute_btn} ${isMuted ? styles.is_muted : ''}`}
    onClick={handleClick}
  />
);

MuteButton.propTypes = {
  handleClick: PropTypes.func,
  isMuted: PropTypes.bool,
};

export default MuteButton;
