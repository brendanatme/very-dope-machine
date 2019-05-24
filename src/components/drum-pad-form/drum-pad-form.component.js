/**
 * drum-pad-form.component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { parseFilename } from '../../helpers';
import styles from './drum-pad-form.component.css';

const DrumPadForm = ({
  channels,
  id,
  makeHandleInputChange,
  pad,
  sounds,
}) => (
  <form className={styles.drum_pad_form}>
    <h3>EDIT PAD {id}</h3>
    <fieldset className={styles.fieldset}>
      <label className={styles.label}>CHANNEL</label>
      <select
        className={styles.select}
        defaultValue={pad.channelId}
        onChange={makeHandleInputChange('channelId', 'select')}>
        {channels.map(k => (
          <option key={k}>{k}</option>
        ))}
      </select>
    </fieldset>
    <fieldset className={styles.fieldset}>
      <label className={styles.label}>SOUND</label>
      <select
        className={styles.select}
        defaultValue={pad.src}
        onChange={makeHandleInputChange('src', 'select')}>
        {sounds.map((src, i) => (
          <option key={i} value={src}>{parseFilename(src)}</option>
        ))}
      </select>
    </fieldset>
    <fieldset className={styles.fieldset}>
      <label className={styles.label}>VOLUME</label>
      <input
        className={styles.input}
        onChange={makeHandleInputChange('volume', 'float')}
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={pad.volume}
      />
      <span className={styles.legend}>{pad.volume}</span>
    </fieldset>
    <fieldset className={styles.fieldset}>
      <label className={styles.label}>START (MS)</label>
      <input
        className={styles.input}
        onChange={makeHandleInputChange('startTime', 'int')}
        type="range"
        min="0"
        max="10000"
        step="100"
        value={pad.startTime}
      />
      <span className={styles.legend}>{pad.startTime}</span>
    </fieldset>
    <fieldset className={styles.fieldset}>
      <label className={styles.label}>END (MS)</label>
      <input
        className={styles.input}
        onChange={makeHandleInputChange('endTime', 'int')}
        type="range"
        min="0"
        max="10000"
        step="100"
        value={pad.endTime}
      />
      <span className={styles.legend}>{pad.endTime}</span>
    </fieldset>
  </form>
);

DrumPadForm.propTypes = {
  channels: PropTypes.array,
  id: PropTypes.string,
  makeHandleInputChange: PropTypes.func,
  pad: PropTypes.object,
  sounds: PropTypes.array,
};

export default DrumPadForm;
