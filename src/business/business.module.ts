import { Module } from '@nestjs/common';
import { BailCollateralModule } from './bail-collateral/bail-collateral.module';
import { CaseModule } from './case/case.module';
import { FinanceModule } from './finance/finance.module';
import { LitigantModule } from './litigant/litigant.module';
import { NoticeModule } from './notice/notice.module';
import { ProceedModule } from './proceed/proceed.module';
import { StatModule } from './stat/stat.module';

@Module({
  imports: [BailCollateralModule, CaseModule, FinanceModule, LitigantModule, NoticeModule, ProceedModule, StatModule]
})
export class BusinessModule { }
