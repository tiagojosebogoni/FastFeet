import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Button({ text, children, ...rest }) {
  return (
    <Container {...rest}>
      {children}
      <span>{text}</span>
    </Container>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.element,
};

Button.defaultProps = {
  children: null,
};
