import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaseService } from 'src/business/case/case/case.service';
import { LookupBankService } from 'src/common/lookup/lookup-bank/lookup-bank.service';
import { MigrationLogService } from 'src/common/migrate/migration-log/migration-log.service';
import { UserProfileService } from 'src/common/person/user-profile/user-profile.service';
import { ParamService } from 'src/common/setting/param/param.service';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleFinReceiptDetailDTO } from '../dto/fin-receipt-detail.dto';
import { MySQLReceiptDetails } from '../entities/mysql/receipt-detail.entity';
import { OracleFinReceiptDetails } from '../entities/oracle/fin-receipt-detail.entity';
import { OracleFinReceipts } from '../entities/oracle/fin-receipt.entity';

@Injectable()
export class ReceiptDetailService extends HelperService {
  constructor(
    @InjectRepository(OracleFinReceiptDetails)
    private readonly oracleFinReceiptTypeRepositories: Repository<OracleFinReceiptDetails>,
    @InjectRepository(MySQLReceiptDetails, "mysql")
    private readonly mysqlReceiptRepositories: Repository<MySQLReceiptDetails>,
  ) {
    super();
  }

  // Filter
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId !== 0) {
        await conditions.where("A.detailId = :moduleId", { moduleId });
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


  async mysqlFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId !== 0) {
        await conditions.where("A.receiptRunning = :moduleId", { moduleId });
      } else {
        await conditions.where("A.receiptRunning <> 0");
      }

      if (filters) {
        const { text, courtRunning, item, receiptTypeId, subTypeId, subTypeName, cashAmt, chequeAmt, creditAmt, rcvAmt } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.subTypeName LIKE '%${text}%'`)
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof item !== "undefined") {
          await conditions.andWhere("A.item = :item", { item });
        }

        if (typeof receiptTypeId !== "undefined") {
          await conditions.andWhere("A.receiptTypeId = :receiptTypeId", { receiptTypeId });
        }

        if (typeof subTypeId !== "undefined") {
          await conditions.andWhere("B.subTypeId = :subTypeId", { subTypeId });
        }

        if (typeof subTypeName !== "undefined") {
          await conditions.andWhere("A.subTypeName = :subTypeName", { subTypeName });
        }

        if (typeof cashAmt !== "undefined") {
          await conditions.andWhere("A.cashAmt = :cashAmt", { cashAmt });
        }

        if (typeof chequeAmt !== "undefined") {
          await conditions.andWhere("A.chequeAmt = :chequeAmt", { chequeAmt });
        }

        if (typeof creditAmt !== "undefined") {
          await conditions.andWhere("A.creditAmt = :creditAmt", { creditAmt });
        }

        if (typeof rcvAmt !== "undefined") {
          await conditions.andWhere("A.rcvAmt = :rcvAmt", { rcvAmt });
        }
      }

      return await conditions;
    } catch (error) {
      throw new HttpException(`[mysql: filter failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }




  // GET Method
  async findORACLEData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const conditions = await this.oracleFinReceiptTypeRepositories.createQueryBuilder("A");

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
          .orderBy("A.detailId", "DESC");
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
      const conditions = await this.oracleFinReceiptTypeRepositories.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters, moduleId);

      const getItems = await conditions.getOne();
      const items = await getItems ? getItems.toResponseObject() : null;

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[oracle: find one receipt failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const conditions = await this.mysqlReceiptRepositories.createQueryBuilder("A");

      await this.mysqlFilter(conditions, filters);

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
        await conditions.orderBy("A.receiptRunning", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await Promise.all(await getItems.map(async element => element.toResponseObject()));

      return { items, total };
    } catch (error) {
      throw new HttpException(`[mysql: find receipt failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.mysqlReceiptRepositories.createQueryBuilder("A");

      await this.mysqlFilter(conditions, filters, moduleId);

      const getItems = await conditions.getOne();
      const items = await getItems.toResponseObject();

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[mysql: find one receipt failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  async createData(payloadId: number, data: OracleFinReceiptDetailDTO) {
    try {
      const createdDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const created = await this.oracleFinReceiptTypeRepositories.create({
        ...data,
        createdBy: payloadId,
        removedBy: 0,
        createdDate,
        updatedDate: createdDate,
        removedDate: createdDate
      });
      await this.oracleFinReceiptTypeRepositories.save(created);
      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: create receipt failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
