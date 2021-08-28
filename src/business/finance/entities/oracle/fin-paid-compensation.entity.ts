import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_FIN_PAID_COMPENSATION" })
export class OracleFinPaidCompensations {
  @PrimaryGeneratedColumn({ name: "COMPENSATION_ID", comment: "รหัสข้อมูลจ่ายค่าตอบแทน(AUTO INCREMENT)" }) compensationId: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "CASE_ID", nullable: true, comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "MONEY_TYPE_BY", comment: "รหัสประเภทเงิน เชื่อมโยง PC_LOOKUP_RECEIPT_TYPE" }) moneyTypeBy: number;
  @Column({ name: "PAID_DATE", type: "timestamp", comment: "วันที่จ่ายเงิน" }) paidDate: Date;
  @Column({ name: "PAID_TO", comment: "ชื่อผู้รับเงิน" }) paidTo: string;
  @Column({ name: "WITHDRAW_CODE_NO", comment: "เลขที่ขอเบิก" }) withdrawCodeNo: number;
  @Column({ name: "WITHDRAW_CODE_YEAR", comment: "ปีที่ขอเบิก" }) withdrawCodeYear: string;
  @Column({ name: "NATIONAL_ID", comment: "เลขประจำตัวประชาชน/พาสปอร์ต" }) nationalId: string;
  @Column({ name: "WITNESS_TO_PAID_BY", comment: "รหัสผู้เป็นพยานการรับเงิน เชื่อมโยง PC_USER_PROFILE" }) witnessToPaidBy: number;
  @Column({ name: "BANK_ID", comment: "รหัสธนาคาร เชื่อมโยง PC_LOOKUP_BANK" }) bankId: number;
  @Column({ name: "BRANCH", comment: "สาขาธนาคาร" }) branch: string;
  @Column({ name: "ACCOUNT_NO", comment: "หมายเลขบัญชี" }) accountNo: string;
  @Column({ name: "TOTAL_AMOUNT", type: "float", comment: "จำนวนเงินทั้งหมด" }) totalAmount: number;
  @Column({ name: "NOTES", type: "clob", nullable: true, comment: "หมายเหตุ" }) notes: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { compensationId, courtId, caseId, orderNo, moneyTypeBy, paidDate, paidTo, withdrawCodeNo, withdrawCodeYear, nationalId, witnessToPaidBy, bankId, branch, accountNo, totalAmount, notes, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { compensationId, courtId, caseId, orderNo, moneyTypeBy, paidDate, paidTo, withdrawCodeNo, withdrawCodeYear, nationalId, witnessToPaidBy, bankId, branch, accountNo, totalAmount, notes, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}