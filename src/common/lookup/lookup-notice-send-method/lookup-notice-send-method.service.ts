import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MigrationLogService } from 'src/common/migrate/migration-log/migration-log.service';
import { ParamService } from 'src/common/setting/param/param.service';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleLookupSendMethodDTO } from '../dto/lookup-send-method.dto';
import { MySQLNoticeSendTypes } from '../entities/mysql/notice-send-type.entity';
import { OracleLookupSendMethods } from '../entities/oracle/lookup-send-method.entity';

@Injectable()
export class LookupNoticeSendMethodService extends HelperService {
  constructor(
    @InjectRepository(OracleLookupSendMethods)
    private oracleLookupSendMethodRepositories: Repository<OracleLookupSendMethods>,
    @InjectRepository(MySQLNoticeSendTypes, "mysql")
    private mysqlNoticeSendTypeRepositories: Repository<MySQLNoticeSendTypes>,

    private paramService: ParamService,
    private migrateLogService: MigrationLogService
  ) {
    super();
  }


  // Filter zone
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.where("A.sendMethodId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.removedBy = 0");
      }

      if (filters) {
        const { text, orderNo, activeFlag, courtId, selectCode, sendMethodCode, sendMethodName } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.sendMethodName LIKE '%${text}%'`)
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

        if (typeof selectCode !== "undefined") {
          await conditions.andWhere("A.selectCode = :selectCode", { selectCode });
        }

        if (typeof sendMethodCode !== "undefined") {
          await conditions.andWhere("A.sendMethodCode = :sendMethodCode", { sendMethodCode });
        }

        if (typeof sendMethodName !== "undefined") {
          await conditions.andWhere("A.sendMethodName = :sendMethodName", { sendMethodName });
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
        await conditions.where("A.sendById = :moduleId", { moduleId });
      } else {
        await conditions.where("A.sendById <> 0");
      }

      if (filters) {
        const { text, sendMethodId, orderNo, activeFlag, courtId, selectCode, sendMethodCode, sendMethodName, } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.sendMethodName LIKE '%${text}%' OR A.sendMethodCode LIKE '%${text}%')`)
        }

        if (typeof sendMethodId !== "undefined") {
          await conditions.andWhere("A.sendMethodId = :sendMethodId", { sendMethodId });
        }

        if (typeof activeFlag !== "undefined") {
          await conditions.andWhere("A.activeFlag = :activeFlag", { activeFlag });
        }

        if (typeof courtId !== "undefined") {
          await conditions.andWhere("A.courtId = :courtId", { courtId });
        }

        if (typeof selectCode !== "undefined") {
          await conditions.andWhere("A.selectCode = :selectCode", { selectCode });
        }

        if (typeof sendMethodCode !== "undefined") {
          await conditions.andWhere("A.sendMethodCode = :sendMethodCode", { sendMethodCode });
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof sendMethodName !== "undefined") {
          await conditions.andWhere("A.sendMethodName = :sendMethodName", { sendMethodName });
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
      const conditions = await this.oracleLookupSendMethodRepositories.createQueryBuilder("A");

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
            .orderBy("A.sendMethodId", "DESC");
        }
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find lookup notice send method failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.oracleLookupSendMethodRepositories.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters, moduleId);

      const total = 1;

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find one lookup notice send method failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLData(filters: any = null, pages: any = null) {
    try {
      const conditions = await this.mysqlNoticeSendTypeRepositories.createQueryBuilder("A");

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
            .orderBy("A.sendById", "DESC");
        }
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[mysql: find notice send method failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.mysqlNoticeSendTypeRepositories.createQueryBuilder("A");

      await this.mysqlFilter(conditions, filters, moduleId);

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[mysql: find one notice send method failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  async createData(payloadId: number, data: OracleLookupSendMethodDTO) {
    try {
      const createdDate = this.dateFormat("YYYY-MM-DD H:i:s");
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

      const created = await this.oracleLookupSendMethodRepositories.create(createData);
      await this.oracleLookupSendMethodRepositories.save(created);

      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: create lookup notice send method failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
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
          const { sendById, sendByName } = source.items[index];

          const migrateLog1 = await this.migrateLogService.findPOSTGRESData({
            serverType: `${process.env.SERVER_TYPE}`,
            status: "SUCCESS",
            sourceDBType: "MYSQL",
            sourceTableName: "pnotice_send_type",
            sourceId: sendById,
            destinationDBType: "ORACLE",
            destinationTableName: "PC_LOOKUP_SEND_METHOD",
          }); // ????????????????????? Log ????????? Migrate ??????????????????

          if (migrateLog1.total > 0) { // ?????????????????? Migrate ??????????????????????????????????????????????????????????????????????????????
            const logDup = {
              name: "????????????????????????/??????????????????: ?????????????????????????????????????????????????????????",
              serverType: `${process.env.SERVER_TYPE}`,
              status: "DUPLICATE",
              datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
              sourceDBType: "MYSQL",
              sourceTableName: "pnotice_send_type",
              sourceId: sendById,
              sourceData: JSON.stringify(source.items[index]),
              destinationDBType: "ORACLE",
              destinationTableName: "PC_LOOKUP_SEND_METHOD",
            };

            await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logDup)); // ??????????????? Log ????????? Migrate ??????????????????
          } else {

            const orSendMethods = await (await this.findORACLEOneData({ sendMethodName: `${sendByName}`.trim() })).items; // ??????????????? ???????????????????????????????????????????????? (Oracle)

            if (!orSendMethods) { // ????????????????????????????????????????????????
              const createData = {
                courtId: parseInt(params.paramValue),
                sendMethodName: sendByName
              }; // ??????????????????????????????????????????????????????????????????

              const created = await this.createData(payloadId, createData); // ??????????????????????????????????????????????????????????????????????????????????????????

              const migrateLog2 = {
                name: "????????????????????????/??????????????????: ??????????????????????????????",
                serverType: `${process.env.SERVER_TYPE}`,
                status: (created ? "SUCCESS" : "ERROR"),
                datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                sourceDBType: "MYSQL",
                sourceTableName: "pnotice_send_type",
                sourceId: sendById,
                sourceData: JSON.stringify(createData),
                destinationDBType: "ORACLE",
                destinationTableName: "PC_LOOKUP_SEND_METHOD",
                destinationId: created.sendMethodId,
                destinationData: JSON.stringify(created)
              }; // ???????????????????????????????????? log ???????????????????????????????????????????????????

              await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(migrateLog2)); // ??????????????? Log ????????? Migrate ??????????????????
            } else {
              const unknowLog = {
                name: "????????????????????????/??????????????????: ?????????????????????????????????????????????????????????",
                serverType: `${process.env.SERVER_TYPE}`,
                status: "UNKNOW",
                datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                sourceDBType: "MYSQL",
                sourceTableName: "pnotice_send_type",
                sourceId: sendById,
                sourceData: JSON.stringify(source.items[index]),
                destinationDBType: "ORACLE",
                destinationTableName: "PC_LOOKUP_SEND_METHOD",
              };

              await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(unknowLog)); // ??????????????? Log ????????? Migrate ??????????????????
            }
          }
        }
      }

      const filterCountLogs = {
        serverType: `${process.env.SERVER_TYPE}`,
        destinationDBType: "ORACLE",
        destinationTableName: "PC_LOOKUP_SEND_METHOD",
      };

      const cntDestination = await this.oracleLookupSendMethodRepositories.createQueryBuilder("A")
      const errorTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "ERROR" });
      const unknowTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "UNKNOW" });
      const duplicateTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "DUPLICATE" }); // ????????????
      const destinationOldTotal = await (await this.oracleFilter(cntDestination, filters)).andWhere("A.createdBy <> 999").getCount(); // ????????????
      const destinationNewTotal = await (await this.oracleFilter(cntDestination, filters)).andWhere("A.createdBy = 999").getCount(); // ????????????
      const destinationTotal = await (await this.oracleFilter(cntDestination, filters)).getCount(); // ????????????

      return { migrateLogs, sourceTotal, destinationOldTotal, destinationNewTotal, duplicateTotal, unknowTotal, errorTotal, destinationTotal }; // ????????????
    } catch (error) {
      throw new HttpException(`[oracle: migrate notice send method failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
