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
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { switchKit } from '../../actions/kitActions';
import KitSwitcherComponent from './kit-switcher.component';

class KitSwitcher extends React.Component {
  static propTypes = {
    kits: PropTypes.object,
    pads: PropTypes.object,
    switchKit: PropTypes.func
  }

  handleKeyDown = ({ key }) => {
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

  selectKit = (key) => {
    this.props.switchKit(key);
  }

  makeSelectKit = (key) => () => {
    this.selectKit(key);
  }

  render() {
    return (
      <KitSwitcherComponent
        allKits={this.props.kits.all}
        handleKeyDown={this.handleKeyDown}
        makeSelectKit={this.makeSelectKit}
        selectedKitKey={this.props.kits.selected}
      />
    );
  }
}

function mapStateToProps({ kits, pads }) {
  return { kits, pads };
}

export default connect(mapStateToProps, { switchKit })(KitSwitcher);
