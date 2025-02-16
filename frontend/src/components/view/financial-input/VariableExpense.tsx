import { useFormContext } from 'react-hook-form';
import {
  FinancialForm,
  FinancialFormItem,
  FinancialInput,
  FinancialSection,
} from './FinancialInput.styled';
import InputLabel from '../../ui/InputLabel';
import { PageTitle, PageTitleCaption } from '../../ui/PageTitle';

export type VariableExpenseFormValues = {
  variableExpenseFood: string; // 식비
  variableExpenseTransport: string; // 교통비
  variableExpenseTravel: string; // 여행비
  variableExpenseOther: string; // 지출(비고정비) 기타
};

export default function VariableExpense() {
  const { register } = useFormContext<VariableExpenseFormValues>();

  return (
    <FinancialSection>
      <header>
        <PageTitle>
          지출(비고정비)<PageTitleCaption>월 기준</PageTitleCaption>
        </PageTitle>
      </header>

      <FinancialForm>
        <FinancialFormItem>
          <div>
            <InputLabel htmlFor="variableExpenseFood">식비</InputLabel>
            <FinancialInput
              type="number"
              {...register('variableExpenseFood')}
            />
          </div>
          <div>
            <InputLabel htmlFor="variableExpenseTransport">교통비</InputLabel>
            <FinancialInput
              type="number"
              {...register('variableExpenseTransport')}
            />
          </div>
        </FinancialFormItem>
        <FinancialFormItem>
          <div>
            <InputLabel htmlFor="variableExpenseTravel">여행비</InputLabel>
            <FinancialInput
              type="number"
              {...register('variableExpenseTravel')}
            />
          </div>
          <div>
            <InputLabel htmlFor="variableExpenseOther">기타</InputLabel>
            <FinancialInput
              type="number"
              {...register('variableExpenseOther')}
            />
          </div>
        </FinancialFormItem>
      </FinancialForm>
    </FinancialSection>
  );
}
