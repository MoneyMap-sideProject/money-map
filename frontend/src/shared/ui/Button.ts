import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => (props.disabled ? '#7d7d7d' : '#000000')};
  background-color: ${(props) => (props.disabled ? '#e0e0e0' : '#d8fc39')};
  border: none;
  border-radius: 12px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${(props) => (props.disabled ? '#e0e0e0' : '#c3e036')};
  }
`;

export default Button;
