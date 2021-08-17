import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_APPOINT" })
export class OracleProceedAppoints {
  @PrimaryGeneratedColumn({ name: "APPOINT_ID", comment: "รหัสข้อมูลนัดความ(AUTO INCREMENT)" }) appointId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "OFFENSE_DETAIL", nullable: true, type: "clob", comment: "ฐานความผิด" }) offenseDetail: string;
  @Column({ name: "APPOINT_BY_ID", comment: "รหัสคดีนัดแบบใด เชื่อมโยง PC_LOOKUP_APPOINT_CASE" }) appointById: number;
  @Column({ name: "APPOINT_DEPARTMENT_ID", nullable: true, comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) appointDepartment: number;
  @Column({ name: "ARREST", nullable: true, comment: "ตัวเลือกขัง" }) arrest: number;
  @Column({ name: "ARREST_DATE", nullable: true, type: "timestamp", comment: "วันที่ขัง" }) arrestDate: Date;
  @Column({ name: "CASE_ID", comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "INVESTIGATE_ACCUSER", nullable: true, comment: "จำนวนปากของสืบพยานโจทก์" }) investigateAccuser: number;
  @Column({ name: "INVESTIGATE_ACCUSER_DATE", nullable: true, comment: "จำนวนวันของการสืบพยานโจทก์" }) investigateAccuserDate: Date;
  @Column({ name: "INVESTIGATE_DEFENDANT", nullable: true, comment: "จำนวนปากของสืบพยานจำเลย" }) investigateDefendent: number;
  @Column({ name: "INVESTIGATE_DEFENDANT_DATE", nullable: true, comment: "จำนวนวันของการสืบพยานจำเลย" }) investigateDefendentDate: Date;
  @Column({ name: "INVESTIGATE_OTHER", nullable: true, comment: "จำนวนปากของสืบอื่น ๆ" }) investigateOther: number;
  @Column({ name: "INVESTIGATE_OTHER_DATE", nullable: true, comment: "จำนวนวันของการสืบอื่น ๆ" }) investigateOtherDate: Date;
  @Column({ name: "INVESTIGATE_OTHER_DETAIL", nullable: true, comment: "รายละเอียดของสืบอื่น ๆ" }) investigateOtherDetail: string;
  @Column({ name: "LAWYER_CLAIMANT_ID", nullable: true, comment: "รหัสทนายฝ่ายจำเลย" }) lawyerClaimId: number;
  @Column({ name: "LAWYER_DEFENDANT_ID", nullable: true, comment: "รหัสทนายฝ่ายโจทก์" }) lawyerDefendantId: number;
  @Column({ name: "NO_ARREST", nullable: true, comment: "ตัวเลือกไม่ขัง" }) noArrest: number;
  @Column({ name: "ONE_JUDGE", nullable: true, comment: "ตัวเลือกผู้พิพากษานายเดียว(ศาลแขวง)" }) noJudge: number;
  @Column({ name: "OWNER_DATE", type: "timestamp", nullable: true, comment: "วันที่เป็นเจ้าของ" }) ownerDate: Date;
  @Column({ name: "PLAINTIFF_ID", nullable: true, comment: "รหัสสถานะการนัด เชื่อมโยง PC_LOOKUP_APPOINT_STATUS" }) plaintiffId: number;
  @Column({ name: "PLAINTIFF_TYPE", nullable: true, comment: "ตัวเลือกผู้ใดเป็นโจทก์ 1 = อัยการเป็นโจทก์, 2 = ราษฎร์เป็นโจทก์" }) plaintiffType: number;
  @Column({ name: "REASON_APPOINT_ID", nullable: true, comment: "รหัสสาเหตุที่นัด" }) reasonAppointId: number;
  @Column({ name: "RELEASE", nullable: true, comment: "ตัวเลือกปล่อยตัวชั่วคราว" }) release: number;
  @Column({ name: "ROOM_ID", nullable: true, comment: "ห้องพิจารณาคดี เชื่อมโยง PC_LOOKUP_LEVEL_ROOM" }) roomId: number;
  @Column({ name: "TWO_JUDGE", nullable: true, comment: "ตัวเลือกผู้พิพากษาสองนาย(ศาลจังหวัด)" }) twoJudge: number;
  @Column({ name: "IS_ELECTRONIC_FILING", comment: "เป็นนัดความจากระบบ E-Filing หรือไม่ ?" }) isElectronicFiling: number;
  @Column({ name: "CREATED_BY", comment: "	รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY		NUMBER	38, 0	Y", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { appointId, createdBy, createdDate, orderNo, removedBy, removedDate, updatedBy, updatedDate, offenseDetail, appointById, appointDepartment, arrest, arrestDate, caseId, investigateAccuser, investigateAccuserDate, investigateDefendent, investigateDefendentDate, investigateOther, investigateOtherDate, investigateOtherDetail, lawyerClaimId, lawyerDefendantId, noArrest, noJudge, ownerDate, plaintiffId, plaintiffType, reasonAppointId, release, roomId, twoJudge, isElectronicFiling } = this;
    const responseObject = { appointId, createdBy, createdDate, orderNo, removedBy, removedDate, updatedBy, updatedDate, offenseDetail, appointById, appointDepartment, arrest, arrestDate, caseId, investigateAccuser, investigateAccuserDate, investigateDefendent, investigateDefendentDate, investigateOther, investigateOtherDate, investigateOtherDetail, lawyerClaimId, lawyerDefendantId, noArrest, noJudge, ownerDate, plaintiffId, plaintiffType, reasonAppointId, release, roomId, twoJudge, isElectronicFiling };
    return responseObject;
  }
}