import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleProceedAppointResultDTO } from '../dto/proceed-appoint-result.dto';
import { OracleProceedAppointResults } from '../entities/oracle/proceed-appoint-result.entity';

@Injectable()
export class AppointResultService extends HelperService {
  constructor(
    @InjectRepository(OracleProceedAppointResults)
    private oracleProceedAppointResultRepositories: Repository<OracleProceedAppointResults>,
  ) {
    super();
  }

  // Filter zone
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.where("A.appointResultId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.appointResultId <> 0");
      }

      if (filters) {
        const { text, orderNo, offenseDetail, appointById, appointDate, appointDelayId, appointId } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.offenseDetail LIKE '%${text}%'`)
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof offenseDetail !== "undefined") {
          await conditions.andWhere("A.offenseDetail = :offenseDetail", { offenseDetail });
        }

        if (typeof appointById !== "undefined") {
          await conditions.andWhere("A.appointById = :appointById", { appointById });
        }

        if (typeof appointDate !== "undefined") {
          await conditions.andWhere("TO_CHAR(A.appointDate, 'YYYY-MM-DD') = :appointDate", { appointDate });
        }

        if (typeof appointDelayId !== "undefined") {
          await conditions.andWhere("A.appointDelayId = :appointDelayId", { appointDelayId });
        }

        if (typeof document !== "undefined") {
          await conditions.andWhere("A.document = :document", { document });
        }

        if (typeof appointId !== "undefined") {
          await conditions.andWhere("A.appointId = :appointId", { appointId });
        }
      }

      return conditions;
    } catch (error) {
      throw new HttpException(`[oracle: filter] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


  // GET Method
  async findORACLEData(filters: any = null, pages: any = null) {
    try {
      const conditions = await this.oracleProceedAppointResultRepositories.createQueryBuilder("A")
        .leftJoinAndSelect("A.proceedAppoints", "B");
      Logger.log(filters, "filters");
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
          .orderBy("A.appointResultId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: proceed appoint result failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.oracleProceedAppointResultRepositories.createQueryBuilder("A")
        .leftJoinAndSelect("A.proceedAppoints", "B");

      await this.oracleFilter(conditions, filters, moduleId);

      const total = 1;

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find one proceed appoint result failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  async createData(payloadId: number, data: OracleProceedAppointResultDTO) {
    try {
      const createdDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const created = await this.oracleProceedAppointResultRepositories.create({
        ...data,
        createdBy: payloadId,
        updatedBy: payloadId,
        removedBy: 0,
        createdDate,
        updatedDate: createdDate
      });
      await this.oracleProceedAppointResultRepositories.save(created);

      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: create proceed appoint failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
