/**
 * DrumPadForm
 *
 * is opened in a modal from 'components/drum_pad' during onclick
 * edits settings for that drum pad
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updatePad } from '../actions/padActions';
import styles from '../styles/components/drum_pad_form.css';

class DrumPadForm extends Component {
  static propTypes = {
    id: PropTypes.string,
    updatePad: PropTypes.func,
    pads: PropTypes.object,
    sounds: PropTypes.array,
    channels: PropTypes.array
  }

  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  parseFilename(path) {
    return path.substring(path.lastIndexOf('/') + 1);
  }

  handleInputChange(propName, type) {
    return (e) => {
      let val = e.target.value;

      if (type === 'int') {
        val = parseInt(val, 10);
      }

      if (type === 'float') {
        val = parseFloat(val, 10);
      }

      if (type === 'float' || type === 'int') {
        if (Number.isNaN(val)) {
          return;
        }
      }

      if (type === 'select') {
        e.target.blur();
      }

      this.props.updatePad({
        id: this.props.id,
        [propName]: val
      });
    };
  }

  render() {
    // in DrumPadForm, we must reference redux data
    // since DrumPadForm renders on DrumPad.click, not on state/prop changes
    const pad = this.props.pads[this.props.id];
    return(
      <form className={styles.drum_pad_form}>
        <h3>EDIT PAD {this.props.id}</h3>
        <fieldset className={styles.fieldset}>
          <label className={styles.label}>CHANNEL</label>
          <select
            className={styles.select}
            defaultValue={pad.channelId}
            onChange={this.handleInputChange('channelId', 'select')}>
            {this.props.channels.map(k => {
              return <option key={k}>{k}</option>;
            })}
          </select>
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label className={styles.label}>SOUND</label>
          <select
            className={styles.select}
            defaultValue={pad.src}
            onChange={this.handleInputChange('src', 'select')}>
            {this.props.sounds.map((src, i) => {
              return <option key={i} value={src}>{this.parseFilename(src)}</option>;
            })}
          </select>
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label className={styles.label}>VOLUME</label>
          <input
            className={styles.input}
            onChange={this.handleInputChange('volume', 'float')}
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
            onChange={this.handleInputChange('startTime', 'int')}
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
            onChange={this.handleInputChange('endTime', 'int')}
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
  }
}

function mapStateToProps({ pads, kits, channels }) {
  let sounds = [];

  Object.keys(kits.all).map(k => {
    Object.keys(kits.all[k].srcs).map(padId => {
      sounds.push(kits.all[k].srcs[padId]);
    });
  });

  return {
    pads,
    sounds,
    channels: Object.keys(channels)
  };
}

export default connect(mapStateToProps, { updatePad })(DrumPadForm);
