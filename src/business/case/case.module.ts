import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseController } from './case.controller';
import { CaseService } from './case.service';
import { MySQLCases } from './entities/mysql/case.entity';
import { OracleCases } from './entities/oracle/case.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OracleCases]),
    TypeOrmModule.forFeature([MySQLCases], "mysql"),
  ],
  controllers: [CaseController],
  providers: [CaseService],
  exports: [CaseService]
})
export class CaseModule { }
