import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OracleLookupAllegationDTO } from 'src/common/lookup/dto/lookup-allegation.dto';
import { OracleLookupAllegations } from 'src/common/lookup/entities/oracle/lookup-allegation.entity';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';

@Injectable()
export class LookupAllegationService extends HelperService {
  constructor(
    @InjectRepository(OracleLookupAllegations)
    private oracleNoticeRepositories: Repository<OracleLookupAllegations>,
  ) {
    super();
  }


  // Filter zone
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.where("A.allegationId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.removedBy = 0");
      }

      if (filters) {
        const { text, orderNo, activeFlag, allegationCode, allegationName, casetypeId, courtId, fineAmount, offenseId } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.allegationName LIKE '%${text}%' OR A.matraName LIKE '%${text}%' )`)
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof activeFlag !== "undefined") {
          await conditions.andWhere("A.activeFlag = :activeFlag", { activeFlag });
        }

        if (typeof allegationCode !== "undefined") {
          await conditions.andWhere("A.allegationCode = :allegationCode", { allegationCode });
        }

        if (typeof allegationName !== "undefined") {
          await conditions.andWhere("A.allegationName = :allegationName", { allegationName });
        }

        if (typeof casetypeId !== "undefined") {
          await conditions.andWhere("A.casetypeId = :casetypeId", { casetypeId });
        }

        if (typeof courtId !== "undefined") {
          await conditions.andWhere("A.courtId = :courtId", { courtId });
        }

        if (typeof fineAmount !== "undefined") {
          await conditions.andWhere("A.fineAmount = :fineAmount", { fineAmount });
        }

        if (typeof offenseId !== "undefined") {
          await conditions.andWhere("A.offenseId = :offenseId", { offenseId });
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
            .orderBy("A.allegationId", "DESC");
        }
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find lookup allegation failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
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
      throw new HttpException(`[oracle: find one lookup allegation failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  async createData(payloadId: number, data: OracleLookupAllegationDTO) {
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
      throw new HttpException(`[oracle: create lookup allegation failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
