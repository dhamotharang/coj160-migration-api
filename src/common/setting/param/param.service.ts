import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OracleParams } from '../entities/oracle/param.entity';

@Injectable()
export class ParamService {
  constructor(
    @InjectRepository(OracleParams) private readonly oracleParamRepositories: Repository<OracleParams>
  ) { }

  async findORACLEData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const { text, orderNo, paramName, paramValue } = filters;
      const conditions = await this.oracleParamRepositories.createQueryBuilder("A")
        .where("A.removedBy = 0")
      if (typeof text !== "undefined") {
        await conditions.andWhere(`(A.paramDescription LIKE '%${text}%' OR A.paramValue LIKE '%${text}%' OR A.paramName LIKE '%${text}%')`)
      }

      if (typeof orderNo !== "undefined") {
        await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
      }

      if (typeof paramName !== "undefined") {
        await conditions.andWhere("A.paramName = :paramName", { paramName });
      }

      if (typeof paramValue !== "undefined") {
        await conditions.andWhere("A.paramValue = :paramValue", { paramValue });
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
      } else if (orders) {
        await conditions.orderBy("paramId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[find data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(filters: any = null) {
    try {
      const { text, orderNo, paramName, paramValue } = filters;
      const conditions = await this.oracleParamRepositories.createQueryBuilder("A")
        .where("A.removedBy = 0")
      if (typeof text !== "undefined") {
        await conditions.andWhere(`(A.paramDescription LIKE '%${text}%' OR A.paramValue LIKE '%${text}%' OR A.paramName LIKE '%${text}%')`)
      }

      if (typeof orderNo !== "undefined") {
        await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
      }

      if (typeof paramName !== "undefined") {
        await conditions.andWhere("A.paramName = :paramName", { paramName });
      }

      if (typeof paramValue !== "undefined") {
        await conditions.andWhere("A.paramValue = :paramValue", { paramValue });
      }

      const total = 1;

      const getItems = await conditions.getOne();
      const items = await getItems.toResponseObject();

      return { items, total };
    } catch (error) {
      throw new HttpException(`[find data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
