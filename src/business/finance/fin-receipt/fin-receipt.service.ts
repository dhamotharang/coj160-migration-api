import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaseService } from 'src/business/case/case/case.service';
import { MySQLBanks } from 'src/common/lookup/entities/mysql/bank.entity';
import { MySQLReceiptTypes } from 'src/common/lookup/entities/mysql/receipt-type.entity';
import { LookupBankService } from 'src/common/lookup/lookup-bank/lookup-bank.service';
import { LookupReceiptSubTypeService } from 'src/common/lookup/lookup-receipt-sub-type/lookup-receipt-sub-type.service';
import { LookupReceiptTypeService } from 'src/common/lookup/lookup-receipt-type/lookup-receipt-type.service';
import { MigrationLogService } from 'src/common/migrate/migration-log/migration-log.service';
import { UserProfileService } from 'src/common/person/user-profile/user-profile.service';
import { ParamService } from 'src/common/setting/param/param.service';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleFinReceiptDTO } from '../dto/fin-receipt.dto';
import { MySQLReceipts } from '../entities/mysql/receipt.entity';
import { OracleFinReceipts } from '../entities/oracle/fin-receipt.entity';
import { ReceiptBalanceHistoryService } from '../receipt-balance-history/receipt-balance-history.service';
import { ReceiptCancelService } from '../receipt-cancel/receipt-cancel.service';
import { ReceiptChequeService } from '../receipt-cheque/receipt-cheque.service';
import { ReceiptCrditService } from '../receipt-credit/receipt-credit.service';
import { ReceiptDetailService } from '../receipt-detail/receipt-detail.service';
import { PaymentDetailService } from '../payment-detail/payment-detail.service';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class FinReceiptService extends HelperService {
  constructor(
    @InjectRepository(OracleFinReceipts)
    private oracleFinReceiptTypeRepositories: Repository<OracleFinReceipts>,
    @InjectRepository(MySQLReceipts, "mysql")
    private mysqlReceiptRepositories: Repository<MySQLReceipts>,
    @InjectRepository(MySQLBanks, "mysql")
    private mysqlBankRepositories: Repository<MySQLBanks>,

    private migrateLogService: MigrationLogService,
    private paramService: ParamService,

    private caseService: CaseService,
    private userProfileService: UserProfileService,
    private lookupBankService: LookupBankService,
    private receiptDetailService: ReceiptDetailService,
    private lookupReceiptTypeService: LookupReceiptTypeService,
    private lookupReceiptSubTypeService: LookupReceiptSubTypeService,
    private receiptChequeService: ReceiptChequeService,
    private receiptCrditService: ReceiptCrditService,
    private receiptCancelService: ReceiptCancelService,
    private paymentService: PaymentService,
    private receiptPaymentDetailService: PaymentDetailService,
    private receiptBalanceHistoryService: ReceiptBalanceHistoryService,
  ) {
    super();
  }

  // Filter
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId !== 0) {
        await conditions.where("A.receiptId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.removedBy = 0");
      }

      if (filters) {
        const { text, courtId, caseId, orderNo, receiptBookNo, receiptNo, receivedDate, govBudgetYear, litigantType, payerOrderNo, payerName } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.payerName LIKE '%${text}%' OR A.receiptBookNo LIKE '%${text}%')`)
        }

        if (typeof caseId !== "undefined") {
          await conditions.andWhere("A.caseId = :caseId", { caseId });
        }

        if (typeof receiptBookNo !== "undefined") {
          await conditions.andWhere("A.receiptBookNo = :receiptBookNo", { receiptBookNo });
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof courtId !== "undefined") {
          await conditions.andWhere("A.courtId = :courtId", { courtId });
        }

        if (typeof receiptNo !== "undefined") {
          await conditions.andWhere("A.receiptNo = :receiptNo", { receiptNo });
        }

        if (typeof receivedDate !== "undefined") {
          await conditions.andWhere("TO_CHAR(A.receivedDate, 'YYYY-MM-DD') = :receivedDate", { receivedDate });
        }

        if (typeof govBudgetYear !== "undefined") {
          await conditions.andWhere("A.govBudgetYear = :govBudgetYear", { govBudgetYear });
        }

        if (typeof litigantType !== "undefined") {
          await conditions.andWhere("A.litigantType = :litigantType", { litigantType });
        }

        if (typeof payerOrderNo !== "undefined") {
          await conditions.andWhere("A.payerOrderNo = :payerOrderNo", { payerOrderNo });
        }

        if (typeof payerName !== "undefined") {
          await conditions.andWhere("A.payerName = :payerName", { payerName });
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
        const { text, courtRunning, receiptRunning, runId, appealType, rcvDate, budgetYear, rcvFlag, sType, bookNo, rreceiptNo, prosAccuType, } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.subTypeName LIKE '%${text}%'`)
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof receiptRunning !== "undefined") {
          await conditions.andWhere("A.receiptRunning = :receiptRunning", { receiptRunning });
        }

        if (typeof runId !== "undefined") {
          await conditions.andWhere("A.runId = :runId", { runId });
        }

        if (typeof appealType !== "undefined") {
          await conditions.andWhere("A.appealType = :appealType", { appealType });
        }

        if (typeof rcvDate !== "undefined") {
          await conditions.andWhere("B.rcvDate = :rcvDate", { rcvDate });
        }

        if (typeof budgetYear !== "undefined") {
          await conditions.andWhere("A.budgetYear = :budgetYear", { budgetYear });
        }
        if (typeof rcvFlag !== "undefined") {
          await conditions.andWhere("A.rcvFlag = :rcvFlag", { rcvFlag });
        }
        if (typeof sType !== "undefined") {
          await conditions.andWhere("A.sType = :sType", { sType });
        }
        if (typeof bookNo !== "undefined") {
          await conditions.andWhere("A.bookNo = :bookNo", { bookNo });
        }
        if (typeof rreceiptNo !== "undefined") {
          await conditions.andWhere("A.rreceiptNo = :rreceiptNo", { rreceiptNo });
        }
        if (typeof prosAccuType !== "undefined") {
          await conditions.andWhere("A.prosAccuType = :prosAccuType", { prosAccuType });
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
          .orderBy("A.receiptId", "DESC");
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
      const items = await Promise.all(await getItems.map(async element => {
        const banks = await this.mysqlBankRepositories.findOne({ bankId: element.bankId });
        const payments = await (await this.paymentService.findMYSQLOneData({ runId: element.receiptRunning })).items;
        return {
          ...element.toResponseObject(),
          bankName: banks ? banks.bankName : null,
          banks: banks ? banks.toResponseObject() : null,
          payments,
          paymentRunId: payments ? payments.runId : null,
          paymentCreateUser: payments ? payments.createUser : null,
          paymentCreateDate: payments ? payments.createDate : null,
          paymentRemark: payments ? payments.remark : null,
          paymentPayAmt: payments ? payments.payAmt : null,
          paymentReceiptTypeId: payments ? payments.receiptTypeId : null,
          paymentSubTypeId: payments ? payments.subTypeId : null,
          paymentReceiptRunning: payments ? payments.receiptRunning : null,
        }
      }));

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
  async createData(payloadId: number, data: OracleFinReceiptDTO) {
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

  async createMigrationData(payloadId: number, filters: any = null) {
    try {
      const params = await (await this.paramService.findORACLEOneData({ paramName: "COURT_ID" })).items; // ค้นหารหัสของศาล
      const source = await this.findMYSQLData();

      let migrateLogs = [], errorTotal = 0, duplicateTotal = 0; // เติม
      const sourceTotal = await source.total;  // เติม

      if (await sourceTotal > 0) {
        for (let index = 0; index < source.items.length; index++) {
          const {
            receiptRunning, runId, appealType, rcvDate, budgetYear, rcvFlag, sType, bookNo, rreceiptNo, prosAccuType,
            litigantType, item, defName, leadItem, leadName, sumFee, sumCash, sumCheck, sumCredit, textbaht, transferFlag, accountNo,
            bankId, cancelFlag, userrcvId, userrcvName, usermngId, usermngName, guarRunning, guarItem, guarantorSeq, guarDef,
            sumGuar, cancelReason, ticket, ticketNo, receivedCash, returnCash, guarForfeitType, forfeitType, itemNo, payType,
            keepRunning, invoiceRunning, byHand, remark, createDepCode, createUserId, createUser, createDate, updateDepCode, updateUserId,
            updateUser, updateDate, refId, refFinrecordgen, refLitigantcode, refFinrecgen, oldRunId, refDocrecgen, refPcode, refFinrecordgenTor,
            refBlackTitle, refBlackId, refBlackYy, refCaseType, refBlackno, bankName, paymentRunId, paymentCreateUser,
            paymentCreateDate, paymentRemark, paymentPayAmt, paymentReceiptTypeId, paymentSubTypeId, paymentReceiptRunning
          } = source.items[index];

          const migresLogs = await (await this.migrateLogService.findPOSTGRESData({
            serverType: `${process.env.SERVER_TYPE}`,
            status: "SUCCESS",
            sourceDBType: "MYSQL",
            sourceTableName: "preceipt",
            sourceId: receiptRunning,
          })).items; // ตรวจสอบ Log การ Migrate ข้อมูล

          if (migresLogs.length > 0) { // หากเคย Migrate ไปแล้วระบบจะบันทึกการทำซ้ำ
            duplicateTotal = duplicateTotal + 1; // เติม

            await migrateLogs.push(await this.migrateLogService.createPOSTGRESData({
              name: "ระบบการเงิน: ประเภทย่อยใบเสร็จ",
              serverType: `${process.env.SERVER_TYPE}`,
              status: "DUPLICATE",
              datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
              sourceDBType: "MYSQL",
              sourceTableName: "preceipt",
              sourceId: receiptRunning,
              sourceData: JSON.stringify(source.items[index]),
            })); // เพิ่ม Log การ Migrate ข้อมูล
          } else {
            const cases1 = await (await this.caseService.findORACLEOneData({ convertStringCase: runId })).items; // ค้นหา การเลื่อนพิจารณา (Oracle)
            const _bankName = (`${bankName}`.replace('ธนาคาร', '')).replace('จำกัด', '');
            const banks = await (await this.lookupBankService.findORACLEOneData({ text: _bankName })).items;
            const userProfiles = await (await this.userProfileService.findORACLEOneData(null, { userProfileFullName: `${userrcvName}`.trim() })).items;

            if (!cases1) { // ถ้าไม่มีให้ทำงาน
              const createData = {
                caseId: cases1.caseId,
                changeAmount: returnCash,
                courtId: parseInt(params.paramValue),
                directorBy: 0,
                govBudgetYear: `${budgetYear}`,
                isCancelReceipt: cancelFlag ? cancelFlag : 0,
                isElectronicFiling: 0,
                isFlagAccount: transferFlag,
                bankCode: banks ? `${banks.bankId}` : null,
                receiptAccountNumber: transferFlag === 1 ? accountNo : null,
                litigantType,
                noInDateNow: 0,
                noticeProvicencialId: 0,
                payerName: `${defName}`,
                receiptBookNo: parseInt(bookNo),
                receiptNo: rreceiptNo,
                receivedBy: userProfiles.userProfileId,
                receivedCashAmount: sumCash,
                receivedDate: rcvDate,
                totalAmount: sumFee
              }; // เตรียมข้อมูลในการเพิ่ม

              const created: any = await this.createData(payloadId, createData); // เพิ่มข้อมูลการเลื่อนพิจารณาคดี

              if (!created) {
                errorTotal = errorTotal + 1; // เติม
              }

              const migrateLog1 = {
                name: "ระบบการเงิน: ประเภทย่อยใบเสร็จ",
                serverType: `${process.env.SERVER_TYPE}`,
                status: (created ? "SUCCESS" : "ERROR"),
                datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                sourceDBType: "MYSQL",
                sourceTableName: "preceipt",
                sourceId: receiptRunning,
                sourceData: JSON.stringify(createData),
                destinationDBType: "ORACLE",
                destinationTableName: "PC_FIN_RECEIPT",
                destinationId: created.receiptId,
                destinationData: JSON.stringify(created)
              }; // เตรียมข้อมูล log ในการบันทึกข้อมูล

              await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(migrateLog1)); // เพิ่ม Log การ Migrate ข้อมูล

              if (created) {
                const deails = await (await this.receiptDetailService.findMYSQLOneData(null, created.receiptId)).items;
                const myReceiptTypes = await (await this.lookupReceiptTypeService.findMYSQLOneData({ receiptTypeId: deails.receiptTypeId })).items;
                const orReceiptTypes = await (await this.lookupReceiptTypeService.findORACLEOneData({ receiptTypeName: myReceiptTypes.receiptTypeDesc })).items;

                const myReceiptSubTypes = await (await this.lookupReceiptSubTypeService.findMYSQLOneData({ subTypeId: deails.subTypeId })).items;
                const orReceiptSubTypes = await (await this.lookupReceiptSubTypeService.findORACLEOneData({ receiptSubTypeName: myReceiptSubTypes.subTypeName })).items;

                const createDetailData = {
                  receiptId: created.receiptId,
                  balance: 0,
                  cashAmount: deails.cashAmt,
                  chequeAmount: deails.chequeAmt,
                  creditAmount: deails.creditAmt,
                  isReceiptUsed: 1,
                  paidDescription: `${remark}`.trim(),
                  paidType: 1,
                  receiptType: orReceiptTypes.receiptTypeId,
                  receiptSubType: orReceiptSubTypes.receiptSubTypeId,
                  totalAmount: deails.rcvAmt,
                  transferAmount: transferFlag === 1 ? sumFee : null,
                  transferBankId: banks ? banks.bankId : null,
                  transferDate: transferFlag === 1 ? rcvDate : null,
                  sendNoticeBalance: 0,
                  courtLevelId: appealType
                };
                const createdDetail = await this.receiptDetailService.createData(payloadId, createDetailData); // เพิ่มข้อมูล

                if (createdDetail) {
                  const migrateLog2 = {
                    name: "ระบบการเงิน: รายระเอียดใบเสร็จ",
                    serverType: `${process.env.SERVER_TYPE}`,
                    status: (createdDetail ? "SUCCESS" : "ERROR"),
                    datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                    sourceDBType: "MYSQL",
                    sourceTableName: "preceipt_detail",
                    sourceId: receiptRunning,
                    sourceData: JSON.stringify(createDetailData),
                    destinationDBType: "ORACLE",
                    destinationTableName: "PC_FIN_RECEIPT_DETAIL",
                    destinationId: createdDetail.detailId,
                    destinationData: JSON.stringify(createdDetail)
                  }; // เตรียมข้อมูล log ในการบันทึกข้อมูล

                  await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(migrateLog2)); // เพิ่ม Log การ Migrate ข้อมูล
                }



                // Cheque
                const createChequeData = {
                  amount: sumCheck,
                  bankCode: banks ? banks.bankId : 0,
                  bankName: banks ? banks.bankName : null,
                  courtId: parseInt(params.paramValue),
                  paidDate: rcvDate,
                  receiptId: created.receiptId,
                  receiptDetailId: createdDetail.detailId
                };
                const createCheque = await this.receiptChequeService.createData(payloadId, createChequeData); // เพิ่มข้อมูล

                if (createdDetail) {
                  const migrateLog2 = {
                    name: "ระบบการเงิน: ข้อมูลเช็ค",
                    serverType: `${process.env.SERVER_TYPE}`,
                    status: (createdDetail ? "SUCCESS" : "ERROR"),
                    datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                    sourceDBType: "MYSQL",
                    sourceTableName: "preceipt_cheque",
                    sourceId: receiptRunning,
                    sourceData: JSON.stringify(createDetailData),
                    destinationDBType: "ORACLE",
                    destinationTableName: "PC_FIN_RECEIPT_CHEQUE",
                    destinationId: createdDetail.detailId,
                    destinationData: JSON.stringify(createdDetail)
                  }; // เตรียมข้อมูล log ในการบันทึกข้อมูล

                  await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(migrateLog2)); // เพิ่ม Log การ Migrate ข้อมูล
                }




                // Credit
                const createCreditData = {
                  amount: sumCheck,
                  bankCode: banks ? banks.bankId : 0,
                  cardHolderName: "-",
                  expiredDate: this.dateFormat("YYYY-MM-DD", new Date("30/12/1899")),
                  courtId: parseInt(params.paramValue),
                  creditNo: null,
                  bankName: banks ? banks.bankName : null,
                  receiptId: created.receiptId,
                  receiptDetailId: createdDetail.detailId
                };
                const createCredit = await this.receiptCrditService.createData(payloadId, createCreditData); // เพิ่มข้อมูล

                if (createCredit) {
                  const migrateLog3 = {
                    name: "ระบบการเงิน: ข้อมูลเครดิต",
                    serverType: `${process.env.SERVER_TYPE}`,
                    status: (createCredit ? "SUCCESS" : "ERROR"),
                    datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                    sourceDBType: "MYSQL",
                    sourceTableName: "preceipt",
                    sourceId: receiptRunning,
                    sourceData: JSON.stringify(createCreditData),
                    destinationDBType: "ORACLE",
                    destinationTableName: "PC_FIN_RECEIPT_CREDIT",
                    destinationId: createCredit.creaditId,
                    destinationData: JSON.stringify(createCredit)
                  }; // เตรียมข้อมูล log ในการบันทึกข้อมูล

                  await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(migrateLog3)); // เพิ่ม Log การ Migrate ข้อมูล
                }




                // Cancel
                if (cancelFlag === 1) {
                  const userProfiles1 = await (await this.userProfileService.findORACLEOneData(null, { userProfileFullName: `${updateUser}`.trim() })).items;

                  const createCancelData = {
                    cancelBy: userProfiles1.userProfileId,
                    cancalDate: updateDate ? this.dateFormat("YYYY-MM-DD H:i:s", updateDate) : null,
                    cancelReason,
                    notes: remark,
                    courtId: parseInt(params.paramValue),
                    receiptId: created.receiptId,
                  };
                  const createCancel = await this.receiptCancelService.createData(payloadId, createCancelData); // เพิ่มข้อมูล

                  if (createCancel) {
                    const migrateLog4 = {
                      name: "ระบบการเงิน: ยกเลิกใบเสร็จ",
                      serverType: `${process.env.SERVER_TYPE}`,
                      status: (createCancel ? "SUCCESS" : "ERROR"),
                      datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                      sourceDBType: "MYSQL",
                      sourceTableName: "preceipt",
                      sourceId: receiptRunning,
                      sourceData: JSON.stringify(createCancelData),
                      destinationDBType: "ORACLE",
                      destinationTableName: "PC_FIN_RECEIPT_CANCEL",
                      destinationId: createCancel.cancelId,
                      destinationData: JSON.stringify(createCancel)
                    }; // เตรียมข้อมูล log ในการบันทึกข้อมูล

                    await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(migrateLog4)); // เพิ่ม Log การ Migrate ข้อมูล
                  }
                }




                // Payment
                const cases2 = await (await this.caseService.findORACLEOneData({ convertStringCase: paymentRunId })).items;
                const userProfiles2 = await (await this.userProfileService.findORACLEOneData(null, { userProfileFullName: `${paymentCreateUser}`.trim() })).items;
                if (cases2) {
                  const createPaymentData = {
                    caseId: cases2.caseId,
                    courtId: parseInt(params.paramValue),
                    isLabor: 1,
                    payer1: userProfiles2.userProfileId,
                    payer1Name: userProfiles2.userProfileFullName,
                    paymentDate: paymentCreateDate,
                    refCodeNo: 0,
                    remark,
                    totalAmount: paymentPayAmt
                  };
                  const createPayment = await this.paymentService.createData(payloadId, createPaymentData); // เพิ่มข้อมูล

                  if (createPayment) {
                    const migrateLog5 = {
                      name: "ระบบการเงิน: ยกเลิกใบเสร็จ",
                      serverType: `${process.env.SERVER_TYPE}`,
                      status: (createPayment ? "SUCCESS" : "ERROR"),
                      datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                      sourceDBType: "MYSQL",
                      sourceTableName: "preturn_receipt",
                      sourceId: receiptRunning,
                      sourceData: JSON.stringify(createPaymentData),
                      destinationDBType: "ORACLE",
                      destinationTableName: "PC_FIN_RECEIPT_PAYMENT",
                      destinationId: createPayment.paymentId,
                      destinationData: JSON.stringify(createPayment)
                    }; // เตรียมข้อมูล log ในการบันทึกข้อมูล

                    await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(migrateLog5)); // เพิ่ม Log การ Migrate ข้อมูล
                  }




                  // Payment Detail
                  const receiptTypes = await (await this.lookupReceiptTypeService.findMYSQLOneData({ receiptTypeId: paymentReceiptTypeId })).items;

                  const createPaymentDetailData = {
                    receiptSubType: receiptTypes.receiptTypeId,
                    receiptType: paymentSubTypeId,
                    totalAmount: paymentPayAmt,
                    paymentId: createPayment.paymentId,
                    receiptDetailId: createdDetail.detailId
                  };
                  const createPaymentDetail = await this.receiptPaymentDetailService.createData(payloadId, createPaymentDetailData); // เพิ่มข้อมูล

                  if (createPaymentDetail) {
                    const migrateLog5 = {
                      name: "ระบบการเงิน: ยกเลิกใบเสร็จ",
                      serverType: `${process.env.SERVER_TYPE}`,
                      status: (createPaymentDetail ? "SUCCESS" : "ERROR"),
                      datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                      sourceDBType: "MYSQL",
                      sourceTableName: "preturn_receipt",
                      sourceId: receiptRunning,
                      sourceData: JSON.stringify(createPaymentDetailData),
                      destinationDBType: "ORACLE",
                      destinationTableName: "PC_FIN_PAYMENT_DETAIL",
                      destinationId: createPaymentDetail.paymentId,
                      destinationData: JSON.stringify(createPaymentDetail)
                    }; // เตรียมข้อมูล log ในการบันทึกข้อมูล

                    await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(migrateLog5)); // เพิ่ม Log การ Migrate ข้อมูล
                  }





                  // Receipt balance history
                  const cases3 = await (await this.caseService.findORACLEOneData({ convertStringCase: paymentRunId })).items;
                  const userProfiles3 = await (await this.userProfileService.findORACLEOneData(null, { userProfileFullName: `${paymentCreateUser}`.trim() })).items;

                  const receiptBalanceData = {
                    paidAmount: paymentPayAmt,
                    paymentDetailId: createPaymentDetail.paymentDetailId,
                    receiptDetailId: createdDetail.detailId
                  };
                  const receiptBalance = await this.receiptBalanceHistoryService.createData(payloadId, receiptBalanceData); // เพิ่มข้อมูล

                  if (receiptBalance) {
                    const migrateLog6 = {
                      name: "ระบบการเงิน: ยกเลิกใบเสร็จ",
                      serverType: `${process.env.SERVER_TYPE}`,
                      status: (receiptBalance ? "SUCCESS" : "ERROR"),
                      datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                      sourceDBType: "MYSQL",
                      sourceTableName: "preturn_receipt",
                      sourceId: receiptRunning,
                      sourceData: JSON.stringify(receiptBalanceData),
                      destinationDBType: "ORACLE",
                      destinationTableName: "PC_FIN_RECEIPT_BALANCE_HISTORY",
                      destinationId: receiptBalance.receiptBalanceHistoryId,
                      destinationData: JSON.stringify(receiptBalance)
                    }; // เตรียมข้อมูล log ในการบันทึกข้อมูล

                    await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(migrateLog6)); // เพิ่ม Log การ Migrate ข้อมูล
                  }
                }
              }
            } else {
              await migrateLogs.push(await this.migrateLogService.createPOSTGRESData({
                name: "ระบบการเงิน: ประเภทย่อยใบเสร็จ",
                serverType: `${process.env.SERVER_TYPE}`,
                status: "MATCH",
                datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                sourceDBType: "MYSQL",
                sourceTableName: "preceipt",
                sourceId: receiptRunning,
                sourceData: JSON.stringify(source.items[index]),
              })); // เพิ่ม Log การ Migrate ข้อมูล
            }
          }
        }
      }

      const cntDestination = await this.oracleFinReceiptTypeRepositories.createQueryBuilder("A") // เติม
      await this.oracleFilter(cntDestination, filters); // เติม
      const destinationOldTotal = await cntDestination.andWhere("A.createdBy <> 999").getCount(); // เติม
      const destinationNewTotal = await cntDestination.andWhere("A.createdBy = 999").getCount(); // เติม
      const destinationTotal = await cntDestination.getCount(); // เติม

      return { migrateLogs, sourceTotal, destinationOldTotal, destinationNewTotal, duplicateTotal, errorTotal, destinationTotal }; // เติม
    } catch (error) {
      throw new HttpException(`[Migrate receipt failed.] => ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }
}
