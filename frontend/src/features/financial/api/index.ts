import { CalculateFinancialRequestBody } from './type';
import instance from './instance';

export const calculateFinancial = async (
  body: CalculateFinancialRequestBody,
) => {
  return instance.post('/financial/calculate', body);
};
