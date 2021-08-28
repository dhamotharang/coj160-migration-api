import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointModule } from '../appoint/appoint.module';
import { OracleProceedAppointCaseJudges } from './entities/oracle/proceed-appoint-case-judge.entity';
import { OracleProceedAppointContinues } from './entities/oracle/proceed-appoint-continue.entity';
import { OracleProceedAppointResults } from './entities/oracle/proceed-appoint-result.entity';
import { OracleProceedAppoints } from './entities/oracle/proceed-appoint.entity';
import { OracleProceedHoldReasons } from './entities/oracle/proceed-hold-reason.entity';
import { HoldReasonController } from './hold-reason/hold-reason.controller';
import { HoldReasonService } from './hold-reason/hold-reason.service';
import { AppointContinueController } from './appoint-continue/appoint-continue.controller';
import { AppointContinueService } from './appoint-continue/appoint-continue.service';
import { AppointCaseJudgeService } from './appoint-case-judge/appoint-case-judge.service';
import { AppointCaseJudgeController } from './appoint-case-judge/appoint-case-judge.controller';
import { AppointResultController } from './appoint-result/appoint-result.controller';
import { AppointController } from './appoint/appoint.controller';
import { AppointService } from './appoint/appoint.service';
import { AppointResultService } from './appoint-result/appoint-result.service';
import { CaseModule } from '../case/case.module';
import { LookupModule } from 'src/common/lookup/lookup.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OracleProceedHoldReasons,
      OracleProceedAppoints,
      OracleProceedAppointContinues,
      OracleProceedAppointCaseJudges,
      OracleProceedAppointResults
    ]),
    AppointModule,
    CaseModule,
    LookupModule
  ],
  controllers: [
    HoldReasonController,
    AppointContinueController,
    AppointCaseJudgeController,
    AppointResultController,
    AppointController
  ],
  providers: [
    HoldReasonService,
    AppointContinueService,
    AppointCaseJudgeService,
    AppointService,
    AppointResultService
  ],
  exports: [
    HoldReasonService,
    AppointContinueService,
    AppointCaseJudgeService,
    AppointService,
    AppointResultService
  ]
})
export class ProceedModule { }
