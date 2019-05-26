/**
 * bpm-input.component
 */
import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input';
import styles from './bpm-input.component.css';

const BPMInput = ({
  isEditing,
  onBlur,
  onChange,
  onClick,
  validate,
  value,
}) => (
  <div className={styles.bpm} onClick={onClick}>
    {isEditing ? (
      <span className={styles.input}>
        <Input
          id="bpm-input"
          name="bpm-input"
          onBlur={onBlur}
          onChange={onChange}
          type="number"
          validate={validate}
          value={value}
        />
      </span>
    ) : (
      <span className={styles.value}>{value}</span>
    )}
    <span className={styles.label}>BPM</span>
  </div>
);

BPMInput.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default BPMInput;
