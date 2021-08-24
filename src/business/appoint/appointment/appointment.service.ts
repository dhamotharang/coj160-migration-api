import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MySQLAppointments } from '../entities/mysql/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(MySQLAppointments, "mysql")
    private mysqlAppointmentRepositories: Repository<MySQLAppointments>,
  ) { }


  // Filter
  async mysqlFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.where("A.appRunning = :moduleId", { moduleId });
      } else {
        await conditions.where("A.appRunning <> 0");
      }

      if (filters) {
        const { text, courtRunning, runId, appSeq } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.tableName LIKE '%${text}%'`)
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof runId !== "undefined") {
          await conditions.andWhere("A.runId = :runId", { runId });
        }

        if (typeof appSeq !== "undefined") {
          await conditions.andWhere("A.appSeq = :appSeq", { appSeq });
        }
      }

      return await conditions;
    } catch (error) {
      throw new HttpException(`[mysql: filter failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


  async findMYSQLData(filters: any = null, pages: any = null, id: number = 0) {
    try {
      const conditions = await this.mysqlAppointmentRepositories.createQueryBuilder("A");

      await this.mysqlFilter(conditions, filters, id);

      const total = await conditions.getCount();

      if (pages) {
        await conditions
          .skip(pages.start)
          .take(pages.limit);
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total: items.length };
    } catch (error) {
      throw new HttpException(`[mysql: find pappointment failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLOneData(filters: any = null, id: number = 0) {
    try {
      const conditions = await this.mysqlAppointmentRepositories.createQueryBuilder("A");

      await this.mysqlFilter(conditions, filters, id);

      const getItems = await conditions.getOne();
      const items = await getItems.toResponseObject();

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[mysql: find one pappointment failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
