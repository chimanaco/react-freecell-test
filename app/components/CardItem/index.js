/**
 *
 * CardItem.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import React from 'react';
import PropTypes from 'prop-types';

class CardItem extends React.Component {
  constructor(props) {
    super(props);
    this.drag = this.drag.bind(this);
  }

  drag() {
    this.props.startDrag({
      type: this.props.type,
      number: this.props.number,
      col: this.props.col,
    });
  }

  render() {
    return (
      <img
        className={this.props.className}
        src={this.props.src}
        width="80"
        draggable={this.props.top}
        onDragStart={this.drag}
        data-type={this.props.type}
        data-number={this.props.number}
        data-col={this.props.col}
      />
    );
  }
}

// We require the use of src and alt, only enforced by react in dev mode
CardItem.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  number: PropTypes.number,
  top: PropTypes.bool,
  col: PropTypes.number,
  startDrag: PropTypes.func,
};

export default CardItem;
