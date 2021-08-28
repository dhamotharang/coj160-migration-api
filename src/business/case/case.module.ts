import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseController } from './case.controller';
import { CaseService } from './case.service';
import { MySQLCases } from './entities/mysql/case.entity';
import { OracleCases } from './entities/oracle/case.entity';
import { CaseAlleController } from './case-alle/case-alle.controller';
import { CaseAlleService } from './case-alle/case-alle.service';
import { OracleCaseAlles } from './entities/oracle/case-alle.entity';

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
