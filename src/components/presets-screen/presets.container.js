/**
 * presets.container
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNextFromCollection, getPreviousFromCollection } from '../../helpers';
import { addPreset, removePreset, loadPreset } from '../../store/presets.state';
import PresetsComponent from './presets.component';

class Presets extends React.Component {
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
    const key = getPreviousFromCollection(this.props.presets.all, this.props.presets.selected);
    this.props.loadPreset(key);
  }

  loadNextPreset() {
    const key = getNextFromCollection(this.props.presets.all, this.props.presets.selected);
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

const mapStateToProps = ({ presets }) => ({ presets });

export default connect(mapStateToProps, { addPreset, removePreset, loadPreset })(Presets);
