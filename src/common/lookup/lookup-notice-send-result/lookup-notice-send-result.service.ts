import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MigrationLogService } from 'src/common/migrate/migration-log/migration-log.service';
import { OracleLookupNoticeSendResultDTO } from 'src/common/lookup/dto/lookup-notice-send-result.dto';
import { ParamService } from 'src/common/setting/param/param.service';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { MySQLNoticeSendResults } from '../entities/mysql/notice-send-result.entity';
import { OracleLookupNoticeSendResults } from '../entities/oracle/lookup-notice-send-result.entity';

@Injectable()
export class LookupNoticeSendResultService extends HelperService {
  constructor(
    @InjectRepository(OracleLookupNoticeSendResults)
    private oracleLookupNoticeSendResultRepositories: Repository<OracleLookupNoticeSendResults>,
    @InjectRepository(MySQLNoticeSendResults, "mysql")
    private mysqlNoticeSendResultsRepositories: Repository<MySQLNoticeSendResults>,

    private paramService: ParamService,
    private migrateLogService: MigrationLogService
  ) {
    super();
  }


  // Filter zone
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.where("A.noticeSendResultId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.removedBy = 0");
      }

      if (filters) {
        const { text, orderNo, costFlag, courtId, noticeSendResultCode, noticeSendResultName, selectCode, activeFlag } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.noticeSendResultName LIKE '%${text}%' OR A.noticeSendResultCode LIKE '%${text}%' OR A.noticeTypeName LIKE '%${text}%')`)
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof costFlag !== "undefined") {
          await conditions.andWhere("A.costFlag = :costFlag", { costFlag });
        }

        if (typeof courtId !== "undefined") {
          await conditions.andWhere("A.courtId = :courtId", { courtId });
        }

        if (typeof noticeSendResultCode !== "undefined") {
          await conditions.andWhere("A.noticeSendResultCode = :noticeSendResultCode", { noticeSendResultCode });
        }

        if (typeof noticeSendResultName !== "undefined") {
          await conditions.andWhere("A.noticeSendResultName = :noticeSendResultName", { noticeSendResultName });
        }

        if (typeof activeFlag !== "undefined") {
          await conditions.andWhere("A.activeFlag = :activeFlag", { activeFlag });
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
        await conditions.where("A.noticeSendId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.noticeSendId <> 0");
      }

      if (filters) {
        const { text, courtRunning, noticeSendDesc, sendBy, resultFlag, keyInFlag, orderNo, refId } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.noticeSendDesc LIKE '%${text}%' OR A.shortJudgeName LIKE '%${text}%')`)
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof noticeSendDesc !== "undefined") {
          await conditions.andWhere("A.noticeSendDesc = :noticeSendDesc", { noticeSendDesc });
        }

        if (typeof sendBy !== "undefined") {
          await conditions.andWhere("A.sendBy = :sendBy", { sendBy });
        }

        if (typeof resultFlag !== "undefined") {
          await conditions.andWhere("A.resultFlag = :resultFlag", { resultFlag });
        }

        if (typeof keyInFlag !== "undefined") {
          await conditions.andWhere("A.keyInFlag = :keyInFlag", { keyInFlag });
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof refId !== "undefined") {
          await conditions.andWhere("A.refId = :refId", { refId });
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
      const conditions = await this.oracleLookupNoticeSendResultRepositories.createQueryBuilder("A");

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
            .orderBy("A.noticeSendResultId", "DESC");
        }
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find lookup notice send result failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.oracleLookupNoticeSendResultRepositories.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters, moduleId);

      const total = 1;

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find one lookup notice send result failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLData(filters: any = null, pages: any = null) {
    try {
      const conditions = await this.mysqlNoticeSendResultsRepositories.createQueryBuilder("A");

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
            .orderBy("A.noticeSendId", "DESC");
        }
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[mysql: find notice send result failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.mysqlNoticeSendResultsRepositories.createQueryBuilder("A");

      await this.mysqlFilter(conditions, filters, moduleId);

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[mysql: find one notice send result failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  async createData(payloadId: number, data: OracleLookupNoticeSendResultDTO) {
    try {
      const createdDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const createData = {
        ...data,
        activeFlag: 1,
        costFlag: 1,
        createdBy: payloadId,
        updatedBy: payloadId,
        removedBy: 0,
        createdDate,
        updatedDate: createdDate
      };
      const created = await this.oracleLookupNoticeSendResultRepositories.create(createData);
      await this.oracleLookupNoticeSendResultRepositories.save(created);

      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: create lookup notice send result failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
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
          const { noticeSendId, noticeSendDesc } = source.items[index];

          const migresLogs = await this.migrateLogService.findPOSTGRESData({
            serverType: `${process.env.SERVER_TYPE}`,
            status: "SUCCESS",
            sourceDBType: "MYSQL",
            sourceTableName: "pnotice_send_result",
            sourceId: noticeSendId,
            destinationDBType: "ORACLE",
            destinationTableName: "PC_LOOKUP_NOTICE_SEND_RESULT",
          }); // ????????????????????? Log ????????? Migrate ??????????????????

          if (migresLogs.total > 0) { // ?????????????????? Migrate ??????????????????????????????????????????????????????????????????????????????
            const logDup = {
              name: "????????????????????????/??????????????????: ??????????????????????????????????????????????????????",
              serverType: `${process.env.SERVER_TYPE}`,
              status: "DUPLICATE",
              datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
              sourceDBType: "MYSQL",
              sourceTableName: "pnotice_send_result",
              sourceId: noticeSendId,
              sourceData: JSON.stringify(source.items[index]),
              destinationDBType: "ORACLE",
              destinationTableName: "PC_LOOKUP_NOTICE_SEND_RESULT",
            };

            await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logDup)); // ??????????????? Log ????????? Migrate ??????????????????
          } else {

            const checkData = await (await this.findORACLEOneData({ noticeSendResultName: `${noticeSendDesc}`.trim() })).items; // ??????????????? ???????????????????????????????????????????????? (Oracle)

            if (!checkData) { // ????????????????????????????????????????????????
              const createData = {
                courtId: parseInt(params.paramValue),
                noticeSendResultName: noticeSendDesc
              }; // ??????????????????????????????????????????????????????????????????

              const created = await this.createData(payloadId, createData); // ??????????????????????????????????????????????????????????????????????????????????????????

              const migrateLog1 = {
                name: "????????????????????????/??????????????????: ??????????????????????????????????????????????????????",
                serverType: `${process.env.SERVER_TYPE}`,
                status: (created ? "SUCCESS" : "ERROR"),
                datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                sourceDBType: "MYSQL",
                sourceTableName: "pnotice_send_result",
                sourceId: noticeSendId,
                sourceData: JSON.stringify(createData),
                destinationDBType: "ORACLE",
                destinationTableName: "PC_LOOKUP_NOTICE_SEND_RESULT",
                destinationId: created.noticeSendResultId,
                destinationData: JSON.stringify(created)
              }; // ???????????????????????????????????? log ???????????????????????????????????????????????????

              await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(migrateLog1)); // ??????????????? Log ????????? Migrate ??????????????????
            } else {
              const unknowLog = {
                name: "????????????????????????/??????????????????: ??????????????????????????????????????????????????????",
                serverType: `${process.env.SERVER_TYPE}`,
                status: "UNKNOW",
                datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                sourceDBType: "MYSQL",
                sourceTableName: "pnotice_send_result",
                sourceId: noticeSendId,
                sourceData: JSON.stringify(source.items[index]),
                destinationDBType: "ORACLE",
                destinationTableName: "PC_LOOKUP_NOTICE_SEND_RESULT",
              };

              await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(unknowLog)); // ??????????????? Log ????????? Migrate ??????????????????
            }
          }
        }
      }

      const filterCountLogs = {
        serverType: `${process.env.SERVER_TYPE}`,
        destinationDBType: "ORACLE",
        destinationTableName: "PC_LOOKUP_NOTICE_SEND_RESULT",
      };

      const cntDestination = await this.oracleLookupNoticeSendResultRepositories.createQueryBuilder("A")
      const errorTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "ERROR" });
      const unknowTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "UNKNOW" });
      const duplicateTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "DUPLICATE" }); // ????????????
      const destinationOldTotal = await (await this.oracleFilter(cntDestination, filters)).andWhere("A.createdBy <> 999").getCount(); // ????????????
      const destinationNewTotal = await (await this.oracleFilter(cntDestination, filters)).andWhere("A.createdBy = 999").getCount(); // ????????????
      const destinationTotal = await (await this.oracleFilter(cntDestination, filters)).getCount(); // ????????????

      return { migrateLogs, sourceTotal, destinationOldTotal, destinationNewTotal, duplicateTotal, errorTotal, unknowTotal, destinationTotal }; // ????????????
    } catch (error) {
      throw new HttpException(`[oracle: migrate notice send result failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
