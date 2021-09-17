import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { MySQLAppointments } from '../entities/mysql/appointment.entity';

@Injectable()
export class AppointmentService extends HelperService {
  constructor(
    @InjectRepository(MySQLAppointments, "mysql")
    private mysqlAppointmentRepositories: Repository<MySQLAppointments>,
  ) {
    super();
  }


  // Filter
  async mysqlFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.where("A.appRunning = :moduleId", { moduleId });
      } else {
        await conditions.where("A.appRunning <> 0");
      }

      if (filters) {
        const { text, courtRunning, runId, appSeq, timeStart, timeEnd } = filters;
        if (typeof text !== "undefined" && text !== "") {
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

        if (typeof timeStart !== "undefined" && typeof timeEnd === "undefined") {
          const dateNow = this.dateFormat("YYYY-MM-DD");
          const dateStart = `${dateNow} ${timeStart}:00`;
          await conditions.andWhere("CONVERT(CONCAT(:dateNow, ' ', REPLACE(A.timeAppoint, '.', ':'), ':00'), DATETIME) = :dateStart", { dateNow, dateStart });
        }

        if (typeof timeStart !== "undefined" && typeof timeEnd !== "undefined") {
          const dateNow = this.dateFormat("YYYY-MM-DD");
          const dateStart = `${dateNow} ${timeStart}:00`;
          const dateEnd = `${dateNow} ${timeEnd}:00`;

          await conditions.andWhere("CONVERT(CONCAT(:dateNow, ' ', REPLACE(A.timeAppoint, '.', ':'), ':00'), DATETIME) BETWEEN :dateStart AND :dateEnd", { dateNow, dateStart, dateEnd });
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

      if (filters) {
        if (typeof filters.sort !== "undefined") {
          const _sorts = `${filters.sort}`.split('-');
          await conditions.orderBy(`A.${_sorts[0]}`, _sorts[1] === "DESC" ? "DESC" : "ASC");
        } else {
          await conditions
            .orderBy("A.appRunning", "ASC");
        }
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[mysql: find pappointment failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLOneData(filters: any = null, id: number = 0) {
    try {
      const conditions = await this.mysqlAppointmentRepositories.createQueryBuilder("A");

      await this.mysqlFilter(conditions, filters, id);

      if (typeof filters.sort !== "undefined") {
        const _sorts = `${filters.sort}`.split('-');
        await conditions.orderBy(`A.${_sorts[0]}`, _sorts[1] === "DESC" ? "DESC" : "ASC");
      } else {
        await conditions
          .orderBy("A.appRunning", "DESC");
      }

      const getItems = await conditions.getOne();
      const items = await getItems.toResponseObject();

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[mysql: find one pappointment failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
