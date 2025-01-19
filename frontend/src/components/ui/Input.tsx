import styled from 'styled-components';

const Input = styled.input<{ $isError: boolean }>`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: ${(props) => (props.$isError ? '1px solid red' : 'none')};
  border-radius: 12px;
  background-color: #f5f5f5;
  box-sizing: border-box;

  &::placeholder {
    color: #bbb;
  }
`;

export default Input;
