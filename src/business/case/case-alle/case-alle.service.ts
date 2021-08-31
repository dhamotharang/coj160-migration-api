import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleCaseAlleDTO } from '../dto/case-alle.dto';
import { OracleCaseAlles } from '../entities/oracle/case-alle.entity';

@Injectable()
export class CaseAlleService extends HelperService {
  constructor(
    @InjectRepository(OracleCaseAlles)
    private oracleNoticeRepositories: Repository<OracleCaseAlles>,
  ) {
    super();
  }


  // Filter zone
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.where("A.caseAlleId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.removedBy = 0");
      }

      if (filters) {
        const { text, orderNo, allegationId, courtId, caseId } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.orderNo LIKE '%${text}%')`)
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof allegationId !== "undefined") {
          await conditions.andWhere("A.allegationId = :allegationId", { allegationId });
        }

        if (typeof courtId !== "undefined") {
          await conditions.andWhere("A.courtId = :courtId", { courtId });
        }

        if (typeof caseId !== "undefined") {
          await conditions.andWhere("A.caseId = :caseId", { caseId });
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
      const conditions = await this.oracleNoticeRepositories.createQueryBuilder("A");

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
            .orderBy("A.caseAlleId", "DESC");
        }
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find case allegation failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.oracleNoticeRepositories.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters, moduleId);

      const total = 1;

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find one case allegation failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  async createData(payloadId: number, data: OracleCaseAlleDTO) {
    try {
      const createdDate = this.dateFormat("YYYY-MM-DD H:i:s");
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

      const created = await this.oracleNoticeRepositories.create(createData);
      await this.oracleNoticeRepositories.save(created);

      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: create case allegation failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
