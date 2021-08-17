import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_FIN_COURT_TRANSFER" })
export class OracleFinCourtTransfers {
  @PrimaryGeneratedColumn({ name: "TRANSFER_ID", comment: "รหัสข้อมูลการโอนเงิน(AUTO INCREMENT)" }) transferId: number;
  @Column({ name: "COURT_CODE", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtCode: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "ACCOUNT_NO", nullable: true, comment: "เลขที่บัญชี" }) accountNo: string;
  @Column({ name: "ACCOUNT_NAME", nullable: true, comment: "ชื่อเจ้าของบัญชี" }) accountName: string;
  @Column({ name: "BANK_ID", comment: "รหัสธนาคาร เชื่อมโยง PC_LOOKUP_BANK" }) bankId: number;
  @Column({ name: "BRANCH", nullable: true, comment: "สาขาธนาคาร" }) branch: string;
  @Column({ name: "NOTES", nullable: true, type: "clob", comment: "หมายเหตุ" }) notes: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { transferId, courtCode, orderNo, accountNo, accountName, bankId, branch, notes, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { transferId, courtCode, orderNo, accountNo, accountName, bankId, branch, notes, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}