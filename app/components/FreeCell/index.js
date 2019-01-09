/**
 *
 * FreeCell.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DropArea, FreeCellBG } from './theme';
import CardItem from '../CardItem';

class FreeCell extends React.Component {
  constructor(props) {
    super(props);

    this.allowDrop = this.allowDrop.bind(this);
    this.dragLeave = this.dragLeave.bind(this);
    this.drop = this.drop.bind(this);
    this.startDrag = this.startDrag.bind(this);
    this.setActive = this.setActive.bind(this);
  }

  allowDrop(e) {
    if (typeof this.props.obj === 'undefined') {
      e.preventDefault();
      this.setActive(e, true);
    }
  }

  drop(e) {
    this.props.addObject(this.props.index);
    this.setActive(e, false);
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

  startDrag(e) {
    const obj = e;
    obj.area = 'free';
    this.props.updateCurrentCard(obj);
  }

  render() {
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
            startDrag={this.startDrag}
          />
        ) : <FreeCellBG>FREE CELL</FreeCellBG>}
      </DropArea>
    );
  }
}

// We require the use of src and alt, only enforced by react in dev mode
FreeCell.propTypes = {
  obj: PropTypes.object,
  index: PropTypes.number,
  addObject: PropTypes.func,
  updateCurrentCard: PropTypes.func,
};

export default FreeCell;
