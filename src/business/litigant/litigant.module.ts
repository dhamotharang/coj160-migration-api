import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLCaseLitigants } from './entities/mysql/case-litigant.entity';
import { OracleLitigants } from './entities/oracle/litigant.entity';
import { LitigantController } from './litigant.controller';
import { LitigantService } from './litigant.service';
import { RequestService } from './request/request.service';
import { RequestController } from './request/request.controller';
import { MySQLRequests } from './entities/mysql/request.entity';
import { CaseModule } from '../case/case.module';
import { RequestModule } from 'src/common/request/request.module';
import { PersonModule } from 'src/common/person/person.module';
import { OrganizationModule } from 'src/common/organization/organization.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OracleLitigants]),
    TypeOrmModule.forFeature([
      MySQLCaseLitigants,
      MySQLRequests
    ], "mysql"),
    CaseModule,
    RequestModule,
    PersonModule,
    OrganizationModule
  ],
  controllers: [LitigantController, RequestController],
  providers: [LitigantService, RequestService]
})
export class LitigantModule { }
