import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MigrationLogService } from 'src/common/migrate/migration-log/migration-log.service';
import { ParamService } from 'src/common/setting/param/param.service';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleLookupNoticeTypeDTO } from '../dto/lookup-notice-type.dto';
import { MySQLNoticeTypes } from '../entities/mysql/notice-type.entity';
import { OracleLookupNoticeTypes } from '../entities/oracle/lookup-notice-type.entity';

@Injectable()
export class LookupNoticeTypeService extends HelperService {
  constructor(
    @InjectRepository(OracleLookupNoticeTypes)
    private oracleLookupNoticeTypeRepositories: Repository<OracleLookupNoticeTypes>,
    @InjectRepository(MySQLNoticeTypes, "mysql")
    private mysqlNoticeTypesRepositories: Repository<MySQLNoticeTypes>,
    private paramService: ParamService,
    private migrateLogService: MigrationLogService
  ) {
    super();
  }


  // Filter zone
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.where("A.noticeTypeId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.removedBy = 0");
      }

      if (filters) {
        const { text, orderNo, activeFlag, courtId, noticeNameShort, noticePrint, noticeTypeCode, noticeTypeName, selectCode } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.noticeNameShort LIKE '%${text}%' OR A.noticeTypeCode LIKE '%${text}%' OR A.noticeTypeName LIKE '%${text}%')`)
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof activeFlag !== "undefined") {
          await conditions.andWhere("A.activeFlag = :activeFlag", { activeFlag });
        }

        if (typeof courtId !== "undefined") {
          await conditions.andWhere("A.courtId = :courtId", { courtId });
        }

        if (typeof noticeNameShort !== "undefined") {
          await conditions.andWhere("A.noticeNameShort = :noticeNameShort", { noticeNameShort });
        }

        if (typeof noticePrint !== "undefined") {
          await conditions.andWhere("A.noticePrint = :noticePrint", { noticePrint });
        }

        if (typeof noticeTypeCode !== "undefined") {
          await conditions.andWhere("A.noticeTypeCode = :noticeTypeCode", { noticeTypeCode });
        }

        if (typeof noticeTypeName !== "undefined") {
          await conditions.andWhere("A.noticeTypeName = :noticeTypeName", { noticeTypeName });
        }

        if (typeof selectCode !== "undefined") {
          await conditions.andWhere("A.selectCode = :selectCode", { selectCode });
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
        await conditions.where("A.noticeTypeId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.noticeTypeId <> 0");
      }

      if (filters) {
        const { text, courtRunning, noticeTypeName, noticeNameShort, noticePrint, noticePrintleft, caseType, orderDisplay } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.judgeName LIKE '%${text}%' OR A.shortJudgeName LIKE '%${text}%')`)
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof noticeTypeName !== "undefined") {
          await conditions.andWhere("A.noticeTypeName = :noticeTypeName", { noticeTypeName });
        }

        if (typeof noticeNameShort !== "undefined") {
          await conditions.andWhere("A.noticeNameShort = :noticeNameShort", { noticeNameShort });
        }

        if (typeof noticePrint !== "undefined") {
          await conditions.andWhere("A.noticePrint = :noticePrint", { noticePrint });
        }

        if (typeof noticePrintleft !== "undefined") {
          await conditions.andWhere("A.noticePrintleft = :noticePrintleft", { noticePrintleft });
        }

        if (typeof caseType !== "undefined") {
          await conditions.andWhere("A.caseType = :caseType", { caseType });
        }

        if (typeof orderDisplay !== "undefined") {
          await conditions.andWhere("A.orderDisplay = :orderDisplay", { orderDisplay });
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
      const conditions = await this.oracleLookupNoticeTypeRepositories.createQueryBuilder("A");

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
        } else {
          await conditions
            .orderBy("A.noticeTypeId", "DESC");
        }
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find lookup notice type failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.oracleLookupNoticeTypeRepositories.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters, moduleId);

      const total = 1;

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find one lookup notice type failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLData(filters: any = null, pages: any = null) {
    try {
      const conditions = await this.mysqlNoticeTypesRepositories.createQueryBuilder("A");

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
        } else {
          await conditions
            .orderBy("A.noticeTypeId", "DESC");
        }
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[mysql: find notice type failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.mysqlNoticeTypesRepositories.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters, moduleId);

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[mysql: find one notice type failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  async createData(payloadId: number, data: OracleLookupNoticeTypeDTO) {
    try {
      const createdDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const createData = {
        ...data,
        createdBy: payloadId,
        updatedBy: payloadId,
        removedBy: 0,
        createdDate,
        updatedDate: createdDate
      };
      const created = await this.oracleLookupNoticeTypeRepositories.create(createData);
      await this.oracleLookupNoticeTypeRepositories.save(created);

      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: create lookup notice type failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async createMigrationData(payloadId: number, filters: any = null) {
    try {
      const params = await (await this.paramService.findORACLEOneData({ paramName: "COURT_ID" })).items; // ?????????????????????????????????????????????
      const source = await this.findMYSQLData(); // ?????????????????? MySQL

      let migrateLogs = []; // ????????????
      const sourceTotal = await source.total;  // ????????????

      if (await sourceTotal > 0) {
        for (let index = 0; index < source.items.length; index++) {
          const { noticeTypeId, noticeTypeName, noticeNameShort, noticePrint, noticePrintleft, caseType, colorFlag } = source.items[index];

          const migresLogs = await (await this.migrateLogService.findPOSTGRESData({
            serverType: `${process.env.SERVER_TYPE}`,
            status: "SUCCESS",
            sourceDBType: "MYSQL",
            sourceTableName: "pnotice_type",
            sourceId: noticeTypeId,
            destinationDBType: "ORACLE",
            destinationTableName: "PC_LOOKUP_NOTICE_TYPE",
          })); // ????????????????????? Log ????????? Migrate ??????????????????

          if (migresLogs.total > 0) { // ?????????????????? Migrate ??????????????????????????????????????????????????????????????????????????????
            const logDup = {
              name: "????????????????????????/??????????????????: ??????????????????????????????",
              serverType: `${process.env.SERVER_TYPE}`,
              status: "DUPLICATE",
              datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
              sourceDBType: "MYSQL",
              sourceTableName: "pnotice_type",
              sourceId: noticeTypeId,
              sourceData: JSON.stringify(source.items[index]),
              destinationDBType: "ORACLE",
              destinationTableName: "PC_LOOKUP_NOTICE_TYPE",
            };

            await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logDup)); // ??????????????? Log ????????? Migrate ??????????????????
          } else {
            const orAppointTables = await (await this.findORACLEOneData({ noticeTypeName: `${noticeTypeName}`.trim() })).items; // ??????????????? ???????????????????????????????????????????????? (Oracle)

            if (!orAppointTables) { // ????????????????????????????????????????????????
              const createData = {
                courtId: parseInt(params.paramValue),
                noticeNameShort: noticeTypeName,
                noticePrint: colorFlag === 1 ? '02' : '01',
                noticeTypeName,
              }; // ??????????????????????????????????????????????????????????????????

              const created = await this.createData(payloadId, createData); // ??????????????????????????????????????????????????????????????????????????????????????????

              const migrateLog1 = {
                name: "????????????????????????/??????????????????: ??????????????????????????????",
                serverType: `${process.env.SERVER_TYPE}`,
                status: (created ? "SUCCESS" : "ERROR"),
                datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                sourceDBType: "MYSQL",
                sourceTableName: "pnotice_type",
                sourceId: noticeTypeId,
                sourceData: JSON.stringify(createData),
                destinationDBType: "ORACLE",
                destinationTableName: "PC_LOOKUP_NOTICE_TYPE",
                destinationId: created.noticeTypeId,
                destinationData: JSON.stringify(created)
              }; // ???????????????????????????????????? log ???????????????????????????????????????????????????

              await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(migrateLog1)); // ??????????????? Log ????????? Migrate ??????????????????
            } else {
              const unknowLog = {
                name: "????????????????????????/??????????????????: ??????????????????????????????",
                serverType: `${process.env.SERVER_TYPE}`,
                status: "UNKNOW",
                datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                sourceDBType: "MYSQL",
                sourceTableName: "pnotice_type",
                sourceId: noticeTypeId,
                sourceData: JSON.stringify(source.items[index]),
                destinationDBType: "ORACLE",
                destinationTableName: "PC_LOOKUP_NOTICE_TYPE",
              };

              await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(unknowLog)); // ??????????????? Log ????????? Migrate ??????????????????
            }
          }
        }
      }

      const filterCountLogs = {
        serverType: `${process.env.SERVER_TYPE}`,
        destinationDBType: "ORACLE",
        destinationTableName: "PC_LOOKUP_NOTICE_TYPE",
      };

      const cntDestination = await this.oracleLookupNoticeTypeRepositories.createQueryBuilder("A")
      const errorTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "ERROR" });
      const unknowTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "UNKNOW" });
      const duplicateTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "DUPLICATE" }); // ????????????
      const destinationOldTotal = await (await this.oracleFilter(cntDestination, filters)).andWhere("A.createdBy <> 999").getCount(); // ????????????
      const destinationNewTotal = await (await this.oracleFilter(cntDestination, filters)).andWhere("A.createdBy = 999").getCount(); // ????????????
      const destinationTotal = await (await this.oracleFilter(cntDestination, filters)).getCount(); // ????????????

      return { migrateLogs, sourceTotal, destinationOldTotal, destinationNewTotal, duplicateTotal, errorTotal, unknowTotal, destinationTotal }; // ????????????
    } catch (error) {
      throw new HttpException(`[oracle: migrate notice type failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
