import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_CHANGE" })
export class OracleProceedChanges {
  @PrimaryGeneratedColumn({ name: "CHANGE_ID", comment: "รหัสข้อมูลแจ้งการเปลี่ยนแปลงคำพิพากษาหรือคำสั่ง(AUTO INCREMENT)" }) changeId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "ACCU_ID", comment: "รหัสข้อมูลจำเลย เชื่อมโยง PC_CASE_LIT.CASE_LIT_ID" }) accuId: number;
  @Column({ name: "CASE_ID", comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "DOC_TOTAL", comment: "จำนวนเอกสาร" }) docTotal: number;
  @Column({ name: "FIND_USER_PROFILE_ID", comment: "รหัสประวัติผู้ใช้งานระบบ เชื่อมโยง PC_USER_PROFILE" }) findUserProfileId: number;
  @Column({ name: "JUDGEMENT_DATE", type: "timestamp", nullable: true, comment: "วันที่พิจารณา" }) judgementDate: Date;
  @Column({ name: "PROS_ID", comment: "รหัสข้อมูลโจทก์ เชื่อมโยง PC_CASE_LIT.CASE_LIT_ID" }) prosId: number;
  @Column({ name: "DOCUMENT_ID", nullable: true, comment: "รหัสทะเบียนส่งหนังสือ เชื่อมโยง PC_WF_DOCUMENT_SEND" }) documentId: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { changeId, orderNo, accuId, caseId, courtId, docTotal, findUserProfileId, judgementDate, prosId, documentId, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { changeId, orderNo, accuId, caseId, courtId, docTotal, findUserProfileId, judgementDate, prosId, documentId, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}