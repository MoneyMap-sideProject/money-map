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

type FormInput = Record<'food' | 'travel' | 'transportation' | 'etc', number>;

type Props = {
  defaultValues: FormInput;
  totalStep: number;
  onSubmit: (values: FormInput) => void;
};

export default function MonthlyVariableCost({
  defaultValues,
  totalStep,
  onSubmit,
}: Props) {
  const { register, handleSubmit, watch } = useForm({
    defaultValues,
  });
  const values = watch();
  const total = sum(...Object.values(values).map(Number));

  const updateFinancialFormState = () => {
    onSubmit(values);
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
            id="variableCostFood"
            {...register('food')}
          />
          <FinancialInputField
            label="교통비"
            type="number"
            id="variableCostTravel"
            {...register('travel')}
          />
        </FinancialFormRow>
        <FinancialFormRow>
          <FinancialInputField
            label="여행비"
            type="number"
            id="variableCostTransportation"
            {...register('transportation')}
          />
          <FinancialInputField
            label="기타"
            type="number"
            id="variableCostEtc"
            {...register('etc')}
          />
        </FinancialFormRow>

        <BottomFixedContainer>
          <FinancialTotalField
            htmlFor="variableCostFood variableCostTravel variableCostTransportation variableCostEtc"
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
