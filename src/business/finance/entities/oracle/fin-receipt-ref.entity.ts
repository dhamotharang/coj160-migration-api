import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_FIN_RECEIPT_REF" })
export class OracleFinReceiptRefs {
  @PrimaryGeneratedColumn({ name: "RECEIPT_REF_ID", comment: "รหัสข้อมูลอ้างอิงใบเสร็จรับเงิน(AUTO INCREMENT)" }) receiptRefId: number;
  @Column({ name: "ORDER_NO", type: "float", nullable: true, comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "RECEIPT_ID", nullable: true, comment: "รหัสข้อมูลใบเสร็จรับเงิน เชื่อมโยงตาราง PC_FIN_RECEIPT" }) receiptId: number;
  @Column({ name: "REF_ID", nullable: true, comment: "รหัสอ้างอิง" }) refId: number;
  @Column({ name: "REF_TYPE", nullable: true, comment: "ประเภทอ้างอิง" }) refType: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { receiptRefId, orderNo, receiptId, refId, refType, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { receiptRefId, orderNo, receiptId, refId, refType, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}