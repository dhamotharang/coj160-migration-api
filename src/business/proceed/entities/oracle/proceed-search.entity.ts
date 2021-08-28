import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_SEARCH" })
export class OracleProceedSearchs {
  @PrimaryGeneratedColumn({ name: "SEARCH_ID", comment: "รหัสข้อมูลบันทึกสืบเสาะและพินิจ(AUTO INCREMENT)" }) searchId: number;
  @Column({ name: "OFFENSE_DETAIL		CLOB		Y	ฐานความผิด", comment: "" }) offenseDetail: string;
  @Column({ name: "CASE_ID		NUMBER	10, 0	N	รหัสคดี เชื่อมโยงตาราง PC_CASE", comment: "" }) caseId: number;
  @Column({ name: "CASE_LIT_ID		NUMBER	10, 0	Y	รหัสข้อมูลคู่ความ เชื่อมโยง PC_CASE_LIT", comment: "" }) caseLitId: number;
  @Column({ name: "CASE_TOTAL		NUMBER	10, 0	N	จำนวนเอกสารสำนวน", comment: "" }) caseTotal: number;
  @Column({ name: "COURT_ID		NUMBER	10, 0	N	รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT", comment: "" }) courtId: number;
  @Column({ name: "DOC_TOTAL		NUMBER	10, 0	Y	จำนวนเอกสาร", comment: "" }) docTotal: number;
  @Column({ name: "DOCUMENT_ID		NUMBER	10, 0	N	รหัสทะเบียนส่งหนังสือ เชื่อมโยง PC_WF_DOCUMENT_SEND", comment: "" }) documentId: number;
  @Column({ name: "FIND_USER_PROFILE_ID		NUMBER	10, 0	N	รหัสประวัติผู้ใช้งานระบบ เชื่อมโยง PC_USER_PROFILE", comment: "" }) findUserProfileId: number;
  @Column({ name: "JUDGEMENT_DATE		TIMESTAMP	6	Y	วันเวลาที่มีคำสั่ง", comment: "" }) judgementDate: Date;
  @Column({ name: "NOTES		CLOB		Y	หมายเหตุ", comment: "" }) notes: string;
  @Column({ name: "ORDER_DATE		TIMESTAMP	6	Y	วันเวลาที่มีีคำสั่ง", comment: "" }) orderDate: Date;
  @Column({ name: "SEARCH_TIME		VARCHAR2	20 CHAR	Y	เวลา", comment: "" }) searcTime: string;
  @Column({ name: "SEARCH_TYPE		NUMBER	10, 0	Y	ชนิดประเภท คป 1 หรือ 2", comment: "" }) searchType: number;

  toResponseObject() {
    const { searchId, offenseDetail, caseId, caseLitId, caseTotal, courtId, docTotal, documentId, findUserProfileId, judgementDate, notes, orderDate, searcTime, searchType } = this;
    const responseObject = { searchId, offenseDetail, caseId, caseLitId, caseTotal, courtId, docTotal, documentId, findUserProfileId, judgementDate, notes, orderDate, searcTime, searchType };
    return responseObject;
  }
}