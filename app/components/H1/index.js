/**
 *
 * Button.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Title } from './theme';

function H1(props) {
  return <Title>{props.text}</Title>;
}

H1.propTypes = {
  text: PropTypes.string,
};

export default H1;
