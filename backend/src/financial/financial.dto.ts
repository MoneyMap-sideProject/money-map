import { IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CurrentUserDto {
  @IsNumber()
  age: number;

  @IsNumber()
  salary: number;

  @IsNumber()
  assets: number;

  @IsNumber()
  investRate: number;
}

class AnnualChangeRateDto {
  @IsNumber()
  salary: number;

  @IsNumber()
  inflation: number;

  @IsNumber()
  investment: number;
}

class MonthlyFixedCostDto {
  @IsNumber()
  rent: number;

  @IsNumber()
  communication: number;

  @IsNumber()
  insurance: number;

  @IsNumber()
  etc: number;
}

class MonthlyVariableCostDto {
  @IsNumber()
  food: number;

  @IsNumber()
  travel: number;

  @IsNumber()
  transportation: number;

  @IsNumber()
  etc: number;
}

export class FinancialInputDto {
  @ValidateNested()
  @Type(() => CurrentUserDto)
  current_user: CurrentUserDto;

  @ValidateNested()
  @Type(() => AnnualChangeRateDto)
  annual_change_rate: AnnualChangeRateDto;

  @ValidateNested()
  @Type(() => MonthlyFixedCostDto)
  monthly_fixed_cost: MonthlyFixedCostDto;

  @ValidateNested()
  @Type(() => MonthlyVariableCostDto)
  monthly_variable_cost: MonthlyVariableCostDto;
}
