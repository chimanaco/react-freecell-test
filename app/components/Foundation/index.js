/**
 *
 * Foundation.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DropArea, FoundationBG } from './theme';
import CardItem from '../CardItem';

import Clubs from './img/bg_clubs.png';
import Diamonds from './img/bg_diamonds.png';
import Spades from './img/bg_spades.png';
import Hearts from './img/bg_hearts.png';

class Foundation extends React.Component {
  constructor(props) {
    super(props);

    this.allowDrop = this.allowDrop.bind(this);
    this.dragLeave = this.dragLeave.bind(this);
    this.drop = this.drop.bind(this);
    this.setActive = this.setActive.bind(this);
    this.number = -1;

    this.TOTAL_NUMBER = 12;
    // this.TOTAL_NUMBER = 0; // debug

    this.bgImg = Spades;
    if (this.props.type === 'spades') {
      this.bgImg = Spades;
    } else if (this.props.type === 'clubs') {
      this.bgImg = Clubs;
    } else if (this.props.type === 'hearts') {
      this.bgImg = Hearts;
    } else {
      this.bgImg = Diamonds;
    }
  }

  allowDrop(e) {
    if (
      this.props.currentType === this.props.type &&
      this.props.currentNumber === this.number + 1
    ) {
      e.preventDefault();
      this.setActive(e, true);
    }
  }

  drop(e) {
    this.props.addObject(this.props.index);
    this.number += 1;
    this.setActive(e, false);

    // console.log('Foundation', this.props.type, this.number);

    if (this.number === this.TOTAL_NUMBER) {
      this.props.moveDone();
    }
  }

  dragLeave(e) {
    this.setActive(e, false);
  }

  setActive(e, bool) {
    if (e.target.tagName === 'DIV') {
      const myButtonClasses = e.target.classList;
      if (bool) {
        myButtonClasses.add('active');
      } else {
        myButtonClasses.remove('active');
      }
    }
  }

  render() {
    if (this.props.reset) {
      this.number = -1;
      this.props.resetDone();
    }

    return (
      <DropArea onDrop={this.drop} onDragOver={this.allowDrop} onDragLeave={this.dragLeave}>
        {this.props.obj ? (
          <CardItem
            src={this.props.obj.img}
            alt={this.props.obj.number}
            type={this.props.obj.type}
            number={this.props.obj.number}
            top
            col={this.props.index}
          />
        ) : <FoundationBG><img src={this.bgImg} /></FoundationBG>}
      </DropArea>
    );
  }
}

// We require the use of src and alt, only enforced by react in dev mode
Foundation.propTypes = {
  obj: PropTypes.object,
  index: PropTypes.number,
  addObject: PropTypes.func,
  resetDone: PropTypes.func,
  currentNumber: PropTypes.number,
  currentType: PropTypes.string,
  type: PropTypes.string,
  reset: PropTypes.bool,
  moveDone: PropTypes.func,
};

export default Foundation;
