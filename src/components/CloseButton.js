import React, { PropTypes } from 'react';
import styles from '../styles/components/close_button.css';

const CloseButton = ({ handleClick }) => {
  return (
    <div className={styles.close_hover}>
      <div
        className={styles.close_button}
        onClick={(e) => handleClick(e)}
      />
    </div>
  );
};

CloseButton.propTypes = {
  handleClick: PropTypes.func
};

export default CloseButton;
