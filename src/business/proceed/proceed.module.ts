import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLAppointDelays } from './entities/mysql/pappoint-delay.entity';
import { OracleProceedHoldReasons } from './entities/oracle/proceed-hold-reason.entity';
import { HoldReasonController } from './hold-reason/hold-reason.controller';
import { HoldReasonService } from './hold-reason/hold-reason.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OracleProceedHoldReasons]),
    TypeOrmModule.forFeature([MySQLAppointDelays], "mysql")
  ],
  controllers: [HoldReasonController],
  providers: [HoldReasonService],
  exports: [HoldReasonService]
})
export class ProceedModule { }
