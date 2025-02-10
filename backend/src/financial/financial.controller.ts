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

@Controller('financial')
export class FinancialController {
  constructor(private readonly financialService: FinancialService) {}

  @UseGuards(AuthGuard)
  @Post('calculate')
  calculateAssets(@Body() input: FinancialInputDto) {
    // 입력 데이터 검증
    if (!input.current_user || !input.annual_change_rate) {
      throw new BadRequestException('Invalid input data');
    }

    // 서비스 호출 및 결과 반환
    return this.financialService.calculateLifetimeAssets(input);
  }
}
