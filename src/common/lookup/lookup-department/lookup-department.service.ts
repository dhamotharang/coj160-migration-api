import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MigrationLogService } from 'src/common/migrate/migration-log/migration-log.service';
import { ParamService } from 'src/common/setting/param/param.service';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleLookupDepartmentDTO } from '../dto/lookup-department.dto';
import { MySQLDepartments } from '../entities/mysql/department.entity';
import { OracleLookupDepartments } from '../entities/oracle/lookup-department.entity';
import { LookupBankService } from '../lookup-bank/lookup-bank.service';

@Injectable()
export class LookupDepartmentService extends HelperService {
  constructor(
    @InjectRepository(OracleLookupDepartments)
    private oracleLookupDepartmentRepositories: Repository<OracleLookupDepartments>,
    @InjectRepository(MySQLDepartments, "mysql")
    private mysqlDepartmentRepositories: Repository<MySQLDepartments>,
    private lookupBankService: LookupBankService,
    private paramService: ParamService,
    private migrateLogService: MigrationLogService
  ) {
    super();
  }

  // Filter
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      await conditions.where("A.removedBy = 0");

      if (moduleId > 0) {
        await conditions.andWhere("A.departmentId = :moduleId", { moduleId });
      }

      if (filters) {
        const { text, departmentName, orderNo, activeFlag, address, bankId } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.departmentName LIKE '%${text}%' OR A.address LIKE '%${text}%')`)
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof activeFlag !== "undefined") {
          await conditions.andWhere("A.activeFlag = :activeFlag", { activeFlag });
        }

        if (typeof departmentName !== "undefined") {
          await conditions.andWhere("A.departmentName = :departmentName", { departmentName });
        }

        if (typeof bankId !== "undefined") {
          await conditions.andWhere("A.bankId = :bankId", { bankId });
        }
      }
    } catch (error) {
      throw new HttpException(`[oracle: filter] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  async findORACLEData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const conditions = await this.oracleLookupDepartmentRepositories.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters);

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
        await conditions.orderBy("A.departmentId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[find mysql data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(departmentId: number = 0, filters: any = null) {
    try {
      const conditions = await this.oracleLookupDepartmentRepositories.createQueryBuilder("A");
      await this.oracleFilter(conditions, filters, departmentId);
      const getItems = await conditions.getOne();
      const items = await getItems ? getItems.toResponseObject() : null;

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[oracle: find department one data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const conditions = await this.mysqlDepartmentRepositories.createQueryBuilder("A")
        .where("A.depCode <> 0");

      if (filters) {
        const { text, depCode, courtRunning, depName, viewAdmin, layOut } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.depName LIKE '%${text}%'`)
        }

        if (typeof depCode !== "undefined") {
          await conditions.andWhere("A.depCode = :depCode", { depCode });
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof depName !== "undefined") {
          await conditions.andWhere("A.depName = :depName", { depName });
        }

        if (typeof viewAdmin !== "undefined") {
          await conditions.andWhere("A.viewAdmin = :viewAdmin", { viewAdmin });
        }

        if (typeof layOut !== "undefined") {
          await conditions.andWhere("A.layOut = :layOut", { layOut });
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
        await conditions.orderBy("A.depCode", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[find department mysql failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLOneData(depCode: number = null, filters: any = null) {
    try {
      const conditions = await this.mysqlDepartmentRepositories.createQueryBuilder("A")
        .where("A.depCode <> 0");

      if (depCode) {
        await conditions.andWhere("A.depCode = :depCode", { depCode });
      }

      if (filters) {
        const { text, courtRunning, depName, viewAdmin, layOut } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.depName LIKE '%${text}%'`)
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof depName !== "undefined") {
          await conditions.andWhere("A.depName = :depName", { depName });
        }

        if (typeof viewAdmin !== "undefined") {
          await conditions.andWhere("A.viewAdmin = :viewAdmin", { viewAdmin });
        }

        if (typeof layOut !== "undefined") {
          await conditions.andWhere("A.layOut = :layOut", { layOut });
        }
      }

      const getItems = await conditions.getOne();
      const items = await getItems ? getItems.toResponseObject() : null;

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[mysql: find department one data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  // POST Method
  async createData(payloadId: number, data: OracleLookupDepartmentDTO) {
    try {
      const createdDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const created = await this.oracleLookupDepartmentRepositories.create({ ...data, activeFlag: 1, createdBy: payloadId, updatedBy: payloadId, removedBy: 0, createdDate, updatedDate: createdDate });
      await this.oracleLookupDepartmentRepositories.save(created);
      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: create department failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
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
          const { depCode, bankId, bookAccount, depName, depTelNo } = source.items[index];

          const migresLogs = await (await this.migrateLogService.findPOSTGRESData({
            serverType: `${process.env.SERVER_TYPE}`,
            status: "SUCCESS",
            sourceDBType: "MYSQL",
            sourceTableName: "pdepartment",
            sourceId: depCode,
          })).items; // ตรวจสอบ Log การ Migrate ข้อมูล

          if (migresLogs.length > 0) {
            dupTotal = dupTotal + 1;

            await migrateLogs.push(await this.migrateLogService.createPOSTGRESData({
              name: "หน่วยงาน",
              serverType: `${process.env.SERVER_TYPE}`,
              status: "DUPLICATE",
              datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
              sourceDBType: "MYSQL",
              sourceTableName: "pdepartment",
              sourceId: depCode,
              sourceData: JSON.stringify(source.items[index]),
            })); // เพิ่ม Log การ Migrate ข้อมูล

          } else {
            const mybanks = await (await this.lookupBankService.findMYSQLOneData(null, bankId)).items;
            const _bankName = (`${mybanks.bankName}`.replace('ธนาคาร', '')).replace('จำกัด', '');
            const banks = await (await this.lookupBankService.findORACLEOneData({ text: `${_bankName}`.trim() })).items;

            const destination = await (await this.findORACLEOneData(null, { departmentName: `${depName}`.trim() })).items;

            if (!destination) {
              const createData = {
                bankId: banks.bankId,
                bookAccount,
                courtId: parseInt(params.paramValue),
                departmentName: `${depName}`.trim(),
                tel: depTelNo,
              };

              const created = await this.createData(payloadId, createData);

              const logData = {
                name: "หน่วยงาน",
                serverType: `${process.env.SERVER_TYPE}`,
                status: (created ? "SUCCESS" : "ERROR"),
                datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                sourceDBType: "MYSQL",
                sourceTableName: "pdepartment",
                sourceId: depCode,
                sourceData: JSON.stringify({ depCode, bankId, bookAccount, depName, depTelNo }),
                destinationDBType: "ORACLE",
                destinationTableName: "PC_LOOKUP_DEPARTMENT",
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
      throw new HttpException(`[oracle: migrate department failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }




  // PUT Method
  async updateData(moduleId: number, payloadId: number, data: OracleLookupDepartmentDTO) {
    try {
      const updatedDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      await this.oracleLookupDepartmentRepositories.update({ bankId: moduleId }, { ...data, activeFlag: 1, createdBy: payloadId, updatedBy: payloadId, updatedDate });
      const updated = await this.oracleLookupDepartmentRepositories.findOne({ bankId: moduleId });
      return await updated.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: update department failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
