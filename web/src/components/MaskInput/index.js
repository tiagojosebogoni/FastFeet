import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { InputMask, Label } from './styles';

export default function MaskInput({ name, label, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',

      setValue(ref, value) {
        ref.setInputValue('');
      },

      clearValue(ref) {
        ref.setInputValue('');
      }
    });
  }, [fieldName, registerField]);

  return (
    <Label htmlFor={fieldName}>
      <strong>{label}</strong>
      <InputMask ref={inputRef} defaultValue={defaultValue} {...rest} />
      {error && <span style={{ color: '#f00' }}>{error}</span>}
    </Label>
  );
}

MaskInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string
};

MaskInput.defaultProps = {
  label: ''
};
