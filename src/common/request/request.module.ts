import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLRequestTypes } from './entities/mysql/request-type.entity';
import { OracleLookupRequestTypes } from './entities/oracle/lookup-request-type.entity';
import { RequestTypeController } from './request-type/request-type.controller';
import { RequestTypeService } from './request-type/request-type.service';
import { RequestSubjectController } from './request-subject/request-subject.controller';
import { RequestSubjectService } from './request-subject/request-subject.service';
import { MySQLRequestSubjects } from './entities/mysql/request-subject.entity';
import { OracleLookupRequestSubjects } from './entities/oracle/lookup-request-subject.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OracleLookupRequestSubjects,
      OracleLookupRequestTypes
    ]),
    TypeOrmModule.forFeature([
      MySQLRequestTypes,
      MySQLRequestSubjects
    ], "mysql")
  ],
  controllers: [RequestTypeController, RequestSubjectController],
  providers: [RequestTypeService, RequestSubjectService],
  exports: [RequestTypeService, RequestSubjectService]
})
export class RequestModule { }
