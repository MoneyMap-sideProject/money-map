import { formatNumberWithComma } from '@/shared/utils/numberUtils';
import { OutputHTMLAttributes } from 'react';
import styled from 'styled-components';

type Props = Omit<OutputHTMLAttributes<HTMLOutputElement>, 'children'> & {
  total: number;
};

export default function FinancialTotalField({ total, ...props }: Props) {
  return (
    <Wrapper>
      <Container>
        <Label htmlFor="result">종합</Label>
        <Output id="result" name="result" {...props}>
          {formatNumberWithComma(total)}
        </Output>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.grayLine};
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: ${(props) => props.theme.pageLayout.breakPoint};
  padding: 16px calc(${(props) => props.theme.pageLayout.paddingX} + 4px) 24px;
  margin: 0 auto;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${(props) => props.theme.colors.grayDark};
`;

const Output = styled.output`
  font-weight: 600;
`;
