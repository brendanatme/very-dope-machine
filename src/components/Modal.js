import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import KeyHandler, { KEYUP } from 'react-key-handler';
import classNames from 'classnames';
import DrumPadForm from './drum-pad-form';
import Hotkeys from './hotkeys';
import { closeModal } from '../actions/modalActions';
import styles from '../styles/components/modal.css';
import transition from '../styles/mixins/open_wh.css';

const ChildrenTypes = {
  DrumPadForm,
  Hotkeys
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
    const modalClasses = classNames({
      [styles.modal]: true,
      [styles.fade__in]: !!content
    });
    let ContentComponent;
    if (content) {
      ContentComponent = ChildrenTypes[content.type];
    }

    return (
      <div className={modalClasses}>
        <KeyHandler
          keyEventName={KEYUP}
          keyValue="Escape"
          onKeyHandle={this.closeModal}
        />
        <div
          onClick={this.closeModal}
          className={styles.modal_bg}
        />

        <ReactCSSTransitionGroup
          transitionName={transition}
          transitionEnterTimeout={750}
          transitionLeaveTimeout={500}>
          {content && (
            <div className={styles.content}>
              <ContentComponent key={0} {...content.props} />
            </div>
          )}
        </ReactCSSTransitionGroup>

        <a href="javascript:void(0)"
          onClick={this.closeModal}
          className={styles.close}>
          X (Esc)
        </a>
      </div>
    );
  }
}

function mapStateToProps({ modal }) {
  return { content: modal.content, options: modal.options };
}

export default connect(mapStateToProps, { closeModal })(Modal);
