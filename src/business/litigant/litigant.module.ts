import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLCaseLitigants } from './entities/mysql/case-litigant.entity';
import { OracleLitigants } from './entities/oracle/litigant.entity';
import { RequestService } from './request/request.service';
import { RequestController } from './request/request.controller';
import { MySQLRequests } from './entities/mysql/request.entity';
import { CaseModule } from '../case/case.module';
import { PersonModule } from 'src/common/person/person.module';
import { LookupModule } from 'src/common/lookup/lookup.module';
import { LitigantController } from './litigant/litigant.controller';
import { LitigantService } from './litigant/litigant.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OracleLitigants
    ]),
    TypeOrmModule.forFeature([
      MySQLCaseLitigants,
      MySQLRequests
    ], "mysql"),
    CaseModule,
    PersonModule,
    LookupModule
  ],
  controllers: [LitigantController, RequestController],
  providers: [LitigantService, RequestService],
  exports: [LitigantService, RequestService]
})
export class LitigantModule { }
