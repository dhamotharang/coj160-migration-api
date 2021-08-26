import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleProceedAppointContinueDTO } from '../dto/proceed-appoint-continue.dto';
import { OracleProceedAppointContinues } from '../entities/oracle/proceed-appoint-continue.entity';

@Injectable()
export class AppointContinueService extends HelperService {
  constructor(
    @InjectRepository(OracleProceedAppointContinues)
    private oracleProceedAppointContinueRepositories: Repository<OracleProceedAppointContinues>,
  ) {
    super();
  }

  // Filter zone
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.where("A.appointConId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.appointConId <> 0");
      }

      if (filters) {
        const { text, orderNo, appointTableId, appointId, choice, choiceTime, document, reasonAppointId, roomId } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.tableName LIKE '%${text}%'`)
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof appointTableId !== "undefined") {
          await conditions.andWhere("A.appointTableId = :appointTableId", { appointTableId });
        }

        if (typeof appointId !== "undefined") {
          await conditions.andWhere("A.appointId = :appointId", { appointId });
        }

        if (typeof choice !== "undefined") {
          await conditions.andWhere("A.choice = :choice", { choice });
        }

        if (typeof choiceTime !== "undefined") {
          await conditions.andWhere("A.choiceTime = :choiceTime", { choiceTime });
        }

        if (typeof document !== "undefined") {
          await conditions.andWhere("A.document = :document", { document });
        }

        if (typeof reasonAppointId !== "undefined") {
          await conditions.andWhere("A.reasonAppointId = :reasonAppointId", { reasonAppointId });
        }

        if (typeof roomId !== "undefined") {
          await conditions.andWhere("A.roomId = :roomId", { roomId });
        }
      }

      return conditions;
    } catch (error) {
      throw new HttpException(`[oracle: filter] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async mysqlFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.where("A.appointConId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.appointConId <> 0");
      }

      if (filters) {
        const { text, orderNo, appointTableId, appointId, choice, choiceTime, document, reasonAppointId, roomId } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.tableName LIKE '%${text}%'`)
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof appointTableId !== "undefined") {
          await conditions.andWhere("A.appointTableId = :appointTableId", { appointTableId });
        }

        if (typeof appointId !== "undefined") {
          await conditions.andWhere("A.appointId = :appointId", { appointId });
        }

        if (typeof choice !== "undefined") {
          await conditions.andWhere("A.choice = :choice", { choice });
        }

        if (typeof choiceTime !== "undefined") {
          await conditions.andWhere("A.choiceTime = :choiceTime", { choiceTime });
        }

        if (typeof document !== "undefined") {
          await conditions.andWhere("A.document = :document", { document });
        }

        if (typeof reasonAppointId !== "undefined") {
          await conditions.andWhere("A.reasonAppointId = :reasonAppointId", { reasonAppointId });
        }

        if (typeof roomId !== "undefined") {
          await conditions.andWhere("A.roomId = :roomId", { roomId });
        }
      }

      return await conditions;
    } catch (error) {
      throw new HttpException(`[mysql: filter failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


  // GET Method
  async findORACLEData(filters: any = null, pages: any = null) {
    try {
      const conditions = await this.oracleProceedAppointContinueRepositories.createQueryBuilder("A")
        .leftJoinAndSelect("A.proceedAppoints", "B");

      await this.oracleFilter(conditions, filters);

      const total = await conditions.getCount();

      if (pages) {
        await conditions
          .skip(pages.start)
          .take(pages.limit);
      }

      if (typeof filters.sort !== "undefined") {
        const _sorts = `${filters.sort}`.split('-');
        await conditions.orderBy(`A.${_sorts[0]}`, _sorts[1] === "DESC" ? "DESC" : "ASC");
      } else {
        await conditions
          .orderBy("A.appointConId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find appoint table failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.oracleProceedAppointContinueRepositories.createQueryBuilder("A")
        .leftJoinAndSelect("A.proceedAppoints", "B");

      await this.oracleFilter(conditions, filters, moduleId);

      const total = 1;

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find appoint table one failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


  // POST Method
  async createData(payloadId: number, data: OracleProceedAppointContinueDTO) {
    try {
      const createdDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const created = await this.oracleProceedAppointContinueRepositories.create({
        ...data,
        createdBy: payloadId,
        updatedBy: payloadId,
        removedBy: 0,
        createdDate,
        updatedDate: createdDate
      });
      await this.oracleProceedAppointContinueRepositories.save(created);

      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: create proceed appoint failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
