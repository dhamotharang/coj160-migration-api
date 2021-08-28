import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_FIN_RECEIPT_BALANCE_HISTORY" })
export class OracleFinReceiptBalanceHistories {
  @PrimaryGeneratedColumn({ name: "PC_FIN_RECEIPT_BALANCE_HISTORY_ID", comment: "รหัสข้อมูลประวัติการจ่ายเงิน(AUTO INCREMENT)" }) finReceiptBalanceHistoryId: number;
  @Column({ name: "PAID_AMOUNT", type: "float", nullable: true, comment: "จำนวนเงินที่ชำระ" }) paidAmount: number;
  @Column({ name: "PAYMENT_DETAIL_ID", nullable: true, comment: "รหัสรายละเอียดการจ่ายเงิน เชื่อมโยงตาราง PC_FIN_PAYMENT_DETAIL_ID" }) paymentDetailId: number;
  @Column({ name: "RECEIPT_DETAIL_ID", nullable: true, comment: "รหัสรายละเอียดใบเสร็จ เชื่อมโยงตาราง PC_FIN_RECEIPT_DETAIL_ID" }) receiptDetailId: number;
  @Column({ name: "REMARK", nullable: true, comment: "หมายเหตุ" }) remark: string;
  @Column({ name: "NOTICE_ISSUED_ID", nullable: true, comment: "รหัสข้อมูลการจ่ายหมาย เชื่อมโยง PC_NOTICE_ISSUED" }) noticeIssuedId: number;
  @Column({ name: "ORDER_NO", type: "float", nullable: true, comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { finReceiptBalanceHistoryId, paidAmount, paymentDetailId, receiptDetailId, remark, noticeIssuedId, orderNo, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { finReceiptBalanceHistoryId, paidAmount, paymentDetailId, receiptDetailId, remark, noticeIssuedId, orderNo, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}