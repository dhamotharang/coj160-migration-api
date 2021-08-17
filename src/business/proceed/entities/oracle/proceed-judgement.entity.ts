import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_JUDGEMENT" })
export class OracleProceedJudgements {
  @PrimaryGeneratedColumn({ name: "JUDGEMENT_ID", comment: "รหัสข้อมูลบันทึกผลลัพธ์นัดความ(AUTO INCREMENT)" }) judgementId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "CASE_ID", comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "CASE_TYPE", comment: "ประเภทคดี เชื่อมโยง PC_LOOKUP_CASE_CATE_GROUP" }) casetype: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "COURT_LEVEL_ID", comment: "รหัสข้อมูลระดับศาล เชื่อมโยง PC_LOOKUP_COURT_LEVEL" }) courtLevelId: number;
  @Column({ name: "JUDGE_ID", comment: "รหัสผู้พิพากษา เชื่อมโยง PC_LOOKUP_JUDGE" }) judgeId: number;
  @Column({ name: "JUDGE_ORDER", type: "clob", comment: "รายละเอียดคำสั่งศาล" }) judgeOrder: string;
  @Column({ name: "JUDGE_ORDER_NO", comment: "คำสั่งศาลเลขที่" }) judgeOrderNo: number;
  @Column({ name: "JUDGE_QUORUM1_ID", comment: "องค์คณะ1 เชื่อมโยง PC_LOOKUP_JUDGE" }) judgeQuorum1Id: number;
  @Column({ name: "JUDGE_QUORUM2_ID", comment: "องค์คณะ2 เชื่อมโยง PC_LOOKUP_JUDGE" }) judgeQuorum2Id: number;
  @Column({ name: "JUDGEMENT_DATE", type: "timestamp", comment: "วันที่ตัดสิน" }) judgementDate: Date;
  @Column({ name: "NOTES", type: "clob", comment: "หมายเหตุ" }) notes: string;
  @Column({ name: "ORDER_DATE", type: "timestamp", comment: "วันที่เริ่มพิจารณาใหม่" }) orderDate: Date;
  @Column({ name: "ORDER_TIME", comment: "ครั้งที่" }) orderTime: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY		NUMBER	38, 0	Y	รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE", comment: "" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { judgementId, orderNo, caseId, casetype, courtId, courtLevelId, judgeId, judgeOrder, judgeOrderNo, judgeQuorum1Id, judgeQuorum2Id, judgementDate, notes, orderDate, orderTime, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { judgementId, orderNo, caseId, casetype, courtId, courtLevelId, judgeId, judgeOrder, judgeOrderNo, judgeQuorum1Id, judgeQuorum2Id, judgementDate, notes, orderDate, orderTime, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}