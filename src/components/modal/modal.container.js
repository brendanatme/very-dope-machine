/**
 * modal.container
 *
 * TODO: should only listen for key presses when active
 * currently, if you use the text input, and press escape, this component throws an error
 */
import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import KeyHandler, { KEYUP } from 'react-key-handler';
import transition from '../../styles/mixins/open_wh.css';
import styles from './modal.component.css';

let modalCount = 0;

export default class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);

    modalCount++;

    this.el = document.createElement('div');
    this.el.id = `modal-root-${modalCount}`;
  }

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  closeModal = (e) => {
    e.preventDefault();

    console.log('closeModal');

    this.props.onClose();
  }

  render() {
    return ReactDom.createPortal((
      <div className={`${styles.modal} ${this.props.show ? styles.fade__in : ''}`}>
        {this.props.show && (
          <KeyHandler
            keyEventName={KEYUP}
            keyValue="Escape"
            onKeyHandle={this.closeModal}
          />
        )}

        <div
          onClick={this.closeModal}
          className={styles.modal_bg}
        />

        <CSSTransitionGroup
          transitionName={transition}
          transitionEnterTimeout={750}
          transitionLeaveTimeout={500}>
          <div className={styles.content}>
            {this.props.children}
          </div>
        </CSSTransitionGroup>

        <a
          className={styles.close}
          href="javascript:void(0)"
          onClick={this.closeModal}
        >
          X (Esc)
        </a>
      </div>
    ), this.el);
  }
}
