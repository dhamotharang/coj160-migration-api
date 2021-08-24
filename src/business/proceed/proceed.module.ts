import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointModule } from '../appoint/appoint.module';
import { MySQLAppointDelays } from '../appoint/entities/mysql/appoint-delay.entity';
import { MySQLAppointments } from '../appoint/entities/mysql/appointment.entity';
import { OracleProceedAppoints } from './entities/oracle/proceed-appoint.entity';
import { OracleProceedHoldReasons } from './entities/oracle/proceed-hold-reason.entity';
import { HoldReasonController } from './hold-reason/hold-reason.controller';
import { HoldReasonService } from './hold-reason/hold-reason.service';
import { ProceedAppointController } from './proceed-appoint/proceed-appoint.controller';
import { ProceedAppointService } from './proceed-appoint/proceed-appoint.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OracleProceedHoldReasons,
      OracleProceedAppoints
    ]),
    AppointModule
  ],
  controllers: [HoldReasonController, ProceedAppointController],
  providers: [HoldReasonService, ProceedAppointService],
  exports: [HoldReasonService]
})
export class ProceedModule { }
