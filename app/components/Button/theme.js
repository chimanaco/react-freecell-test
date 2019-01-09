import styled from 'styled-components';

export const StyledButton = styled.button`
  position: absolute;
  width: 200px;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: #A2A2A2;
  padding: 0.25em 2em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  border: 2px solid #41addd;
  background: #FFFFFF;
  color: #41addd;

  &:hover {
    background: #41addd;
    color: #fff;
  }

  &:active {
    background: #FFA500;
    border: 2px solid #FFA500;
    color: #fff;
  }
`;
