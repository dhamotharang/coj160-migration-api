import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointListController } from './appoint-list/appoint-list.controller';
import { AppointListService } from './appoint-list/appoint-list.service';
import { OracleLookupAppointLists } from './entities/oracle/lookup-appoint-list.entity';
import { AppointTableController } from './appoint-table/appoint-table.controller';
import { AppointTableService } from './appoint-table/appoint-table.service';
import { OracleLookupAppointTables } from './entities/oracle/lookup-appoint-table.entity';
import { MySQLAppointTables } from './entities/mysql/appoint-table.entity';
import { AppointDelayService } from './appoint-delay/appoint-delay.service';
import { AppointDelayController } from './appoint-delay/appoint-delay.controller';
import { OracleLookupAppointDelays } from './entities/oracle/lookup-appoint-delay.entity';
import { MySQLAppointDelays } from './entities/mysql/appoint-delay.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      OracleLookupAppointLists,
      OracleLookupAppointTables,
      OracleLookupAppointDelays
    ]),
    TypeOrmModule.forFeature([
      MySQLAppointTables,
      MySQLAppointDelays
    ], "mysql"),
  ],
  controllers: [AppointListController, AppointTableController, AppointDelayController],
  providers: [AppointListService, AppointTableService, AppointDelayService],
  exports: [AppointListService, AppointTableService, AppointDelayService],
})
export class AppointModule { }
