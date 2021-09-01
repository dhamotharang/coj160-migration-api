import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MigrationLogService } from 'src/common/migrate/migration-log/migration-log.service';
import { ParamService } from 'src/common/setting/param/param.service';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { MySQLBanks } from '../entities/mysql/bank.entity';
import { OracleLookupBanks } from '../entities/oracle/lookup-bank.entity';

@Injectable()
export class LookupBankService extends HelperService {
  constructor(
    @InjectRepository(OracleLookupBanks)
    private readonly oracleLookupReceiptTypeRepositories: Repository<OracleLookupBanks>,
    @InjectRepository(MySQLBanks, "mysql")
    private readonly mysqlBankRepositories: Repository<MySQLBanks>,
    private readonly migrateLogService: MigrationLogService,
    private readonly paramService: ParamService
  ) {
    super();
  }

  // Filter
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId !== 0) {
        await conditions.where("A.bankId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.removedBy = 0");
      }

      if (filters) {
        const { text, bankId, orderNo, activeFlag, bankCode, bankName, courtId, noticeTo } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.bankCode LIKE '%${text}%' OR A.bankName LIKE '%${text}%')`)
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof activeFlag !== "undefined") {
          await conditions.andWhere("A.activeFlag = :activeFlag", { activeFlag });
        }

        if (typeof bankId !== "undefined") {
          await conditions.andWhere("A.bankId = :bankId", { bankId });
        }

        if (typeof bankCode !== "undefined") {
          await conditions.andWhere("A.bankCode = :bankCode", { bankCode });
        }

        if (typeof bankName !== "undefined") {
          await conditions.andWhere("A.bankName = :bankName", { bankName });
        }

        if (typeof courtId !== "undefined") {
          await conditions.andWhere("A.courtId = :courtId", { courtId });
        }

        if (typeof noticeTo !== "undefined") {
          await conditions.andWhere("A.noticeTo = :noticeTo", { noticeTo });
        }
      }

      return await conditions;
    } catch (error) {
      throw new HttpException(`[oracle: filter failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async mysqlFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId !== 0) {
        await conditions.where("A.bankId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.bankId <> 0");
      }

      if (filters) {
        const { text, courtRunning, receiptTypeDesc, costFlag } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.receiptTypeDesc LIKE '%${text}%' OR A.receiptTypeName LIKE '%${text}%')`)
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof receiptTypeDesc !== "undefined") {
          await conditions.andWhere("A.receiptTypeDesc = :receiptTypeDesc", { receiptTypeDesc });
        }

        if (typeof costFlag !== "undefined") {
          await conditions.andWhere("A.costFlag = :costFlag", { costFlag });
        }
      }

      return await conditions;
    } catch (error) {
      throw new HttpException(`[mysql: filter failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }




  // GET Method
  async findORACLEData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const conditions = await this.oracleLookupReceiptTypeRepositories.createQueryBuilder("A");

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
          .orderBy("A.bankId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find lookup receipt type failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.oracleLookupReceiptTypeRepositories.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters, moduleId);

      const getItems = await conditions.getOne();
      const items = await getItems ? getItems.toResponseObject() : null;

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[oracle: find one lookup receipt type failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const conditions = await this.mysqlBankRepositories.createQueryBuilder("A");

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
        await conditions.orderBy("A.bankId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[mysql: find lookup receipt type failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.mysqlBankRepositories.createQueryBuilder("A");

      await this.mysqlFilter(conditions, filters, moduleId);

      const getItems = await conditions.getOne();
      const items = await getItems.toResponseObject();

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[mysql: find one lookup receipt type failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

}
