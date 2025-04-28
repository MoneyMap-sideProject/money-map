import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialController } from './financial.controller';
import { FinancialService } from './financial.service';
import { FinancialData } from './entities/financial_data.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialData]), UserModule],
  controllers: [FinancialController],
  providers: [FinancialService],
})
export class FinancialModule {}
