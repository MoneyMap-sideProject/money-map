import BottomFixedContainer from '../../../shared/ui/BottomFixedContainer';
import InputLabel from '../../../shared/ui/InputLabel';
import { PageTitle, PageTitleCaption } from '../../../shared/ui/PageTitle';
import ProgressButton from '../../../shared/ui/ProgressButton';
import Footer from '../../../widgets/footer/Footer';
import {
  FinancialButtonWrapper,
  FinancialForm,
  FinancialFormItem,
  FinancialInput,
  FinancialSection,
} from '../ui/Financial';
import { useForm } from 'react-hook-form';

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
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      variableExpenseFood,
      variableExpenseTransport,
      variableExpenseTravel,
      variableExpenseOther,
    },
  });

  const updateFinancialFormState = () => {
    const values = getValues();

    setFunnelContext(values);
  };

  return (
    <FinancialSection onSubmit={handleSubmit(updateFinancialFormState)}>
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
              id="variableExpenseFood"
              {...register('variableExpenseFood')}
            />
          </div>
          <div>
            <InputLabel htmlFor="variableExpenseTransport">교통비</InputLabel>
            <FinancialInput
              type="number"
              id="variableExpenseTransport"
              {...register('variableExpenseTransport')}
            />
          </div>
        </FinancialFormItem>
        <FinancialFormItem>
          <div>
            <InputLabel htmlFor="variableExpenseTravel">여행비</InputLabel>
            <FinancialInput
              type="number"
              id="variableExpenseTravel"
              {...register('variableExpenseTravel')}
            />
          </div>
          <div>
            <InputLabel htmlFor="variableExpenseOther">기타</InputLabel>
            <FinancialInput
              type="number"
              id="variableExpenseOther"
              {...register('variableExpenseOther')}
            />
          </div>
        </FinancialFormItem>

        <BottomFixedContainer>
          <FinancialButtonWrapper>
            <ProgressButton type="submit" total={totalStep} step={totalStep}>
              제출
            </ProgressButton>
          </FinancialButtonWrapper>
          <Footer />
        </BottomFixedContainer>
      </FinancialForm>
    </FinancialSection>
  );
}
