import {
  FinancialButtonWrapper,
  FinancialForm,
  FinancialFormItem,
  FinancialInput,
  FinancialSection,
} from './FinancialInput.styled';
import InputLabel from '../../ui/InputLabel';
import { PageTitle } from '../../ui/PageTitle';
import BottomFixedContainer from '../../ui/BottomFixedContainer';
import ProgressButton from '../../ui/ProgressButton';
import Footer from '../../layout/footer/Footer';
import { useForm } from 'react-hook-form';

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
          <FinancialFormItem>
            <div>
              <InputLabel htmlFor="age">나이</InputLabel>
              <FinancialInput type="number" id="age" {...register('age')} />
            </div>
            <div>
              <InputLabel htmlFor="salary">연봉</InputLabel>
              <FinancialInput
                type="number"
                id="salary"
                {...register('salary')}
              />
            </div>
          </FinancialFormItem>
          <FinancialFormItem>
            <div>
              <InputLabel htmlFor="assets">자산</InputLabel>
              <FinancialInput
                type="number"
                id="assets"
                {...register('assets')}
              />
            </div>
          </FinancialFormItem>
          <FinancialFormItem>
            <div>
              <InputLabel htmlFor="investmentRatio">투자 비중</InputLabel>
              <FinancialInput
                type="number"
                id="investmentRatio"
                {...register('investmentRatio')}
              />
            </div>
          </FinancialFormItem>

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
            <Footer />
          </BottomFixedContainer>
        </FinancialForm>
      </FinancialSection>
    </>
  );
}
