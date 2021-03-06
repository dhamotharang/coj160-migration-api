import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MigrationLogService } from 'src/common/migrate/migration-log/migration-log.service';
import { ParamService } from 'src/common/setting/param/param.service';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository, getManager } from 'typeorm';
import { OracleLookupAppointListDTO } from '../dto/lookup-appoint-list.dto';
import { OracleLookupAppointLists } from '../entities/oracle/lookup-appoint-list.entity';

@Injectable()
export class LookupAppointListService extends HelperService {
  constructor(
    @InjectRepository(OracleLookupAppointLists)
    private readonly oracleLookupAppointListReposities: Repository<OracleLookupAppointLists>,
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
      const conditions = await this.oracleLookupAppointListReposities.createQueryBuilder("A");

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

  async findORACLEOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.oracleLookupAppointListReposities.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters, moduleId);

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[oracle: find one appoint list failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLData() {
    try {
      const items = await getManager("mysql").query(`
        SELECT
          *
        FROM (
          SELECT
            A.app_id appId,
            A.app_name appName,
            'pappoint_list' appTable
          FROM pappoint_list A

          UNION

          SELECT
            B.app_id appId,
            B.app_name appName,
            'pappoint_list1' appTable
          FROM pappoint_list1 B

          UNION

          SELECT
            C.app_sub_id appId,
            C.app_sub_name appName,
            'pappoint_sub_list' appTable
          FROM pappoint_sub_list C
          ) appointList
        ORDER BY
          appointList.appId DESC,
          appointList.appName DESC
      `);

      return { items, total: items.length };
    } catch (error) {
      throw new HttpException(`[mysql: find pappoint list data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  async createData(payloadId: number, data: OracleLookupAppointListDTO) {
    try {
      const createdDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const created = await this.oracleLookupAppointListReposities.create({ ...data, createdBy: payloadId, updatedBy: payloadId, removedBy: 0, createdDate, updatedDate: createdDate });
      await this.oracleLookupAppointListReposities.save(created);
      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: create appoint list failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async createMigrationData(payloadId: number, filters: any = null) {
    try {
      const params = await (await this.paramService.findORACLEOneData({ paramName: "COURT_ID" })).items; // ?????????????????????????????????????????????
      const source = await this.findMYSQLData(); // ????????????????????????????????????????????????????????? MySQL
      let migrateLogs = []; // ????????????
      const sourceTotal = await source.total;  // ????????????

      if (await sourceTotal > 0) {
        for (let index = 0; index < source.items.length; index++) {
          const { appId, appName, appTable } = source.items[index];

          const migresLogs1 = await (await this.migrateLogService.findPOSTGRESData({
            serverType: `${process.env.SERVER_TYPE}`,
            status: "SUCCESS",
            sourceDBType: "MYSQL",
            sourceTableName: appTable,
            sourceId: appId,
            destinationDBType: "ORACLE",
            destinationTableName: "PC_LOOKUP_APPOINT_LIST",
          })); // ????????????????????? Log ????????? Migrate ??????????????????

          if (migresLogs1.total === 0) {
            const orHoldReason = await (await this.findORACLEOneData({ appointListName: `${appName}`.trim() })).items; // ??????????????? ???????????????????????????????????????????????? (Oracle)

            if (!orHoldReason) { // ????????????????????????????????????????????????
              const createData = {
                activeFlag: 1,
                appointListName: `${appName}`.trim(),
                courtId: parseInt(params.paramValue),
              }; // ??????????????????????????????????????????????????????????????????

              const created = await this.createData(payloadId, createData); // ??????????????????????????????????????????????????????????????????????????????????????????

              const logData = {
                name: "??????????????????????????????????????????: ???????????????????????????",
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
              }; // ???????????????????????????????????? log ???????????????????????????????????????????????????

              await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logData)); // ??????????????? Log ????????? Migrate ??????????????????
            } else {
              const logData1 = {
                name: "??????????????????????????????????????????: ???????????????????????????",
                serverType: `${process.env.SERVER_TYPE}`,
                status: "DUPLICATE",
                datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                sourceDBType: "MYSQL",
                sourceTableName: appTable,
                sourceId: appId,
                sourceData: JSON.stringify({ appId, appName, appTable }),
                destinationDBType: "ORACLE",
                destinationTableName: "PC_LOOKUP_APPOINT_LIST",
              };
              await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logData1)); // ??????????????? Log ????????? Migrate ??????????????????
            }
          }
        }
      }

      const filterCountLogs = {
        serverType: `${process.env.SERVER_TYPE}`,
        destinationDBType: "ORACLE",
        destinationTableName: "PC_LOOKUP_APPOINT_LIST",
      };

      const errorTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "ERROR" });
      const duplicateTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "DUPLICATE" }); // ????????????
      const destinationOldTotal = await (await this.oracleFilter(await this.oracleLookupAppointListReposities.createQueryBuilder("A"), filters)).andWhere("A.createdBy <> 999").getCount(); // ????????????
      const destinationNewTotal = await (await this.oracleFilter(await this.oracleLookupAppointListReposities.createQueryBuilder("A"), filters)).andWhere("A.createdBy = 999").getCount(); // ????????????
      const destinationTotal = await (await this.oracleFilter(await this.oracleLookupAppointListReposities.createQueryBuilder("A"), filters)).getCount(); // ????????????

      return { migrateLogs, sourceTotal, destinationOldTotal, destinationNewTotal, duplicateTotal, errorTotal, destinationTotal }; // ????????????
    } catch (error) {
      throw new HttpException(`[oracle: migrate appoint list failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
