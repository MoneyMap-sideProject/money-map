import styled from 'styled-components';

const InputErrorMessage = styled.strong`
  align-self: flex-start;
  font-size: 12px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.error};
  margin-top: 8px;
`;

export default InputErrorMessage;
