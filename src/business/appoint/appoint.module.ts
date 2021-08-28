import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentController } from './appointment/appointment.controller';
import { AppointmentService } from './appointment/appointment.service';
import { MySQLAppointments } from './entities/mysql/appointment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MySQLAppointments,
    ], "mysql"),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
  exports: [AppointmentService]
})
export class AppointModule { }
