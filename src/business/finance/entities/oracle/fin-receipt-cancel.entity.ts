import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_FIN_RECEIPT_CANCEL" })
export class OracleFinReceiptCancels {
  @PrimaryGeneratedColumn({ name: "CANCEL_ID", comment: "รหัสข้อมูลการยกเลิกใบเสร็จรับเงิน(AUTO INCREMENT)" }) cancelId: number;
  @Column({ name: "RECEIPT_ID", comment: "รหัสใบเสร็จ เชื่อมโยง PC_FIN_RECEIPT" }) receiptId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "CANCEL_BY", comment: "รหัสผู้ใช้ที่ยกเลิกใบเสร็จ เชื่อมโยง PC_USER_PROFILE" }) cancelBy: number;
  @Column({ name: "CANCEL_REASON", comment: "เหตุผลการยกเลิก" }) cancelReason: string;
  @Column({ name: "APPROVED_BY", nullable: true, comment: "รหัสผู้อนุมัติยกเลิกใบเสร็จ เชื่อมโยง PC_USER_PROFILE" }) approvedBy: number;
  @Column({ name: "CANCEL_DATE", nullable: true, type: "timestamp", comment: "วันที่ยกเลิกใบเสร็จ" }) cancalDate: Date;
  @Column({ name: "REPLACED_RECEIPT_ID", nullable: true, comment: "รหัสใบเสร็จที่ออกแทนใบที่ยกเลิก เชื่อมโยง PC_FIN_RECEIPT" }) replacedReceiptId: number;
  @Column({ name: "APPROVED_DATE", nullable: true, type: "timestamp", comment: "อนุมัติยกเลิกใบเสร็จวันที่" }) approvedDate: Date;
  @Column({ name: "NOTES", type: "clob", nullable: true, comment: "หมายเหตุ" }) notes: string;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", nullable: true, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { cancelId, receiptId, orderNo, cancelBy, cancelReason, approvedBy, cancalDate, replacedReceiptId, approvedDate, notes, courtId, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { cancelId, receiptId, orderNo, cancelBy, cancelReason, approvedBy, cancalDate, replacedReceiptId, approvedDate, notes, courtId, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}