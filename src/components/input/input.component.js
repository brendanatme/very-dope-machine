/**
 * input.component
 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './input.component.css';

const Input = React.forwardRef(({
  className = '',
  error,
  id,
  name,
  onBlur = null,
  onChange,
  onKeyDown = null,
  type = 'text',
  value,
}, ref) => (
  <div className={`${styles.input__wrapper} ${error ? styles.input__wrapper__has_error : ''} ${className}`}>
    <input
      className={`${styles.input} ${error ? styles.input__has_error : ''}`}
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

Input.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
};

export default Input;
