import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_APPOINT_RESULT" })
export class OracleProceedAppointResults {
  @PrimaryGeneratedColumn({ name: "APPOINT_RESULT_ID", comment: "รหัสข้อมูลผลลัพธ์นัดความ(AUTO INCREMENT)" }) appointResultId: number;
  @Column({ name: "ORDER_NO", type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "OFFENSE_DETAIL", type: "clob", nullable: true, comment: "ฐานความผิด" }) offenseDetail: string;
  @Column({ name: "APPOINT_BY_ID", comment: "รหัสคดีนัดแบบใด" }) appointById: number;
  @Column({ name: "APPOINT_DATE", type: "timestamp", nullable: true, comment: "วันที่นัด" }) appointDate: Date;
  @Column({ name: "APPOINT_DELAY_ID", nullable: true, comment: "รหัสเลื่อนนัด เชื่อมโยง PC_LOOKUP_APPOINT_DELAY" }) appointDelayId: number;
  @Column({ name: "APPOINT_ID", comment: "รหัสนัดความ เชื่อมโยง PC_PROCEED_APPOINT" }) appointId: number;
  @Column({ name: "APOINT_TIME", nullable: true, comment: "เวลาที่นัด" }) apointTime: string;
  @Column({ name: "ARREST", nullable: true, comment: "ตัวเลือกขัง" }) arrest: number;
  @Column({ name: "ARREST_DATE", type: "timestamp", nullable: true, comment: "วันที่ขัง" }) arrestDete: Date;
  @Column({ name: "CASE_ID", comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "END_DATE", type: "timestamp", comment: "วันที่สิ้นสุด" }) endDate: Date;
  @Column({ name: "END_TIME", nullable: true, comment: "เวลาสิ้นสุด" }) endTime: string;
  @Column({ name: "INVESTIGATE_ACCUSER", nullable: true, comment: "จำนวนปากของสืบพยานโจทก์" }) investigateAccuser: number;
  @Column({ name: "INVESTIGATE_ACCUSER_DATE", nullable: true, comment: "จำนวนวันของการสืบพยานโจทก์" }) investigateAccuserDate: number;
  @Column({ name: "INVESTIGATE_DEFENDANT", nullable: true, comment: "จำนวนปากของสืบพยานจำเลย" }) investigateAccuserDefendant: number;
  @Column({ name: "INVESTIGATE_DEFENDANT_DATE", nullable: true, comment: "จำนวนวันของการสืบพยานจำเลย" }) investigateAccuserDefendantDate: number;
  @Column({ name: "INVESTIGATE_OTHER", nullable: true, comment: "จำนวนปากของสืบอื่น ๆ" }) investigateOther: number;
  @Column({ name: "INVESTIGATE_OTHER_DATE", nullable: true, comment: "จำนวนวันของการสืบอื่น ๆ" }) investigateOtherDate: number;
  @Column({ name: "INVESTIGATE_OTHER_DETAIL", nullable: true, comment: "รายละเอียดของสืบอื่น ๆ" }) investigateOtherDetail: string;
  @Column({ name: "NO_ARREST", nullable: true, comment: "ตัวเลือกไม่ขัง" }) noArrest: number;
  @Column({ name: "ONE_JUDGE", nullable: true, comment: "ตัวเลือกผู้พิพากษานายเดียว(ศาลแขวง)" }) oneJudge: number;
  @Column({ name: "OWNER_DATE", type: "timestamp", comment: "วันที่เป็นเจ้าของ" }) ownerDate: Date;
  @Column({ name: "PLAINTIFF_ID", nullable: true, comment: "รหัสสถานะการนัด เชื่อมโยง PC_LOOKUP_APPOINT_STATUS" }) plaintiffId: number;
  @Column({ name: "PLAINTIFF_TYPE", nullable: true, comment: "ตัวเลือกผู้ใดเป็นโจทก์ 1 = อัยการเป็นโจทก์, 2 = ราษฎร์เป็นโจทก์" }) plaintiffType: number;
  @Column({ name: "RELEASE", nullable: true, comment: "ตัวเลือกปล่อยตัวชั่วคราว" }) release: number;
  @Column({ name: "TWO_JUDGE", nullable: true, comment: "ตัวเลือกผู้พิพากษาสองนาย(ศาลจังหวัด)" }) twoJudge: number;
  @Column({ name: "HOID_REASON_ID", nullable: true, comment: "รหัสสาเหตุที่ค้าง เชื่อมโยง PC_PROCEED_HOLD_REASON" }) hoidReasonId: number;
  @Column({ name: "STATUS", nullable: true, comment: "รหัสสาเหตุที่ค้าง" }) status: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", nullable: true, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { appointResultId, orderNo, offenseDetail, appointById, appointDate, appointDelayId, appointId, apointTime, arrest, arrestDete, caseId, endDate, endTime, investigateAccuser, investigateAccuserDate, investigateAccuserDefendant, investigateAccuserDefendantDate, investigateOther, investigateOtherDate, investigateOtherDetail, noArrest, oneJudge, ownerDate, plaintiffId, plaintiffType, release, twoJudge, hoidReasonId, status, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { appointResultId, orderNo, offenseDetail, appointById, appointDate, appointDelayId, appointId, apointTime, arrest, arrestDete, caseId, endDate, endTime, investigateAccuser, investigateAccuserDate, investigateAccuserDefendant, investigateAccuserDefendantDate, investigateOther, investigateOtherDate, investigateOtherDetail, noArrest, oneJudge, ownerDate, plaintiffId, plaintiffType, release, twoJudge, hoidReasonId, status, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}