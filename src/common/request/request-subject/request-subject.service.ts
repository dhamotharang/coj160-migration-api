import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MigrationLogService } from 'src/common/migrate/migration-log/migration-log.service';
import { ParamService } from 'src/common/setting/param/param.service';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleLookupRequestSubjectDTO } from '../dto/oracle/lookup-request-subject.dto';
import { MySQLRequestSubjects } from '../entities/mysql/request-subject.entity';
import { OracleLookupRequestSubjects } from '../entities/oracle/lookup-request-subject.entity';

@Injectable()
export class RequestSubjectService extends HelperService {
  constructor(
    @InjectRepository(OracleLookupRequestSubjects) private readonly oracleLookUpRequestSubjectRepositories: Repository<OracleLookupRequestSubjects>,
    @InjectRepository(MySQLRequestSubjects, "mysql") private readonly mySQLRequestSubjectsRepositories: Repository<MySQLRequestSubjects>,
    private readonly migrateLogService: MigrationLogService,
    private readonly paramService: ParamService
  ) {
    super();
  }

  async findORACLEData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const { text, orderNo, dateFlag, activeFlag, courtId, selectCode } = filters;
      const conditions = await this.oracleLookUpRequestSubjectRepositories.createQueryBuilder("A")
        .where("A.removedBy = 0");

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

  async findORACLEOneData(filters: any = null) {
    try {
      const { text, orderNo, dateFlag, requestSubjectName, activeFlag, courtId, selectCode } = filters;
      const conditions = await this.oracleLookUpRequestSubjectRepositories.createQueryBuilder("A")
        .where("A.requestSubjectId <> 0");

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
      const conditions = await this.mySQLRequestSubjectsRepositories.createQueryBuilder("A")
        .where("A.subjectId <> 0");

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
      let migrateLogs = {};
      if (await source.total > 0) {
        for (let index = 0; index < source.items.length; index++) {
          const element = source.items[index];
          const destination: any = await (await this.findORACLEOneData({ requestSubjectName: `${element.subjectName}`.trim() })).items;

          if (!destination) {
            const params = await (await this.paramService.findORACLEOneData({ paramName: "COURT_ID" })).items;
            const created = await this.createData(payloadId, {
              requestSubjectName: `${element.subjectName}`.trim(),
              courtId: parseInt(params.paramValue),
              activeFlag: 1,
            });

            const logData = {
              name: "เรื่องในคำคู่ความ",
              serverType: `${process.env.SERVER_TYPE}`,
              status: (created ? "SUCCESS" : "ERROR"),
              datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
              sourceDBType: "MYSQL",
              sourceTableName: "prequest_subject",
              sourceId: element.subjectId,
              sourceData: JSON.stringify(element),
              destinationDBType: "ORACLE",
              destinationTableName: "PC_LOOKUP_REQUEST_SUBJECT",
              destinationId: created.requestSubjectId,
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
