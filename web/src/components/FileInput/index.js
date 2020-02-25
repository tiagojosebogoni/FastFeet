import React, {
  ChangeEvent,
  useRef,
  useEffect,
  useCallback,
  useState
} from 'react';
import { useField } from '@unform/core';

import api from '../../services/api';
import { Container } from './styles';

export default function FileInput() {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue } = useField('avatar_id');
  const [preview, setPreview] = useState(defaultValue);
  const [file, setFile] = useState();

  const handlePreview = useCallback(async e => {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    const response = await api.post('files', data);

    const { id, url } = response.data;
    setFile(id);
    setPreview(url);
  }, []);

  useEffect(() => {
    registerField({
      name: 'avatar_id',
      ref: inputRef.current,
      path: 'dataset.file',

      clearValue(ref) {
        ref.value = '';
        setPreview(null);
      },
      setValue(_, value) {
        setPreview(value);
      }
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={
            preview || 'https://api.adorable.io/avatars/120/abott@adorable.png'
          }
          alt=""
        />

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          ref={inputRef}
          onChange={handlePreview}
        />
      </label>
    </Container>
  );
}
