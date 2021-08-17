import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_FIN_COMP_CODE" })
export class OracleFinCompCodes {
  @PrimaryGeneratedColumn({ name: "COMP_CODE_ID", comment: "รหัสข้อมูล Company Code(AUTO INCREMENT)" }) compCodeId: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "MONEY_TYPE_BY", comment: "รหัสประเภทเงิน เชื่อมโยง PC_LOOKUP_RECEIPT_TYPE" }) meneyTypeBy: number;
  @Column({ name: "MONEY_DETAIL_ID", nullable: true, comment: "รหัสรายละเอียดเงิน เชื่อมโยง PC_FIN_MONEY_DETAIL" }) moneyDetailId: number;
  @Column({ name: "COMP_CODE", comment: "รหัส Company Code" }) compCode: string;
  @Column({ name: "BANK_ID", comment: "รหัสธนาคาร เชื่อมโยง PC_LOOKUP_BANK" }) bankId: number;
  @Column({ name: "BRANCH", nullable: true, comment: "สาขาธนาคาร" }) branch: string;
  @Column({ name: "ACCOUNT_NO", nullable: true, comment: "หมายเลขบัญชีกระแสรายวัน" }) accountNo: string;
  @Column({ name: "SERVICE_CODE", nullable: true, comment: "รหัส Service Code" }) serviceCode: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", nullable: true, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { compCodeId, courtId, orderNo, meneyTypeBy, moneyDetailId, compCode, bankId, branch, accountNo, serviceCode, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { compCodeId, courtId, orderNo, meneyTypeBy, moneyDetailId, compCode, bankId, branch, accountNo, serviceCode, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}