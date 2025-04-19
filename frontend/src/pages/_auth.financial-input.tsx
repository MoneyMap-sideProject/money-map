import { createFileRoute } from '@tanstack/react-router';
import useFunnel from '@/widgets/funnel/useFunnel';
import PageNavigator from '@/widgets/PageNavigator';
import CurrentStatusSummary from '../features/financial/components/CurrentStatusSummary';
import { ChangeRate } from '../features/financial/components/ChangeRate';
import FixedExpense from '../features/financial/components/FixedExpense';
import VariableExpense from '../features/financial/components/VariableExpense';

export const Route = createFileRoute('/_auth/financial-input')({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    Funnel,
    FunnelStep,
    funnelContext,
    currentStep,
    currentStepIndex,
    totalStep,
    goNext,
    setFunnelContext,
  } = useFunnel({
    steps: [
      '현재 상황 정리',
      '변화율',
      '지출(고정비)',
      '지출(비고정비)',
    ] as const,
    context: {
      age: 0,
      salary: 0,
      assets: 0,
      investmentRatio: 0,

      salaryGrowthRate: 0,
      inflationRate: 0,
      investmentGrowthRate: 0,

      fixedExpenseRent: 0,
      fixedExpenseCommunication: 0,
      fixedExpenseUtilities: 0,
      fixedExpenseInsurance: 0,
      fixedExpenseOther: 0,

      variableExpenseFood: 0,
      variableExpenseTransport: 0,
      variableExpenseTravel: 0,
      variableExpenseOther: 0,
    },
  });

  return (
    <>
      <PageNavigator showForward={false} />

      <Funnel>
        <FunnelStep name="현재 상황 정리">
          <CurrentStatusSummary
            age={funnelContext.age}
            salary={funnelContext.salary}
            assets={funnelContext.assets}
            investmentRatio={funnelContext.investmentRatio}
            totalStep={totalStep}
            currentStep={currentStep}
            currentStepIndex={currentStepIndex}
            goNext={goNext}
            setFunnelContext={setFunnelContext}
          />
        </FunnelStep>
        <FunnelStep name="변화율">
          <ChangeRate
            salaryGrowthRate={funnelContext.salaryGrowthRate}
            inflationRate={funnelContext.inflationRate}
            investmentGrowthRate={funnelContext.investmentGrowthRate}
            totalStep={totalStep}
            currentStep={currentStep}
            currentStepIndex={currentStepIndex}
            goNext={goNext}
            setFunnelContext={setFunnelContext}
          />
        </FunnelStep>
        <FunnelStep name="지출(고정비)">
          <FixedExpense
            fixedExpenseRent={funnelContext.fixedExpenseRent}
            fixedExpenseCommunication={funnelContext.fixedExpenseCommunication}
            fixedExpenseUtilities={funnelContext.fixedExpenseUtilities}
            fixedExpenseInsurance={funnelContext.fixedExpenseInsurance}
            fixedExpenseOther={funnelContext.fixedExpenseOther}
            totalStep={totalStep}
            currentStep={currentStep}
            currentStepIndex={currentStepIndex}
            goNext={goNext}
            setFunnelContext={setFunnelContext}
          />
        </FunnelStep>
        <FunnelStep name="지출(비고정비)">
          <VariableExpense
            variableExpenseFood={funnelContext.variableExpenseFood}
            variableExpenseTransport={funnelContext.variableExpenseTransport}
            variableExpenseTravel={funnelContext.variableExpenseTravel}
            variableExpenseOther={funnelContext.variableExpenseOther}
            totalStep={totalStep}
            setFunnelContext={setFunnelContext}
          />
        </FunnelStep>
      </Funnel>
    </>
  );
}
