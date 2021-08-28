import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_FIN_RECEIPT_POSITION_DETAIL" })
export class OracleFinReceiptPositionDetails {
  @PrimaryGeneratedColumn({ name: "RECEIPT_POSITION_DETAIL_ID", comment: "รหัสข้อมูลรายละเอียดตำแหน่ง Bookmark ใบเสร็จ(AUTO INCREMENT)" }) receiptPositionDetailId: number;
  @Column({ name: "ORDER_NO", type: "float", nullable: true, comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "POSITION_ID", nullable: true, comment: "รหัสข้อมูลตำแหน่ง Bookmark ใบเสร็จ เชื่อมโยง PC_FIN_RECEIPT_POSITION" }) positionId: number;
  @Column({ name: "USER_ID", nullable: true, comment: "รหัสผู้ใช้" }) userId: number;
  @Column({ name: "RECEIPT_TYPE", nullable: true, comment: "รหัสประเภทใบเสร็จ" }) receiptType: number;
  @Column({ name: "IS_CHECKED", nullable: true, comment: "0 = ไม่ใช้งาน, 1 = ใช้งาน" }) isChecked: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", nullable: true, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { receiptPositionDetailId, orderNo, positionId, userId, receiptType, isChecked, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { receiptPositionDetailId, orderNo, positionId, userId, receiptType, isChecked, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}