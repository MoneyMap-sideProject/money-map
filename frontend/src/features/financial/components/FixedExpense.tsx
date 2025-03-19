import BottomFixedContainer from '@/shared/ui/bottom-fixed/BottomFixedContainer';
import InputLabel from '@/shared/ui/InputLabel';
import { PageTitle, PageTitleCaption } from '@/shared/ui/PageTitle';
import ProgressButton from '@/shared/ui/ProgressButton';
import {
  FinancialButtonWrapper,
  FinancialForm,
  FinancialFormItem,
  FinancialInput,
  FinancialSection,
} from '../ui/Financial';
import { useForm } from 'react-hook-form';

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
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      fixedExpenseRent,
      fixedExpenseCommunication,
      fixedExpenseUtilities,
      fixedExpenseInsurance,
      fixedExpenseOther,
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
        <PageTitle>
          지출(고정비)<PageTitleCaption>월 기준</PageTitleCaption>
        </PageTitle>
      </header>

      <FinancialForm>
        <FinancialFormItem>
          <div>
            <InputLabel htmlFor="fixedExpenseRent">월세 및 관리비</InputLabel>
            <FinancialInput
              type="number"
              id="fixedExpenseRent"
              {...register('fixedExpenseRent')}
            />
          </div>
          <div>
            <InputLabel htmlFor="fixedExpenseCommunication">통신비</InputLabel>
            <FinancialInput
              type="number"
              id="fixedExpenseCommunication"
              {...register('fixedExpenseCommunication')}
            />
          </div>
        </FinancialFormItem>
        <FinancialFormItem>
          <div>
            <InputLabel htmlFor="fixedExpenseUtilities">
              전기 및 가스
            </InputLabel>
            <FinancialInput
              type="number"
              id="fixedExpenseUtilities"
              {...register('fixedExpenseUtilities')}
            />
          </div>
          <div>
            <InputLabel htmlFor="fixedExpenseInsurance">보험</InputLabel>
            <FinancialInput
              type="number"
              id="fixedExpenseInsurance"
              {...register('fixedExpenseInsurance')}
            />
          </div>
        </FinancialFormItem>
        <FinancialFormItem>
          <div>
            <InputLabel htmlFor="fixedExpenseOther">기타</InputLabel>
            <FinancialInput
              type="number"
              id="fixedExpenseOther"
              {...register('fixedExpenseOther')}
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
        </BottomFixedContainer>
      </FinancialForm>
    </FinancialSection>
  );
}
