import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MigrationLogService } from 'src/common/migrate/migration-log/migration-log.service';
import { ParamService } from 'src/common/setting/param/param.service';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleLookupAppointTableDTO } from '../dto/lookup-appoint-table.dto';
import { MySQLAppointTables } from '../entities/mysql/appoint-table.entity';
import { OracleLookupAppointTables } from '../entities/oracle/lookup-appoint-table.entity';

@Injectable()
export class LookupAppointTableService extends HelperService {
  constructor(
    @InjectRepository(OracleLookupAppointTables)
    private readonly oracleLookupAppointTableRepositories: Repository<OracleLookupAppointTables>,
    @InjectRepository(MySQLAppointTables, "mysql")
    private readonly mysqlAppointTablesTableRepositories: Repository<MySQLAppointTables>,
    private paramService: ParamService,
    private migrateLogService: MigrationLogService,
  ) {
    super();
  }

  // Filter zone
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.where("A.appointTableId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.removedBy = 0");
      }

      if (filters) {
        const { text, orderNo, activeFlag, appointTableCode, appointTableName, courtId, tempId } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.appointTableName LIKE '%${text}'% OR A.appointTableCode LIKE '%${text}'%)`);
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof activeFlag !== "undefined") {
          await conditions.andWhere("A.activeFlag = :activeFlag", { activeFlag });
        }

        if (typeof appointTableCode !== "undefined") {
          await conditions.andWhere("A.appointTableCode = :appointTableCode", { appointTableCode });
        }

        if (typeof appointTableName !== "undefined") {
          await conditions.andWhere("A.appointTableName = :appointTableName", { appointTableName });
        }

        if (typeof courtId !== "undefined") {
          await conditions.andWhere("A.courtId = :courtId", { courtId });
        }

        if (typeof tempId !== "undefined") {
          await conditions.andWhere("A.tempId = :tempId", { tempId });
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
        await conditions.where("A.tableId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.tableId <> 0");
      }

      if (filters) {
        const { text, courtRunning, tableName, caseCateId, caseStatus, tableType, } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.tableName LIKE '%${text}%'`)
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof tableName !== "undefined") {
          await conditions.andWhere("A.tableName = :tableName", { tableName });
        }

        if (typeof caseCateId !== "undefined") {
          await conditions.andWhere("A.caseCateId = :caseCateId", { caseCateId });
        }

        if (typeof caseStatus !== "undefined") {
          await conditions.andWhere("A.caseStatus = :caseStatus", { caseStatus });
        }

        if (typeof tableType !== "undefined") {
          await conditions.andWhere("A.tableType = :tableType", { tableType });
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
      const conditions = await this.oracleLookupAppointTableRepositories.createQueryBuilder("A");

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
          .orderBy("A.appointTableId", "DESC");
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
      const conditions = await this.oracleLookupAppointTableRepositories.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters, holdReasonId);

      const total = 1;

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find appoint table one failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLData(filters: any = null, pages: any = null, id: number = 0) {
    try {
      const conditions = await this.mysqlAppointTablesTableRepositories.createQueryBuilder("A");

      await this.mysqlFilter(conditions, filters, id);

      const total = await conditions.getOne();

      if (pages) {
        await conditions
          .skip(pages.start)
          .take(pages.limit);
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total: items.length };
    } catch (error) {
      throw new HttpException(`[mysql: find pappoint table data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  async createData(payloadId: number, data: OracleLookupAppointTableDTO) {
    try {
      const createdDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const created = await this.oracleLookupAppointTableRepositories.create({
        ...data,
        activeFlag: 1,
        dayThai: "-",
        isDefault: 0,
        maxQty: 35,
        createdBy: payloadId,
        updatedBy: payloadId,
        removedBy: 0,
        createdDate,
        updatedDate: createdDate
      });
      await this.oracleLookupAppointTableRepositories.save(created);
      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: create appoint table failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async createMigrationData(payloadId: number, filters: any = null) {
    try {
      let migrateLogs = [];
      const params = await (await this.paramService.findORACLEOneData({ paramName: "COURT_ID" })).items; // ค้นหารหัสของศาล
      // const source = await this.appointListService.findMYSQLData(); // ดึงค่าคำคู่ความฝั่ง MySQL
      const source = await this.findMYSQLData(); // ดึงค่าคำคู่ความฝั่ง MySQL

      if (params && await source.total > 0) {
        for (let index = 0; index < source.items.length; index++) {
          // const { appId, appName, appTable } = source.items[index];
          const { tableId, tableName, mon, tue, wed, thu, fri, sat, sun } = source.items[index];

          const migresLogs = await (await this.migrateLogService.findPOSTGRESData({
            serverType: `${process.env.SERVER_TYPE}`,
            status: "SUCCESS",
            sourceDBType: "MYSQL",
            sourceTableName: "pappoint_table",
            sourceId: tableId,
          })).items; // ตรวจสอบ Log การ Migrate ข้อมูล

          if (migresLogs.length > 0) { // หากเคย Migrate ไปแล้วระบบจะบันทึกการทำซ้ำ
            await migrateLogs.push(await this.migrateLogService.createPOSTGRESData({
              name: "ระบบการนัดหมาย: ตารางนัด",
              serverType: `${process.env.SERVER_TYPE}`,
              status: "DUPLICATE",
              datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
              sourceDBType: "MYSQL",
              sourceTableName: "pappoint_table",
              sourceId: tableId,
              sourceData: JSON.stringify(source.items[index]),
            })); // เพิ่ม Log การ Migrate ข้อมูล
          } else {
            const orAppointTables = await (await this.findORACLEOneData({ appointTableName: `${tableName}`.trim() })).items; // ค้นหา การเลื่อนพิจารณา (Oracle)

            if (!orAppointTables) { // ถ้าไม่มีให้ทำงาน
              const createData = {
                appointTableName: `${tableName}`.trim(),
                courtId: parseInt(params.paramValue),
                remark: "from Migration",
                fri: fri ? fri : 0,
                mon: mon ? mon : 0,
                sat: sat ? sat : 0,
                sun: sun ? sun : 0,
                thu: thu ? thu : 0,
                tue: tue ? tue : 0,
                wed: wed ? wed : 0,
              }; // เตรียมข้อมูลในการเพิ่ม

              const created = await this.createData(payloadId, createData); // เพิ่มข้อมูลการเลื่อนพิจารณาคดี

              if (created) {
                const logData = {
                  name: "ระบบการนัดหมาย: ตารางนัด",
                  serverType: `${process.env.SERVER_TYPE}`,
                  status: (created ? "SUCCESS" : "ERROR"),
                  datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                  sourceDBType: "MYSQL",
                  sourceTableName: "pappoint_table",
                  sourceId: tableId,
                  sourceData: JSON.stringify(createData),
                  destinationDBType: "ORACLE",
                  destinationTableName: "PC_LOOKUP_APPOINT_TABLE",
                  destinationId: created.appointTableId,
                  destinationData: JSON.stringify(created)
                }; // เตรียมข้อมูล log ในการบันทึกข้อมูล

                await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logData)); // เพิ่ม Log การ Migrate ข้อมูล
              }
            }
          }
        }
      }

      return migrateLogs;
    } catch (error) {
      throw new HttpException(`[oracle: migrate appoint table failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
