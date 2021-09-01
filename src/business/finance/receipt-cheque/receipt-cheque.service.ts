import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleFinReceiptChequeDTO } from '../dto/fin-receipt-cheque.dto';
import { OracleFinReceiptCheques } from '../entities/oracle/fin-receipt-cheque.entity';

@Injectable()
export class ReceiptChequeService extends HelperService {
  constructor(
    @InjectRepository(OracleFinReceiptCheques)
    private readonly oracleFinReceiptChequeRepositories: Repository<OracleFinReceiptCheques>,
  ) {
    super();
  }

  // Filter
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId !== 0) {
        await conditions.where("A.chequeId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.removedBy = 0");
      }

      if (filters) {
        const { text, receiptId, orderNo, chequeCode, bankCode, branch, notes, paidDate, amount, courtId, receiptDetailId, bankName } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.bankName LIKE '%${text}%' OR A.notes LIKE '%${text}%')`);
        }

        if (typeof receiptId !== "undefined") {
          await conditions.andWhere("A.receiptId = :receiptId", { receiptId });
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof courtId !== "undefined") {
          await conditions.andWhere("A.courtId = :courtId", { courtId });
        }

        if (typeof chequeCode !== "undefined") {
          await conditions.andWhere("A.chequeCode = :chequeCode", { chequeCode });
        }

        if (typeof bankCode !== "undefined") {
          await conditions.andWhere("A.bankCode = :bankCode", { bankCode });
        }

        if (typeof branch !== "undefined") {
          await conditions.andWhere("A.branch = :branch", { branch });
        }

        if (typeof notes !== "undefined") {
          await conditions.andWhere("A.notes = :notes", { notes });
        }

        if (typeof paidDate !== "undefined") {
          await conditions.andWhere("TO_CHAR(A.paidDate, 'YYYY-MM-DD') = :paidDate", { paidDate });
        }

        if (typeof amount !== "undefined") {
          await conditions.andWhere("A.amount = :amount", { amount });
        }

        if (typeof receiptDetailId !== "undefined") {
          await conditions.andWhere("A.receiptDetailId = :receiptDetailId", { receiptDetailId });
        }

        if (typeof bankName !== "undefined") {
          await conditions.andWhere("A.bankName = :bankName", { bankName });
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
      const conditions = await this.oracleFinReceiptChequeRepositories.createQueryBuilder("A");

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
          .orderBy("A.chequeId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find receipt cheque failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.oracleFinReceiptChequeRepositories.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters, moduleId);

      const getItems = await conditions.getOne();
      const items = await getItems ? getItems.toResponseObject() : null;

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[oracle: find one receipt cheque failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  async createData(payloadId: number, data: OracleFinReceiptChequeDTO) {
    try {
      const createdDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const created = await this.oracleFinReceiptChequeRepositories.create({
        ...data,
        createdBy: payloadId,
        removedBy: 0,
        createdDate,
        updatedDate: createdDate,
        removedDate: createdDate
      });
      await this.oracleFinReceiptChequeRepositories.save(created);
      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: create receipt cheque failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
