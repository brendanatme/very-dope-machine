/**
 * bpm-input.component
 */
import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input';
import styles from './bpm-input.component.css';

const BPMInput = ({
  isEditing,
  onClick,
  value,
}) => (
  <div className={styles.bpm} onClick={onClick}>
    {isEditing ? (
      <Input
        className={styles.input}
        id="bpm-input"
        name="bpm-input"
        type="number"
        value={value}
      />
    ) : (
      <span className={styles.input}>{value}</span>
    )}
    <span className={styles.label}>BPM</span>
  </div>
);

BPMInput.propTypes = {
  isEditing: PropTypes.bool,
  onClick: PropTypes.func,
  value: PropTypes.string,
};

export default BPMInput;
