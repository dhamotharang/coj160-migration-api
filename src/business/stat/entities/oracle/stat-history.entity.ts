import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "PC_STAT_HISTORY" })
export class OracleStatHistories {
  @PrimaryColumn({ name: "HISTORY_ID", comment: "รหัสข้อมูลประวัติการเรียกข้อมูลทำสถิติ(AUTO INCREMENT)" }) historyId: number;
  @Column({ name: "ORDER_NO", type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "STAT_TYPE_ID", comment: "รหัสประเภทรายงานสถิติ เชื่อมโยง PC_STAT_TYPE" }) statTypeId: number;
  @Column({ name: "STAT_QUERY_DATE", type: "timestamp", comment: "วันที่เรียกรายงานสถิติ" }) statQueryDate: Date;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "UPDATED_DATE", type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "CREATED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { historyId, orderNo, courtId, statTypeId, statQueryDate, createdBy, updatedBy, removedBy, updatedDate, createdDate, removedDate } = this;
    const responseObject = { historyId, orderNo, courtId, statTypeId, statQueryDate, createdBy, updatedBy, removedBy, updatedDate, createdDate, removedDate };
    return responseObject;
  }
}