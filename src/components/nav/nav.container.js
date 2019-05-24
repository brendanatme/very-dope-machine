/**
 * nav.container
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink, browserHistory } from 'react-router';
import KeyHandler, { KEYDOWN } from 'react-key-handler';
import { connect } from 'react-redux';
import { openModal } from '../../store/modal.state';
import styles from './nav.component.css';

class Nav extends React.Component {
  static propTypes = {
    openModal: PropTypes.func,
  }

  handleKeyDown = ({ key }) => {
    switch (key) {
      case "k":
        return browserHistory.push('/kits');
      case "p":
        return browserHistory.push('/');
      case "l":
        return browserHistory.push('/presets');
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
        <IndexLink
          className={styles.link}
          activeClassName={styles.active}
          to="/">
          <span className={styles.link_text}>PADS<span className={styles.hotkey}> (p)</span></span>
        </IndexLink>
        <Link
          className={styles.link}
          activeClassName={styles.active}
          to="/kits">
          <span className={styles.link_text}>KITS<span className={styles.hotkey}> (k)</span></span>
        </Link>
        <h1 className={styles.item}>VDM</h1>
        <Link
          className={styles.link}
          activeClassName={styles.active}
          to="/presets">
          <span className={styles.link_text}>SAVE/LOAD<span className={styles.hotkey}> (l)</span></span>
        </Link>
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

export default connect(null, { openModal })(Nav);
