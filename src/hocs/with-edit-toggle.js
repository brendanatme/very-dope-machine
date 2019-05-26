//
// applyEditToggle
//
// used by various UI components
// to enable/disable an editable state
//
import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';

export const withEditToggle = (options = {
  clickToEdit: true,
  clickoff: true,
}) => (Composed) => {
  class EditToggle extends React.Component {
    state = {
      isEditing: false,
    }

    getComposed = (ref) => {
      this.composed = ref;
    }

    handleClick = () => {
      if (!this.state.isEditing) {
        this.startEditing();
      }
    }

    /**
     * provide composed component with method
     * to call imperatively if required
     */
    toggleEdit = () => {
      this.state.isEditing
        ? this.quitEditing()
        : this.startEditing(); // eslint-disable-line no-unused-expressions
    }

    /**
     * method called by enhanceWithClickOutside
     */
    handleClickOutside = () => {
      if (options.clickoff) {
        this.quitEditing();
      }
    }

    startEditing() {
      this.setState({ isEditing: true });
    }

    quitEditing() {
      if (this.state.isEditing) {
        this.setState({ isEditing: false }, () => {
          if (this.composed.onQuitEditing) {
            this.composed.onQuitEditing();
          }
        });
      }
    }

    render() {
      return (
        <span onClick={options.clickToEdit ? this.handleClick : null}>
          <Composed
            isEditing={this.state.isEditing}
            ref={this.getComposed}
            toggleEdit={this.toggleEdit}
            {...this.props}
          />
        </span>
      );
    }
  }

  return enhanceWithClickOutside(EditToggle);
};
