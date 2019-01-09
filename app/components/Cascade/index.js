/**
 *
 * Cascade.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import React from 'react';
import PropTypes from 'prop-types';
import CardItem from '../CardItem';
import { CardList } from './theme';

class Cascade extends React.Component {
  constructor(props) {
    super(props);

    this.allowDrop = this.allowDrop.bind(this);
    this.dragLeave = this.dragLeave.bind(this);
    this.drop = this.drop.bind(this);
    this.startDrag = this.startDrag.bind(this);
    this.setActive = this.setActive.bind(this);
    this.checkType = this.checkType.bind(this);
    this.checkColumn = this.checkColumn.bind(this);
    this.checkNumber = this.checkNumber.bind(this);
  }

  allowDrop(e) {
    this.hover = false;

    if (this.props.array.length === 0) {
      e.preventDefault();
      this.hover = true;
    } else {
      const isColOK = this.checkColumn(
        this.props.currentCol,
        this.props.col,
        this.props.currentArea,
      );

      const isTypeOK = this.checkType(
        this.props.currentType,
        this.props.array.slice(-1)[0].type,
      );

      const isNumberOK = this.checkNumber(
        this.props.currentNumber,
        this.props.array.slice(-1)[0].number,
      );

      if (isColOK && isTypeOK && isNumberOK) {
        e.preventDefault();
        this.hover = true;
      }
    }

    if (this.hover) {
      this.setActive(e, true);
    }
  }

  drop(e) {
    const obj = {
      removeCol: this.props.currentCol,
      addCol: this.props.col,
    };

    this.props.updateCascade(obj);

    this.setActive(e, false);
  }

  startDrag(e) {
    const obj = e;
    obj.area = 'cascade';
    this.props.updateCurrentCard(obj);
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

  checkColumn(currentCol, myCol, area) {
    let isOK = false;
    if (area !== 'cascade' || currentCol !== myCol) {
      isOK = true;
    }
    return isOK;
  }

  checkType(currentType, myType) {
    let isOK = false;
    if (
      (currentType === 'spades' || currentType === 'clubs') &&
      (myType === 'hearts' || myType === 'diamonds')
    ) {
      isOK = true;
    }

    if (
      (currentType === 'hearts' || currentType === 'diamonds') &&
      (myType === 'spades' || myType === 'clubs')
    ) {
      isOK = true;
    }
    return isOK;
  }

  checkNumber(currentNumber, myNumber) {
    let isOK = false;
    if (currentNumber === myNumber - 1) {
      isOK = true;
    }
    return isOK;
  }

  render() {
    const menuItems = [];
    const len = this.props.array.length;
    for (let i = 0; i < len; i += 1) {
      const posName = `pos${i}`;
      let isTop = false;
      if (i === len - 1) {
        isTop = true;
      }

      const withFirst = `isFirst ${posName} active`;

      menuItems.push(
        <CardItem
          className={`${this.props.first ? withFirst : posName}`}
          key={this.props.array[i].type + this.props.array[i].number}
          src={this.props.array[i].img}
          type={this.props.array[i].type}
          number={this.props.array[i].number}
          top={isTop}
          col={this.props.col}
          startDrag={this.startDrag}
        />,
      );
    }
    return (
      <CardList
        onDrop={this.drop}
        onDragOver={this.allowDrop}
        onDragLeave={this.dragLeave}
      >
        {menuItems}
      </CardList>
    );
  }
}

// We require the use of src and alt, only enforced by react in dev mode
Cascade.propTypes = {
  array: PropTypes.array,
  col: PropTypes.number,
  first: PropTypes.bool,
  updateCurrentCard: PropTypes.func,
  updateCascade: PropTypes.func,
  currentNumber: PropTypes.number,
  currentType: PropTypes.string,
  currentCol: PropTypes.number,
  currentArea: PropTypes.string,
};

export default Cascade;
