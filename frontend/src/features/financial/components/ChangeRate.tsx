import BottomFixedContainer from '@/shared/ui/bottom-fixed/BottomFixedContainer';
import { PageTitle } from '@/shared/ui/PageTitle';
import ProgressButton from '@/shared/ui/ProgressButton';
import {
  FinancialButtonWrapper,
  FinancialForm,
  FinancialFormRow,
  FinancialSection,
} from '../ui/Financial';
import { useForm } from 'react-hook-form';
import FinancialInputField from '../ui/FinancialInputField';

type FormInput = Record<
  'salaryGrowthRate' | 'inflationRate' | 'investmentGrowthRate',
  number
>;

type Props = FormInput & {
  totalStep: number;
  currentStep: string;
  currentStepIndex: number;
  goNext: () => void;
  setFunnelContext: (context: FormInput) => void;
};

export function ChangeRate({
  salaryGrowthRate,
  inflationRate,
  investmentGrowthRate,
  currentStepIndex,
  totalStep,
  goNext,
  setFunnelContext,
}: Props) {
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      salaryGrowthRate,
      inflationRate,
      investmentGrowthRate,
    },
  });

  const updateFinancialFormState = () => {
    const values = getValues();

    setFunnelContext(values);
    goNext();
  };

  return (
    <FinancialSection>
      <header>
        <PageTitle>변화율</PageTitle>
      </header>

      <FinancialForm onSubmit={handleSubmit(updateFinancialFormState)}>
        <FinancialFormRow>
          <FinancialInputField
            label="연봉 상승률"
            type="number"
            id="salaryGrowthRate"
            {...register('salaryGrowthRate')}
          />
          <FinancialInputField
            label="물가 상승률"
            type="number"
            id="inflationRate"
            {...register('inflationRate')}
          />
        </FinancialFormRow>
        <FinancialFormRow>
          <FinancialInputField
            label="투자 상승률"
            type="number"
            id="investmentGrowthRate"
            {...register('investmentGrowthRate')}
          />
        </FinancialFormRow>

        <BottomFixedContainer>
          <FinancialButtonWrapper>
            <ProgressButton
              type="submit"
              total={totalStep}
              step={currentStepIndex + 1}
            >
              다음
            </ProgressButton>
          </FinancialButtonWrapper>
        </BottomFixedContainer>
      </FinancialForm>
    </FinancialSection>
  );
}
