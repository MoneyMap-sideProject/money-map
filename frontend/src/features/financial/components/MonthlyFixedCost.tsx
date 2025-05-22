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

type FormInput = Record<'rent' | 'communication' | 'insurance' | 'etc', number>;

type Props = {
  defaultValues: FormInput;
  totalStep: number;
  currentStep: string;
  currentStepIndex: number;
  onNext: (values: FormInput) => void;
};

export default function MonthlyFixedCost({
  defaultValues,
  currentStepIndex,
  totalStep,
  onNext,
}: Props) {
  const { register, handleSubmit, watch } = useForm({
    defaultValues,
  });
  const values = watch();
  const total = sum(...Object.values(values).map(Number));

  const updateFinancialFormState = () => {
    onNext(values);
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
            {...register('rent')}
          />
          <FinancialInputField
            label="통신비"
            type="number"
            id="fixedExpenseCommunication"
            {...register('communication')}
          />
        </FinancialFormRow>
        <FinancialFormRow>
          <FinancialInputField
            label="보험"
            type="number"
            id="fixedExpenseInsurance"
            {...register('insurance')}
          />
        </FinancialFormRow>
        <FinancialFormRow>
          <FinancialInputField
            label="기타"
            type="number"
            id="fixedExpenseOther"
            {...register('etc')}
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
