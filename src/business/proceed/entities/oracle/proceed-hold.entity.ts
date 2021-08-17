import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_HOLD" })
export class OracleProceedHolds {
  @PrimaryGeneratedColumn({ name: "HOLD_ID", comment: "รหัสข้อมูลคดีค้างพิจารณา(AUTO INCREMENT)" }) holdId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "APPOINT_ID", comment: "รหัสนัดความ เชื่อมโยง PC_PROCEED_APPOINT" }) appointId: number;
  @Column({ name: "CASE_ID", comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "HOLD_REASON_ID", nullable: true, comment: "รหัสสาเหตุที่ค้าง เชื่อมโยง PC_PROCEED_HOLD_REASON" }) holdReasonId: number;
  @Column({ name: "INVESTIGATE_TYPE", nullable: true, comment: "สืบฝ่ายเดียว/สองฝ่าย" }) investigateType: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", nullable: true, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;

  toResponseObject() {
    const { holdId, orderNo, appointId, caseId, courtId, holdReasonId, investigateType, createdDate, removedDate, updatedDate, createdBy, updatedBy, removedBy } = this;
    const responseObject = { holdId, orderNo, appointId, caseId, courtId, holdReasonId, investigateType, createdDate, removedDate, updatedDate, createdBy, updatedBy, removedBy };
    return responseObject;
  }
}