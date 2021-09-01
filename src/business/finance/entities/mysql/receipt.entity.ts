import { MySQLBanks } from "src/common/lookup/entities/mysql/bank.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: "preceipt" })
export class MySQLReceipts {
  @PrimaryColumn({ name: "court_running", comment: "รหัสศาลเจ้าของระบบ" }) courtRunning: number;
  @PrimaryColumn({ name: "receipt_running", comment: "auto running" }) receiptRunning: number;
  @Column({ name: "run_id", comment: "รหัสหมายเลขคดีดำ" }) runId: number;
  @Column({ name: "appeal_type", nullable: true, comment: "ชั้น 1 ศาลชั้นต้น 2 อุทธรณ์ 3 ฎีกา" }) appealType: number;
  @Column({ name: "rcv_date", type: "date", nullable: true, comment: "วันที่รับเงิน" }) rcvDate: Date;
  @Column({ name: "budget_year", nullable: true, comment: "ปีงบประมาณ" }) budgetYear: number;
  @Column({ name: "rcv_flag", nullable: true, comment: "ประเภทใบเสร็จ" }) rcvFlag: number;
  @Column({ name: "s_type", nullable: true, comment: "ประเภทใบเสร็จย่อย" }) sType: number;
  @Column({ name: "book_no", nullable: true, comment: "ใบเสร็จเล่มที่" }) bookNo: string;
  @Column({ name: "rreceipt_no", comment: "ใบเสร็จเลขที่" }) rreceiptNo: number;
  @Column({ name: "pros_accu_type", nullable: true, comment: "คู่ความฝั่ง 1 โจทก์ 2 จำเลย" }) prosAccuType: number;
  @Column({ name: "litigant_type", nullable: true, comment: "ประเภทคู่ความ" }) litigantType: number;
  @Column({ name: "item", nullable: true, comment: "ลำดับที่" }) item: string;
  @Column({ name: "def_name", type: "text", comment: "ขื่อผู้ชำระเงิน" }) defName: number;
  @Column({ name: "lead_item", nullable: true, comment: "ลำดับผู้นำหมาย" }) leadItem: number;
  @Column({ name: "lead_name", nullable: true, comment: "ชื่อผู้นำหมาย" }) leadName: string;
  @Column({ name: "sum_fee", nullable: true, type: "double", comment: "รวมจำนวนเงิน" }) sumFee: number;
  @Column({ name: "sum_cash", nullable: true, type: "double", comment: "เงินสดรวม" }) sumCash: number;
  @Column({ name: "sum_check", nullable: true, type: "double", comment: "เช็ครวม" }) sumCheck: number;
  @Column({ name: "sum_credit", nullable: true, type: "double", comment: "จำนวนเงินที่ตัดจากบัตรเครดิต" }) sumCredit: number;
  @Column({ name: "textbaht", comment: "จำนวนเงิน ตัวอักษร" }) textbaht: string;
  @Column({ name: "transfer_flag", nullable: true, comment: "โอนเงินเข้าบัญชี" }) transferFlag: number;
  @Column({ name: "account_no", nullable: true, comment: "หมายเลขบัญชี" }) accountNo: string;
  @Column({ name: "bank_id", nullable: true, comment: "ธนาคาร" }) bankId: number;
  @Column({ name: "cancel_flag", nullable: true, comment: "1 - ยกเลิกใบเสร็จ" }) cancelFlag: number;
  @Column({ name: "userrcv_id", nullable: true, comment: "เก็บ user_code จาก puser_login" }) userrcvId: string;
  @Column({ name: "userrcv_name", nullable: true, comment: "ผู้รับเงิน" }) userrcvName: string;
  @Column({ name: "usermng_id", nullable: true, comment: "รหัส ผอ." }) usermngId: string;
  @Column({ name: "usermng_name", nullable: true, comment: "ชื่อ ผอ." }) usermngName: string;
  @Column({ name: "guar_running", nullable: true, comment: "running เลขประกัน fk:pguarrantee.guar_running" }) guarRunning: number;
  @Column({ name: "guar_item", nullable: true, comment: "ลำดับที่ผู้ขอประกัน" }) guarItem: number;
  @Column({ name: "guarantor_seq", nullable: true, comment: "ลำดับที่นายประกัน" }) guarantorSeq: number;
  @Column({ name: "guar_def", nullable: true, comment: "ผู้ต้องหาที่ถูกประกัน" }) guarDef: string;
  @Column({ name: "sum_guar", nullable: true, type: "double", comment: "จำนวนเงินรวมปรับนายประกัน" }) sumGuar: number;
  @Column({ name: "cancel_reason", nullable: true, comment: "เหตุผลที่ยกเลิก" }) cancelReason: string;
  @Column({ name: "ticket", nullable: true, comment: "ตั๋วแลกเงิน" }) ticket: string;
  @Column({ name: "ticket_no", nullable: true, comment: "เลขที่ตั๋วแลกเงิน" }) ticketNo: string;
  @Column({ name: "received_cash", nullable: true, type: "double", comment: "ได้รับเงิน(ธนบัตร)" }) receivedCash: number;
  @Column({ name: "return_cash", nullable: true, type: "double", comment: "เงินทอน" }) returnCash: number;
  @Column({ name: "guar_forfeit_type", nullable: true, comment: "ประเภทการปรับนายประกัน(ประเภทคู่ความที่ถูกประกัน)" }) guarForfeitType: number;
  @Column({ name: "forfeit_type", nullable: true, comment: "ประเภทผู้ถูกประกัน" }) forfeitType: number;
  @Column({ name: "item_no", nullable: true, comment: "ลำดับที่คู่ความที่ถูกประกัน" }) itemNo: number;
  @Column({ name: "pay_type", nullable: true, comment: "ประเภทการชำระ 1 ชำระครบถ้วน 2 ผ่อนชำระ" }) payType: number;
  @Column({ name: "keep_running", nullable: true, comment: "ลำดับที่หลักประกัน fk pkeep_asset.keep_runnig" }) keepRunning: number;
  @Column({ name: "invoice_running", nullable: true, comment: "fk:pinvoice.invoice_running" }) invoiceRunning: number;
  @Column({ name: "by_hand", nullable: true, comment: "ใบเสร็จเขียนมือ" }) byHand: number;
  @Column({ name: "remark", nullable: true, comment: "หมายเหตุเพิ่มเติม" }) remark: string;
  @Column({ name: "create_dep_code", nullable: true, comment: "รหัสหน่วยงานที่สร้าง record" }) createDepCode: number;
  @Column({ name: "create_user_id", nullable: true, comment: "รหัส user ที่สร้าง record" }) createUserId: string;
  @Column({ name: "create_user", nullable: true, comment: "user ที่สร้าง record" }) createUser: string;
  @Column({ name: "create_date", nullable: true, type: "datetime", comment: "วันที่เวลาสร้าง record" }) createDate: Date;
  @Column({ name: "update_dep_code", nullable: true, comment: "รหัสหน่วยงานที่ update" }) updateDepCode: number;
  @Column({ name: "update_user_id", nullable: true, comment: "รหัส user ที่ update record" }) updateUserId: string;
  @Column({ name: "update_user", nullable: true, comment: "user ที่ update record" }) updateUser: string;
  @Column({ name: "update_date", nullable: true, type: "datetime", comment: "วันที่ เวลา update record" }) updateDate: Date;
  @Column({ name: "ref_id", nullable: true, comment: "transferd bo_thfinance_income  blackrecgen" }) refId: string;
  @Column({ name: "ref_finrecordgen", nullable: true, comment: "transfer dbo_thfinance_income FinRecordGen" }) refFinrecordgen: string;
  @Column({ name: "ref_litigantcode", nullable: true, comment: "transfer dbo_thfinance_income payer" }) refLitigantcode: string;
  @Column({ name: "ref_finrecgen", comment: "transfer gp_lawcourt_ccvc_tr.tdFinance_Income ref_finrecgen" }) refFinrecgen: string;
  @Column({ name: "old_run_id", nullable: true, comment: "เลขคดีดำก่อนย้าย" }) oldRunId: number;
  @Column({ name: "ref_docrecgen", nullable: true, comment: "docrecgen" }) refDocrecgen: string;
  @Column({ name: "ref_pcode", nullable: true, comment: "ntbc_gp_lawcourt.thFinanceOutSide.pcode" }) refPcode: string;
  @Column({ name: "ref_finrecordgen_tor", nullable: true, comment: "ntbc_gp_lawcourt.thFinanceOutSide.finrecordgen" }) refFinrecordgenTor: string;
  @Column({ name: "ref_black_title", nullable: true, comment: "transfer" }) refBlackTitle: string;
  @Column({ name: "ref_black_id", nullable: true, comment: "transfer" }) refBlackId: number;
  @Column({ name: "ref_black_yy", nullable: true, comment: "transfer" }) refBlackYy: number;
  @Column({ name: "ref_case_type", nullable: true, comment: "transfer" }) refCaseType: number;
  @Column({ name: "ref_blackno", nullable: true, comment: "transfer" }) refBlackno: string;

