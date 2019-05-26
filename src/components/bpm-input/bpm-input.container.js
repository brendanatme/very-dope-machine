/**
 * bpm-input.container
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateBpm } from '../../store/player.state';
import BpmInputComponent from './bpm-input.component';

class BpmInput extends React.Component {
  static propTypes = {
    bpm: PropTypes.number,
  }

  state = {
    isEditing: false,
  }

  onChange = (value) => this.props.updateBpm(value);

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
        value={this.props.bpm}
      />
    );
  }
}

const mapStateToProps = ({ player }) => ({ bpm: player.bpm });

export default connect(mapStateToProps, { updateBpm })(BpmInput);
