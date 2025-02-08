import { useFormContext } from 'react-hook-form';
import {
  FinancialForm,
  FinancialFormItem,
  FinancialInput,
  FinancialSection,
} from './FinancialInput.styled';
import InputLabel from '../../ui/InputLabel';
import { PageTitle } from '../../ui/PageTitle';

export type ChangeRateFormValues = {
  salaryGrowthRate: string; // 연봉 상승률
  inflationRate: string; // 물가 상승률
  investmentGrowthRate: string; // 투자 상승률
};

export function ChangeRate() {
  const { register } = useFormContext<ChangeRateFormValues>();

  return (
    <FinancialSection>
      <header>
        <PageTitle>변화율</PageTitle>
      </header>

      <FinancialForm>
        <FinancialFormItem>
          <div>
            <InputLabel htmlFor="salaryGrowthRate">연봉 상승률</InputLabel>
            <FinancialInput type="number" {...register('salaryGrowthRate')} />
          </div>
          <div>
            <InputLabel htmlFor="inflationRate">물가 상승률</InputLabel>
            <FinancialInput type="number" {...register('inflationRate')} />
          </div>
        </FinancialFormItem>
        <FinancialFormItem>
          <div>
            <InputLabel htmlFor="investmentGrowthRate">투자 상승률</InputLabel>
            <FinancialInput
              type="number"
              {...register('investmentGrowthRate')}
            />
          </div>
        </FinancialFormItem>
      </FinancialForm>
    </FinancialSection>
  );
}
