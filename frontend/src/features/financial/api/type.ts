export type Email = string;
export type Time = string;
export type Id = number;

export type CalculateFinancialRequestBody = {
  current_user: {
    age: number;
    salary: number;
    assets: number;
    investRate: number;
  };
  annual_change_rate: {
    salary: number;
    inflation: number;
    investment: number;
  };
  monthly_fixed_cost: {
    rent: number;
    communication: number;
    insurance: number;
    etc: number;
  };
  monthly_variable_cost: {
    food: number;
    travel: number;
    transportation: number;
    etc: number;
  };
};

export type CalculateFinancialResponseBody = {
  assetsPerAge: [
    {
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
      totalInAndOut: {
        income: number;
        cost: number;
      };
    },
  ];
};
