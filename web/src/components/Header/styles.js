import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: #fff;
  width: 100%;
  max-width: 1200px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export const Content = styled.div`
  display: flex;
  height: 64px;
  align-items: center;
  margin-left: 30px;
  img {
    margin-right: 20px;
    padding-right: 30px;
    border-right: 1px solid #eee;
  }
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  a {
    margin-left: 10px;
    margin-right: 20px;
    font-size: 15px;
    font-weight: bold;
    color: #444444;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;
  div {
    text-align: right;
    margin-right: 10px;
    strong {
      display: block;
      font-size: 14px;
      color: #333;
    }
    button {
      border: 0;
      background: none;
      color: #de3b3b;
    }
  }
`;
