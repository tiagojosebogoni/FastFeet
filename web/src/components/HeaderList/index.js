import React from 'react';
import { MdAdd } from 'react-icons/md';
import PropTypes from 'prop-types';

import Button from '../Button';
import { Header, Title, Component, TInput } from './styles';

export default function HeaderList({ title, onNew, find, buttonNew, search }) {
  return (
    <Header>
      <Title>{title}</Title>
      <Component>
        {search && (
          <TInput
            name="search"
            type="text"
            placeholder="buscar"
            onChange={e => find(e.target.value)}
          />
        )}
        {buttonNew && (
          <Button confirm text="CADASTRAR" onClick={onNew}>
            <MdAdd size={20} />
          </Button>
        )}
      </Component>
    </Header>
  );
}

HeaderList.propTypes = {
  title: PropTypes.string.isRequired,
  onNew: PropTypes.func,
  find: PropTypes.func.isRequired,
  buttonNew: PropTypes.bool,
  search: PropTypes.bool
};

HeaderList.defaultProps = {
  buttonNew: true,
  search: true,
  onNew: null
};
