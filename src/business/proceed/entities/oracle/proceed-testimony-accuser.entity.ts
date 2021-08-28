import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_TESTIMONY_ACCUSER" })
export class OracleProceedTestimonyAccusers {
  @PrimaryGeneratedColumn({ name: "TESTIMONY_ACCUSER_ID", comment: "รหัสข้อมูลคำเบิกความโจทก์(AUTO INCREMENT)" }) testimonyAccuserId: number;
  @Column({ name: "ORDER_NO", type: "float", nullable: true, comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "ACCUSER_NAME", comment: "ชื่อโจทก์" }) accuserName: string;
  @Column({ name: "CASE_ID", comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "DEFENDANT_NAME", comment: "ชื่อจำเลย" }) defendantName: string;
  @Column({ name: "LITIGANT_RELATIONSHIP", comment: "ความสัมพันธ์กับคู่ความ" }) litigantRelationship: string;
  @Column({ name: "TESTIMONY_WITNESS_CHOICE", comment: "คำเบิกความพยาน 1 = นำ, 2 = หมาย" }) testimonyWitnessChoice: number;
  @Column({ name: "TESTIMONY_WITNESS_TEXT", type: "clob", nullable: true, comment: "บันทึกขอให้การต่อไปว่า" }) testimonyAccuserText: string;
  @Column({ name: "WITNESS_ADDRESS", comment: "ที่อยู่ของพยาน" }) witnessAddress: string;
  @Column({ name: "WITNESS_AGE", nullable: true, comment: "อายุพยาน" }) witnessAge: string;
  @Column({ name: "WITNESS_BIRTH_DATE", nullable: true, type: "timestamp", comment: "วันเกิดพยาน" }) witnessBirthDate: Date;
  @Column({ name: "WITNESS_JOB", comment: "อาชีพหรือตำแหน่งพยาน" }) witnessJob: string;
  @Column({ name: "WITNESS_NAME", comment: "ชื่อพยาน" }) witnessName: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @CreateDateColumn({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @UpdateDateColumn({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { testimonyAccuserId, orderNo, accuserName, caseId, defendantName, litigantRelationship, testimonyWitnessChoice, testimonyAccuserText, witnessAddress, witnessAge, witnessBirthDate, witnessJob, witnessName, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { testimonyAccuserId, orderNo, accuserName, caseId, defendantName, litigantRelationship, testimonyWitnessChoice, testimonyAccuserText, witnessAddress, witnessAge, witnessBirthDate, witnessJob, witnessName, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}