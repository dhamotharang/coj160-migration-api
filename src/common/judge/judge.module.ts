import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLJudges } from './entities/mysql/judge.entity';
import { OracleLookupJudges } from './entities/oracle/lookup-judge.entity';
import { LookupJudgeController } from './lookup-judge/lookup-judge.controller';
import { LookupJudgeService } from './lookup-judge/lookup-judge.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OracleLookupJudges
    ]),
    TypeOrmModule.forFeature([
      MySQLJudges
    ], "mysql")
  ],
  controllers: [LookupJudgeController],
  providers: [LookupJudgeService],
  exports: [LookupJudgeService],
})
export class JudgeModule { }
