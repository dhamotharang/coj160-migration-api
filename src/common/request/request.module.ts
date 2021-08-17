import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLRequestTypes } from './entities/mysql/request-type.entity';
import { OracleLookupRequestTypes } from './entities/oracle/lookup-request-type.entity';
import { RequestTypeController } from './request-type/request-type.controller';
import { RequestTypeService } from './request-type/request-type.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OracleLookupRequestTypes]),
    TypeOrmModule.forFeature([MySQLRequestTypes], "mysql")
  ],
  controllers: [RequestTypeController],
  providers: [RequestTypeService]
})
export class RequestModule { }
