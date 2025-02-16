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

type FunnelStepProps<T> = {
  name: T;
  children: ReactNode;
};

// TODO: 뒤로 가기, 앞으로 가기 했을 때 컴포넌트 변경 안되는 거 해결 (params 읽어서 컴포넌트 띄우기)
export default function useFunnel<T>(steps: T[]) {
  const location = useLocation();
  const router = useRouter();
  const navigate = useNavigate();

  const SEARCH_PARAM_KEY = 'funnel-step';
  const stepParam = location.search[SEARCH_PARAM_KEY];
  const START_STEP_INDEX = 0;
  const defaultStepIndex = stepParam ?? steps[START_STEP_INDEX];

  const [isDirty, setIsDirty] = useState(false);
  const [currentStep, setCurrentStep] = useState(defaultStepIndex);
  const currentStepIndex = steps.findIndex((step) => step === currentStep);
  const totalStep = steps.length;
  const hasPrevStep = currentStepIndex !== 0;
  const hasNextStep = totalStep > currentStepIndex + 1;

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
      navigate({
        to: location.pathname,
        replace: true,
      });
      return;
    }

    // 초기 단계를 search param으로 등록
    navigate({
      search: {
        // TODO: 타입 잡기
        [SEARCH_PARAM_KEY]: currentStep,
      },
      replace: true,
    });

    setIsDirty(true);
  }, []);

  useEffect(() => {
    if (!isDirty || !stepParam || stepParam === currentStep) return;

    setCurrentStep(stepParam);
  }, [stepParam]);

  useEffect(() => {
    if (!isDirty || stepParam === currentStep) return;

    navigate({
      search: {
        [SEARCH_PARAM_KEY]: currentStep,
      },
      replace: false,
    });
  }, [currentStep]);

  return {
    currentStep,
    currentStepIndex,
    totalStep,
    hasPrevStep,
    hasNextStep,
    Funnel,
    FunnelStep,
    goNext,
    goPrev,
  };
}
