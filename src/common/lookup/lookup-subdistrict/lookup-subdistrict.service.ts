import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MigrationLogService } from 'src/common/migrate/migration-log/migration-log.service';
import { ParamService } from 'src/common/setting/param/param.service';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { MySQLTambons } from '../entities/mysql/tambon.entity';
import { OracleLookupSubdistricts } from '../entities/oracle/lookup-subdistrict.entity';

@Injectable()
export class LookupSubdistrictService extends HelperService {
  constructor(
    @InjectRepository(OracleLookupSubdistricts)
    private readonly oracleLookupRequestTypeRepositories: Repository<OracleLookupSubdistricts>,
    @InjectRepository(MySQLTambons, "mysql")
    private readonly mysqlRequestTypeRepositories: Repository<MySQLTambons>,
  ) {
    super()
  }

  // Filter zone
  async mysqlFilter(conditions: any = null, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.where("A.subdistrictId = :moduleId", { moduleId });
      }

      if (filters) {
        const { text, orderNo, activeFlag, courtId, districtId, postCode, provinceId, subdistrictCode, subdistrictName } = filters;

        const conditions = await this.oracleLookupRequestTypeRepositories.createQueryBuilder("A")
          .where("A.removedBy = 0")
        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.subdistrictName LIKE '%${text}%' OR A.subdistrictCode LIKE '%${text}%')`)
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

        if (typeof districtId !== "undefined") {
          await conditions.andWhere("A.districtId = :districtId", { districtId });
        }

        if (typeof postCode !== "undefined") {
          await conditions.andWhere("A.postCode = :postCode", { postCode });
        }

        if (typeof provinceId !== "undefined") {
          await conditions.andWhere("A.provinceId = :provinceId", { provinceId });
        }

        if (typeof subdistrictCode !== "undefined") {
          await conditions.andWhere("A.subdistrictCode = :subdistrictCode", { subdistrictCode });
        }

        if (typeof subdistrictName !== "undefined") {
          await conditions.andWhere("A.subdistrictName = :subdistrictName", { subdistrictName });
        }
      }
    } catch (error) {
      throw new HttpException(`[oracle: filter failed] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // GET Method
  /* async findORACLEData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const { text, subdistrictId, orderNo, activeFlag, courtId, districtId, postCode, provinceId, selectCode, subdistrictCode, subdistrictName } = filters;

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
      throw new HttpException(`[oracle: find request one data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  } */

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
        await conditions.orderBy("A.subdistrictId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[find mysql data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
