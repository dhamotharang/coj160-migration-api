import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleFinReceiptBalanceHistorieDTO } from '../dto/fin-receipt-balance-history.dto';
import { OracleFinReceiptBalanceHistories } from '../entities/oracle/fin-receipt-balance-history.entity';

@Injectable()
export class ReceiptBalanceHistoryService extends HelperService {
  constructor(
    @InjectRepository(OracleFinReceiptBalanceHistories)
    private readonly oracleFinReceiptBalanceHistorieRepositories: Repository<OracleFinReceiptBalanceHistories>,
  ) {
    super();
  }

  // Filter
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId !== 0) {
        await conditions.where("A.receiptBalanceHistoryId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.removedBy = 0");
      }

      if (filters) {
        const { text, receiptId, paidType, paidDescription, cashAmount, chequeAmount, transferAmount, creditAmount, totalAmount, courtId } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.paidDescription LIKE '%${text}%'`)
        }

        if (typeof receiptId !== "undefined") {
          await conditions.andWhere("A.receiptId = :receiptId", { receiptId });
        }

        if (typeof paidType !== "undefined") {
          await conditions.andWhere("A.paidType = :paidType", { paidType });
        }

        if (typeof courtId !== "undefined") {
          await conditions.andWhere("A.courtId = :courtId", { courtId });
        }

        if (typeof paidDescription !== "undefined") {
          await conditions.andWhere("A.paidDescription = :paidDescription", { paidDescription });
        }

        if (typeof cashAmount !== "undefined") {
          await conditions.andWhere("A.cashAmount = :cashAmount", { cashAmount });
        }

        if (typeof chequeAmount !== "undefined") {
          await conditions.andWhere("A.chequeAmount = :chequeAmount", { chequeAmount });
        }

        if (typeof transferAmount !== "undefined") {
          await conditions.andWhere("A.transferAmount = :transferAmount", { transferAmount });
        }

        if (typeof creditAmount !== "undefined") {
          await conditions.andWhere("A.creditAmount = :creditAmount", { creditAmount });
        }

        if (typeof totalAmount !== "undefined") {
          await conditions.andWhere("A.totalAmount = :totalAmount", { totalAmount });
        }
      }

      return await conditions;
    } catch (error) {
      throw new HttpException(`[oracle: filter failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }





  // GET Method
  async findORACLEData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const conditions = await this.oracleFinReceiptBalanceHistorieRepositories.createQueryBuilder("A");

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
          .orderBy("A.receiptBalanceHistoryId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find receipt failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.oracleFinReceiptBalanceHistorieRepositories.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters, moduleId);

      const getItems = await conditions.getOne();
      const items = await getItems ? getItems.toResponseObject() : null;

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[oracle: find one receipt failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  async createData(payloadId: number, data: OracleFinReceiptBalanceHistorieDTO) {
    try {
      const createdDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const created = await this.oracleFinReceiptBalanceHistorieRepositories.create({
        ...data,
        createdBy: payloadId,
        removedBy: 0,
        createdDate,
        updatedDate: createdDate,
        removedDate: createdDate
      });
      await this.oracleFinReceiptBalanceHistorieRepositories.save(created);
      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: create receipt cancel failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
