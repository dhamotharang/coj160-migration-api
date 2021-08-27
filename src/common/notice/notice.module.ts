import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLNoticeTypes } from './entities/mysql/notice-type.entity';
import { OracleLookupNoticeTypes } from './entities/oracle/lookup-notice-type.entity';
import { NoticeTypeController } from './notice-type/notice-type.controller';
import { NoticeTypeService } from './notice-type/notice-type.service';
import { NoticeSendResultController } from './notice-send-result/notice-send-result.controller';
import { NoticeSendResultService } from './notice-send-result/notice-send-result.service';
import { MySQLNoticeSendResults } from './entities/mysql/notice-send-result.entity';
import { OracleLookupNoticeSendResults } from './entities/oracle/lookup-notice-send-result.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OracleLookupNoticeTypes,
      OracleLookupNoticeSendResults
    ]),
    TypeOrmModule.forFeature([
      MySQLNoticeTypes,
      MySQLNoticeSendResults
    ], "mysql")
  ],
  controllers: [NoticeTypeController, NoticeSendResultController],
  providers: [NoticeTypeService, NoticeSendResultService],
  exports: [NoticeTypeService],
})
export class NoticeModule { }
