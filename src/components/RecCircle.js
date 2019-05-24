// RecCircle
//
// RecCircle is rendered by parent depending on parent's state
// so, declarative approach works fine here
//
// Note: being mounted and unmounted will cause a memory leak here
// by continually creating more and more animations
// TODO: find way to re-use one existing mo-js animtion object
// https://github.com/legomushroom/mojs/issues/62
//
import React, { Component } from 'react';
import moJs from 'mo-js';
import styles from '../styles/core/utils.css';

class Circle extends Component {
  componentDidMount() {
    this.anim = new moJs.Shape({
      parent: this.el,
      shape: 'circle',
      scale: { 0: 1.5, easing: 'sin.out' },
      opacity: { 1: 0, easing: 'sin.out' },
      left: '50%',
      top: '50%',
      fill: 'red',
      radius: '50%',
      duration: 1000,
      repeat: 9999,
      isShowEnd: false
    });

    this.anim.play();
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.anim.stop();
  }

  render() {
    // need reference to el
    // in order to mount moJs animation to DOM
    return (
      <div
        ref={el => {this.el = el;}}
        className={styles.fill}
      />
    );
  }
}

export default Circle;
