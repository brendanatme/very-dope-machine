//
// PadCircle
//
// circle animation used when drumpad is pressed
// triggered imperatively,
// as animations are better imperative over declarative
//
// Note: may have to break this out
// of render loop somehow
// if it is not performant
// but so far so good
//
// TODO:
// can we hold the animation while the sound is playing?
//
import React, { Component } from 'react';
import moJs from 'mo-js';
import styles from '../styles/core/utils.css';

class Circle extends Component {
  componentDidMount() {
    this.anim = new moJs.Shape({
      parent: this.el,
      shape: 'circle',
      scale: { 0: 1, easing: 'sin.out' },
      opacity: { 1: 0, easing: 'sin.out' },
      left: '50%',
      top: '50%',
      fill: { 'red': 'purple' },
      radius: '50%',
      duration: 500,
      repeat: 0,
      isShowEnd: false
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  play() {
    this.anim.reset();
    this.anim.play();
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
