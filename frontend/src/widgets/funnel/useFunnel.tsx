import { useLocation, useNavigate, useRouter } from '@tanstack/react-router';
import {
  Children,
  isValidElement,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { Route } from '@/pages/__root';

type UseFunnelArgs<T, C extends Context> = {
  steps: T[];
  context?: C;
};

type Context = Record<string, any>;

type FunnelStepProps<T> = {
  name: T;
  children: ReactNode;
};

export default function useFunnel<T, C extends Context>({
  steps,
  context,
}: UseFunnelArgs<T, C>) {
  const location = useLocation();
  const router = useRouter();
  const navigate = useNavigate({ from: Route.fullPath });

  const SEARCH_PARAM_KEY = 'funnel-step';
  const param = location.search[SEARCH_PARAM_KEY];
  const stepParam = param && typeof param === 'string' ? param : '';
  const START_STEP_INDEX = 0;
  const defaultStep = stepParam || steps[START_STEP_INDEX];

  const [isDirty, setIsDirty] = useState(false);
  const [currentStep, setCurrentStep] = useState(defaultStep);
  const currentStepIndex = steps.findIndex((step) => step === currentStep);
  const totalStep = steps.length;
  const hasPrevStep = currentStepIndex !== 0;
  const hasNextStep = totalStep > currentStepIndex + 1;

  const defaultContext: C = context ?? ({} as C);
  const [funnelContext, _setFunnelContext] = useState<C>(defaultContext);

  const setFunnelContext = (context: Partial<C>) => {
    _setFunnelContext((prev) => ({
      ...prev,
      ...context,
    }));
  };

  const goNext = () => {
    if (!hasNextStep) return;

    setCurrentStep(steps[currentStepIndex + 1]);
  };

  const goPrev = (rememberCurrentStep = true) => {
    if (!hasPrevStep) return;

    if (rememberCurrentStep) {
      setCurrentStep(steps[currentStepIndex - 1]);
    } else {
      router.history.back();
    }
  };

  const Funnel = useMemo(() => {
    return function Funnel({ children }: PropsWithChildren) {
      const CurrentStepComponent = Children.toArray(children)
        .filter((Child) => isValidElement(Child))
        .find((Child) => Child.props.name === currentStep);

      return CurrentStepComponent;
    };
  }, [currentStep]);

  const FunnelStep = useMemo(() => {
    return function FunnelStep({ children }: FunnelStepProps<T>) {
      return children;
    };
  }, []);

  useEffect(() => {
    // url을 이용하여 중간 단계에 접근할 수 없도록 방지
    if (stepParam && stepParam !== steps[0]) {
      toast('잘못된 경로 접근입니다.');
      setCurrentStep(steps[0]);
      setFunnelContext(defaultContext);
      setIsDirty(true);
      navigate({
        to: location.pathname,
        search: {
          [SEARCH_PARAM_KEY]: steps[START_STEP_INDEX],
        },
        replace: true,
      });
      return;
    }

    // 초기 단계를 search param으로 등록
    navigate({
      search: {
        [SEARCH_PARAM_KEY]: currentStep,
      },
      replace: true,
    });

    setIsDirty(true);
  }, []);

  useEffect(
    function syncCurrentStepWithHistory() {
      if (!isDirty || !stepParam || stepParam === currentStep) return;

      setCurrentStep(stepParam);
    },
    [stepParam],
  );

  useEffect(
    function syncHistoryWithCurrentStep() {
      if (!isDirty || stepParam === currentStep) return;

      navigate({
        search: {
          [SEARCH_PARAM_KEY]: currentStep,
        },
        replace: false,
      });
    },
    [currentStep],
  );

  return {
    funnelContext,
    currentStep,
    currentStepIndex,
    totalStep,
    hasPrevStep,
    hasNextStep,
    goNext,
    goPrev,
    setFunnelContext,
    Funnel,
    FunnelStep,
  };
}
