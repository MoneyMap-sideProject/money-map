import { useFormContext } from 'react-hook-form';
import {
  FinancialForm,
  FinancialFormItem,
  FinancialInput,
  FinancialSection,
} from './FinancialInput.styled';
import InputLabel from '../../ui/InputLabel';
import { PageTitle } from '../../ui/PageTitle';

export type CurrentStatusSummaryFormValues = {
  age: string; // 나이
  salary: string; // 연봉
  assets: string; // 자산
  investmentRatio: string; // 투자 비중
};

export default function CurrentStatusSummary() {
  const { register } = useFormContext<CurrentStatusSummaryFormValues>();

  return (
    <FinancialSection>
      <header>
        <PageTitle>현재 상황 정리</PageTitle>
      </header>

      <FinancialForm>
        <FinancialFormItem>
          <div>
            <InputLabel htmlFor="age">나이</InputLabel>
            <FinancialInput type="number" {...register('age')} />
          </div>
          <div>
            <InputLabel htmlFor="salary">연봉</InputLabel>
            <FinancialInput type="number" {...register('salary')} />
          </div>
        </FinancialFormItem>
        <FinancialFormItem>
          <div>
            <InputLabel htmlFor="assets">자산</InputLabel>
            <FinancialInput type="number" {...register('assets')} />
          </div>
        </FinancialFormItem>
        <FinancialFormItem>
          <div>
            <InputLabel htmlFor="investmentRatio">투자 비중</InputLabel>
            <FinancialInput type="number" {...register('investmentRatio')} />
          </div>
        </FinancialFormItem>
      </FinancialForm>
    </FinancialSection>
  );
}
