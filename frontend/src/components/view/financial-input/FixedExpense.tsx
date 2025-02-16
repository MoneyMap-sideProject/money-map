import { useFormContext } from 'react-hook-form';
import {
  FinancialForm,
  FinancialFormItem,
  FinancialInput,
  FinancialSection,
} from './FinancialInput.styled';
import InputLabel from '../../ui/InputLabel';
import { PageTitle, PageTitleCaption } from '../../ui/PageTitle';

export type FixedExpenseFormValues = {
  fixedExpenseRent: string; // 월세 및 관리비
  fixedExpenseCommunication: string; // 통신비
  fixedExpenseUtilities: string; // 전기 및 가스
  fixedExpenseInsurance: string; // 보험
  fixedExpenseOther: string; // 지출(고정비) 기타
};

export default function FixedExpense() {
  const { register } = useFormContext<FixedExpenseFormValues>();

  return (
    <FinancialSection>
      <header>
        <PageTitle>
          지출(고정비)<PageTitleCaption>월 기준</PageTitleCaption>
        </PageTitle>
      </header>

      <FinancialForm>
        <FinancialFormItem>
          <div>
            <InputLabel htmlFor="fixedExpenseRent">월세 및 관리비</InputLabel>
            <FinancialInput type="number" {...register('fixedExpenseRent')} />
          </div>
          <div>
            <InputLabel htmlFor="fixedExpenseCommunication">통신비</InputLabel>
            <FinancialInput
              type="number"
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
              {...register('fixedExpenseUtilities')}
            />
          </div>
          <div>
            <InputLabel htmlFor="fixedExpenseInsurance">보험</InputLabel>
            <FinancialInput
              type="number"
              {...register('fixedExpenseInsurance')}
            />
          </div>
        </FinancialFormItem>
        <FinancialFormItem>
          <div>
            <InputLabel htmlFor="fixedExpenseOther">기타</InputLabel>
            <FinancialInput type="number" {...register('fixedExpenseOther')} />
          </div>
        </FinancialFormItem>
      </FinancialForm>
    </FinancialSection>
  );
}
