import { createFileRoute } from '@tanstack/react-router';
import { FormProvider, useForm } from 'react-hook-form';
import PageNavigator from '../components/layout/PageNavigator';
import CurrentStatusSummary, {
  CurrentStatusSummaryFormValues,
} from '../components/view/financial-input/CurrentStatusSummary';
import FixedExpense, {
  FixedExpenseFormValues,
} from '../components/view/financial-input/FixedExpense';
import VariableExpense, {
  VariableExpenseFormValues,
} from '../components/view/financial-input/VariableExpense';
import {
  ChangeRate,
  ChangeRateFormValues,
} from '../components/view/financial-input/ChangeRate';
import useFunnel from '../hooks/useFunnel';
import { FinancialButtonWrapper } from '../components/view/financial-input/FinancialInput.styled';
import ProgressButton from '../components/ui/ProgressButton';
import Footer from '../components/layout/footer/Footer';
import BottomFixedContainer from '../components/ui/BottomFixedContainer';

type FormValues = CurrentStatusSummaryFormValues &
  ChangeRateFormValues &
  FixedExpenseFormValues &
  VariableExpenseFormValues;

export const Route = createFileRoute('/_auth/financial-input')({
  component: RouteComponent,
});

function RouteComponent() {
  const formControl = useForm<FormValues>();
  const {
    currentStepIndex,
    totalStep,
    hasNextStep,
    Funnel,
    FunnelStep,
    goNext,
  } = useFunnel([
    '현재 상황 정리',
    '변화율',
    '지출(고정비)',
    '지출(비고정비)',
  ] as const);

  const handleButtonClick = () => {
    if (hasNextStep) {
      goNext();
    }

    // TODO: 제출 로직 구현
  };

  return (
    <>
      <PageNavigator disabledForward />

      <FormProvider {...formControl}>
        <Funnel>
          <FunnelStep name="현재 상황 정리">
            <CurrentStatusSummary />
          </FunnelStep>
          <FunnelStep name="변화율">
            <ChangeRate />
          </FunnelStep>
          <FunnelStep name="지출(고정비)">
            <FixedExpense />
          </FunnelStep>
          <FunnelStep name="지출(비고정비)">
            <VariableExpense />
          </FunnelStep>
        </Funnel>
      </FormProvider>

      <BottomFixedContainer>
        <FinancialButtonWrapper>
          <ProgressButton
            onClick={handleButtonClick}
            total={totalStep}
            step={currentStepIndex + 1}
          >
            {hasNextStep ? '다음' : '제출'}
          </ProgressButton>
        </FinancialButtonWrapper>
        <Footer />
      </BottomFixedContainer>
    </>
  );
}
