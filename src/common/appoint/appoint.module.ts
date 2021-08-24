import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointListController } from './appoint-list/appoint-list.controller';
import { AppointListService } from './appoint-list/appoint-list.service';
import { OracleLookupAppointLists } from './entities/oracle/lookup-appoint-list.entity';
import { AppointTableController } from './appoint-table/appoint-table.controller';
import { AppointTableService } from './appoint-table/appoint-table.service';
import { OracleLookupAppointTables } from './entities/oracle/lookup-appoint-table.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OracleLookupAppointLists,
      OracleLookupAppointTables
    ]),
  ],
  controllers: [AppointListController, AppointTableController],
  providers: [AppointListService, AppointTableService],
  exports: [AppointListService],
})
export class AppointModule { }
