import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_BAIL_DETAIL" })
export class OracleBailDetails {
  @PrimaryGeneratedColumn({ name: "DETAIL_ID", comment: "รหัสข้อมูลรายละเอียดการประกันตัว(AUTO INCREMENT)" }) detailId: number;
  @Column({ name: "BAIL_ID", comment: "รหัสการประกัน เชื่อมโยงตาราง PC_BAIL" }) bailId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "APOINTMENT_DATE", comment: "วันนัดส่งตัว" }) apointmentDate: string;
  @Column({ name: "APOINTMENT_TIME", comment: "เวลานัดส่งตัว" }) apoinmentTime: string;
  @Column({ name: "CAN_LEAVE_COUNTRY", nullable: true, comment: "ตัวเลือกสามารถออกนอกประเทศได้(1 = อนุญาต, 2 = ไม่อนุญาต)" }) canLeaveCountry: number;
  @Column({ name: "CONDITION", nullable: true, comment: "เงื่อนไขการปล่อยตัว" }) condition: string;
  @Column({ name: "CONSENT_AGE", nullable: true, comment: "อายุผู้ยินยอม" }) consentAge: number;
  @Column({ name: "CONSENT_NAME", nullable: true, comment: "ชื่อผู้ยินยอม" }) consentName: string;
  @Column({ name: "CONSENT_RELATED", nullable: true, comment: "ความสัมพันธ์กับผู้ยินยอม" }) consentRelated: string;
  @Column({ name: "COURT_ORDER", nullable: true, comment: "คำสั่งศาล(1 = อนุญาต, 2 = ไม่อนุญาต)" }) courtOrder: number;
  @Column({ name: "COURT_ORDER_DETAIL", type: "clob", nullable: true, comment: "รายละเอียดคำสั่งศาล" }) courtOrderDetail: string;
  @Column({ name: "DEFENDANT_BAIL_COST", nullable: true, type: "float", comment: "ตีราคาประกัน" }) defendantBailCost: number;
  @Column({ name: "DEFENDANT_BAIL_STATUS", nullable: true, comment: "สถานะของผู้ถูกประกัน" }) defendantBailStatus: number;
  @Column({ name: "DEFENDANT_ID", comment: "รหัสข้อมูลจำเลย เชื่อมโยงตาราง PC_CASE_LIT" }) defendantId: number;
  @Column({ name: "DEFENDANT_TYPE", comment: "ประเภทผู้ถูกประกัน" }) defendantType: number;
  @Column({ name: "IS_SEQUESTER", comment: "ตัวเลือกถูกอายัด" }) isSequester: number;
  @Column({ name: "JUDGE_ID", comment: "รหัสผู้พิพากษา เชื่อมโยง PC_LOOKUP_JUDGE" }) judgeId: number;
  @Column({ name: "NOTES", type: "clob", nullable: true, comment: "หมายเหตุ" }) notes: string;
  @Column({ name: "REMAIN_BAILSMAN", nullable: true, comment: "รายละเอียดทรัพย์ประกันค้างไว้" }) remainBailsman: string;
  @Column({ name: "SUBMISSION_DATE", type: "timestamp", comment: "วันที่ยื่นขอประกัน" }) submissionDate: Date;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { detailId, bailId, orderNo, apointmentDate, apoinmentTime, canLeaveCountry, condition, consentAge, consentName, consentRelated, courtOrder, courtOrderDetail, defendantBailCost, defendantBailStatus, defendantId, defendantType, isSequester, judgeId, notes, remainBailsman, submissionDate, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { detailId, bailId, orderNo, apointmentDate, apoinmentTime, canLeaveCountry, condition, consentAge, consentName, consentRelated, courtOrder, courtOrderDetail, defendantBailCost, defendantBailStatus, defendantId, defendantType, isSequester, judgeId, notes, remainBailsman, submissionDate, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}