import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 0px 2px #00000026;
`;

export const Edit = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 0;
  background: none;

  svg {
    color: #4d85ee;
    margin: 10px;
  }

  span {
    color: #999999;
  }
`;

export const Delete = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 0;
  background: none;

  svg {
    color: #de3b3b;
    margin: 10px;
  }

  span {
    color: #999999;
  }
`;
