import { Module } from '@nestjs/common';
import { LookupNoticeTypeController } from './lookup-notice-type/lookup-notice-type.controller';
import { LookupNoticeTypeService } from './lookup-notice-type/lookup-notice-type.service';
import { LookupAllegationService } from './lookup-allegation/lookup-allegation.service';
import { LookupAppointService } from './lookup-appoint/lookup-appoint.service';
import { LookupJudgeService } from './lookup-judge/lookup-judge.service';
import { LookupNoticeSendResultService } from './lookup-notice-send-result/lookup-notice-send-result.service';
import { LookupNoticeSendMethodService } from './lookup-notice-send-method/lookup-notice-send-method.service';
import { LookupNoticeSendResultController } from './lookup-notice-send-result/lookup-notice-send-result.controller';
import { LookupNoticeSendMethodController } from './lookup-notice-send-method/lookup-notice-send-method.controller';
import { LookupJudgeController } from './lookup-judge/lookup-judge.controller';
import { LookupAppointController } from './lookup-appoint/lookup-appoint.controller';
import { LookupAllegationController } from './lookup-allegation/lookup-allegation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OracleLookupAllegations } from './entities/oracle/lookup-allegation.entity';
import { LookupAppointDelayController } from './lookup-appoint-delay/lookup-appoint-delay.controller';
import { LookupAppointListController } from './lookup-appoint-list/lookup-appoint-list.controller';
import { LookupAppointTableController } from './lookup-appoint-table/lookup-appoint-table.controller';
import { LookupAppointTableService } from './lookup-appoint-table/lookup-appoint-table.service';
import { LookupAppointDelayService } from './lookup-appoint-delay/lookup-appoint-delay.service';
import { LookupAppointListService } from './lookup-appoint-list/lookup-appoint-list.service';
import { OracleLookupAppointDelays } from './entities/oracle/lookup-appoint-delay.entity';
import { MySQLAppointDelays } from './entities/mysql/appoint-delay.entity';
import { MySQLAppointTables } from './entities/mysql/appoint-table.entity';
import { OracleLookupAppointLists } from './entities/oracle/lookup-appoint-list.entity';
import { OracleLookupAppointTables } from './entities/oracle/lookup-appoint-table.entity';
import { OracleLookupNoticeTypes } from './entities/oracle/lookup-notice-type.entity';
import { MySQLNoticeTypes } from './entities/mysql/notice-type.entity';
import { OracleLookupJudges } from './entities/oracle/lookup-judge.entity';
import { MySQLJudges } from './entities/mysql/judge.entity';
import { OracleLookupNoticeSendResults } from './entities/oracle/lookup-notice-send-result.entity';
import { MySQLNoticeSendResults } from './entities/mysql/notice-send-result.entity';
import { OracleLookupSendMethods } from './entities/oracle/lookup-send-method.entity';
import { MySQLNoticeSendTypes } from './entities/mysql/notice-send-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OracleLookupAllegations,
      OracleLookupAppointDelays,
      OracleLookupAppointLists,
      OracleLookupAppointTables,
      OracleLookupNoticeTypes,
      OracleLookupJudges,
      OracleLookupNoticeSendResults,
      OracleLookupSendMethods
    ]),
    TypeOrmModule.forFeature([
      MySQLAppointDelays,
      MySQLAppointTables,
      MySQLNoticeTypes,
      MySQLJudges,
      MySQLNoticeSendResults,
      MySQLNoticeSendTypes
    ], "mysql"),
  ],
  controllers: [
    LookupNoticeTypeController,
    LookupNoticeSendResultController,
    LookupNoticeSendMethodController,
    LookupJudgeController,
    LookupAppointController,
    LookupAllegationController,
    LookupAppointDelayController,
    LookupAppointListController,
    LookupAppointTableController
  ],
  providers: [
    LookupNoticeTypeService,
    LookupAllegationService,
    LookupAppointService,
    LookupJudgeService,
    LookupNoticeSendResultService,
    LookupNoticeSendMethodService,
    LookupAppointTableService,
    LookupAppointDelayService,
    LookupAppointListService
  ],
  exports: [
    LookupNoticeTypeService,
    LookupAllegationService,
    LookupAppointService,
    LookupJudgeService,
    LookupNoticeSendResultService,
    LookupNoticeSendMethodService,
    LookupAppointTableService,
    LookupAppointDelayService,
    LookupAppointListService
  ]
})
export class LookupModule { }
