import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointListController } from './appoint-list/appoint-list.controller';
import { AppointListService } from './appoint-list/appoint-list.service';
import { OracleLookupAppointLists } from './entities/oracle/lookup-appoint-list.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OracleLookupAppointLists]),
  ],
  controllers: [AppointListController],
  providers: [AppointListService],
  exports: [AppointListService],
})
export class AppointModule { }
