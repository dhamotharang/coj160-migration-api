import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleNoticeIssuedDTO } from '../dto/notice-issued.dto';
import { OracleNoticeSendResultDTO } from '../dto/notice-send-result.dto';
import { MySQLNoticeSends } from '../entities/mysql/notice-send.entity';
import { OracleNoticeSendResults } from '../entities/oracle/notice-send-result.entity';

@Injectable()
export class NoticeSendResultService extends HelperService {
  constructor(
    @InjectRepository(OracleNoticeSendResults)
    private oracleNoticeSendResultRepositories: Repository<OracleNoticeSendResults>,
    @InjectRepository(MySQLNoticeSends, "mysql")
    private mysqlNoticeSendService: Repository<MySQLNoticeSends>,
  ) {
    super();
  }


  // Filter zone
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.where("A.resultId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.removedBy = 0");
      }

      if (filters) {
        const { text, orderNo, courtOrder, evidenceForOrder, judgeId, litigantReceivedDate, mapAttachURL, notes, noticeChecker, noticeId } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.orderNo LIKE '%${text}%' OR A.evidenceForOrder LIKE '%${text}%')`)
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof courtOrder !== "undefined") {
          await conditions.andWhere("A.courtOrder = :courtOrder", { courtOrder });
        }

        if (typeof evidenceForOrder !== "undefined") {
          await conditions.andWhere("A.evidenceForOrder = :evidenceForOrder", { evidenceForOrder });
        }

        if (typeof judgeId !== "undefined") {
          await conditions.andWhere("A.judgeId = :judgeId", { judgeId });
        }

        if (typeof notes !== "undefined") {
          await conditions.andWhere("A.notes = :notes", { notes });
        }

        if (typeof noticeId !== "undefined") {
          await conditions.andWhere("A.noticeId = :noticeId", { noticeId });
        }

        if (typeof mapAttachURL !== "undefined") {
          await conditions.andWhere("A.mapAttachURL = :mapAttachURL", { mapAttachURL });
        }

        if (typeof litigantReceivedDate !== "undefined") {
          await conditions.andWhere("TO_CHAR(A.litigantReceivedDate, 'YYYY-MM-DD') = :litigantReceivedDate", { litigantReceivedDate });
        }

        if (typeof noticeChecker !== "undefined") {
          await conditions.andWhere("A.noticeChecker = :noticeChecker", { noticeChecker });
        }
      }

      return conditions;
    } catch (error) {
      throw new HttpException(`[oracle: filter] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
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
  async findORACLEData(filters: any = null, pages: any = null) {
    try {
      const conditions = await this.oracleNoticeSendResultRepositories.createQueryBuilder("A");

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
            .orderBy("A.resultId", "DESC");
        }
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find notice send result failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.oracleNoticeSendResultRepositories.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters, moduleId);

      const total = 1;

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find one notice send result failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
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



  // POST Method
  async createData(payloadId: number, data: OracleNoticeSendResultDTO) {
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

      const created = await this.oracleNoticeSendResultRepositories.create(createData);
      await this.oracleNoticeSendResultRepositories.save(created);

      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: create notice send result failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
