/**
 * presets.container
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addPreset, removePreset, loadPreset } from '../../actions/presetActions';
import PresetsComponent from './presets.component';

class Presets extends Component {
  static propTypes = {
    addPreset: PropTypes.func,
    removePreset: PropTypes.func,
    loadPreset: PropTypes.func,
    presets: PropTypes.object
  }

  addPreset = (e) => {
    e.preventDefault();
    this.props.addPreset(this.props.presets.all.length);
  }

  removePreset = (i) => (e) => {
    e.preventDefault();
    this.props.removePreset(i);
  }

  loadPreset = (i) => (e) => {
    e.preventDefault();
    this.props.loadPreset(i);
  }

  loadPreviousPreset() {
    const selectedIndex = this.props.presets.all.indexOf(this.props.presets.selected);
    const previousIndex = selectedIndex === 0? this.props.presets.all.length - 1: selectedIndex - 1;
    const key = this.props.presets.all[previousIndex];
    this.props.loadPreset(key);
  }

  loadNextPreset() {
    const selectedIndex = this.props.presets.all.indexOf(this.props.presets.selected);
    const nextIndex = selectedIndex >= this.props.presets.all.length - 1? 0: selectedIndex + 1;
    const key = this.props.presets.all[nextIndex];
    this.props.loadPreset(key);
  }

  handleKeyDown = ({ key }) => {
    switch (key) {
      case "ArrowUp":
        return this.loadPreviousPreset();
      case "ArrowDown":
        return this.loadNextPreset();
      default:
        return "components/Presets.handleKeyDown: no case found for keyDown";
    }
  }

  render() {
    return (
      <PresetsComponent
        addPreset={this.addPreset}
        handleKeyDown={this.handleKeyDown}
        loadPreset={this.loadPreset}
        presets={this.props.presets}
        removePreset={this.removePreset}
      />
    );
  }
}

function mapStateToProps({ presets }) {
  return { presets };
}

export default connect(mapStateToProps, { addPreset, removePreset, loadPreset })(Presets);
