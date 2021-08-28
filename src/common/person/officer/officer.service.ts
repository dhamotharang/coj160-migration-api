import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { MySQLOfficers } from '../entities/mysql/officer.entity';

@Injectable()
export class OfficerService extends HelperService {
  constructor(
    @InjectRepository(MySQLOfficers, "mysql")
    private readonly mysqlOfficerRepositories: Repository<MySQLOfficers>,
  ) {
    super()
  }

  async findMYSQLData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const conditions = await this.mysqlOfficerRepositories.createQueryBuilder("A")
        .where("A.offId <> 0");

      if (filters) {
        const { text, offId, courtRunning, offName, depCode, postId, postLevelId } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.offName LIKE '%${text}%'`)
        }

        if (typeof offId !== "undefined") {
          await conditions.andWhere("A.offId = :offId", { offId });
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof offName !== "undefined") {
          await conditions.andWhere("A.offName = :offName", { offName });
        }

        if (typeof depCode !== "undefined") {
          await conditions.andWhere("A.depCode = :depCode", { depCode });
        }

        if (typeof postId !== "undefined") {
          await conditions.andWhere("A.postId = :postId", { postId });
        }

        if (typeof postLevelId !== "undefined") {
          await conditions.andWhere("A.postLevelId = :postLevelId", { postLevelId });
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
        await conditions.orderBy("A.offId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[find mysql data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLOneData(offId: number = null, filters: any = null) {
    try {
      const conditions = await this.mysqlOfficerRepositories.createQueryBuilder("A")
        .where("A.offId <> 0");

      if (offId) {
        await conditions.andWhere("A.offId = :offId", { offId });
      }

      if (filters) {
        const { text, courtRunning, offName, depCode, postId, postLevelId } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.offName LIKE '%${text}%'`)
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof offName !== "undefined") {
          await conditions.andWhere("A.offName = :offName", { offName });
        }

        if (typeof depCode !== "undefined") {
          await conditions.andWhere("A.depCode = :depCode", { depCode });
        }

        if (typeof postId !== "undefined") {
          await conditions.andWhere("A.postId = :postId", { postId });
        }

        if (typeof postLevelId !== "undefined") {
          await conditions.andWhere("A.postLevelId = :postLevelId", { postLevelId });
        }
      }

      const getItems = await conditions.getOne();
      const items = await getItems ? getItems.toResponseObject() : null;

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[mysql: find officer failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const conditions = await this.mysqlOfficerRepositories.createQueryBuilder("A")
        .where("A.offId <> 0");

      if (filters) {
        const { text, offId, courtRunning, offName, depCode, postId, postLevelId } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.offName LIKE '%${text}%'`)
        }

        if (typeof offId !== "undefined") {
          await conditions.andWhere("A.offId = :offId", { offId });
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof offName !== "undefined") {
          await conditions.andWhere("A.offName = :offName", { offName });
        }

        if (typeof depCode !== "undefined") {
          await conditions.andWhere("A.depCode = :depCode", { depCode });
        }

        if (typeof postId !== "undefined") {
          await conditions.andWhere("A.postId = :postId", { postId });
        }

        if (typeof postLevelId !== "undefined") {
          await conditions.andWhere("A.postLevelId = :postLevelId", { postLevelId });
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
        await conditions.orderBy("A.offId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[find mysql data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(offId: number = null, filters: any = null) {
    try {
      const conditions = await this.mysqlOfficerRepositories.createQueryBuilder("A")
        .where("A.offId <> 0");

      if (offId) {
        await conditions.andWhere("A.offId = :offId", { offId });
      }

      if (filters) {
        const { text, offId, courtRunning, offName, depCode, postId, postLevelId } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.offName LIKE '%${text}%'`)
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof offName !== "undefined") {
          await conditions.andWhere("A.offName = :offName", { offName });
        }

        if (typeof depCode !== "undefined") {
          await conditions.andWhere("A.depCode = :depCode", { depCode });
        }

        if (typeof postId !== "undefined") {
          await conditions.andWhere("A.postId = :postId", { postId });
        }

        if (typeof postLevelId !== "undefined") {
          await conditions.andWhere("A.postLevelId = :postLevelId", { postLevelId });
        }
      }

      const getItems = await conditions.getOne();
      const items = await getItems.toResponseObject();

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[find mysql data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
