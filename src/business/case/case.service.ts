import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MigrationLogService } from 'src/common/migrate/migration-log/migration-log.service';
import { ParamService } from 'src/common/setting/param/param.service';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleLitigantDTO } from '../litigant/dto/litigant.dto';
import { MySQLCases } from './entities/mysql/case.entity';
import { OracleCases } from './entities/oracle/case.entity';

@Injectable()
export class CaseService extends HelperService {
  constructor(
    @InjectRepository(OracleCases) private readonly oracleLitigantRepositories: Repository<OracleCases>,
    @InjectRepository(MySQLCases, "mysql") private readonly mysqlLitigantRepositories: Repository<MySQLCases>,
    private readonly migrateLogService: MigrationLogService,
    private readonly paramService: ParamService
  ) {
    super();
  }

  // GET Method
  async findORACLEData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const { text, orderNo, accuDesc, alleDesc, barcode, caseCateId, courtId, prosDesc, convertStringCase } = filters;
      const conditions = await this.oracleLitigantRepositories.createQueryBuilder("A")
        .where("A.removedBy = 0");

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

  async findORACLEOneData(filters: any = null) {
    try {
      const { text, orderNo, accuDesc, alleDesc, barcode, caseCateId, courtId, prosDesc, convertStringCase } = filters;
      const conditions = await this.oracleLitigantRepositories.createQueryBuilder("A")
        .where("A.caseId <> 0");

      if (typeof text !== "undefined") {
        await conditions.andWhere(`(A.accuDesc LIKE '%${text}%' OR A.alleDesc LIKE '%${text}%' OR A.prosDesc LIKE '%${text}%')`)
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
      const conditions = await this.mysqlLitigantRepositories.createQueryBuilder("A")
        .where("A.subjectId <> 0");

      if (filters) {
        const { text, courtRunning, subjectName, udFlag, dateFlag, createDepCode } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.subjectName LIKE '%${text}%'`)
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof subjectName !== "undefined") {
          await conditions.andWhere("A.subjectName = :subjectName", { subjectName });
        }

        if (typeof udFlag !== "undefined") {
          await conditions.andWhere("A.udFlag = :udFlag", { udFlag });
        }

        if (typeof dateFlag !== "undefined") {
          await conditions.andWhere("A.dateFlag = :dateFlag", { dateFlag });
        }

        if (typeof createDepCode !== "undefined") {
          await conditions.andWhere("A.createDepCode = :createDepCode", { createDepCode });
        }
      }

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
        await conditions.orderBy("A.subjectId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[find mysql data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  async createData(payloadId: number, data: OracleLitigantDTO) {
    try {
      const createdDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const created = await this.oracleLitigantRepositories.create({ ...data, createdBy: payloadId, createdDate, updatedDate: createdDate });
      await this.oracleLitigantRepositories.save(created);
      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[create data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
