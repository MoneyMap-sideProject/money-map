import styled from 'styled-components';

const Layout = styled.div`
  max-width: ${(props) => props.theme.pageLayout.breakPoint};
  width: 100%;
  padding: 0 ${(props) => props.theme.pageLayout.paddingX};
  margin: 0 auto;
`;

export default Layout;
