import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OracleLitigantDTO } from 'src/business/litigant/dto/litigant.dto';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { MySQLCases } from '../entities/mysql/case.entity';
import { OracleCases } from '../entities/oracle/case.entity';

@Injectable()
export class CaseService extends HelperService {
  constructor(
    @InjectRepository(OracleCases) private readonly oracleCaseRepositories: Repository<OracleCases>,
    @InjectRepository(MySQLCases, "mysql") private readonly mysqlCaseRepositories: Repository<MySQLCases>,
  ) {
    super();
  }
  // Filter
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.where("A.caseId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.removedBy = 0");
      }

      if (filters) {
        const { text, orderNo, accuDesc, alleDesc, barcode, caseCateId, courtId, prosDesc, convertStringCase } = filters;

        if (typeof text !== "undefined" && text !== "") {
          await conditions.andWhere(`(A.accuDesc LIKE '%${text}%' OR A.alleDesc LIKE '%${text}%' OR A.prosDesc LIKE '%${text}%' OR A.barcode LIKE '%${text}%')`);
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof accuDesc !== "undefined") {
          await conditions.andWhere("A.accuDesc = :accuDesc", { accuDesc });
        }

        if (typeof alleDesc !== "undefined") {
          await conditions.andWhere("A.alleDesc = :alleDesc", { alleDesc });
        }

        if (typeof barcode !== "undefined") {
          await conditions.andWhere("A.barcode = :barcode", { barcode });
        }

        if (typeof caseCateId !== "undefined") {
          await conditions.andWhere("A.caseCateId = :caseCateId", { caseCateId });
        }

        if (typeof courtId !== "undefined") {
          await conditions.andWhere("A.courtId = :courtId", { courtId });
        }

        if (typeof prosDesc !== "undefined") {
          await conditions.andWhere("A.prosDesc = :prosDesc", { prosDesc });
        }

        if (typeof convertStringCase !== "undefined") {
          await conditions.andWhere("A.convertStringCase = :convertStringCase", { convertStringCase });
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
        await conditions.where("A.runId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.runId <> 0");
      }

      if (filters) {
        const { text, courtRunning, title, id, yy, caseDate, caseType, caseCateId, caseStatus, caseCourtType, indexId, conCourtLevel, conStatus } = filters;

        if (typeof text !== "undefined" && text !== "") {
          await conditions.andWhere(`(A.title LIKE '%${text}%' OR A.alleDesc LIKE '%${text}%' OR A.prosDesc LIKE '%${text}%' OR A.barcode LIKE '%${text}%')`);
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof title !== "undefined") {
          await conditions.andWhere("A.title = :title", { title });
        }

        if (typeof id !== "undefined") {
          await conditions.andWhere("A.id = :id", { id });
        }

        if (typeof yy !== "undefined") {
          await conditions.andWhere("A.yy = :yy", { yy });
        }

        if (typeof caseCateId !== "undefined") {
          await conditions.andWhere("A.caseCateId = :caseCateId", { caseCateId });
        }

        if (typeof caseDate !== "undefined") {
          await conditions.andWhere("A.caseDate = :caseDate", { caseDate });
        }

        if (typeof caseType !== "undefined") {
          await conditions.andWhere("A.caseType = :caseType", { caseType });
        }

        if (typeof caseStatus !== "undefined") {
          await conditions.andWhere("A.caseStatus = :caseStatus", { caseStatus });
        }

        if (typeof caseCourtType !== "undefined") {
          await conditions.andWhere("A.caseCourtType = :caseCourtType", { caseCourtType });
        }

        if (typeof indexId !== "undefined") {
          await conditions.andWhere("A.indexId = :indexId", { indexId });
        }

        if (typeof conCourtLevel !== "undefined") {
          await conditions.andWhere("A.conCourtLevel = :conCourtLevel", { conCourtLevel });
        }

        if (typeof conStatus !== "undefined") {
          await conditions.andWhere("A.conStatus = :conStatus", { conStatus });
        }
      }

      return conditions;
    } catch (error) {
      throw new HttpException(`[oracle: filter] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // GET Method
  async findORACLEData(filters: any = null, pages: any = null, orders: any = null) {
    try {

      const conditions = await this.oracleCaseRepositories.createQueryBuilder("A")

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
          .orderBy("A.caseId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[find oracle data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(filters: any = null, moduleId: number = 0) {
    try {
      const { text, orderNo, accuDesc, alleDesc, barcode, caseCateId, courtId, prosDesc, convertStringCase } = filters;
      const conditions = await this.oracleCaseRepositories.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters, moduleId);

      const total = 1;

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find case one data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const conditions = await this.mysqlCaseRepositories.createQueryBuilder("A");

      await this.mysqlFilter(conditions, filters);

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
        }
      } else {
        await conditions.orderBy("A.runId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[mysql: find case failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


  async findMYSQLOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.mysqlCaseRepositories.createQueryBuilder("A");

      await this.mysqlFilter(conditions, filters, moduleId);

      const total = await conditions.getCount();

      const getItems = await conditions.getOne();
      const items = await getItems.toResponseObject();

      return { items, total };
    } catch (error) {
      throw new HttpException(`[mysql: find one case failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  /* async findTitleCase(runId: number) {
    try {
      const conditions = await this.oracleCaseRepositories.query(`
      SELECT
        title, id, yy
      FROM pcase
      WHERE runId = ${runId}
      `);
    } catch (error) {
      
    }
  } */



  // POST Method
  async createData(payloadId: number, data: OracleLitigantDTO) {
    try {
      const createdDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const created = await this.oracleCaseRepositories.create({ ...data, createdBy: payloadId, createdDate, updatedDate: createdDate });
      await this.oracleCaseRepositories.save(created);
      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[create data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
