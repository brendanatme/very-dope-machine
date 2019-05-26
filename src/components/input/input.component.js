/**
 * input.component
 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './input.component.css';

const TextInput = React.forwardRef(({
  className = '',
  id,
  name,
  onBlur = null,
  onChange,
  onKeyDown = null,
  type = 'text',
  value,
}, ref) => (
  <div className={`${styles.input__wrapper} ${className}`}>
    <input
      className={styles.input}
      id={id}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      ref={ref}
      type={type}
      value={value}
    />
  </div>
));

TextInput.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
};

export default TextInput;
