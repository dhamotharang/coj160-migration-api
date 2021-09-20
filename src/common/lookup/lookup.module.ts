import { Module } from '@nestjs/common';
import { LookupNoticeTypeController } from './lookup-notice-type/lookup-notice-type.controller';
import { LookupNoticeTypeService } from './lookup-notice-type/lookup-notice-type.service';
import { LookupAllegationService } from './lookup-allegation/lookup-allegation.service';
import { LookupJudgeService } from './lookup-judge/lookup-judge.service';
import { LookupNoticeSendResultService } from './lookup-notice-send-result/lookup-notice-send-result.service';
import { LookupNoticeSendMethodService } from './lookup-notice-send-method/lookup-notice-send-method.service';
import { LookupNoticeSendResultController } from './lookup-notice-send-result/lookup-notice-send-result.controller';
import { LookupNoticeSendMethodController } from './lookup-notice-send-method/lookup-notice-send-method.controller';
import { LookupJudgeController } from './lookup-judge/lookup-judge.controller';
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
import { LookupDepartmentController } from './lookup-department/lookup-department.controller';
import { LookupDepartmentService } from './lookup-department/lookup-department.service';
import { OracleLookupDepartments } from './entities/oracle/lookup-department.entity';
import { MySQLDepartments } from './entities/mysql/department.entity';
import { LookupRequestSubjectController } from './lookup-request-subject/lookup-request-subject.controller';
import { LookupRequestSubjectService } from './lookup-request-subject/lookup-request-subject.service';
import { LookupRequestTypeService } from './lookup-request-type/lookup-request-type.service';
import { LookupRequestTypeController } from './lookup-request-type/lookup-request-type.controller';
import { OracleLookupRequestSubjects } from './entities/oracle/lookup-request-subject.entity';
import { MySQLRequestSubjects } from './entities/mysql/request-subject.entity';
import { OracleLookupRequestTypes } from './entities/oracle/lookup-request-type.entity';
import { MySQLRequestTypes } from './entities/mysql/request-type.entity';
import { LookupSubdistrictController } from './lookup-subdistrict/lookup-subdistrict.controller';
import { LookupSubdistrictService } from './lookup-subdistrict/lookup-subdistrict.service';
import { OracleLookupSubdistricts } from './entities/oracle/lookup-subdistrict.entity';
import { MySQLTambons } from './entities/mysql/tambon.entity';
import { LookupCourtController } from './lookup-court/lookup-court.controller';
import { LookupCourtService } from './lookup-court/lookup-court.service';
import { OracleLookupCourts } from './entities/oracle/lookup-court.entity';
import { LookupReceiptSubTypeController } from './lookup-receipt-sub-type/lookup-receipt-sub-type.controller';
import { LookupReceiptTypeController } from './lookup-receipt-type/lookup-receipt-type.controller';
import { LookupReceiptSubTypeService } from './lookup-receipt-sub-type/lookup-receipt-sub-type.service';
import { LookupReceiptTypeService } from './lookup-receipt-type/lookup-receipt-type.service';
import { OracleLookupReceiptTypes } from './entities/oracle/lookup-receipt-type.entity';
import { OracleLookupReceiptSubTypes } from './entities/oracle/lookup-receipt-sub-type.entity';
import { MySQLReceiptTypes } from './entities/mysql/receipt-type.entity';
import { MySQLReceiptSubTypes } from './entities/mysql/receipt-sub-type.entity';
import { LookupBankService } from './lookup-bank/lookup-bank.service';
import { LookupBankController } from './lookup-bank/lookup-bank.controller';
import { OracleLookupBanks } from './entities/oracle/lookup-bank.entity';
import { MySQLBanks } from './entities/mysql/bank.entity';
import { MySQLCourts } from './entities/mysql/court.entity';
import { LookupTitleCaseController } from './lookup-title-case/lookup-title-case.controller';
import { LookupTitleCaseService } from './lookup-title-case/lookup-title-case.service';
import { OracleLookupTitleCases } from './entities/oracle/lookup-title-case.entity';

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
      OracleLookupSendMethods,
      OracleLookupDepartments,
      OracleLookupRequestSubjects,
      OracleLookupRequestTypes,
      OracleLookupSubdistricts,
      OracleLookupCourts,
      OracleLookupReceiptTypes,
      OracleLookupReceiptSubTypes,
      OracleLookupBanks,
      OracleLookupTitleCases
    ]),
    TypeOrmModule.forFeature([
      MySQLAppointDelays,
      MySQLAppointTables,
      MySQLNoticeTypes,
      MySQLJudges,
      MySQLNoticeSendResults,
      MySQLNoticeSendTypes,
      MySQLDepartments,
      MySQLRequestSubjects,
      MySQLRequestTypes,
      MySQLTambons,
      MySQLReceiptTypes,
      MySQLReceiptSubTypes,
      MySQLBanks,
      MySQLCourts
    ], "mysql"),
  ],
  controllers: [
    LookupNoticeTypeController,
    LookupNoticeSendResultController,
    LookupNoticeSendMethodController,
    LookupJudgeController,
    LookupAllegationController,
    LookupAppointDelayController,
    LookupAppointListController,
    LookupAppointTableController,
    LookupDepartmentController,
    LookupRequestSubjectController,
    LookupRequestTypeController,
    LookupSubdistrictController,
    LookupCourtController,
    LookupReceiptSubTypeController,
    LookupReceiptTypeController,
    LookupBankController,
    LookupTitleCaseController,
  ],
  providers: [
    LookupNoticeTypeService,
    LookupAllegationService,
    LookupJudgeService,
    LookupNoticeSendResultService,
    LookupNoticeSendMethodService,
    LookupAppointTableService,
    LookupAppointDelayService,
    LookupAppointListService,
    LookupDepartmentService,
    LookupRequestSubjectService,
    LookupRequestTypeService,
    LookupSubdistrictService,
    LookupCourtService,
    LookupReceiptSubTypeService,
    LookupReceiptTypeService,
    LookupBankService,
    LookupTitleCaseService
  ],
  exports: [
    LookupNoticeTypeService,
    LookupAllegationService,
    LookupJudgeService,
    LookupNoticeSendResultService,
    LookupNoticeSendMethodService,
    LookupAppointTableService,
    LookupAppointDelayService,
    LookupAppointListService,
    LookupDepartmentService,
    LookupRequestSubjectService,
    LookupRequestTypeService,
    LookupSubdistrictService,
    LookupCourtService,
    LookupReceiptSubTypeService,
    LookupReceiptTypeService,
    LookupBankService,
    LookupTitleCaseService
  ]
})
export class LookupModule { }
