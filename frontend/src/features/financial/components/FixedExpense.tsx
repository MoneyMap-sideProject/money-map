import { useForm } from 'react-hook-form';
import BottomFixedContainer from '@/shared/ui/bottom-fixed/BottomFixedContainer';
import { PageTitle, PageTitleCaption } from '@/shared/ui/PageTitle';
import ProgressButton from '@/shared/ui/ProgressButton';
import {
  FinancialButtonWrapper,
  FinancialForm,
  FinancialFormRow,
  FinancialSection,
} from '../ui/Financial';
import FinancialInputField from '../ui/FinancialInputField';
import { sum } from '@/shared/utils/numberUtils';
import FinancialTotalField from '../ui/FinancialTotalField';

type FormInput = Record<
  | 'fixedExpenseRent'
  | 'fixedExpenseCommunication'
  | 'fixedExpenseUtilities'
  | 'fixedExpenseInsurance'
  | 'fixedExpenseOther',
  number
>;

type Props = FormInput & {
  totalStep: number;
  currentStep: string;
  currentStepIndex: number;
  goNext: () => void;
  setFunnelContext: (context: FormInput) => void;
};

export default function FixedExpense({
  fixedExpenseRent,
  fixedExpenseCommunication,
  fixedExpenseUtilities,
  fixedExpenseInsurance,
  fixedExpenseOther,
  currentStepIndex,
  totalStep,
  goNext,
  setFunnelContext,
}: Props) {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      fixedExpenseRent,
      fixedExpenseCommunication,
      fixedExpenseUtilities,
      fixedExpenseInsurance,
      fixedExpenseOther,
    },
  });
  const values = watch();
  const total = sum(...Object.values(values).map(Number));

  const updateFinancialFormState = () => {
    setFunnelContext(values);
    goNext();
  };

  return (
    <FinancialSection>
      <header>
        <PageTitle>
          지출(고정비)<PageTitleCaption>월 기준</PageTitleCaption>
        </PageTitle>
      </header>

      <FinancialForm onSubmit={handleSubmit(updateFinancialFormState)}>
        <FinancialFormRow>
          <FinancialInputField
            label="월세 및 관리비"
            type="number"
            id="fixedExpenseRent"
            {...register('fixedExpenseRent')}
          />
          <FinancialInputField
            label="통신비"
            type="number"
            id="fixedExpenseCommunication"
            {...register('fixedExpenseCommunication')}
          />
        </FinancialFormRow>
        <FinancialFormRow>
          <FinancialInputField
            label="전기 및 가스"
            type="number"
            id="fixedExpenseUtilities"
            {...register('fixedExpenseUtilities')}
          />
          <FinancialInputField
            label="보험"
            type="number"
            id="fixedExpenseInsurance"
            {...register('fixedExpenseInsurance')}
          />
        </FinancialFormRow>
        <FinancialFormRow>
          <FinancialInputField
            label="기타"
            type="number"
            id="fixedExpenseOther"
            {...register('fixedExpenseOther')}
          />
        </FinancialFormRow>

        <BottomFixedContainer>
          <FinancialTotalField
            htmlFor="fixedExpenseRent fixedExpenseCommunication fixedExpenseUtilities fixedExpenseInsurance fixedExpenseOther"
            total={total}
          />
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
