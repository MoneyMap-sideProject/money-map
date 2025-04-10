import styled from 'styled-components';
import InputLabel from '@/shared/ui/InputLabel';
import Input from '@/shared/ui/Input';
import {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from 'react';

type Props = Pick<InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'> & {
  label: LabelHTMLAttributes<HTMLLabelElement>['children'];
};

const FinancialInputField = forwardRef(function FinancialInputField(
  { label, id, ...props }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <div>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <FinancialInput ref={ref} id={id} {...props} />
    </div>
  );
});

const FinancialInput = styled(Input)`
  text-align: right;
`;

export default FinancialInputField;
