import styled from 'styled-components';

const InputLabel = styled.label`
  display: inline-block;
  align-self: flex-start;
  font-size: 14px;
  color: ${(props) => props.theme.colors.grayDark};
  margin-bottom: 8px;
`;

export default InputLabel;
