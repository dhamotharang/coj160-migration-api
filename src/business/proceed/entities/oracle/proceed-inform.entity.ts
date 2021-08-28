import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_INFORM" })
class OracleProceedInforms {
  @PrimaryGeneratedColumn({ name: "INFORM_ID", comment: "รหัสข้อมูลแจ้งคำพิพากษา(AUTO INCREMENT)" }) informId: number;
  @Column({ name: "ORDER_NO", type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "OFFENSE_DETAIL", type: "clob", comment: "ฐานความผิด" }) offednseDetail: string;
  @Column({ name: "ARREST_MONTH", nullable: true, comment: "จำนวนเดือนลงโทษจำคุก" }) arrestMonth: number;
  @Column({ name: "ARREST_YEAR", nullable: true, comment: "จำนวนปีลงโทษจำคุก" }) arrestYear: number;
  @Column({ name: "CASE_ID", comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "CASE_LIT_ID", comment: "รหัสข้อมูลคู่ความ เชื่อมโยง PC_CASE_LIT" }) caseLitId: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "DOC_TOTAL", nullable: true, comment: "จำนวนเอกสาร" }) docTotal: number;
  @Column({ name: "FIND_USER_PROFILE_ID", comment: "รหัสประวัติผู้ใช้งานระบบ เชื่อมโยง PC_USER_PROFILE" }) findUserProfileId: number;
  @Column({ name: "FINE_AMOUNT", type: "float", nullable: true, comment: "จำนวนค่าปรับ" }) fineAmount: number;
  @Column({ name: "INFORM_DATE", nullable: true, comment: "วันที่แจ้งให้จำเลยมา" }) informDate: Date;
  @Column({ name: "INFORM_TIME", nullable: true, comment: "เวลา" }) informTime: string;
  @Column({ name: "JUDGEMENT_DATE", nullable: true, comment: "วันที่พิพากษา" }) judgementDate: Date;
  @Column({ name: "PERIOD", nullable: true, comment: "ระยะเวลา/ปี" }) period: number;
  @Column({ name: "DOCUMENT_ID", nullable: true, comment: "รหัสทะเบียนส่งหนังสือ เชื่อมโยง PC_WF_DOCUMENT_SEND" }) documentId: number;
  @Column({ name: "CREATED_BY", comment: "" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", type: "timestamp", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { informId, orderNo, offednseDetail, arrestMonth, arrestYear, caseId, caseLitId, courtId, docTotal, findUserProfileId, fineAmount, informDate, informTime, judgementDate, period, documentId, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { informId, orderNo, offednseDetail, arrestMonth, arrestYear, caseId, caseLitId, courtId, docTotal, findUserProfileId, fineAmount, informDate, informTime, judgementDate, period, documentId, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}