import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MigrationLogService } from 'src/common/migrate/migration-log/migration-log.service';
import { ParamService } from 'src/common/setting/param/param.service';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleLookupNoticeSendTypeResultDTO } from '../dto/lookup-notice-send-type-result.dto';
import { MySQLNoticeSendResults } from '../entities/mysql/notice-send-result.entity';
import { OracleLookupNoticeSendResults } from '../entities/oracle/lookup-notice-send-result.entity';
import { OracleLookupNoticeSendTypeResults } from '../entities/oracle/lookup-notice-send-type-result.entity';

@Injectable()
export class LookupNoticeSendTypeResultService extends HelperService {
  constructor(
    @InjectRepository(OracleLookupNoticeSendTypeResults)
    private oracleLookupNoticeSendTypeResultRepositories: Repository<OracleLookupNoticeSendTypeResults>,
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
        await conditions.where("A.noticeSendTypeResultId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.removedBy = 0");
      }

      if (filters) {
        const { text, orderNo, activeFlag, costFlag, courtId, noticeSendTypeResultCode, noticeSendTypeResultName, selectCode } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.noticeSendTypeResultName LIKE '%${text}%' OR A.noticeSendTypeResultCode LIKE '%${text}%')`)
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

        if (typeof noticeSendTypeResultCode !== "undefined") {
          await conditions.andWhere("A.noticeSendTypeResultCode = :noticeSendTypeResultCode", { noticeSendTypeResultCode });
        }

        if (typeof noticeSendTypeResultName !== "undefined") {
          await conditions.andWhere("A.noticeSendTypeResultName = :noticeSendTypeResultName", { noticeSendTypeResultName });
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


  // GET Method
  async findORACLEData(filters: any = null, pages: any = null) {
    try {
      const conditions = await this.oracleLookupNoticeSendTypeResultRepositories.createQueryBuilder("A");

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
            .orderBy("A.noticeSendTypeResultId", "DESC");
        }
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find lookup notice send type result failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.oracleLookupNoticeSendTypeResultRepositories.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters, moduleId);

      const total = 1;

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find one lookup notice send type result failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  async createData(payloadId: number, data: OracleLookupNoticeSendTypeResultDTO) {
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
      const created = await this.oracleLookupNoticeSendTypeResultRepositories.create(createData);
      await this.oracleLookupNoticeSendTypeResultRepositories.save(created);

      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: create lookup notice send type result failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
