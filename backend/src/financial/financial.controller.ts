import { Controller, Post, Body } from '@nestjs/common';
import { FinancialService } from './financial.service';
import { FinancialInputDto } from './financial.dto';

@Controller('financial')
export class FinancialController {
  constructor(private readonly financialService: FinancialService) {}

  @Post('calculate')
  calculateAssets(@Body() input: FinancialInputDto) {
    return this.financialService.calculateLifetimeAssets(input);
  }
}
