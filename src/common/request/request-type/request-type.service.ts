import { Logger } from '@nestjs/common';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MigrationLogService } from 'src/common/migrate/migration-log/migration-log.service';
import { ParamService } from 'src/common/setting/param/param.service';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { LookupRequestTypeDTO } from '../dto/oracle/lookup-request-type.dto';
import { MySQLRequestTypes } from '../entities/mysql/request-type.entity';
import { OracleLookupRequestTypes } from '../entities/oracle/lookup-request-type.entity';

@Injectable()
export class RequestTypeService extends HelperService {
  constructor(
    @InjectRepository(OracleLookupRequestTypes) private readonly oracleLookupRequestTypeRepositories: Repository<OracleLookupRequestTypes>,
    @InjectRepository(MySQLRequestTypes, "mysql") private readonly mysqlRequestTypeRepositories: Repository<MySQLRequestTypes>,
    private readonly migrateLogService: MigrationLogService,
    private readonly paramService: ParamService
  ) {
    super()
  }

  async findORACLEData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const { text, requestTypeId, requestTypeName, orderNo, activeFlag, courtId } = filters;
      const conditions = await this.oracleLookupRequestTypeRepositories.createQueryBuilder("A")
        .where("A.removedBy = 0")
      if (typeof text !== "undefined") {
        await conditions.andWhere(`(A.requestTypeCode LIKE '%${text}%' OR A.requestTypeName LIKE '%${text}%' OR A.selectCode LIKE '%${text}%')`)
      }

      if (typeof requestTypeId !== "undefined") {
        await conditions.andWhere("A.requestTypeId = :requestTypeId", { requestTypeId });
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

  async findORACLEOneData(filters: any = null) {
    try {
      const { text, requestTypeId, requestTypeName, orderNo, activeFlag, courtId } = filters;
      const conditions = await this.oracleLookupRequestTypeRepositories.createQueryBuilder("A")
        .where("A.requestTypeId <> 0");

      if (typeof text !== "undefined") {
        await conditions.andWhere(`(A.requestTypeCode LIKE '%${text}%' OR A.requestTypeName LIKE '%${text}%' OR A.selectCode LIKE '%${text}%')`)
      }

      if (typeof requestTypeId !== "undefined") {
        await conditions.andWhere("A.requestTypeId = :requestTypeId", { requestTypeId });
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

      const total = await 1;

      const getItems = await conditions.getOne();
      const items = await getItems ? getItems.toResponseObject() : null;

      return { items, total };
    } catch (error) {
      throw new HttpException(`[find oracle one data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const conditions = await this.mysqlRequestTypeRepositories.createQueryBuilder("A")
        .where("A.reqTypeId <> 0");

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




  async createData(payloadId: number, data: LookupRequestTypeDTO) {
    try {
      Logger.log(data, "data");
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
      const source = await this.findMYSQLData();
      let migrateLogs = {};
      if (await source.total > 0) {
        for (let index = 0; index < source.items.length; index++) {
          const element = source.items[index];
          const destination: any = await (await this.findORACLEOneData({ requestTypeName: `${element.reqTypeDesc}`.trim() })).items;

          if (!destination) {
            const params = await (await this.paramService.findORACLEOneData({ paramName: "COURT_ID" })).items;
            const created = await this.createData(payloadId, {
              activeFlag: 1,
              courtId: parseInt(params.paramValue),
              requestTypeName: `${element.reqTypeDesc}`.trim(),
            });

            const logData = {
              name: "รหัสประเภทคำร้อง",
              serverType: `${process.env.SERVER_TYPE}`,
              status: (created ? "SUCCESS" : "ERROR"),
              datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
              sourceDBType: "MYSQL",
              sourceTableName: "prequest_type",
              sourceId: element.reqTypeId,
              sourceData: JSON.stringify(element),
              destinationDBType: "ORACLE",
              destinationTableName: "PC_LOOKUP_REQUEST_TYPE",
              destinationId: created.requestTypeId,
              destinationData: JSON.stringify(created)
            };
            migrateLogs = await this.migrateLogService.createPOSTGRESData(logData);
          }
        }

      }

      return migrateLogs;
    } catch (error) {
      throw new HttpException(`[Migrate data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }
}
