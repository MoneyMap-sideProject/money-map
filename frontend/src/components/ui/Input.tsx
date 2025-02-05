import styled from 'styled-components';

const Input = styled.input<{ $isError: boolean }>`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: ${(props) =>
    props.$isError ? `1px solid ${props.theme.colors.error}` : 'none'};
  border-radius: 12px;
  background-color: ${(props) => props.theme.colors.grayBg};
  box-sizing: border-box;

  &::placeholder {
    color: ${(props) => props.theme.colors.grayMiddle};
  }
`;

export default Input;
