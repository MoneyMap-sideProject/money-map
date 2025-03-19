import {
  Controller,
  Post,
  Body,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { FinancialService } from './financial.service';
import { FinancialInputDto } from './financial.dto';
import { AuthGuard } from 'src/guard/auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FinancialResponseDto } from './financial.response.dto';

@ApiTags('Financial')
@Controller('financial')
export class FinancialController {
  constructor(private readonly financialService: FinancialService) {}

  @UseGuards(AuthGuard)
  @Post('calculate')
  @ApiOperation({
    summary: '자산 시뮬레이션',
    description: '입력 정보를 기반으로 나이별 자산 변화를 계산한다.',
  })
  @ApiResponse({
    status: 200,
    description: '자산 계산 성공',
    type: FinancialResponseDto,
  })
  @ApiResponse({ status: 400, description: '입력 데이터가 유효하지 않음' })
  calculateAssets(@Body() input: FinancialInputDto) {
    // 입력 데이터 검증
    if (!input.current_user || !input.annual_change_rate) {
      throw new BadRequestException('Invalid input data');
    }

    // 서비스 호출 및 결과 반환
    return this.financialService.calculateLifetimeAssets(input);
  }
}
