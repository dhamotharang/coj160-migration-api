import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_HOLD_REASON" })
export class OracleProceedHoldReasons {
  @PrimaryGeneratedColumn({ name: "HOLD_REASON_ID", comment: "รหัสข้อมูลสาเหตุการค้างพิจารณาคดี(AUTO INCREMENT)" }) holdReasonId: number;
  @Column({ name: "ORDER_NO", type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "ACTIVE_FLAG", nullable: true, comment: "การใช้งาน 0 ไม่ใช้ / 1 ใช้" }) activeFlag: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "HOLD_DESCRIPTION", nullable: true, comment: "รายละเอียดสาเหตุที่ค้าง" }) holdDescription: string;
  @Column({ name: "HOLD_REASON", comment: "สาเหตุที่ค้าง" }) holdReason: string;
  @Column({ name: "HOLD_REASON_CODE", comment: "สาเหตุที่ค้าง" }) holdReasonCode: string;
  @Column({ name: "SELECT_CODE", nullable: true, comment: "สาเหตุที่ค้าง" }) selectCode: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { holdReasonId, orderNo, activeFlag, courtId, holdDescription, holdReason, holdReasonCode, selectCode, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { holdReasonId, orderNo, activeFlag, courtId, holdDescription, holdReason, holdReasonCode, selectCode, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}