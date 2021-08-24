import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MigrationLogService } from 'src/common/migrate/migration-log/migration-log.service';
import { ParamService } from 'src/common/setting/param/param.service';
import { HelperService } from 'src/shared/helpers/helper.service';
import { getManager, Repository } from 'typeorm';
import { OracleLookupAppointTableDTO } from '../dto/lookup-appoint-table.dto';
import { MySQLAppointTables } from '../entities/mysql/appoint-table.entity';
import { OracleLookupAppointTables } from '../entities/oracle/lookup-appoint-table.entity';

@Injectable()
export class AppointTableService extends HelperService {
  constructor(
    @InjectRepository(OracleLookupAppointTables)
    private readonly oracleLookupAppointTableRepositories: Repository<OracleLookupAppointTables>,
    @InjectRepository(MySQLAppointTables, "mysql")
    private readonly mysqlAppointTablesTableRepositories: Repository<MySQLAppointTables>,
    private readonly paramService: ParamService,
    private readonly migrateLogService: MigrationLogService,
  ) {
    super();
  }

  // Filter zone
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.where("A.appointListId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.removedBy = 0");
      }

      if (filters) {
        const { text, orderNo, activeFlag, appFlag, appointListCode, appointListName, courtId } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.appointListName LIKE '%${text}'%)`);
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof activeFlag !== "undefined") {
          await conditions.andWhere("A.activeFlag = :activeFlag", { activeFlag });
        }

        if (typeof appFlag !== "undefined") {
          await conditions.andWhere("A.appFlag = :appFlag", { appFlag });
        }

        if (typeof appointListCode !== "undefined") {
          await conditions.andWhere("A.appointListCode = :appointListCode", { appointListCode });
        }

        if (typeof appointListName !== "undefined") {
          await conditions.andWhere("A.appointListName = :appointListName", { appointListName });
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
        await conditions.where("A.delayId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.delayId <> 0");
      }

      if (filters) {
        const { text, courtRunning, delayType, delayName, stdId, createDepCode } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.subjectName LIKE '%${text}%'`)
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof delayType !== "undefined") {
          await conditions.andWhere("A.delayType = :delayType", { delayType });
        }

        if (typeof delayName !== "undefined") {
          await conditions.andWhere("A.delayName = :delayName", { delayName });
        }

        if (typeof stdId !== "undefined") {
          await conditions.andWhere("A.stdId = :stdId", { stdId });
        }

        if (typeof createDepCode !== "undefined") {
          await conditions.andWhere("A.createDepCode = :createDepCode", { createDepCode });
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
          .orderBy("A.appointListId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find litigant data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
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
      throw new HttpException(`[find oracle one data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
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
      throw new HttpException(`[mysql: find pappoint list data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  async createData(payloadId: number, data: OracleLookupAppointTableDTO) {
    try {
      const createdDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const created = await this.oracleLookupAppointTableRepositories.create({ ...data, createdBy: payloadId, updatedBy: payloadId, removedBy: 0, createdDate, updatedDate: createdDate });
      await this.oracleLookupAppointTableRepositories.save(created);
      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: create appoint list failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  /* async createMigrationData(payloadId: number, filters: any = null) {
    try {
      let migrateLogs = [];
      const params = await (await this.paramService.findORACLEOneData({ paramName: "COURT_ID" })).items; // ค้นหารหัสของศาล
      const source = await this.findMYSQLData(); // ดึงค่าคำคู่ความฝั่ง MySQL

      if (params && await source.total > 0) {
        for (let index = 0; index < source.items.length; index++) {
          const { appId, appName, appTable } = source.items[index];

          const orHoldReason = await (await this.findORACLEOneData({ appointListName: `${appName}`.trim() })).items; // ค้นหา การเลื่อนพิจารณา (Oracle)

          if (!orHoldReason) { // ถ้าไม่มีให้ทำงาน
            const createData = {
              activeFlag: 1,
              appointListName: `${appName}`.trim(),
              courtId: parseInt(params.paramValue),
            }; // เตรียมข้อมูลในการเพิ่ม

            const created = await this.createData(payloadId, createData); // เพิ่มข้อมูลการเลื่อนพิจารณาคดี

            if (created) {
              const logData = {
                name: "ระบบการนัดหมาย: เลื่อนพิจารณา",
                serverType: `${process.env.SERVER_TYPE}`,
                status: (created ? "SUCCESS" : "ERROR"),
                datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                sourceDBType: "MYSQL",
                sourceTableName: appTable,
                sourceId: appId,
                sourceData: JSON.stringify(createData),
                destinationDBType: "ORACLE",
                destinationTableName: "PC_LOOKUP_APPOINT_LIST",
                destinationId: created.appointListId,
                destinationData: JSON.stringify(created)
              }; // เตรียมข้อมูล log ในการบันทึกข้อมูล

              await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logData)); // เพิ่ม Log การ Migrate ข้อมูล
            }
          }
        }
      }

      return migrateLogs;
    } catch (error) {
      throw new HttpException(`[oracle: migrate appoint list failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  } */
}
