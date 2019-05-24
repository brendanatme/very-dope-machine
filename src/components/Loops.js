import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Loop from './Loop';
import styles from '../styles/components/loops.css';

const Loops = ({ loops }) => {
  return(
    <div className={styles.loops}>
      {Object.keys(loops).map((k, i) => {
        return <Loop key={i} {...loops[k]} />;
      })}
    </div>
  );
};

Loops.propTypes = {
  loops: PropTypes.object
};

function mapStateToProps({ loops }) {
  return { loops };
}

export default connect(mapStateToProps)(Loops);
