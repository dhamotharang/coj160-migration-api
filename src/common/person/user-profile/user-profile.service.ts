import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OracleUserProfiles } from '../entities/oracle/user-profile.entity';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(OracleUserProfiles)
    private readonly oracleUserProfileRepositories: Repository<OracleUserProfiles>
  ) { }

  async findORACLEData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const conditions = await this.oracleUserProfileRepositories.createQueryBuilder("A")
        .where("A.userProfileId <> 0");

      if (filters) {
        const { text, userProfileId, orderNo, userProfileCode, createStatement, createWarrant, userProfileDefaultSelect, userProfileFullName } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.userProfileFullName LIKE '%${text}%' OR A.userProfileCode LIKE '%${text}%')`)
        }

        if (typeof userProfileId !== "undefined") {
          await conditions.andWhere("A.userProfileId = :userProfileId", { userProfileId });
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof userProfileCode !== "undefined") {
          await conditions.andWhere("A.userProfileCode = :userProfileCode", { userProfileCode });
        }

        if (typeof createStatement !== "undefined") {
          await conditions.andWhere("A.createStatement = :createStatement", { createStatement });
        }

        if (typeof createWarrant !== "undefined") {
          await conditions.andWhere("A.createWarrant = :createWarrant", { createWarrant });
        }

        if (typeof userProfileDefaultSelect !== "undefined") {
          await conditions.andWhere("A.userProfileDefaultSelect = :userProfileDefaultSelect", { userProfileDefaultSelect });
        }

        if (typeof userProfileFullName !== "undefined") {
          await conditions.andWhere("A.userProfileFullName = :userProfileFullName", { userProfileFullName });
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
        await conditions.orderBy("A.depCode", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[find oracle data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(moduleId: number = 0, filters: any = null) {
    try {
      const conditions = await this.oracleUserProfileRepositories.createQueryBuilder("A")

      if (moduleId > 0) {
        await conditions.where("A.userProfileId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.userProfileId <> 0");
      }

      if (filters) {
        const { text, orderNo, userProfileCode, createStatement, createWarrant, userProfileDefaultSelect, userProfileFullName } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.userProfileFullName LIKE '%${text}%' OR A.userProfileCode LIKE '%${text}%')`)
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof userProfileCode !== "undefined") {
          await conditions.andWhere("A.userProfileCode = :userProfileCode", { userProfileCode });
        }

        if (typeof createStatement !== "undefined") {
          await conditions.andWhere("A.createStatement = :createStatement", { createStatement });
        }

        if (typeof createWarrant !== "undefined") {
          await conditions.andWhere("A.createWarrant = :createWarrant", { createWarrant });
        }

        if (typeof userProfileDefaultSelect !== "undefined") {
          await conditions.andWhere("A.userProfileDefaultSelect = :userProfileDefaultSelect", { userProfileDefaultSelect });
        }

        if (typeof userProfileFullName !== "undefined") {
          await conditions.andWhere("A.userProfileFullName = :userProfileFullName", { userProfileFullName });
        }
      }

      const getItems = await conditions.getOne();
      const items = await getItems ? getItems.toResponseObject() : null;

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[oracle: find user profile one data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  /* async findMYSQLData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const conditions = await this.mysqlDepartmentRepositories.createQueryBuilder("A")
        .where("A.depCode <> 0");

      if (filters) {
        const { text, depCode, courtRunning, depName, viewAdmin, layOut } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.depName LIKE '%${text}%'`)
        }

        if (typeof depCode !== "undefined") {
          await conditions.andWhere("A.depCode = :depCode", { depCode });
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof depName !== "undefined") {
          await conditions.andWhere("A.depName = :depName", { depName });
        }

        if (typeof viewAdmin !== "undefined") {
          await conditions.andWhere("A.viewAdmin = :viewAdmin", { viewAdmin });
        }

        if (typeof layOut !== "undefined") {
          await conditions.andWhere("A.layOut = :layOut", { layOut });
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
        await conditions.orderBy("A.depCode", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[find mysql data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLOneData(depCode: number = null, filters: any = null) {
    try {
      const conditions = await this.mysqlDepartmentRepositories.createQueryBuilder("A")
        .where("A.offId <> 0");

      if (depCode) {
        await conditions.andWhere("A.depCode = :depCode", { depCode });
      }

      if (filters) {
        const { text, courtRunning, depName, viewAdmin, layOut } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.depName LIKE '%${text}%'`)
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof depName !== "undefined") {
          await conditions.andWhere("A.depName = :depName", { depName });
        }

        if (typeof viewAdmin !== "undefined") {
          await conditions.andWhere("A.viewAdmin = :viewAdmin", { viewAdmin });
        }

        if (typeof layOut !== "undefined") {
          await conditions.andWhere("A.layOut = :layOut", { layOut });
        }
      }

      const getItems = await conditions.getOne();
      const items = await getItems.toResponseObject();

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[find mysql one data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  } */

  /* // POST Method
  async createData(payloadId: number, data: OracleLookupDepartmentDTO) {
    try {
      const createdDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const created = await this.oracleUserProfileRepositories.create({ ...data, activeFlag: 1, createdBy: payloadId, updatedBy: payloadId, removedBy: 0, createdDate, updatedDate: createdDate });
      await this.oracleUserProfileRepositories.save(created);
      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[create data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  } */
}
