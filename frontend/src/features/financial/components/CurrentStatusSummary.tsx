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
  'age' | 'salary' | 'assets' | 'investmentRatio',
  number
>;

type Props = FormInput & {
  totalStep: number;
  currentStep: string;
  currentStepIndex: number;
  goNext: () => void;
  setFunnelContext: (context: FormInput) => void;
};

export default function CurrentStatusSummary({
  age,
  salary,
  assets,
  investmentRatio,
  currentStepIndex,
  totalStep,
  goNext,
  setFunnelContext,
}: Props) {
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      age,
      salary,
      assets,
      investmentRatio,
    },
  });

  const updateFinancialFormState = () => {
    const values = getValues();

    setFunnelContext(values);
    goNext();
  };

  return (
    <>
      <FinancialSection>
        <header>
          <PageTitle>현재 상황 정리</PageTitle>
        </header>

        <FinancialForm onSubmit={handleSubmit(updateFinancialFormState)}>
          <FinancialFormRow>
            <FinancialInputField
              label="나이"
              type="number"
              id="age"
              {...register('age')}
            />
            <FinancialInputField
              label="연봉"
              type="number"
              id="salary"
              {...register('salary')}
            />
          </FinancialFormRow>
          <FinancialFormRow>
            <FinancialInputField
              label="자산"
              type="number"
              id="assets"
              {...register('assets')}
            />
          </FinancialFormRow>
          <FinancialFormRow>
            <FinancialInputField
              label="투자 비중"
              type="number"
              id="investmentRatio"
              {...register('investmentRatio')}
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
    </>
  );
}
