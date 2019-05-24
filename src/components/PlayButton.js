import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from '../styles/components/play_button.css';

const PlayButton = ({ isPlaying, handleClick }) => {
  const playBtnStyles = classNames({
    [styles.play_btn]: true,
    [styles.is_playing]: isPlaying
  });

  return (
    <button
      className={playBtnStyles}
      onClick={handleClick}
    />
  );
};

PlayButton.propTypes = {
  handleClick: PropTypes.func,
  isPlaying: PropTypes.bool
};

export default PlayButton;
