import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LookupAppointDelayService } from 'src/common/lookup/lookup-appoint-delay/lookup-appoint-delay.service';
import { MigrationLogService } from 'src/common/migrate/migration-log/migration-log.service';
import { ParamService } from 'src/common/setting/param/param.service';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleProceedHoldReasonDTO } from '../dto/proceed-hold-reason.dto';
import { OracleProceedHoldReasons } from '../entities/oracle/proceed-hold-reason.entity';

@Injectable()
export class HoldReasonService extends HelperService {
  constructor(
    @InjectRepository(OracleProceedHoldReasons)
    private oracleProceedHoldReasonsRepositories: Repository<OracleProceedHoldReasons>,
    private paramService: ParamService,
    private migrateLogService: MigrationLogService,
    private appointDelayService: LookupAppointDelayService,
  ) {
    super();
  }

  // Filter zone
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.andWhere("A.holdReasonId = :moduleId", { moduleId });
      }

      if (filters) {
        const { text, orderNo, activeFlag, courtId, holdDescription, holdReasonCode, holdReason, selectCode } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.holdDescription LIKE '%${text}'% OR A.holdReason LIKE '%${text}'%)`);
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

        if (typeof holdReasonCode !== "undefined") {
          await conditions.andWhere("A.holdReasonCode = :holdReasonCode", { holdReasonCode });
        }

        if (typeof holdDescription !== "undefined") {
          await conditions.andWhere("A.holdDescription = :holdDescription", { holdDescription });
        }

        if (typeof holdReason !== "undefined") {
          await conditions.andWhere("A.holdReason = :holdReason", { holdReason });
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
      const conditions = await this.oracleProceedHoldReasonsRepositories.createQueryBuilder("A")
        .where("A.removedBy = 0");

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
          .orderBy("A.holdReasonId", "DESC");
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
      const { text, orderNo, dateFlag, requestSubjectName, activeFlag, courtId, selectCode } = filters;
      const conditions = await this.oracleProceedHoldReasonsRepositories.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters, holdReasonId);

      const total = 1;

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total };
    } catch (error) {
      throw new HttpException(`[find oracle one data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLData(filters: any = null, pages: any = null) {
    return await this.appointDelayService.findMYSQLData(filters, pages);
  }

  async findMYSQLOneData(filters: any = null, moduleId: number = 0) {
    return await this.appointDelayService.findMYSQLOneData(filters, moduleId);
  }




  // POST Method
  async createData(payloadId: number, data: OracleProceedHoldReasonDTO) {
    try {
      const createdDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const created = await this.oracleProceedHoldReasonsRepositories.create({ ...data, createdBy: payloadId, updatedBy: payloadId, removedBy: 0, createdDate, updatedDate: createdDate });
      await this.oracleProceedHoldReasonsRepositories.save(created);
      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: create litigant data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async createMigrationData(payloadId: number, filters: any = null) {
    try {
      const params = await (await this.paramService.findORACLEOneData({ paramName: "COURT_ID" })).items; // ?????????????????????????????????????????????
      const source = await this.appointDelayService.findMYSQLData(); // ????????????????????????????????????????????????????????? MySQL
      let migrateLogs = []; // ????????????
      const sourceTotal = await source.total;  // ????????????

      if (sourceTotal > 0) {
        for (let index = 0; index < source.items.length; index++) {
          const { delayId, delayName } = source.items[index];

          const migresLogs1 = await (await this.migrateLogService.findPOSTGRESData({
            serverType: `${process.env.SERVER_TYPE}`,
            status: "SUCCESS",
            sourceDBType: "MYSQL",
            sourceTableName: "pappoint_delay",
            sourceId: delayId,
            destinationDBType: "ORACLE",
            destinationTableName: "PC_PROCEED_HOLD_REASON",
          })); // ????????????????????? Log ????????? Migrate ??????????????????

          if (migresLogs1.total === 0) {
            const orHoldReason = await (await this.findORACLEOneData({ holdDescription: `${delayName}`.trim() })).items; // ??????????????? ???????????????????????????????????????????????? (Oracle)

            if (!orHoldReason) { // ????????????????????????????????????????????????
              const createData = {
                activeFlag: 1,
                courtId: parseInt(params.paramValue),
                holdDescription: `${delayName}`.trim(),
                holdReason: `${delayName}`.trim(),
              }; // ??????????????????????????????????????????????????????????????????

              const created = await this.createData(payloadId, createData); // ??????????????????????????????????????????????????????????????????????????????????????????

              const logData = {
                name: "??????????????????????????????????????????: ??????????????????????????????????????????",
                serverType: `${process.env.SERVER_TYPE}`,
                status: (created ? "SUCCESS" : "ERROR"),
                datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                sourceDBType: "MYSQL",
                sourceTableName: "pappoint_delay",
                sourceId: delayId,
                sourceData: JSON.stringify(createData),
                destinationDBType: "ORACLE",
                destinationTableName: "PC_PROCEED_HOLD_REASON",
                destinationId: created.holdReasonId,
                destinationData: JSON.stringify(created)
              }; // ???????????????????????????????????? log ???????????????????????????????????????????????????

              await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logData)); // ??????????????? Log ????????? Migrate ??????????????????
            } else {
              const logData1 = {
                name: "??????????????????????????????????????????: ??????????????????????????????????????????",
                serverType: `${process.env.SERVER_TYPE}`,
                status: "DUPLICATE",
                datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                sourceDBType: "MYSQL",
                sourceTableName: "pappoint_delay",
                sourceId: delayId,
                sourceData: JSON.stringify({ delayId, delayName }),
                destinationDBType: "ORACLE",
                destinationTableName: "PC_PROCEED_HOLD_REASON",
              }
              await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logData1)); // ??????????????? Log ????????? Migrate ??????????????????
            }
          }
        }
      }

      const filterCountLogs = {
        serverType: `${process.env.SERVER_TYPE}`,
        destinationDBType: "ORACLE",
        destinationTableName: "PC_PROCEED_HOLD_REASON",
      };

      const errorTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "ERROR" });
      const duplicateTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "DUPLICATE" }); // ????????????
      const destinationOldTotal = await (await this.oracleFilter(await this.oracleProceedHoldReasonsRepositories.createQueryBuilder("A"), filters)).andWhere("A.createdBy <> 999").getCount(); // ????????????
      const destinationNewTotal = await (await this.oracleFilter(await this.oracleProceedHoldReasonsRepositories.createQueryBuilder("A"), filters)).andWhere("A.createdBy = 999").getCount(); // ????????????
      const destinationTotal = await (await this.oracleFilter(await this.oracleProceedHoldReasonsRepositories.createQueryBuilder("A"), filters)).getCount(); // ????????????

      return { migrateLogs, sourceTotal, destinationOldTotal, destinationNewTotal, duplicateTotal, unknowTotal: 0, errorTotal, destinationTotal }; // ????????????
    } catch (error) {
      throw new HttpException(`[oracle: migrate proceed hold reason failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
