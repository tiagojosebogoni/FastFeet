import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      border: 1;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      margin: 0 0 10px;
      &::placeholder {
        color: #999999;
      }
    }
    span {
      align-self: flex-start;
      margin: 0 0 10px;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;
      color: #444444;
    }
    button {
      margin: 5px 0 0;
      height: 44px;
      background: #7d40e7;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      &::hover {
        background: ${darken(0.9, '#3b9eff')};
      }
    }
  }
`;
