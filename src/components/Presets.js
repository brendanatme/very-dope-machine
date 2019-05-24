import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import KeyHandler, { KEYDOWN } from 'react-key-handler';
import classNames from 'classnames';
import { addPreset, removePreset, loadPreset } from '../actions/presetActions';
import styles from '../styles/components/presets.css';

class Presets extends Component {
  static propTypes = {
    addPreset: PropTypes.func,
    removePreset: PropTypes.func,
    loadPreset: PropTypes.func,
    presets: PropTypes.object
  }

  addPreset = (e) => {
    e.preventDefault();
    this.props.addPreset(this.props.presets.all.length);
  }

  removePreset = (i) => (e) => {
    e.preventDefault();
    this.props.removePreset(i);
  }

  loadPreset = (i) => (e) => {
    e.preventDefault();
    this.props.loadPreset(i);
  }

  loadPreviousPreset() {
    const selectedIndex = this.props.presets.all.indexOf(this.props.presets.selected);
    const previousIndex = selectedIndex === 0? this.props.presets.all.length - 1: selectedIndex - 1;
    const key = this.props.presets.all[previousIndex];
    this.props.loadPreset(key);
  }

  loadNextPreset() {
    const selectedIndex = this.props.presets.all.indexOf(this.props.presets.selected);
    const nextIndex = selectedIndex >= this.props.presets.all.length - 1? 0: selectedIndex + 1;
    const key = this.props.presets.all[nextIndex];
    this.props.loadPreset(key);
  }

  handleKeyDown = ({ key }) => {
    switch (key) {
      case "ArrowUp":
        return this.loadPreviousPreset();
      case "ArrowDown":
        return this.loadNextPreset();
      default:
        return "components/Presets.handleKeyDown: no case found for keyDown";
    }
  }

  render() {
    return(
      <div className={styles.center_screen}>
        {this.props.presets.all.length > 1 && (
          <span>
            <KeyHandler
              keyEventName={KEYDOWN}
              keyValue="ArrowDown"
              onKeyHandle={this.handleKeyDown}
            />
            <KeyHandler
              keyEventName={KEYDOWN}
              keyValue="ArrowUp"
              onKeyHandle={this.handleKeyDown}
            />
          </span>
        )}
        <div>
          <ul className={styles.ul_reset}>
            {this.props.presets.all.map((val, i) => {
              const linkClasses = classNames({
                [styles.link]: true,
                [styles.selected]: this.props.presets.selected === i
              });
              return (
                <li key={i}>
                  <a className={linkClasses}
                    onClick={this.loadPreset(i)}
                    href="javascript:void(0)">
                    PRESET {i}
                  </a>
                  &nbsp;
                  <a className={styles.del}
                    href="javascript:void(0)"
                    onClick={this.removePreset(i)}>
                    X
                  </a>
                </li>
              );
            })}
          </ul>
          <ul className={styles.ul_reset}>
            <li>
              <a
                className={styles.link}
                href="javascript:void(0)"
                onClick={this.addPreset}>
                + SAVE CURRENT SETTINGS AS PRESET
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ presets }) {
  return { presets };
}

export default connect(mapStateToProps, { addPreset, removePreset, loadPreset })(Presets);
