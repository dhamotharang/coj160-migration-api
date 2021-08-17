import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_APPOINT_PROCESS" })
export class OracleProceedAppointProcess {
  @PrimaryGeneratedColumn({ name: "PROCESS_ID", comment: "รหัสข้อมูลรายงานกระบวนการ(AUTO INCREMENT)" }) processId: number;
  @Column({ name: "ORDER_NO", type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "APPOINT_ID", comment: "รหัสนัดความ เชื่อมโยงตาราง PC_PROCEED_APPOINT" }) appintId: number;
  @Column({ name: "CASE_LIT_ID", comment: "รหัสข้อมูลคู่ความ เชื่อมโยง PC_CASE_LIT" }) caseLitId: number;
  @Column({ name: "LITIGANT_SEQ", nullable: true, comment: "ลำดับที่คู่ความ" }) litigantSeq: number;
  @Column({ name: "PROCESS_DETAIL", type: "clob", nullable: true, comment: "รายงานกระบวนการ(คำสั่งศาล)" }) processDetail: string;
  @Column({ name: "TOTAL_PAGE", nullable: true, comment: "จำนวนหน้า" }) totalPage: number;
  @Column({ name: "WITNESS_WORDING_DETAIL", type: "clob", nullable: true, comment: "คำให้การพยาน" }) witnessWordingDetail: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updateDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { processId, orderNo, appintId, caseLitId, litigantSeq, processDetail, totalPage, witnessWordingDetail, createdBy, updatedBy, removedBy, createdDate, updateDate, removedDate } = this;
    const reponseObject = { processId, orderNo, appintId, caseLitId, litigantSeq, processDetail, totalPage, witnessWordingDetail, createdBy, updatedBy, removedBy, createdDate, updateDate, removedDate };
    return reponseObject;
  }
}