  @ManyToOne(type => MySQLBanks, bank => bank.receipts)
  @JoinColumn({ name: "bank_id" }) banks: MySQLBanks;

  toResponseObject() {
    const {
      courtRunning, receiptRunning, runId, appealType, rcvDate, budgetYear, rcvFlag, sType, bookNo, rreceiptNo, prosAccuType,
      litigantType, item, defName, leadItem, leadName, sumFee, sumCash, sumCheck, sumCredit, textbaht, transferFlag, accountNo,
      bankId, cancelFlag, userrcvId, userrcvName, usermngId, usermngName, guarRunning, guarItem, guarantorSeq, guarDef,
      sumGuar, cancelReason, ticket, ticketNo, receivedCash, returnCash, guarForfeitType, forfeitType, itemNo, payType,
      keepRunning, invoiceRunning, byHand, remark, createDepCode, createUserId, createUser, createDate, updateDepCode, updateUserId,
      updateUser, updateDate, refId, refFinrecordgen, refLitigantcode, refFinrecgen, oldRunId, refDocrecgen, refPcode, refFinrecordgenTor,
      refBlackTitle, refBlackId, refBlackYy, refCaseType, refBlackno, banks
    } = this;

    const responseObject = {
      courtRunning, receiptRunning, runId, appealType, rcvDate, budgetYear, rcvFlag, sType, bookNo, rreceiptNo, prosAccuType,
      litigantType, item, defName, leadItem, leadName, sumFee, sumCash, sumCheck, sumCredit, textbaht, transferFlag, accountNo,
      bankId, cancelFlag, userrcvId, userrcvName, usermngId, usermngName, guarRunning, guarItem, guarantorSeq, guarDef,
      sumGuar, cancelReason, ticket, ticketNo, receivedCash, returnCash, guarForfeitType, forfeitType, itemNo, payType,
      keepRunning, invoiceRunning, byHand, remark, createDepCode, createUserId, createUser, createDate, updateDepCode, updateUserId,
      updateUser, updateDate, refId, refFinrecordgen, refLitigantcode, refFinrecgen, oldRunId, refDocrecgen, refPcode, refFinrecordgenTor,
      refBlackTitle, refBlackId, refBlackYy, refCaseType, refBlackno, banks
    };

    return responseObject;
  }
}