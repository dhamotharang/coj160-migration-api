import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleLookupCourtDTO } from '../dto/lookup-court.dto';
import { OracleLookupCourts } from '../entities/oracle/lookup-court.entity';

@Injectable()
export class LookupCourtService extends HelperService {
  constructor(
    @InjectRepository(OracleLookupCourts)
    private oracleLookupJudgeRepositories: Repository<OracleLookupCourts>,
  ) {
    super();
  }


  // Filter zone
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.where("A.courtId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.removedBy = 0");
      }

      if (filters) {
        const { text, orderNo, cLan, courtCode, courtLevelID, courtNameEN, courtNameTH, courtPart, courtTypeId, } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`(
            A.address LIKE '%${text}%' OR 
            A.courtAddr LIKE '%${text}%' OR
            A.courtNameEN LIKE '%${text}%' OR
            A.courtNameTH LIKE '%${text}%'
            )`)
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof cLan !== "undefined") {
          await conditions.andWhere("A.cLan = :cLan", { cLan });
        }

        if (typeof courtCode !== "undefined") {
          await conditions.andWhere("A.courtCode = :courtCode", { courtCode });
        }

        if (typeof courtLevelID !== "undefined") {
          await conditions.andWhere("A.courtLevelID = :courtLevelID", { courtLevelID });
        }

        if (typeof courtNameEN !== "undefined") {
          await conditions.andWhere("A.courtNameEN = :courtNameEN", { courtNameEN });
        }

        if (typeof courtNameTH !== "undefined") {
          await conditions.andWhere("A.courtNameTH = :courtNameTH", { courtNameTH });
        }

        if (typeof courtPart !== "undefined") {
          await conditions.andWhere("A.courtPart = :courtPart", { courtPart });
        }

        if (typeof courtTypeId !== "undefined") {
          await conditions.andWhere("A.courtTypeId = :courtTypeId", { courtTypeId });
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
      const conditions = await this.oracleLookupJudgeRepositories.createQueryBuilder("A");

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
          .orderBy("A.courtId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find lookup court failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.oracleLookupJudgeRepositories.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters, moduleId);

      const total = 1;

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find one lookup court failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  async createData(payloadId: number, data: OracleLookupCourtDTO) {
    try {
      const createdDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const created = await this.oracleLookupJudgeRepositories.create({
        ...data,
        createdBy: payloadId,
        updatedBy: payloadId,
        removedBy: 0,
        createdDate,
        updatedDate: createdDate
      });
      await this.oracleLookupJudgeRepositories.save(created);

      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: create lookup court failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
