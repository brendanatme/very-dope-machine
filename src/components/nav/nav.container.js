/**
 * nav.container
 */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import KeyHandler, { KEYDOWN } from 'react-key-handler';
import { connect } from 'react-redux';
import { Routes } from '../../constants';
import { openModal } from '../../store/modal.state';
import styles from './nav.component.css';

class Nav extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    openModal: PropTypes.func,
  }

  handleKeyDown = ({ key }) => {
    switch (key) {
      case "k":
        return this.props.history.push(Routes.KITS);
      case "p":
        return this.props.history.push(Routes.PADS);
      case "l":
        return this.props.history.push(Routes.PRESETS);
      case "h":
        return this.props.openModal({ type: 'Hotkeys' });
      default:
        return "components/Nav.handleKeyDown: no case found for keyDown";
    }
  }

  handleClick = (e) => {
    e.preventDefault();

    this.props.openModal({ type: 'Hotkeys' });
  }

  render() {
    return (
      <header className={styles.nav}>
        <NavLink
          activeClassName={styles.active}
          className={styles.link}
          exact={true}
          to="/">
          <span className={styles.link_text}>PADS<span className={styles.hotkey}> (p)</span></span>
        </NavLink>
        <NavLink
          className={styles.link}
          activeClassName={styles.active}
          to="/kits">
          <span className={styles.link_text}>KITS<span className={styles.hotkey}> (k)</span></span>
        </NavLink>
        <h1 className={styles.item}>VDM</h1>
        <NavLink
          className={styles.link}
          activeClassName={styles.active}
          to="/presets">
          <span className={styles.link_text}>SAVE/LOAD<span className={styles.hotkey}> (l)</span></span>
        </NavLink>
        <a href="javascript:void(0)"
          className={styles.link}
          onClick={this.handleClick}>
          <span className={styles.link_text}>HOTKEYS<span className={styles.hotkey}> (h)</span></span>
        </a>
        <KeyHandler
          keyEventName={KEYDOWN}
          keyValue="p"
          onKeyHandle={this.handleKeyDown}
        />
        <KeyHandler
          keyEventName={KEYDOWN}
          keyValue="k"
          onKeyHandle={this.handleKeyDown}
        />
        <KeyHandler
          keyEventName={KEYDOWN}
          keyValue="l"
          onKeyHandle={this.handleKeyDown}
        />
        <KeyHandler
          keyEventName={KEYDOWN}
          keyValue="h"
          onKeyHandle={this.handleKeyDown}
        />
      </header>
    );
  }
}

export default withRouter(connect(null, { openModal })(Nav));
