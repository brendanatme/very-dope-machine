/**
 * DrumPadScreen
 *
 * display:
 * - displays DrumPads
 * - displays Recorder
 *
 * function:
 * - connects pads to selected drum kit
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Loops from './Loops';
import DrumPad from './DrumPad';
import Recorder from './Recorder';
import styles from '../styles/components/drum_pad_screen.css';

const DrumPadScreen = ({ pads }) => {
  return (
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
                channelId={pad.channelId}
                volume={pad.volume}
                startTime={pad.startTime}
                endTime={pad.endTime}
                midiInput={pad.midiInput}
              />
            );
          })}
        </div>
      </div>
      <Recorder />
    </div>
  );
};

DrumPadScreen.propTypes = {
  pads: PropTypes.object
};

function mapStateToProps({ pads }) {
  return { pads };
}

export default connect(mapStateToProps)(DrumPadScreen);
