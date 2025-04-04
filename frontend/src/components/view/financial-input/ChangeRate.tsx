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
    <FinancialSection onSubmit={handleSubmit(updateFinancialFormState)}>
      <header>
        <PageTitle>변화율</PageTitle>
      </header>

      <FinancialForm>
        <FinancialFormItem>
          <div>
            <InputLabel htmlFor="salaryGrowthRate">연봉 상승률</InputLabel>
            <FinancialInput
              type="number"
              id="salaryGrowthRate"
              {...register('salaryGrowthRate')}
            />
          </div>
          <div>
            <InputLabel htmlFor="inflationRate">물가 상승률</InputLabel>
            <FinancialInput
              type="number"
              id="inflationRate"
              {...register('inflationRate')}
            />
          </div>
        </FinancialFormItem>
        <FinancialFormItem>
          <div>
            <InputLabel htmlFor="investmentGrowthRate">투자 상승률</InputLabel>
            <FinancialInput
              type="number"
              id="investmentGrowthRate"
              {...register('investmentGrowthRate')}
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
  );
}
