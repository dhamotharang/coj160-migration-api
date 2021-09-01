import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_FIN_RECEIPT_CHEQUE" })
export class OracleFinReceiptCheques {
  @PrimaryGeneratedColumn({ name: "CHEQUE_ID", comment: "รหัสข้อมูลเช็ค(AUTO INCREMENT)" }) chequeId: number;
  @Column({ name: "RECEIPT_ID", comment: "รหัสใบเสร็จ เชื่อมโยง PC_FIN_RECEIPT" }) receiptId: number;
  @Column({ name: "ORDER_NO", type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "CHEQUE_CODE", comment: "เลขที่เช็ค" }) chequeCode: string;
  @Column({ name: "BANK_CODE", comment: "รหัสธนาคาร เชื่อมโยง PC_LOOKUP_BANK" }) bankCode: number;
  @Column({ name: "BRANCH", comment: "สาขาธนาคาร" }) branch: string;
  @Column({ name: "NOTES", nullable: true, comment: "หมายเหตุ" }) notes: string;
  @Column({ name: "PAID_DATE", type: "timestamp", comment: "วันที่สั่งจ่าย" }) paidDate: Date;
  @Column({ name: "AMOUNT", type: "float", comment: "จำนวนเงินบนเช็ค" }) amount: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "RECEIPT_DETAIL_ID", nullable: true, comment: "รหัสรายละเอียดใบเสร็จ เชื่อมโยง PC_FIN_RECEIPT_DETAIL" }) receiptDetailId: number;
  @Column({ name: "BANK_NAME", comment: "ชื่อธนาคาร" }) bankName: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { chequeId, receiptId, orderNo, chequeCode, bankCode, branch, notes, paidDate, amount, courtId, receiptDetailId, bankName, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { chequeId, receiptId, orderNo, chequeCode, bankCode, branch, notes, paidDate, amount, courtId, receiptDetailId, bankName, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}