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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OracleNotices
    ]),
    TypeOrmModule.forFeature([
      MySQLNotices,
      MySQLNoticeSends
    ], "mysql"),
    CaseModule,
    LookupModule,
    LitigantModule
  ],
  controllers: [NoticeController, NoticeSendController],
  providers: [NoticeService, NoticeSendService]
})
export class NoticeModule { }
