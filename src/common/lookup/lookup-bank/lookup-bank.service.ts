import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MigrationLogService } from 'src/common/migrate/migration-log/migration-log.service';
import { ParamService } from 'src/common/setting/param/param.service';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleLookupBankDTO } from '../dto/lookup-bank.dto';
import { MySQLBanks } from '../entities/mysql/bank.entity';
import { OracleLookupBanks } from '../entities/oracle/lookup-bank.entity';

@Injectable()
export class LookupBankService extends HelperService {
  constructor(
    @InjectRepository(OracleLookupBanks)
    private readonly oracleLookupBankRepositories: Repository<OracleLookupBanks>,
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
        const { text, courtRunning, bankName, bankLogotype, stdId } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.bankName LIKE '%${text}%'`)
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof bankName !== "undefined") {
          await conditions.andWhere("A.bankName = :bankName", { bankName });
        }

        if (typeof bankLogotype !== "undefined") {
          await conditions.andWhere("A.bankLogotype = :bankLogotype", { bankLogotype });
        }

        if (typeof stdId !== "undefined") {
          await conditions.andWhere("A.stdId = :stdId", { stdId });
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
      const conditions = await this.oracleLookupBankRepositories.createQueryBuilder("A");

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
      const conditions = await this.oracleLookupBankRepositories.createQueryBuilder("A");

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



  // POST Method
  async createData(payloadId: number, data: OracleLookupBankDTO) {
    try {
      const createdDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const created = await this.oracleLookupBankRepositories.create({ ...data, activeFlag: 1, createdBy: payloadId, updatedBy: payloadId, removedBy: 0, createdDate, updatedDate: createdDate });
      await this.oracleLookupBankRepositories.save(created);
      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: create bank failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async createMigrationData(payloadId: number, filters: any = null) {
    try {
      let migrateLogs = [];
      let dupTotal = 0;
      let newTotal = 0;
      let errorTotal = 0;

      const source = await this.findMYSQLData();
      const params = await (await this.paramService.findORACLEOneData({ paramName: "COURT_ID" })).items; // ค้นหารหัสของศาล
      const total = await source.total;

      if (await total > 0) {
        for (let index = 0; index < source.items.length; index++) {
          const { bankId, bankName } = source.items[index];

          const migresLogs = await (await this.migrateLogService.findPOSTGRESData({
            serverType: `${process.env.SERVER_TYPE}`,
            status: "SUCCESS",
            sourceDBType: "MYSQL",
            sourceTableName: "pbank",
            sourceId: bankId,
          })).items; // ตรวจสอบ Log การ Migrate ข้อมูล

          if (migresLogs.length > 0) {
            dupTotal = dupTotal + 1;

            await migrateLogs.push(await this.migrateLogService.createPOSTGRESData({
              name: "ธนาคาร",
              serverType: `${process.env.SERVER_TYPE}`,
              status: "DUPLICATE",
              datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
              sourceDBType: "MYSQL",
              sourceTableName: "pbank",
              sourceId: bankId,
              sourceData: JSON.stringify(source.items[index]),
            })); // เพิ่ม Log การ Migrate ข้อมูล

            const created = await this.updateData(bankId, payloadId, {
              bankName,
              courtId: parseInt(params.paramValue),
            });
          } else {
            const _bankName = (`${bankName}`.replace('ธนาคาร', '')).replace('จำกัด', '');
            const destination = await (await this.findORACLEOneData({ text: `${_bankName}`.trim() })).items;

            if (!destination) {
              const createData = {
                bankName,
                courtId: parseInt(params.paramValue),
              };

              const created = await this.createData(payloadId, createData);

              const logData = {
                name: "ธนาคาร",
                serverType: `${process.env.SERVER_TYPE}`,
                status: (created ? "SUCCESS" : "ERROR"),
                datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                sourceDBType: "MYSQL",
                sourceTableName: "pbank",
                sourceId: bankId,
                sourceData: JSON.stringify({ bankId, bankName }),
                destinationDBType: "ORACLE",
                destinationTableName: "PC_LOOKUP_BANK",
                destinationId: created.bankId,
                destinationData: JSON.stringify(created)
              };

              migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logData));

              if (created) {
                newTotal = newTotal + 1;
              } else {
                errorTotal = errorTotal + 1;
              }
            }
          }
        }

      }

      return { migrateLogs, total, dupTotal, newTotal, errorTotal };
    } catch (error) {
      throw new HttpException(`[oracle: Migrate data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // PUT Method
  async updateData(moduleId: number, payloadId: number, data: OracleLookupBankDTO) {
    try {
      const updatedDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      await this.oracleLookupBankRepositories.update({ bankId: moduleId }, { ...data, activeFlag: 1, createdBy: payloadId, updatedBy: payloadId, updatedDate });
      const updated = await this.oracleLookupBankRepositories.findOne({ bankId: moduleId });
      return await updated.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: update bank failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
