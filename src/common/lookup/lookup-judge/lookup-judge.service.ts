import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OracleProceedAppointCaseJudgeDTO } from 'src/business/proceed/dto/proceed-appoint-case-judge.dto';
import { MySQLJudges } from 'src/common/lookup/entities/mysql/judge.entity';
import { OracleLookupJudges } from 'src/common/lookup/entities/oracle/lookup-judge.entity';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';

@Injectable()
export class LookupJudgeService extends HelperService {
  constructor(
    @InjectRepository(OracleLookupJudges)
    private oracleLookupJudgeRepositories: Repository<OracleLookupJudges>,
    @InjectRepository(MySQLJudges, "mysql")
    private mysqlJudgeRepositories: Repository<MySQLJudges>
  ) {
    super();
  }


  // Filter zone
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.where("A.judgeId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.removedBy = 0");
      }

      if (filters) {
        const { text, orderNo, activeFlag, activeFromDate, activeToDate, courtId } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.address LIKE '%${text}%'`)
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof activeFlag !== "undefined") {
          await conditions.andWhere("A.activeFlag = :activeFlag", { activeFlag });
        }

        if (typeof activeFromDate !== "undefined") {
          await conditions.andWhere("TO_CHAR(A.activeFromDate, 'YYYY-MM-DD') = :activeFromDate", { activeFromDate });
        }

        if (typeof activeToDate !== "undefined") {
          await conditions.andWhere("TO_CHAR(A.activeToDate, 'YYYY-MM-DD') = :activeToDate", { activeToDate });
        }

        if (typeof courtId !== "undefined") {
          await conditions.andWhere("A.courtId = :courtId", { courtId });
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
        await conditions.where("A.judgeId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.judgeId <> 0");
      }

      if (filters) {
        const { text, courtRunning, judgeName, shortJudgeName, postId, position, position2 } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.judgeName LIKE '%${text}%' OR A.shortJudgeName LIKE '%${text}%')`)
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof judgeName !== "undefined") {
          await conditions.andWhere("A.judgeName = :judgeName", { judgeName });
        }

        if (typeof shortJudgeName !== "undefined") {
          await conditions.andWhere("A.shortJudgeName = :shortJudgeName", { shortJudgeName });
        }

        if (typeof postId !== "undefined") {
          await conditions.andWhere("A.postId = :postId", { postId });
        }

        if (typeof position !== "undefined") {
          await conditions.andWhere("A.position = :position", { position });
        }

        if (typeof position2 !== "undefined") {
          await conditions.andWhere("A.position2 = :position2", { position2 });
        }
      }

      return conditions;
    } catch (error) {
      throw new HttpException(`[mysql: filter] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


  // GET Method
  async findORACLEData(filters: any = null, pages: any = null) {
    try {
      const conditions = await this.oracleLookupJudgeRepositories.createQueryBuilder("A");

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
          .orderBy("A.judgeId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find lookup judge failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.oracleLookupJudgeRepositories.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters, moduleId);

      const total = 1;

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find one lookup judge failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLData(filters: any = null, pages: any = null) {
    try {
      const conditions = await this.mysqlJudgeRepositories.createQueryBuilder("A");

      await this.mysqlFilter(conditions, filters);

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
          .orderBy("A.judgeId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[mysql: find judge failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.mysqlJudgeRepositories.createQueryBuilder("A");

      await this.mysqlFilter(conditions, filters, moduleId);

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[mysql: find one judge failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  async createData(payloadId: number, data: OracleProceedAppointCaseJudgeDTO) {
    try {
      const createdDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const created = await this.oracleLookupJudgeRepositories.create({
        ...data,
        createdBy: payloadId,
        updatedBy: payloadId,
        removedBy: 0,
        createdDate,
        updatedDate: createdDate
      });
      await this.oracleLookupJudgeRepositories.save(created);

      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: create lookup judge failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
