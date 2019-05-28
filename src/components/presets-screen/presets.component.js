/**
 * presets.component
 */
import React from 'react';
import PropTypes from 'prop-types';
import KeyHandler, { KEYDOWN } from 'react-key-handler';
import Modal from '../modal';
import styles from './presets.component.css';

const Presets = ({
  addPreset,
  handleKeyDown,
  loadPreset,
  modalMessage,
  onModalClose,
  presets,
  removePreset,
  showModal,
}) => (
  <div className={styles.center_screen}>
    {presets.all.length > 1 && (
      <span>
        <KeyHandler
          keyEventName={KEYDOWN}
          keyValue="ArrowDown"
          onKeyHandle={handleKeyDown}
        />
        <KeyHandler
          keyEventName={KEYDOWN}
          keyValue="ArrowUp"
          onKeyHandle={handleKeyDown}
        />
      </span>
    )}
    <div>
      <ul className={styles.ul_reset}>
        {presets.all.map((val, i) => (
          <li key={i}>
            <a className={`${styles.link} ${presets.selecte === i ? styles.selected : ''}`}
              onClick={loadPreset(i)}
              href="javascript:void(0)">
              PRESET {i}
            </a>
            &nbsp;
            <a className={styles.del}
              href="javascript:void(0)"
              onClick={removePreset(i)}>
              X
            </a>
          </li>
        ))}
      </ul>
      <ul className={styles.ul_reset}>
        <li>
          <a
            className={styles.link}
            href="javascript:void(0)"
            onClick={addPreset}>
            + SAVE CURRENT SETTINGS AS PRESET
          </a>
        </li>
      </ul>
    </div>
    <Modal show={showModal} onClose={onModalClose}>
      <div className={`${styles.full_height} ${styles.vcenter}`}>
        <div className={styles.vcenteree}>
          <p>{modalMessage}</p>
        </div>
      </div>
    </Modal>
  </div>
);

Presets.propTypes = {
  addPreset: PropTypes.func,
  handleKeyDown: PropTypes.func,
  loadPreset: PropTypes.func,
  modalMessage: PropTypes.string,
  onModalClose: PropTypes.func,
  presets: PropTypes.object,
  removePreset: PropTypes.func,
  showModal: PropTypes.bool,
};

export default Presets;
