/**
 * loops.container
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loop from '../loop';
import styles from './loops.component.css';

const Loops = ({ loops }) => (
  <div className={styles.loops}>
    {Object.keys(loops).map((k, i) => (
      <Loop key={i} {...loops[k]} />
    ))}
  </div>
);

Loops.propTypes = {
  loops: PropTypes.object,
};

const mapStateToProps = ({ loops }) => ({ loops });

export default connect(mapStateToProps)(Loops);
