import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_NIGHT_PLACE" })
export class OracleProceedNightPlaces {
  @PrimaryGeneratedColumn({ name: "NIGHT_PLACE_ID", comment: "รหัสข้อมูลคำสั่งอนุณาติให้เข้าไปในสถานที่ในเวลากลางคืน(AUTO INCREMENT)" }) nightPlaceId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "APPROVER", nullable: true, comment: "ยินยอมให้" }) approver: string;
  @Column({ name: "CASE_ID", comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "CONSIDER_DATE", type: "timestamp", nullable: true, comment: "วันที่พิจารณา" }) considerDate: Date;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "END_TIME", nullable: true, comment: "ถึงเวลา" }) endTime: string;
  @Column({ name: "FIND_USER_PROFILE_ID", comment: "รหัสประวัติผู้ใช้งานระบบ เชื่อมโยง PC_USER_PROFILE" }) findUserProfileId: number;
  @Column({ name: "NOTES", nullable: true, comment: "ด้วย" }) notes: string;
  @Column({ name: "START_TIME", nullable: true, comment: "ตั้งแต่เวลา" }) startTime: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { nightPlaceId, orderNo, approver, caseId, considerDate, courtId, endTime, findUserProfileId, notes, startTime, createBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { nightPlaceId, orderNo, approver, caseId, considerDate, courtId, endTime, findUserProfileId, notes, startTime, createBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}