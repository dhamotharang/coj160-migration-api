import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_FIN_PAYMENT_DETAIL" })
export class OracleFinPaymentDetails {
  @PrimaryGeneratedColumn({ name: "DETAIL_ID", comment: "รหัสข้อมูลรายละเอียดการสั่งจ่ายเงิน(AUTO INCREMENT)" }) detailId: number;
  @Column({ name: "PAYMENT_ID", comment: "รหัสการสั่งจ่ายเงิน เชื่อมโยงตาราง PC_FIN_PAYMENT" }) paymentId: number;
  @Column({ name: "RECEIPT_ID", comment: "รหัสใบเสร็จ เชื่อมโยง PC_FIN_RECEIPT" }) receiptId: number;
  @Column({ name: "CASE_ID", nullable: true, comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "PAYER1", comment: "รหัสผู้จ่ายเงินคนที่ 1" }) payer1: number;
  @Column({ name: "PAYER2", comment: "รหัสผู้จ่ายเงินคนที่ 2" }) payer2: number;
  @Column({ name: "PAYER1_NAME", nullable: true, comment: "ชื่อผู้จ่ายเงินคนที่1" }) payer1Name: string;
  @Column({ name: "RECEIPT_TYPE", comment: "รหัสประเภทใบเสร็จ เชื่อมโยง PC_LOOKUP_RECEIPT_TYPE" }) receiptType: number;
  @Column({ name: "RECEIPT_SUB_TYPE", comment: "รหัสประเภทใบเสร็จย่อย เชื่อมโยง PC_LOOKUP_RECEIPT_SUB_TYPE" }) receiptSubType: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { detailId, paymentId, receiptId, caseId, orderNo, courtId, payer1, payer2, payer1Name, receiptType, receiptSubType, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { detailId, paymentId, receiptId, caseId, orderNo, courtId, payer1, payer2, payer1Name, receiptType, receiptSubType, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}