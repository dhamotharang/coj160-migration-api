import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_NOTICE_LIT_DETAIL" })
export class OracleNoticeLitDetails {
  @PrimaryGeneratedColumn({ name: "DETAIL_ID", comment: "รหัสข้อมูลรายละเอียดคู่ความในหมายประกาศ(AUTO INCREMENT)" }) detailId: number;
  @Column({ name: "ORDER_NO", type: "float", comment: "วันเวลาที่สร้างข้อมูล" }) orderNo: number;
  @Column({ name: "BY_CASE_LIT_ID", comment: "รหัสคู่ความที่สร้างหมาย เชื่อมโยง PC_CASE_LIT" }) byCaseLitId: number;
  @Column({ name: "BY_LIT_TYPE", comment: "ประเภทคู่ความที่สร้างหมาย 1 = โจทก์ 2 = จำเลย" }) byLitType: number;
  @Column({ name: "BY_NAME", comment: "ชื่อที่สร้างหมาย" }) byName: string;
  @Column({ name: "IS_SEND_TO_AGENT", nullable: true, comment: "ตัวเลือกส่งให้ตัวแทน" }) isSendToAgent: number;
  @Column({ name: "LAWYER_ID", nullable: true, comment: "รหัสทนายปัจจุบัน เชื่อมโยง PC_LOOKUP_LAWYER" }) lawyerId: number;
  @Column({ name: "NEED_REPLACE_BY_NAME", nullable: true, comment: "ตัวเลือกต้องการแทนที่ด้วยชื่ออื่น" }) needReplaceByName: number;
  @Column({ name: "NEED_REPLACE_TO_NAME", nullable: true, comment: "ตัวเลือกต้องการแทนที่ด้วยชื่ออื่น" }) needReplaceToName: number;
  @Column({ name: "NOTICE_ID", comment: "รหัสหมายประกาศ เชื่อมโยงตาราง PC_NOTICE" }) noticeId: number;
  @Column({ name: "SEQ", nullable: true, comment: "ลำดับที่" }) seq: number;
  @Column({ name: "TO_CASE_LIT_ID", nullable: true, comment: "รหัสคู่ความที่จะส่งหมาย เชื่อมโยง PC_CASE_LIT" }) toCaseLitId: number;
  @Column({ name: "TO_LIT_TYPE", comment: "ประเภทคู่ความที่จะส่งหมาย 1 = โจทก์ 2 = จำเลย 3 = พยาน" }) toLitType: number;
  @Column({ name: "TO_NAME", comment: "ชื่อที่จะส่งหมาย" }) toName: string;
  @Column({ name: "TO_WITNESS_ID", nullable: true, comment: "รหัสพยานที่จะส่งหมาย เชื่อมโยง PC_NOTICE_WITNESS" }) toWitnessId: number;
  @Column({ name: "CREATED_BY", comment: "รหัสหมายประกาศ เชื่อมโยงตาราง PC_NOTICE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) removedDate: Date;

  toResponseObject() {
    const { detailId, orderNo, byCaseLitId, byLitType, byName, isSendToAgent, lawyerId, needReplaceByName, needReplaceToName, noticeId, seq, toCaseLitId, toLitType, toName, toWitnessId, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { detailId, orderNo, byCaseLitId, byLitType, byName, isSendToAgent, lawyerId, needReplaceByName, needReplaceToName, noticeId, seq, toCaseLitId, toLitType, toName, toWitnessId, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}