import styled from 'styled-components';
import Input from '../../ui/Input';

export const FinancialSection = styled.section`
  margin-top: 20px;
`;

export const FinancialForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
`;

export const FinancialFormItem = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;

  & > div {
    width: 100%;
  }
`;

export const FinancialInput = styled(Input)`
  text-align: right;
`;

export const FinancialButtonWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.pageLayout.breakPoint};
  padding: 20px ${(props) => props.theme.pageLayout.paddingX} 24px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.colors.white};
`;
