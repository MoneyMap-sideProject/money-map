import styled from 'styled-components';

export const PageTitle = styled.h2`
  font-size: 20px;
`;

export const PageTitleCaption = styled.small`
  padding-left: 4px;
  font-size: inherit;
  color: ${(props) => props.theme.colors.grayMiddle};

  &::before {
    content: '/';
    padding-right: 4px;
  }
`;
