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

type FormInput = Record<'salary' | 'inflation' | 'investment', number>;

type Props = {
  defaultValues: FormInput;
  totalStep: number;
  currentStep: string;
  currentStepIndex: number;
  onNext: (values: FormInput) => void;
};

export default function AnnualChangeRate({
  defaultValues,
  currentStepIndex,
  totalStep,
  onNext,
}: Props) {
  const { register, handleSubmit, getValues } = useForm({
    defaultValues,
  });

  const updateFinancialFormState = () => {
    const values = getValues();
    onNext(values);
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
            id="salary"
            {...register('salary')}
          />
          <FinancialInputField
            label="물가 상승률"
            type="number"
            id="inflation"
            {...register('inflation')}
          />
        </FinancialFormRow>
        <FinancialFormRow>
          <FinancialInputField
            label="투자 상승률"
            type="number"
            id="investment"
            {...register('investment')}
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
