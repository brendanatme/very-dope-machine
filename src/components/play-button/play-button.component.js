/**
 * play-button.component
 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './play-button.component.css';

const PlayButton = ({ isPlaying, handleClick }) => (
  <button
    className={`${styles.play_btn} ${isPlaying ? styles.is_playing : ''}`}
    onClick={handleClick}
  />
);

PlayButton.propTypes = {
  handleClick: PropTypes.func,
  isPlaying: PropTypes.bool
};

export default PlayButton;
