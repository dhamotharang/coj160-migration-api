import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentController } from './appointment/appointment.controller';
import { AppointmentService } from './appointment/appointment.service';
import { MySQLAppointments } from './entities/mysql/appointment.entity';
import { AppointDelayService } from './appoint-delay/appoint-delay.service';
import { AppointDelayController } from './appoint-delay/appoint-delay.controller';
import { MySQLAppointDelays } from './entities/mysql/appoint-delay.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MySQLAppointments,
      MySQLAppointDelays
    ], "mysql"),
  ],
  controllers: [AppointmentController, AppointDelayController],
  providers: [AppointmentService, AppointDelayService],
  exports: [AppointmentService, AppointDelayService]
})
export class AppointModule { }
