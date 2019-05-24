//
// KitSwitcher
//
// allow user to switch between kits
// when a kit is switched to,
// set that kit's sounds
// as the srcs of the drum pads
//
// @action pads
// @action kits
//
// @resource pads
// @resource kits
//
import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import KeyHandler, { KEYDOWN } from 'react-key-handler';
import classNames from 'classnames';
import { switchKit } from '../actions/kitActions';
import styles from '../styles/components/kit_switcher.css';

class KitSwitcher extends Component {
  static propTypes = {
    kits: PropTypes.object,
    pads: PropTypes.object,
    switchKit: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.selectKit = this.selectKit.bind(this);
  }

  handleKeyDown({ key }) {
    switch (key) {
      case "ArrowUp":
        return this.selectPreviousKit();
      case "ArrowDown":
        return this.selectNextKit();
      default:
        return "components/KitSwitcher.handleKeyDown: no case found for keyDown";
    }
  }

  selectNextKit() {
    const kitsArray = Object.keys(this.props.kits.all);
    const selectedIndex = kitsArray.indexOf(this.props.kits.selected);
    const nextIndex = selectedIndex >= kitsArray.length - 1? 0: selectedIndex + 1;
    const key = kitsArray[nextIndex];
    this.selectKit(key);
  }

  selectPreviousKit() {
    const kitsArray = Object.keys(this.props.kits.all);
    const selectedIndex = kitsArray.indexOf(this.props.kits.selected);
    const previousIndex = selectedIndex === 0? kitsArray.length - 1: selectedIndex - 1;
    const key = kitsArray[previousIndex];
    this.selectKit(key);
  }

  selectKit(key) {
    this.props.switchKit(key);
  }

  renderList() {
    let items = [];

    _.forIn(this.props.kits.all, (kit, key) => {
      items.push(
        <li key={key}
          className={classNames({
            [styles.item]: true,
            [styles.selected]: this.props.kits.selected === key
          })}
          onClick={() => this.selectKit(key)}>
          {kit.name}
        </li>
      );
    });

    return <ul className={styles.ul_reset}>{items}</ul>;
  }

  render() {
    return(
      <div className={styles.center_screen}>
        <div>
          <h4>DRUM KITS</h4>
          {this.renderList()}
          <KeyHandler
            keyEventName={KEYDOWN}
            keyValue="ArrowUp"
            onKeyHandle={this.handleKeyDown}
          />
          <KeyHandler
            keyEventName={KEYDOWN}
            keyValue="ArrowDown"
            onKeyHandle={this.handleKeyDown}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ kits, pads }) {
  return { kits, pads };
}

export default connect(mapStateToProps, { switchKit })(KitSwitcher);
