import ReactInputMask from 'react-input-mask';

import styled from 'styled-components';

export const InputMask = styled(ReactInputMask)`
  padding: 12px 15px;
  font-size: 16px;
  color: #444;
  border-radius: 4px;

  &::placeholder {
    color: #999;
  }

  height: 45px;
  border: 1px solid #ddd;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;

  strong {
    color: #444;
    font-weight: bold;
    text-align: left;
    margin-bottom: 9px;
  }

  & + label {
    margin-top: 18px;
  }
`;
