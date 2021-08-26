import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleProceedAppointCaseJudgeDTO } from '../dto/proceed-appoint-case-judge.dto';
import { OracleProceedAppointCaseJudges } from '../entities/oracle/proceed-appoint-case-judge.entity';

@Injectable()
export class AppointCaseJudgeService extends HelperService {
  constructor(
    @InjectRepository(OracleProceedAppointCaseJudges)
    private oracleProceedAppointContinueRepositories: Repository<OracleProceedAppointCaseJudges>,
  ) {
    super();
  }

  // Filter zone
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.where("A.appointCaseJudgeId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.appointCaseJudgeId <> 0");
      }

      if (filters) {
        const { text, appointCaseJudgeId, orderNo, appointId, courtId, judgeEndDate, judgeId, judgeStartDate, judgeTypeId, running } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.tableName LIKE '%${text}%'`)
        }

        if (typeof appointCaseJudgeId !== "undefined") {
          await conditions.andWhere("A.appointCaseJudgeId = :appointCaseJudgeId", { appointCaseJudgeId });
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof appointId !== "undefined") {
          await conditions.andWhere("A.appointId = :appointId", { appointId });
        }

        if (typeof courtId !== "undefined") {
          await conditions.andWhere("A.courtId = :courtId", { courtId });
        }

        if (typeof judgeEndDate !== "undefined") {
          await conditions.andWhere("TO_CHAR(A.judgeEndDate, 'YYYY-MM-DD') = :judgeEndDate", { judgeEndDate });
        }

        if (typeof judgeId !== "undefined") {
          await conditions.andWhere("A.judgeId = :judgeId", { judgeId });
        }

        if (typeof judgeStartDate !== "undefined") {
          await conditions.andWhere("TO_CHAR(A.judgeStartDate, 'YYYY-MM-DD') = :judgeStartDate", { judgeStartDate });
        }

        if (typeof judgeTypeId !== "undefined") {
          await conditions.andWhere("A.judgeTypeId = :judgeTypeId", { judgeTypeId });
        }

        if (typeof running !== "undefined") {
          await conditions.andWhere("A.running = :running", { running });
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
          .orderBy("A.appointCaseJudgeId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find appoint table failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(filters: any = null, holdReasonId: number = 0) {
    try {
      const conditions = await this.oracleProceedAppointContinueRepositories.createQueryBuilder("A")
        .leftJoinAndSelect("A.proceedAppoints", "B");

      await this.oracleFilter(conditions, filters, holdReasonId);

      const total = 1;

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find appoint table one failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  async createData(payloadId: number, data: OracleProceedAppointCaseJudgeDTO) {
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
