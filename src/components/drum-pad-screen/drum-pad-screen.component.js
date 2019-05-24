/**
 * drum-pad-screen
 *
 * display:
 * - displays DrumPads
 * - displays Recorder
 *
 * function:
 * - connects pads to selected drum kit
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loops from '../loops';
import DrumPad from '../drum-pad';
import Recorder from '../recorder';
import BPMInput from '../bpm-input';
import styles from './drum-pad-screen.component.css';

const DrumPadScreen = ({ pads }) => (
  <div className={styles.screen}>
    <div className={styles.body}>
      <Loops />
      <div className={styles.group}>
        {Object.keys(pads).map(k => {
          const pad = pads[k];
          return (
            <DrumPad
              key={k}
              id={k}
              src={pad.src}
              inputKey={pad.inputKey}
              busId={pad.busId}
              volume={pad.volume}
              startTime={pad.startTime}
              endTime={pad.endTime}
              midiInput={pad.midiInput}
            />
          );
        })}
      </div>
    </div>
    <div className={styles.footer}>
      <BPMInput />
      <Recorder />
    </div>
  </div>
);

DrumPadScreen.propTypes = {
  pads: PropTypes.object,
};

const mapStateToProps = ({ pads }) => ({ pads });

export default connect(mapStateToProps)(DrumPadScreen);
