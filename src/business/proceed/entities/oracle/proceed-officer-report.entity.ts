import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_OFFICER_REPORT" })
export class OracleProceedOfficerReports {
  @PrimaryGeneratedColumn({ name: "OFFICER_REPORT_ID", comment: "รหัสข้อมูลแจ้งเตือนพยานศาล(ตำรวจ) (AUTO INCREMENT)" }) officerReportId: number;
  @Column({ name: "ORDER_NO", type: "float", nullable: true, comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "ACCUSER_NAME", comment: "ชื่อโจทก์" }) accuserName: string;
  @Column({ name: "CASE_ID", comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "CHECK_BOX_1", nullable: true, comment: "ตัวเลือกรับด้วยตนเอง" }) checkBox1: number;
  @Column({ name: "CHECK_BOX_2", nullable: true, comment: "ตัวเลือกมีผู้รับแทน" }) checkBox2: number;
  @Column({ name: "CHECK_BOX_3", nullable: true, comment: "ตัวเลือกไม่สามารถส่งได้" }) checkBox3: number;
  @Column({ name: "CHECK_BOX_4", nullable: true, comment: "ตัวเลือกไม่ขัดข้องการมาเป็นพยานศาลตามวันเวลาดังกล่าวได้" }) checkBox4: number;
  @Column({ name: "CHECK_BOX_5", nullable: true, comment: "ตัวเลือกไม่สามารถมาเป็นพยานที่ศาลแขวงดอนเมืองได้" }) checkBox5: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "DEFENDANT_NAME", comment: "ชื่อจำเลย" }) defendantName: string;
  @Column({ name: "FULL_P_CASE", comment: "เลขที่คดีดำ" }) fullPCase: string;
  @Column({ name: "OFFICER_ID", comment: "รหัสเจ้าหน้าที่" }) officerId: number;
  @Column({ name: "OFFICER_REPORT_DATE		TIMESTAMP	6	Y", type: "timestamp", nullable: true, comment: "วันที่สำหรับรายงานเจ้าหน้าที่(พยานตอบรับวันนัด)" }) officerReportDate: Date;
  @Column({ name: "OFFICER_REPORT_NO", comment: "เลขที่รายงานเจ้าหน้าที่(พยานตอบรับวันนัด)" }) officerReportNo: number;
  @Column({ name: "POSITION_ID", comment: "รหัสตำแหน่ง" }) positionId: number;
  @Column({ name: "RUNNING_NUMBER_ID", nullable: true, comment: "รหัสเลขที่ต่อเนื่อง" }) runningNumberId: number;
  @Column({ name: "WITNESS_NAME", comment: "ชื่อพยานปาก" }) witnessName: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { officerReportId, orderNo, accuserName, caseId, checkBox1, checkBox2, checkBox3, checkBox4, checkBox5, courtId, defendantName, fullPCase, officerId, officerReportDate, officerReportNo, positionId, runningNumberId, witnessName, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { officerReportId, orderNo, accuserName, caseId, checkBox1, checkBox2, checkBox3, checkBox4, checkBox5, courtId, defendantName, fullPCase, officerId, officerReportDate, officerReportNo, positionId, runningNumberId, witnessName, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}