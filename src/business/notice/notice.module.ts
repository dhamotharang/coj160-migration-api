import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LookupModule } from 'src/common/lookup/lookup.module';
import { CaseModule } from '../case/case.module';
import { MySQLNotices } from './entities/mysql/notice.entity';
import { OracleNotices } from './entities/oracle/notice.entity';
import { NoticeController } from './notice/notice.controller';
import { NoticeService } from './notice/notice.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OracleNotices
    ]),
    TypeOrmModule.forFeature([
      MySQLNotices
    ], "mysql"),
    CaseModule,
    LookupModule,
  ],
  controllers: [NoticeController],
  providers: [NoticeService]
})
export class NoticeModule { }
