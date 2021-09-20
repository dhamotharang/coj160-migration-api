import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LookupModule } from 'src/common/lookup/lookup.module';
import { CaseModule } from '../case/case.module';
import { MySQLNotices } from './entities/mysql/notice.entity';
import { OracleNotices } from './entities/oracle/notice.entity';
import { NoticeController } from './notice/notice.controller';
import { NoticeService } from './notice/notice.service';
import { NoticeSendController } from './notice-send/notice-send.controller';
import { NoticeSendService } from './notice-send/notice-send.service';
import { MySQLNoticeSends } from './entities/mysql/notice-send.entity';
import { LitigantModule } from '../litigant/litigant.module';
import { NoticeProvincialController } from './notice-provincecial/notice-provincial.controller';
import { NoticeProvincialService } from './notice-provincecial/notice-provincial.service';
import { OracleLookupTitleCases } from 'src/common/lookup/entities/oracle/lookup-title-case.entity';
import { OracleCaseLits } from '../case/entities/oracle/case-lit.entity';
import { OracleNoticeProvincials } from './entities/oracle/notice-provincial.entity';
import { NoticeIssuedService } from './notice-issued/notice-issued.service';
import { NoticeIssuedController } from './notice-issued/notice-issued.controller';
import { NoticeSendResultController } from './notice-send-result/notice-send-result.controller';
import { NoticeSendResultService } from './notice-send-result/notice-send-result.service';
import { OracleNoticeIssueds } from './entities/oracle/notice-issued.entity';
import { OracleNoticeSendResults } from './entities/oracle/notice-send-result.entity';
import { OracleLookupNoticeSendTypeResults } from '../proceed/entities/oracle/lookup-notice-send-type-result.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OracleNotices,
      OracleNoticeProvincials,
      OracleLookupTitleCases,
      OracleCaseLits,
      OracleNoticeIssueds,
      OracleNoticeSendResults,
      OracleLookupNoticeSendTypeResults
    ]),
    TypeOrmModule.forFeature([
      MySQLNotices,
      MySQLNoticeSends
    ], "mysql"),
    CaseModule,
    LookupModule,
    LitigantModule
  ],
  controllers: [NoticeController, NoticeSendController, NoticeProvincialController, NoticeIssuedController, NoticeSendResultController],
  providers: [NoticeService, NoticeSendService, NoticeProvincialService, NoticeIssuedService, NoticeSendResultService]
})
export class NoticeModule { }
