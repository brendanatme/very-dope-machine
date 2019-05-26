/**
 * bpm-input.container
 */
import React from 'react';
import BpmInputComponent from './bpm-input.component';

export default class BpmInput extends React.Component {
  state = {
    isEditing: false,
    value: '90',
  }

  onChange = (value) => this.setState({ value })

  startEditing = () => this.setState({ isEditing: true });

  quitEditing = () => this.setState({ isEditing: false });

  toggleEdit = (e) => {
    e.preventDefault();

    this.setState({
      isEditing: !this.state.isEditing,
    });
  }

  validate = (value) => {
    const n = parseInt(value, 10);

    if (isNaN(n)) {
      return 'BPM must be a number';
    }

    if (n < 1) {
      return 'BPM must be greater than 1';
    }

    if (n > 300) {
      return 'BPM must be less than 200';
    }

    return false;
  }

  render() {
    return (
      <BpmInputComponent
        isEditing={this.state.isEditing}
        onBlur={this.quitEditing}
        onChange={this.onChange}
        onClick={this.toggleEdit}
        validate={this.validate}
        value={this.state.value}
      />
    );
  }
}
