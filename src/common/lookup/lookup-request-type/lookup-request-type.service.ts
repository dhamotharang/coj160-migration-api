import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MigrationLogService } from 'src/common/migrate/migration-log/migration-log.service';
import { ParamService } from 'src/common/setting/param/param.service';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { LookupRequestTypeDTO } from '../dto/lookup-request-type.dto';
import { MySQLRequestTypes } from '../entities/mysql/request-type.entity';
import { OracleLookupRequestTypes } from '../entities/oracle/lookup-request-type.entity';

@Injectable()
export class LookupRequestTypeService extends HelperService {
  constructor(
    @InjectRepository(OracleLookupRequestTypes) private readonly oracleLookupRequestTypeRepositories: Repository<OracleLookupRequestTypes>,
    @InjectRepository(MySQLRequestTypes, "mysql") private readonly mysqlRequestTypeRepositories: Repository<MySQLRequestTypes>,
    private readonly migrateLogService: MigrationLogService,
    private readonly paramService: ParamService
  ) {
    super()
  }

  // Filter
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId !== 0) {
        await conditions.where("A.requestTypeId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.removedBy = 0");
      }

      if (filters) {
        const { text, requestTypeName, orderNo, activeFlag, courtId } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.requestTypeCode LIKE '%${text}%' OR A.requestTypeName LIKE '%${text}%' OR A.selectCode LIKE '%${text}%')`)
        }

        if (typeof requestTypeName !== "undefined") {
          await conditions.andWhere("A.requestTypeName = :requestTypeName", { requestTypeName });
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof activeFlag !== "undefined") {
          await conditions.andWhere("A.activeFlag = :activeFlag", { activeFlag });
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
        await conditions.where("A.reqTypeId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.reqTypeId <> 0");
      }

      if (filters) {
        const { text, courtId, reqTypeDesc, updateDepCode } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.reqTypeDesc LIKE '%${text}%' OR A.createDepCode LIKE '%${text}%')`)
        }

        if (typeof courtId !== "undefined") {
          await conditions.andWhere("A.courtId = :courtId", { courtId });
        }

        if (typeof reqTypeDesc !== "undefined") {
          await conditions.andWhere("A.reqTypeDesc = :reqTypeDesc", { reqTypeDesc });
        }

        if (typeof updateDepCode !== "undefined") {
          await conditions.andWhere("A.updateDepCode = :updateDepCode", { updateDepCode });
        }
      }

      return await conditions;
    } catch (error) {
      throw new HttpException(`[mysql: filter failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


  async findORACLEData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const conditions = await this.oracleLookupRequestTypeRepositories.createQueryBuilder("A");

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
          .orderBy("A.requestTypeId", "DESC");
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
      const conditions = await this.oracleLookupRequestTypeRepositories.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters, moduleId);

      const getItems = await conditions.getOne();
      const items = await getItems ? getItems.toResponseObject() : null;

      return { items, total: items ? 1 : 0 };
    } catch (error) {
      throw new HttpException(`[oracle: find request one data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const conditions = await this.mysqlRequestTypeRepositories.createQueryBuilder("A");

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
        await conditions.orderBy("A.reqTypeId", "DESC");
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
      const conditions = await this.mysqlRequestTypeRepositories.createQueryBuilder("A");

      await this.mysqlFilter(conditions, filters, moduleId);

      const total = await conditions.getCount();

      const getItems = await conditions.getOne();
      const items = await getItems ? getItems.toResponseObject() : null;

      return { items, total: items ? 1 : 0 };
    } catch (error) {
      throw new HttpException(`[find mysql data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  async createData(payloadId: number, data: LookupRequestTypeDTO) {
    try {
      const createdDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const created = await this.oracleLookupRequestTypeRepositories.create({ ...data, createdBy: payloadId, createdDate });
      await this.oracleLookupRequestTypeRepositories.save(created);
      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[create data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async createMigrationData(payloadId: number, filters: any = null) {
    try {
      const params = await (await this.paramService.findORACLEOneData({ paramName: "COURT_ID" })).items;
      const source = await this.findMYSQLData();

      let migrateLogs = [];
      const sourceTotal = await source.total;  // เติม

      if (await sourceTotal > 0) {
        for (let index = 0; index < source.items.length; index++) {
          const { reqTypeId, reqTypeDesc } = source.items[index];

          const migresLogs1 = await (await this.migrateLogService.findPOSTGRESData({
            serverType: `${process.env.SERVER_TYPE}`,
            status: "SUCCESS",
            sourceDBType: "MYSQL",
            sourceTableName: "prequest_type",
            sourceId: reqTypeId,
            destinationDBType: "ORACLE",
            destinationTableName: "PC_LOOKUP_REQUEST_TYPE",
          })); // ตรวจสอบ Log การ Migrate ข้อมูล

          if (migresLogs1.total === 0) {
            const destination: any = await (await this.findORACLEOneData({ requestTypeName: `${reqTypeDesc}`.trim() })).items;

            if (!destination) {
              const created = await this.createData(payloadId, {
                activeFlag: 1,
                courtId: parseInt(params.paramValue),
                requestTypeName: `${reqTypeDesc}`.trim(),
              });

              const logData = {
                name: "ประเภทคำร้อง",
                serverType: `${process.env.SERVER_TYPE}`,
                status: (created ? "SUCCESS" : "ERROR"),
                datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                sourceDBType: "MYSQL",
                sourceTableName: "prequest_type",
                sourceId: reqTypeId,
                sourceData: JSON.stringify({ reqTypeId, reqTypeDesc }),
                destinationDBType: "ORACLE",
                destinationTableName: "PC_LOOKUP_REQUEST_TYPE",
                destinationId: created.requestTypeId,
                destinationData: JSON.stringify(created)
              };

              migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logData));
            }
          } else {
            const logData2 = {
              name: "หน่วยงาน",
              serverType: `${process.env.SERVER_TYPE}`,
              status: "DUPLICATE",
              datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
              sourceDBType: "MYSQL",
              sourceTableName: "prequest_type",
              sourceId: reqTypeId,
              sourceData: JSON.stringify({ reqTypeId, reqTypeDesc }),
              destinationDBType: "ORACLE",
              destinationTableName: "PC_LOOKUP_REQUEST_TYPE",
            };
            await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logData2)); // เพิ่ม Log การ Migrate ข้อมูล
          }
        }

      }

      const filterCountLogs = {
        serverType: `${process.env.SERVER_TYPE}`,
        destinationDBType: "ORACLE",
        destinationTableName: "PC_LOOKUP_REQUEST_TYPE",
      };

      const errorTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "ERROR" });
      const duplicateTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "DUPLICATE" }); // เติม
      const cntDestination = await this.oracleLookupRequestTypeRepositories.createQueryBuilder("A") // เติม
      const destinationOldTotal = await (await this.oracleFilter(cntDestination, filters)).andWhere("A.createdBy <> 999").getCount(); // เติม
      const destinationNewTotal = await (await this.oracleFilter(cntDestination, filters)).andWhere("A.createdBy = 999").getCount(); // เติม
      const destinationTotal = await (await this.oracleFilter(cntDestination, filters)).getCount(); // เติม

      return { migrateLogs, sourceTotal, destinationOldTotal, destinationNewTotal, duplicateTotal, errorTotal, destinationTotal }; // เติม
    } catch (error) {
      throw new HttpException(`[Migrate data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }
}
