/**
 * modal.container
 *
 * TODO: should only listen for key presses when active
 * currently, if you use the text input, and press escape, this component throws an error
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import KeyHandler, { KEYUP } from 'react-key-handler';
import { closeModal } from '../../store/modal.state';
import transition from '../../styles/mixins/open_wh.css';
import DrumPadForm from '../drum-pad-form';
import Hotkeys from '../hotkeys';
import styles from './modal.component.css';

const ChildrenTypes = {
  DrumPadForm,
  Hotkeys,
};

class Modal extends React.Component {
  static propTypes = {
    closeModal: PropTypes.func,
    content: PropTypes.object,
    options: PropTypes.object,
  }

  closeModal = (e) => {
    e.preventDefault();

    this.props.closeModal(this.props.content.onClose);
  }

  render() {
    const { content } = this.props;
    let ContentComponent;
    if (content) {
      ContentComponent = ChildrenTypes[content.type];
    }

    return (
      <div className={`${styles.modal} ${content ? styles.fade__in : ''}`}>
        <KeyHandler
          keyEventName={KEYUP}
          keyValue="Escape"
          onKeyHandle={this.closeModal}
        />
        <div
          onClick={this.closeModal}
          className={styles.modal_bg}
        />

        <CSSTransitionGroup
          transitionName={transition}
          transitionEnterTimeout={750}
          transitionLeaveTimeout={500}>
          {content && (
            <div className={styles.content}>
              <ContentComponent key={0} {...content.props} />
            </div>
          )}
        </CSSTransitionGroup>

        <a href="javascript:void(0)"
          onClick={this.closeModal}
          className={styles.close}>
          X (Esc)
        </a>
      </div>
    );
  }
}

const mapStateToProps = ({ modal }) => ({
  content: modal.content,
  options: modal.options,
});

export default connect(mapStateToProps, { closeModal })(Modal);
