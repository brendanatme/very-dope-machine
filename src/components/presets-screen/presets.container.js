/**
 * presets.container
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Routes } from '../../constants';
import { getNextFromCollection, getPreviousFromCollection } from '../../helpers';
import { addPreset, removePreset, loadPreset } from '../../store/presets.state';
import PresetsComponent from './presets.component';

class Presets extends React.Component {
  static propTypes = {
    addPreset: PropTypes.func,
    history: PropTypes.object.isRequired,
    loadPreset: PropTypes.func,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    removePreset: PropTypes.func,
    presets: PropTypes.object,
  }

  state = {
    modalMessage: '',
    showModal: false,
  }

  showMessage = (modalMessage, redirectTo = '') => {
    this.setState({
      showModal: true,
      modalMessage,
    }, () => {
      setTimeout(() => {
        this.setState({
          modalMessage: '',
          showModal: false,
        });
        if (redirectTo) {
          setTimeout(() => {
            this.props.history.push(redirectTo);
          }, 250);
        }
      }, 3000);
    });
  }

  closeModal = () => this.setState({
    modalMessage: '',
    showModal: false,
  });

  addPreset = (e) => {
    e.preventDefault();
    this.props.addPreset(this.props.presets.all.length);
    this.showMessage('Preset successfully saved!');
  }

  removePreset = (i) => (e) => {
    e.preventDefault();
    this.props.removePreset(i);
    this.showMessage('Preset successfully removed!');
  }

  loadPreset = (i) => (e) => {
    e.preventDefault();
    this.props.loadPreset(i);
    this.showMessage('Preset successfully loaded!', Routes.PADS);
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
        modalMessage={this.state.modalMessage}
        onModalClose={this.closeModal}
        presets={this.props.presets}
        removePreset={this.removePreset}
        showModal={this.state.showModal}
      />
    );
  }
}

const mapStateToProps = ({ presets }) => ({ presets });

export default withRouter(connect(mapStateToProps, { addPreset, removePreset, loadPreset })(Presets));
