import BottomFixedContainer from '@/shared/ui/bottom-fixed/BottomFixedContainer';
import { PageTitle, PageTitleCaption } from '@/shared/ui/PageTitle';
import ProgressButton from '@/shared/ui/ProgressButton';
import {
  FinancialButtonWrapper,
  FinancialForm,
  FinancialFormRow,
  FinancialSection,
} from '../ui/Financial';
import { useForm } from 'react-hook-form';
import FinancialInputField from '../ui/FinancialInputField';
import FinancialTotalField from '../ui/FinancialTotalField';
import { sum } from '@/shared/utils/numberUtils';

type FormInput = Record<
  | 'variableExpenseFood'
  | 'variableExpenseTransport'
  | 'variableExpenseTravel'
  | 'variableExpenseOther',
  number
>;

type Props = FormInput & {
  totalStep: number;
  setFunnelContext: (context: FormInput) => void;
};

export default function VariableExpense({
  variableExpenseFood,
  variableExpenseTransport,
  variableExpenseTravel,
  variableExpenseOther,
  totalStep,
  setFunnelContext,
}: Props) {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      variableExpenseFood,
      variableExpenseTransport,
      variableExpenseTravel,
      variableExpenseOther,
    },
  });
  const values = watch();
  const total = sum(...Object.values(values).map(Number));

  const updateFinancialFormState = () => {
    setFunnelContext(values);
  };

  return (
    <FinancialSection>
      <header>
        <PageTitle>
          지출(비고정비)<PageTitleCaption>월 기준</PageTitleCaption>
        </PageTitle>
      </header>

      <FinancialForm onSubmit={handleSubmit(updateFinancialFormState)}>
        <FinancialFormRow>
          <FinancialInputField
            label="식비"
            type="number"
            id="variableExpenseFood"
            {...register('variableExpenseFood')}
          />
          <FinancialInputField
            label="교통비"
            type="number"
            id="variableExpenseTransport"
            {...register('variableExpenseTransport')}
          />
        </FinancialFormRow>
        <FinancialFormRow>
          <FinancialInputField
            label="여행비"
            type="number"
            id="variableExpenseTravel"
            {...register('variableExpenseTravel')}
          />
          <FinancialInputField
            label="기타"
            type="number"
            id="variableExpenseOther"
            {...register('variableExpenseOther')}
          />
        </FinancialFormRow>

        <BottomFixedContainer>
          <FinancialTotalField
            htmlFor="variableExpenseFood variableExpenseTransport variableExpenseTravel variableExpenseOther"
            total={total}
          />
          <FinancialButtonWrapper>
            <ProgressButton type="submit" total={totalStep} step={totalStep}>
              제출
            </ProgressButton>
          </FinancialButtonWrapper>
        </BottomFixedContainer>
      </FinancialForm>
    </FinancialSection>
  );
}
