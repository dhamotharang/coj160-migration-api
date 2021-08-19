import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentController } from './department/department.controller';
import { DepartmentService } from './department/department.service';
import { MySQLDepartments } from './entities/mysql/department.entity';
import { OracleLookupDepartments } from './entities/oracle/lookup-department.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OracleLookupDepartments]),
    TypeOrmModule.forFeature([MySQLDepartments], "mysql")
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService],
  exports: [DepartmentService]
})
export class OrganizationModule { }
