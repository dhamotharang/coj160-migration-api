import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MigrationLogService } from 'src/common/migrate/migration-log/migration-log.service';
import { OracleLookupRequestSubjectDTO } from 'src/common/lookup/dto/lookup-request-subject.dto';
import { ParamService } from 'src/common/setting/param/param.service';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { MySQLRequestSubjects } from '../entities/mysql/request-subject.entity';
import { OracleLookupRequestSubjects } from '../entities/oracle/lookup-request-subject.entity';

@Injectable()
export class LookupRequestSubjectService extends HelperService {
  constructor(
    @InjectRepository(OracleLookupRequestSubjects)
    private readonly oracleLookUpRequestSubjectRepositories: Repository<OracleLookupRequestSubjects>,
    @InjectRepository(MySQLRequestSubjects, "mysql")
    private readonly mySQLRequestSubjectsRepositories: Repository<MySQLRequestSubjects>,
    private readonly migrateLogService: MigrationLogService,
    private readonly paramService: ParamService
  ) {
    super();
  }

  // Filter
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId !== 0) {
        await conditions.where("A.requestSubjectId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.removedBy = 0");
      }

      if (filters) {
        const { text, orderNo, dateFlag, activeFlag, courtId, selectCode, requestSubjectName } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.requestSubjectCode LIKE '%${text}%' OR A.requestSubjectName LIKE '%${text}%' OR A.selectCode LIKE '%${text}%')`)
        }

        if (typeof dateFlag !== "undefined") {
          await conditions.andWhere("A.dateFlag = :dateFlag", { dateFlag });
        }

        if (typeof activeFlag !== "undefined") {
          await conditions.andWhere("A.activeFlag = :activeFlag", { activeFlag });
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof courtId !== "undefined") {
          await conditions.andWhere("A.courtId = :courtId", { courtId });
        }

        if (typeof selectCode !== "undefined") {
          await conditions.andWhere("A.selectCode = :selectCode", { selectCode });
        }

        if (typeof requestSubjectName !== "undefined") {
          await conditions.andWhere("A.requestSubjectName = :requestSubjectName", { requestSubjectName });
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
        await conditions.where("A.subjectId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.subjectId <> 0");
      }

      if (filters) {
        const { text, courtRunning, subjectName, udFlag, dateFlag, createDepCode } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.subjectName LIKE '%${text}%'`)
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof subjectName !== "undefined") {
          await conditions.andWhere("A.subjectName = :subjectName", { subjectName });
        }

        if (typeof udFlag !== "undefined") {
          await conditions.andWhere("A.udFlag = :udFlag", { udFlag });
        }

        if (typeof dateFlag !== "undefined") {
          await conditions.andWhere("A.dateFlag = :dateFlag", { dateFlag });
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
  async findORACLEData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const conditions = await this.oracleLookUpRequestSubjectRepositories.createQueryBuilder("A");

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
          .orderBy("A.requestSubjectId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[find oracle data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.oracleLookUpRequestSubjectRepositories.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters, moduleId);

      const total = 1;

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total };
    } catch (error) {
      throw new HttpException(`[find oracle one data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const conditions = await this.mySQLRequestSubjectsRepositories.createQueryBuilder("A");

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
        await conditions.orderBy("A.subjectId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[find mysql data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.mySQLRequestSubjectsRepositories.createQueryBuilder("A");

      await this.mysqlFilter(conditions, filters, moduleId);

      const getItems = await conditions.getOne();
      const items = await getItems ? getItems.toResponseObject() : null;

      return { items, total: items ? 1 : 0 };
    } catch (error) {
      throw new HttpException(`[find mysql data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  async createData(payloadId: number, data: OracleLookupRequestSubjectDTO) {
    try {
      const createdDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const created = await this.oracleLookUpRequestSubjectRepositories.create({ ...data, createdBy: payloadId, createdDate, updatedDate: createdDate });
      await this.oracleLookUpRequestSubjectRepositories.save(created);
      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[create data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async createMigrationData(payloadId: number, filters: any = null) {
    try {
      const source = await this.findMYSQLData();
      let migrateLogs = []; // ????????????
      const sourceTotal = await source.total;  // ????????????

      const params = await (await this.paramService.findORACLEOneData({ paramName: "COURT_ID" })).items;

      if (await sourceTotal > 0) {
        for (let index = 0; index < source.items.length; index++) {
          const { subjectId, subjectName } = source.items[index];

          const migresLogs = await (await this.migrateLogService.findPOSTGRESData({
            serverType: `${process.env.SERVER_TYPE}`,
            status: "SUCCESS",
            sourceDBType: "MYSQL",
            sourceTableName: "prequest_subject",
            sourceId: subjectId,
            destinationDBType: "ORACLE",
            destinationTableName: "PC_LOOKUP_REQUEST_SUBJECT",
          })); // ????????????????????? Log ????????? Migrate ??????????????????

          if (migresLogs.total === 0) {
            const destination = await (await this.findORACLEData({ requestSubjectName: `${subjectName}`.trim() }));

            if (destination.total === 0) {
              const created = await this.createData(payloadId, {
                requestSubjectName: `${subjectName}`.trim(),
                courtId: parseInt(params.paramValue),
                activeFlag: 1,
              });

              const logData = {
                name: "???????????????????????????????????????????????????",
                serverType: `${process.env.SERVER_TYPE}`,
                status: (created ? "SUCCESS" : "ERROR"),
                datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                sourceDBType: "MYSQL",
                sourceTableName: "prequest_subject",
                sourceId: subjectId,
                sourceData: JSON.stringify({ subjectId, subjectName }),
                destinationDBType: "ORACLE",
                destinationTableName: "PC_LOOKUP_REQUEST_SUBJECT",
                destinationId: created.requestSubjectId,
                destinationData: JSON.stringify(created)
              };

              migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logData));
            } else {
              const logUnknow = {
                name: "???????????????????????????????????????????????????",
                serverType: `${process.env.SERVER_TYPE}`,
                status: "UNKNOW",
                datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                sourceDBType: "MYSQL",
                sourceTableName: "prequest_subject",
                sourceId: subjectId,
                sourceData: JSON.stringify({ subjectId, subjectName }),
                destinationDBType: "ORACLE",
                destinationTableName: "PC_LOOKUP_REQUEST_SUBJECT",
              };
              await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logUnknow)); // ??????????????? Log ????????? Migrate ??????????????????
            }

          } else {
            const logData1 = {
              name: "???????????????????????????????????????????????????",
              serverType: `${process.env.SERVER_TYPE}`,
              status: "DUPLICATE",
              datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
              sourceDBType: "MYSQL",
              sourceTableName: "prequest_subject",
              sourceId: subjectId,
              sourceData: JSON.stringify({ subjectId, subjectName }),
              destinationDBType: "ORACLE",
              destinationTableName: "PC_LOOKUP_REQUEST_SUBJECT",
            };
            await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logData1)); // ??????????????? Log ????????? Migrate ??????????????????
          }
        }
      }

      const filterCountLogs = {
        serverType: `${process.env.SERVER_TYPE}`,
        destinationDBType: "ORACLE",
        destinationTableName: "PC_LOOKUP_REQUEST_SUBJECT",
      };

      const cntDestination = await this.oracleLookUpRequestSubjectRepositories.createQueryBuilder("A")
      const errorTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "ERROR" });
      const duplicateTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "DUPLICATE" }); // ????????????
      const unknowTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "UNKNOW" }); // ????????????
      const destinationOldTotal = await (await this.oracleFilter(cntDestination, filters)).andWhere("A.createdBy <> 999").getCount(); // ????????????
      const destinationNewTotal = await (await this.oracleFilter(cntDestination, filters)).andWhere("A.createdBy = 999").getCount(); // ????????????
      const destinationTotal = await (await this.oracleFilter(cntDestination, filters)).getCount(); // ????????????

      return { migrateLogs, sourceTotal, destinationOldTotal, destinationNewTotal, duplicateTotal, unknowTotal, errorTotal, destinationTotal }; // ????????????
    } catch (error) {
      throw new HttpException(`[Migrate data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }
}
