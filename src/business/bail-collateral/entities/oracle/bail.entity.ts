import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_BAIL" })
export class OracleBails {
  @PrimaryGeneratedColumn({ name: "BAIL_ID", comment: "รหัสข้อมูลการประกันตัว(AUTO INCREMENT)" }) bailId: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "CASE_ID", comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseid: number;
  @Column({ name: "ORDER_NO", type: "float", nullable: true, comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "BAIL_PERIOD", comment: "ประกันตัวระหว่าง(1 = ศาลชั้นต้น, 2 = อุทธรณ์, 3 = ฎีกา)" }) bailPeriod: number;
  @Column({ name: "BAIL_TITLE_ID", comment: "รหัสคำนำหน้าประกัน เชื่อมโยง PC_LOOKUP_GUAR_TITLE" }) bailTitleId: number;
  @Column({ name: "BAIL_CODE_NO", comment: "ลำดับเลขที่เก็บของการประกัน" }) bailCodeNo: number;
  @Column({ name: "BAIL_CODE_YEAR", comment: "ปี พ.ศ.ของเลขที่เก็บของการการประกัน" }) bailCodeYear: string;
  @Column({ name: "BAIL_DATE", type: "timestamp", comment: "วันที่ขอประกัน" }) bailDate: Date;
  @Column({ name: "BAIL_NOTES", nullable: true, type: "clob", comment: "หมายเหตุการประกัน" }) bailNotes: string;
  @Column({ name: "BNUM_OLD", nullable: true, comment: "Temp สำหรับ Migrate" }) bnumOld: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { bailId, courtId, caseid, orderNo, bailPeriod, bailTitleId, bailCodeNo, bailCodeYear, bailDate, bailNotes, bnumOld, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { bailId, courtId, caseid, orderNo, bailPeriod, bailTitleId, bailCodeNo, bailCodeYear, bailDate, bailNotes, bnumOld, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}