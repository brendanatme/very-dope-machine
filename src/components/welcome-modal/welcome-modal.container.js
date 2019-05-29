/**
 * welcome-modal.container
 */
import React from 'react';
import Modal from '../modal';
import styles from './welcome-modal.component.css';

export default class WelcomeModal extends React.Component {
  state = {
    show: true,
  }

  close = () => this.setState({ show: false });

  render() {
    return (
      <Modal onClose={this.close} show={this.state.show}>
        <div className={styles.rte}>
          <p>Very Dope Machine is a virtual drum machine.</p>
          <ul>
            <li>Hit the keys on your keyboard corresponding to the drum pads to play sounds.</li>
            <li>Or plug in your own MIDI controller and use that.</li>
            <li>Switch kits in the Kits screen to load in different sounds.</li>
            <li>Edit the pads by clicking on them to trim your sounds, load in different sounds, control the busses, and set the volume.</li>
            <li>Record loops by hitting the space bar.</li>
            <li>Save and load your settings in the Save/Load screen.</li>
          </ul>
        </div>
      </Modal>
    );
  }
}
