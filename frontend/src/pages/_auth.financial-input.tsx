import { createFileRoute, useNavigate } from '@tanstack/react-router';
import useFunnel from '@/widgets/funnel/useFunnel';
import PageNavigator from '@/widgets/PageNavigator';
import CurrentUser from '@/features/financial/components/CurrentUser';
import AnnualChangeRate from '@/features/financial/components/AnnualChangeRate';
import MonthlyFixedCost from '@/features/financial/components/MonthlyFixedCost';
import MonthlyVariableCost from '@/features/financial/components/MonthlyVariableCost';
import { useMutation } from '@tanstack/react-query';
import { queryKey } from '@/features/financial/api/queryKey';
import { calculateFinancial } from '@/features/financial/api';
import { toast } from 'react-toastify';

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
      currentUser: {
        age: 0,
        salary: 0,
        assets: 0,
        investRate: 0,
      },
      annualChangeRate: {
        salary: 0,
        inflation: 0,
        investment: 0,
      },
      monthlyFixedCost: {
        rent: 0,
        communication: 0,
        insurance: 0,
        etc: 0,
      },
      monthlyVariableCost: {
        food: 0,
        travel: 0,
        transportation: 0,
        etc: 0,
      },
    },
  });
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationKey: queryKey.calculate(),
    mutationFn: calculateFinancial,
    onSuccess: () => {
      toast('제출 완료');
      navigate({ to: '/analysis/income/salary' });
    },
  });

  return (
    <>
      <PageNavigator showForward={false} />

      <Funnel>
        <FunnelStep name="현재 상황 정리">
          <CurrentUser
            defaultValues={{ ...funnelContext.currentUser }}
            totalStep={totalStep}
            currentStep={currentStep}
            currentStepIndex={currentStepIndex}
            onNext={(values) => {
              setFunnelContext({
                currentUser: values,
              });
              goNext();
            }}
          />
        </FunnelStep>
        <FunnelStep name="변화율">
          <AnnualChangeRate
            defaultValues={{ ...funnelContext.annualChangeRate }}
            totalStep={totalStep}
            currentStep={currentStep}
            currentStepIndex={currentStepIndex}
            onNext={(values) => {
              setFunnelContext({
                annualChangeRate: values,
              });
              goNext();
            }}
          />
        </FunnelStep>
        <FunnelStep name="지출(고정비)">
          <MonthlyFixedCost
            defaultValues={{ ...funnelContext.monthlyFixedCost }}
            totalStep={totalStep}
            currentStep={currentStep}
            currentStepIndex={currentStepIndex}
            onNext={(values) => {
              setFunnelContext({
                monthlyFixedCost: values,
              });
              goNext();
            }}
          />
        </FunnelStep>
        <FunnelStep name="지출(비고정비)">
          <MonthlyVariableCost
            defaultValues={{ ...funnelContext.monthlyVariableCost }}
            totalStep={totalStep}
            onSubmit={(values) => {
              setFunnelContext({
                monthlyVariableCost: values,
              });
              mutate({
                current_user: funnelContext.currentUser,
                annual_change_rate: funnelContext.annualChangeRate,
                monthly_fixed_cost: funnelContext.monthlyFixedCost,
                monthly_variable_cost: values,
              });
            }}
          />
        </FunnelStep>
      </Funnel>
    </>
  );
}
