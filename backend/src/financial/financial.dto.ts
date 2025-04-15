import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@ApiExtraModels()
export class CurrentUserDto {
  @ApiProperty({ example: 30, description: '현재 연령' })
  @IsNumber()
  age: number;

  @ApiProperty({ example: 50000000, description: '연봉 (KRW)' })
  @IsNumber()
  salary: number;

  @ApiProperty({ example: 100000000, description: '보유 자산 (KRW)' })
  @IsNumber()
  assets: number;

  @ApiProperty({ example: 30, description: '투자 비율 (%)' })
  @IsNumber()
  investRate: number;
}

@ApiExtraModels()
export class AnnualChangeRateDto {
  @ApiProperty({ example: 3, description: '연봉 상승률 (%)' })
  @IsNumber()
  salary: number;

  @ApiProperty({ example: 2, description: '연간 물가 상승률 (%)' })
  @IsNumber()
  inflation: number;

  @ApiProperty({ example: 5, description: '연간 투자 수익률 (%)' })
  @IsNumber()
  investment: number;
}

@ApiExtraModels()
export class MonthlyFixedCostDto {
  @ApiProperty({ example: 1000000, description: '월세 (KRW)' })
  @IsNumber()
  rent: number;

  @ApiProperty({ example: 100000, description: '통신비 (KRW)' })
  @IsNumber()
  communication: number;

  @ApiProperty({ example: 300000, description: '보험료 (KRW)' })
  @IsNumber()
  insurance: number;

  @ApiProperty({ example: 200000, description: '기타 고정비용 (KRW)' })
  @IsNumber()
  etc: number;
}

@ApiExtraModels()
export class MonthlyVariableCostDto {
  @ApiProperty({ example: 500000, description: '식비 (KRW)' })
  @IsNumber()
  food: number;

  @ApiProperty({ example: 200000, description: '여행 비용 (KRW)' })
  @IsNumber()
  travel: number;

  @ApiProperty({ example: 150000, description: '교통비 (KRW)' })
  @IsNumber()
  transportation: number;

  @ApiProperty({ example: 100000, description: '기타 변동 비용 (KRW)' })
  @IsNumber()
  etc: number;
}

@ApiExtraModels()
export class FinancialInputDto {
  @ApiProperty({ type: () => CurrentUserDto })
  @ValidateNested()
  @Type(() => CurrentUserDto)
  current_user: CurrentUserDto;

  @ApiProperty({ type: () => AnnualChangeRateDto })
  @ValidateNested()
  @Type(() => AnnualChangeRateDto)
  annual_change_rate: AnnualChangeRateDto;

  @ApiProperty({ type: () => MonthlyFixedCostDto })
  @ValidateNested()
  @Type(() => MonthlyFixedCostDto)
  monthly_fixed_cost: MonthlyFixedCostDto;

  @ApiProperty({ type: () => MonthlyVariableCostDto })
  @ValidateNested()
  @Type(() => MonthlyVariableCostDto)
  monthly_variable_cost: MonthlyVariableCostDto;
}
