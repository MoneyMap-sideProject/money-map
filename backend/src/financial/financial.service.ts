import { Injectable } from '@nestjs/common';
import { FinancialInputDto } from './financial.dto';
import computeMonthlyPayAfterTax from 'src/utils/calculate';

type AssetsPerAge = {
  currentState: {
    age: number;
    salary: number;
    monthlySalary: number;
    afterTaxMonthlySalary: number;
  };
  currentAssets: {
    cash: number;
    assets: number;
    total: number;
  };
  // 연간 총 수입 및 비용
  totalInAndOut: {
    income: number;
    cost: number;
  };
};

@Injectable()
export class FinancialService {
  calculateLifetimeAssets(input: FinancialInputDto) {
    const {
      current_user,
      annual_change_rate,
      monthly_fixed_cost,
      monthly_variable_cost,
    } = input;

    const { age, salary, assets, investRate } = current_user;
    // 연봉 상승률, 물가 상승률, 투자 수익률
    const {
      salary: salaryRate,
      inflation,
      investment: investIncomeRate,
    } = annual_change_rate;

    // 고정 및 비고정 비용 계산 함수
    const calculateAnnualCost = (
      fixedCost: typeof monthly_fixed_cost,
      variableCost: typeof monthly_variable_cost,
    ): number => {
      const { rent, communication, insurance, etc: etcFixed } = fixedCost;
      const totalFixed = rent + communication + insurance + etcFixed;

      const { food, travel, transportation, etc: etcVariable } = variableCost;
      const totalVariable = food + travel + transportation + etcVariable;
      return Math.round((totalFixed + totalVariable) * 12);
    };

    // 나이별 자산 계산 함수
    const calculateAssetsPerYear = (
      currentAge: number,
      currentSalary: number,
      currentAssets: number,
      fixedCost: typeof monthly_fixed_cost,
      variableCost: typeof monthly_variable_cost,
    ): AssetsPerAge => {
      const afterTaxIncome =
        Math.round(computeMonthlyPayAfterTax(currentSalary)) * 12; // 세후 연봉
      const annualCost = calculateAnnualCost(fixedCost, variableCost); // 연간 비용
      const totalCash = Math.round(afterTaxIncome - annualCost); // 연간 현금 잔액

      // 잔액 중 투자 비율만큼 투자, 나머지는 현금으로 보유
      const investment = Math.round(totalCash * (investRate / 100)); // 투자 금액
      const cash = Math.round(totalCash * (1 - investRate / 100)); // 현금 잔액

      // 새로운 자산 (투자 수익 포함)
      const newAssets = Math.round(
        (currentAssets + investment) * (1 + investIncomeRate / 100),
      );

      return {
        currentState: {
          age: currentAge,
          salary: Math.round(currentSalary),
          monthlySalary: Math.round(currentSalary / 12),
          afterTaxMonthlySalary: Math.round(afterTaxIncome / 12),
        },
        currentAssets: {
          cash: cash,
          assets: newAssets,
          total: Math.round(totalCash + newAssets),
        },
        totalInAndOut: {
          income: afterTaxIncome,
          cost: annualCost,
        },
      };
    };

    const assetsPerAge: AssetsPerAge[] = [
      {
        currentState: {
          age,
          salary,
          monthlySalary: Math.round(salary / 12),
          afterTaxMonthlySalary: Math.round(computeMonthlyPayAfterTax(salary)),
        },
        currentAssets: {
          cash: assets * (1 - investRate / 100),
          assets: assets * (investRate / 100),
          total: assets,
        },
        totalInAndOut: {
          income: Math.round(computeMonthlyPayAfterTax(salary)) * 12,
          cost: calculateAnnualCost(monthly_fixed_cost, monthly_variable_cost),
        },
      },
    ];
    const retirementAge = 60; // 예상 은퇴 나이

    // 연간 자산 변화 계산
    for (let i = age + 1; i <= retirementAge; i++) {
      const previousData = assetsPerAge[i - age - 1]; // 이전 연도 데이터
      assetsPerAge.push(
        calculateAssetsPerYear(
          i,
          previousData.currentState.salary * (1 + salaryRate / 100),
          previousData.currentAssets.total * (1 + investRate / 100),
          {
            rent:
              monthly_fixed_cost.rent * Math.pow(1 + inflation / 100, i - age),
            communication:
              monthly_fixed_cost.communication *
              Math.pow(1 + inflation / 100, i - age),

            insurance:
              monthly_fixed_cost.insurance *
              Math.pow(1 + inflation / 100, i - age),

            etc:
              monthly_fixed_cost.etc * Math.pow(1 + inflation / 100, i - age),
          },
          {
            food: Math.round(
              monthly_variable_cost.food *
                Math.pow(1 + inflation / 100, i - age),
            ),
            travel: Math.round(
              monthly_variable_cost.travel *
                Math.pow(1 + inflation / 100, i - age),
            ),
            transportation: Math.round(
              monthly_variable_cost.transportation *
                Math.pow(1 + inflation / 100, i - age),
            ),
            etc: Math.round(
              monthly_variable_cost.etc *
                Math.pow(1 + inflation / 100, i - age),
            ),
          },
        ),
      );
    }

    // 마지막 연도의 총 자산 반환
    return assetsPerAge;
  }
}
