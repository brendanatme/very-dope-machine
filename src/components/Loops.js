import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loop from './Loop';
import styles from '../styles/components/loops.css';

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

function mapStateToProps({ loops }) {
  return { loops };
}

export default connect(mapStateToProps)(Loops);
