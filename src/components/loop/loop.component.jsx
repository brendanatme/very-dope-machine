/**
 * loop.component
 */
import React from 'react';
import './loop.component.css';

export default ({
  // children,
  className = '',
}) => {
  return (
    <div className={`loop ${className}`}>
      Loop
    </div>
  );
};