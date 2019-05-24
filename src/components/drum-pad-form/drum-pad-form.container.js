/**
 * drum-pad-form.container
 *
 * is opened in a modal from 'components/drum-pad' during onclick
 * edits settings for that drum pad
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePad } from '../../store/pads.state';
import DrumPadFormComponent from './drum-pad-form.component';

class DrumPadForm extends React.Component {
  static propTypes = {
    busses: PropTypes.array,
    id: PropTypes.string,
    pads: PropTypes.object,
    sounds: PropTypes.array,
    updatePad: PropTypes.func,
  }

  makeHandleInputChange = (propName, type) => (e) => {
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
  }

  render() {
    return (
      <DrumPadFormComponent
        busses={this.props.busses}
        id={this.props.id}
        makeHandleInputChange={this.makeHandleInputChange}
        pad={this.props.pads[this.props.id]}
        sounds={this.props.sounds}
      />
    );
  }
}

const mapStateToProps = ({ pads, kits, busses }) => {
  let sounds = [];

  Object.keys(kits.all).map(k => {
    Object.keys(kits.all[k].srcs).map(padId => {
      sounds.push(kits.all[k].srcs[padId]);
    });
  });

  return {
    busses: Object.keys(busses),
    pads,
    sounds,
  };
}

export default connect(mapStateToProps, { updatePad })(DrumPadForm);
