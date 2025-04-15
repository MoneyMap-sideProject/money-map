import { ApiProperty } from '@nestjs/swagger';
import {
  CurrentUserDto,
  AnnualChangeRateDto,
  MonthlyFixedCostDto,
  MonthlyVariableCostDto,
} from './financial.dto';

class CurrentStateDto {
  @ApiProperty({ example: 30, description: '현재 나이' })
  age: number;

  @ApiProperty({ example: 50000000, description: '연봉 (세전)' })
  salary: number;

  @ApiProperty({ example: 4166667, description: '월급 (세전)' })
  monthlySalary: number;

  @ApiProperty({ example: 3500000, description: '세후 월급' })
  afterTaxMonthlySalary: number;
}

class CurrentAssetsDto {
  @ApiProperty({ example: 5000000, description: '현재 보유 현금' })
  cash: number;

  @ApiProperty({ example: 25000000, description: '투자 자산' })
  assets: number;

  @ApiProperty({ example: 30000000, description: '총 자산 (현금 + 투자)' })
  total: number;
}

class TotalInAndOutDto {
  @ApiProperty({ example: 42000000, description: '연간 세후 총 수입' })
  income: number;

  @ApiProperty({ example: 24000000, description: '연간 총 지출' })
  cost: number;
}

export class AssetsPerAgeDto {
  @ApiProperty({ description: '현재 상태 정보', type: CurrentStateDto })
  currentState: CurrentStateDto;

  @ApiProperty({ description: '자산 정보', type: CurrentAssetsDto })
  currentAssets: CurrentAssetsDto;

  @ApiProperty({ description: '총 수입 및 지출 정보', type: TotalInAndOutDto })
  totalInAndOut: TotalInAndOutDto;
}

export class FinancialResponseDto {
  @ApiProperty({
    description: '현재 사용자 정보',
    type: CurrentUserDto,
  })
  current_user?: CurrentUserDto;

  @ApiProperty({
    description: '연간 변화율 정보',
    type: AnnualChangeRateDto,
  })
  annual_change_rate?: AnnualChangeRateDto;

  @ApiProperty({
    description: '월별 고정 비용 정보',
    type: MonthlyFixedCostDto,
  })
  monthly_fixed_cost?: MonthlyFixedCostDto;

  @ApiProperty({
    description: '월별 변동 비용 정보',
    type: MonthlyVariableCostDto,
  })
  monthly_variable_cost?: MonthlyVariableCostDto;

  @ApiProperty({
    description: '나이별 자산 변화 데이터',
    type: [AssetsPerAgeDto],
  })
  results: AssetsPerAgeDto[];
}
