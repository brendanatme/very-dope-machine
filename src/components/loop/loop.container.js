/**
 * loop.container
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withLoop } from '../../effects/player';
import { removeLoop } from '../../store/loops.state';
import CloseButton from '../close-button';
import MuteButton from '../mute-button';
import styles from './loop.component.css';

class Loop extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    loop: PropTypes.object,
    name: PropTypes.string,
    removeLoop: PropTypes.func,
  }

  state = {
    isMuted: false,
  }

  handleClick = (e) => {
    e.preventDefault();

    this.state.isMuted
      ? this.props.loop.unmute()
      : this.props.loop.mute();

    this.setState({
      isMuted: !this.state.isMuted,
    });
  }

  handleClose = (e) => {
    e.preventDefault();

    /**
     * TODO: destroying the bus is a side-effect
     * it should happen as part of the removeLoop action
     */
    this.props.removeLoop(this.props.id);
  }

  render() {
    return (
      <div className={styles.loop}>
        <div className={styles.label}>{this.props.name}</div>
        <div className={styles.ib}>
          <CloseButton handleClick={this.handleClose} />
        </div>
        <div className={styles.ib}>
          <MuteButton
            isMuted={this.state.isMuted}
            handleClick={this.handleClick}
          />
        </div>
      </div>
    );
  }
}

const connectedLoop = withLoop(Loop);

export default connect(null, { removeLoop })(connectedLoop);
