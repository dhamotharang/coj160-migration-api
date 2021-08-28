import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "PC_BAIL_BAILSMAN_BREACH" })
export class OracleBailBailsmanBreachs {
  @PrimaryGeneratedColumn({ name: "BREACH_ID", comment: "รหัสข้อมูลนายประกันผิดสัญญา(AUTO INCREMENT)" }) breachId: number;
  @Column({ name: "BAILSMAN_ID", comment: "รหัสรายการข้อมูลนายประกัน เชื่อมโยง PC_BAIL_BAILSMAN" }) bailSmanId: number;
  @Column({ name: "BAIL_ID", comment: "รหัสรายการข้อมูลการประกัน เชื่อมโยง PC_BAIL" }) bailId: number;
  @Column({ name: "SEC_ID", comment: "รหัสรายการข้อมูลการประกันของหลักทรัพย์ เชื่อมโยง PC_BAIL_SEC" }) secId: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "ORDER_NO", nullable: true, comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "BREACH_DESCRIPTION", nullable: true, comment: "รายละเอียดการผิดสัญญา" }) breachDescription: string;
  @Column({ name: "BREACH_START_DATE", nullable: true, type: "timestamp", comment: "วันที่เริ่มผิดสัญญา" }) breachStartDate: Date;
  @Column({ name: "BREACH_FINISH_DATE", nullable: true, type: "timestamp", comment: "วันที่ปลดออกจากนายประกันผิดสัญญา" }) breachFinishDate: Date;
  @Column({ name: "AMOUNT", comment: "จำนวนเงินที่ผิดสัญญา" }) amount: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @CreateDateColumn({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @UpdateDateColumn({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { breachId, bailSmanId, bailId, secId, courtId, orderNo, breachDescription, breachStartDate, breachFinishDate, amount, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { breachId, bailSmanId, bailId, secId, courtId, orderNo, breachDescription, breachStartDate, breachFinishDate, amount, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}