import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { MySQLNoticeSends } from '../entities/mysql/notice-send.entity';

@Injectable()
export class NoticeSendService extends HelperService {
  constructor(
    @InjectRepository(MySQLNoticeSends, "mysql")
    private mysqlNoticeSendService: Repository<MySQLNoticeSends>
  ) {
    super();
  }


  // Filter zone
  async mysqlFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.where("A.noticeRunning = :moduleId", { moduleId });
      } else {
        await conditions.where("A.noticeRunning <> 0");
      }

      if (filters) {
        const { text, courtRunning, sendItem, sendBy, receiveOffId, receiveDate, sOfficerId, sendDate, cancelFlag, devoidFlag } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.remark LIKE '%${text}%' OR A.shortJudgeName LIKE '%${text}%')`)
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof sendItem !== "undefined") {
          await conditions.andWhere("A.sendItem = :sendItem", { sendItem });
        }

        if (typeof sendBy !== "undefined") {
          await conditions.andWhere("A.sendBy = :sendBy", { sendBy });
        }

        if (typeof receiveOffId !== "undefined") {
          await conditions.andWhere("A.receiveOffId = :receiveOffId", { receiveOffId });
        }

        if (typeof receiveDate !== "undefined") {
          await conditions.andWhere("TO_CHAR(A.receiveDate, 'YYYY-MM-DD') = :receiveDate", { receiveDate });
        }

        if (typeof sOfficerId !== "undefined") {
          await conditions.andWhere("A.sOfficerId = :sOfficerId", { sOfficerId });
        }

        if (typeof sendDate !== "undefined") {
          await conditions.andWhere("TO_CHAR(A.sendDate, 'YYYY-MM-DD') = :sendDate", { sendDate });
        }

        if (typeof cancelFlag !== "undefined") {
          await conditions.andWhere("A.cancelFlag = :cancelFlag", { cancelFlag });
        }

        if (typeof devoidFlag !== "undefined") {
          await conditions.andWhere("A.devoidFlag = :devoidFlag", { devoidFlag });
        }
      }

      return conditions;
    } catch (error) {
      throw new HttpException(`[mysql: filter] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


  // GET Method
  async findMYSQLData(filters: any = null, pages: any = null) {
    try {
      const conditions = await this.mysqlNoticeSendService.createQueryBuilder("A");

      await this.mysqlFilter(conditions, filters);

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
          .orderBy("A.judgeId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[mysql: find judge failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.mysqlNoticeSendService.createQueryBuilder("A");

      await this.mysqlFilter(conditions, filters, moduleId);

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[mysql: find one judge failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
