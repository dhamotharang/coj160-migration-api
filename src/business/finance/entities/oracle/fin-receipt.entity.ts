import { HttpException, HttpStatus } from "@nestjs/common";
import { BeforeInsert, Column, Entity, getManager, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_FIN_RECEIPT" })
export class OracleFinReceipts {
  @PrimaryGeneratedColumn({ name: "RECEIPT_ID", comment: "รหัสข้อมูลใบเสร็จรับเงิน(AUTO INCREMENT)" }) receiptId: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "CASE_ID", nullable: true, comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "ORDER_NO", type: "float", nullable: true, comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "RECEIPT_BOOK_NO", comment: "ใบเสร็จเล่มที่" }) receiptBookNo: number;
  @Column({ name: "RECEIPT_NO", comment: "ใบเสร็จเลขที่" }) receiptNo: number;
  @Column({ name: "RECEIVED_DATE", type: "timestamp", comment: "วันที่รับเงิน" }) receivedDate: Date;
  @Column({ name: "GOV_BUDGET_YEAR", comment: "ปีงบประมาณ" }) govBudgetYear: string;
  @Column({ name: "LITIGANT_TYPE", nullable: true, comment: "รหัสประเภทของคู่ความ เชื่อมโยง PC_LOOKUP_LIT_TYPE" }) litigantType: number;
  @Column({ name: "PAYER_ORDER_NO", nullable: true, comment: "ลำดับที่ผู้ชำระเงิน" }) payerOrderNo: number;
  @Column({ name: "PAYER_NAME", comment: "ชื่อผู้ชำระเงิน" }) payerName: string;
  @Column({ name: "TOTAL_AMOUNT", type: "float", comment: "จำนวนเงินทั้งหมด" }) totalAmount: number;
  @Column({ name: "IS_CANCEL_RECEIPT", nullable: true, comment: "ตัวเลือกยกเลิกใบเสร็จ" }) isCancelReceipt: number;
  @Column({ name: "RECEIVED_BY", comment: "รหัสผู้รับเงิน เชื่อมโยง PC_USER_PROFILE" }) receivedBy: number;
  @Column({ name: "DIRECTOR_BY", comment: "รหัสผู้อำนวยการ เชื่อมโยง PC_USER_PROFILE" }) directorBy: number;
  @Column({ name: "RECEIVED_CASH_AMOUNT", type: "float", comment: "จำนวนเงินสดที่รับมา" }) receivedCashAmount: number;
  @Column({ name: "CHANGE_AMOUNT", type: "float", comment: "จำนวนเงินทอน" }) changeAmount: number;
  @Column({ name: "BANK_CODE", nullable: true, comment: "รหัสธนาคาร" }) bankCode: string;
  @Column({ name: "IS_FLAG_ACCOUNT", nullable: true, comment: "เงินโอนเข้าบัญชี" }) isFlagAccount: number;
  @Column({ name: "NOTICE_PROVINCIAL_ID", nullable: true, comment: "รหัสหมายต่างจังหวัด เชื่อมโยงตาราง PC_NOTICE_PROVINCAIL" }) noticeProvincialId: number;
  @Column({ name: "PRINTED_DATE", nullable: true, type: "timestamp", comment: "วันที่พิมพ์ใบเสร็จ" }) printedDate: Date;
  @Column({ name: "RECEIPT_ACCOUNT_NUMBER", nullable: true, comment: "เลขที่บัญชี" }) receiptAccountNumber: string;
  @Column({ name: "NO_IN_DATE_NOW", comment: "ลำดับของใบเสร็จในแต่ละวัน" }) noInDateNow: number;
  @Column({ name: "IS_ELECTRONIC_FILING", comment: "เป็นนัดความจากระบบ E-Filing หรือไม่" }) isElectronicFiling: number;
  @Column({ name: "RECEIPT_BOOK_NO_ELECTRONIC_FILING", nullable: true, comment: "เล่มที่ี่อ้างอิงเล่มที่ของ E - filing" }) receiptBookNoElectronicFiling: string;
  @Column({ name: "RECEIPT_NO_ELECTRONIC_FILING", nullable: true, comment: "เลขที่ี่อ้างอิงเล่มที่ของ E - filing" }) receitptNoElectronicFiling: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_FIN_RECEIPT_SEQ".nextval ID FROM DUAL`);
      this.receiptId = res[0].ID;
      this.orderNo = res[0].ID;
    } catch (error) {
      throw new HttpException(`[generate code failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  toResponseObject() {
    const { receiptId, courtId, caseId, orderNo, receiptBookNo, receiptNo, receivedDate, govBudgetYear, litigantType, payerOrderNo, payerName, totalAmount, isCancelReceipt, receivedBy, directorBy, receivedCashAmount, changeAmount, bankCode, isFlagAccount, noticeProvincialId, printedDate, receiptAccountNumber, noInDateNow, isElectronicFiling, receiptBookNoElectronicFiling, receitptNoElectronicFiling, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { receiptId, courtId, caseId, orderNo, receiptBookNo, receiptNo, receivedDate, govBudgetYear, litigantType, payerOrderNo, payerName, totalAmount, isCancelReceipt, receivedBy, directorBy, receivedCashAmount, changeAmount, bankCode, isFlagAccount, noticeProvincialId, printedDate, receiptAccountNumber, noInDateNow, isElectronicFiling, receiptBookNoElectronicFiling, receitptNoElectronicFiling, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}