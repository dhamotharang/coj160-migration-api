import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_WITNESS" })
export class OracleProceedWitness {
  @PrimaryGeneratedColumn({ name: "WITNESS_ID", comment: "รหัสข้อมูลบัญชีพยาน(AUTO INCREMENT)" }) witnessId: number;
  @Column({ name: "ORDER_NO", type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "CASE_ID", comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "SEQ", comment: "ลำดับที่" }) seq: number;
  @Column({ name: "WITNESS_DETAIL", comment: "รายละเอียดเพิ่มเติมของพยาน" }) witnessDetail: string;
  @Column({ name: "WITNESS_LIT_TYPE", comment: "ฝ่ายของพยาน 1 = พยานฝ่ายโจทก์ 2 = พยานฝ่ายจำเลย" }) witnessLitType: number;
  @Column({ name: "WITNESS_NAME", comment: "ชื่อพยาน" }) witnessName: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;

  toResponseObject() {
    const { witnessId, orderNo, caseId, courtId, seq, witnessDetail, witnessLitType, witnessName, createBy, updatedBy, removedBy, createDate, removedDate, updatedDate } = this;
    const responseObject = { witnessId, orderNo, caseId, courtId, seq, witnessDetail, witnessLitType, witnessName, createBy, updatedBy, removedBy, createDate, removedDate, updatedDate };
    return responseObject;
  }
}