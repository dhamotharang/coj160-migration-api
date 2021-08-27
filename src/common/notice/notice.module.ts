import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLNoticeTypes } from './entities/mysql/notice-type.entity';
import { OracleLookupNoticeTypes } from './entities/oracle/lookup-notice-type.entity';
import { NoticeTypeController } from './notice-type/notice-type.controller';
import { NoticeTypeService } from './notice-type/notice-type.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OracleLookupNoticeTypes
    ]),
    TypeOrmModule.forFeature([
      MySQLNoticeTypes
    ], "mysql")
  ],
  controllers: [NoticeTypeController],
  providers: [NoticeTypeService],
  exports: [NoticeTypeService],
})
export class NoticeModule { }
