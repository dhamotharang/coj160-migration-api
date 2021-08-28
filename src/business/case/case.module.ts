import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLCases } from './entities/mysql/case.entity';
import { OracleCases } from './entities/oracle/case.entity';
import { CaseAlleController } from './case-alle/case-alle.controller';
import { CaseAlleService } from './case-alle/case-alle.service';
import { OracleCaseAlles } from './entities/oracle/case-alle.entity';
import { CaseController } from './case/case.controller';
import { CaseService } from './case/case.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OracleCases,
      OracleCaseAlles
    ]),
    TypeOrmModule.forFeature([
      MySQLCases,
    ], "mysql"),
  ],
  controllers: [CaseController, CaseAlleController],
  providers: [CaseService, CaseAlleService],
  exports: [CaseService, CaseAlleService]
})
export class CaseModule { }
