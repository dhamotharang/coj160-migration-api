import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_REC_TESTIMONY_DEFENDANT" })
export class OracleProceedRecTestimonyDefendants {
  @PrimaryGeneratedColumn({ name: "REC_TESTIMONY_DEFENDANT_ID", comment: "รหัสข้อมูลบันทึกคำให้การของจำเลยด้วยวาจา(AUTO INCREMENT)" }) recTestimonyDefendantId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "ACCUSER_NAME", comment: "ชื่อโจทก์" }) accuserName: string;
  @Column({ name: "AGE", nullable: true, comment: "อายุุ" }) age: string;
  @Column({ name: "CASE_ID", comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "CASE_NAME", comment: "ชื่อคดี" }) caseName: string;
  @Column({ name: "DEFENDANT_NAME", comment: "ชื่ื่อจำเลย" }) defendantName: string;
  @Column({ name: "JOB", nullable: true, comment: "อาชีพ" }) job: string;
  @Column({ name: "JUGDE_ID", comment: "รหัสผู้พิพากษา เชื่อมโยง PC_LOOKUP_JUDGE" }) judgeId: number;
  @Column({ name: "NATION", nullable: true, comment: "สัญชาติ" }) nation: string;
  @Column({ name: "PESONAL_CARD_ID", comment: "เลขบัตรประจำตัวประชาชน(Max length = 13)" }) personalCardId: string;
  @Column({ name: "RACE", nullable: true, comment: "เชื้อชาติ" }) race: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", nullable: true, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @CreateDateColumn({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @UpdateDateColumn({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { recTestimonyDefendantId, orderNo, accuserName, age, caseId, caseName, defendantName, job, judgeId, nation, personalCardId, race, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { recTestimonyDefendantId, orderNo, accuserName, age, caseId, caseName, defendantName, job, judgeId, nation, personalCardId, race, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}