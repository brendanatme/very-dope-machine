/**
 * bpm-input.container
 */
import React from 'react';
import BpmInputComponent from './bpm-input.component';

export default class BpmInput extends React.Component {
  state = {
    isEditing: false,
  }

  toggleEdit = (e) => {
    e.preventDefault();

    this.setState({
      isEditing: !this.state.isEditing,
    });
  }

  render() {
    return (
      <BpmInputComponent
        isEditing={this.state.isEditing}
        onClick={this.toggleEdit}
        value="90"
      />
    );
  }
}
