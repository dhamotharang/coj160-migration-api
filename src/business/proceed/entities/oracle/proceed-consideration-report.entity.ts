import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_CONSIDERATION_REPORT" })
export class OracleProceedConsiderationReports {
  @PrimaryGeneratedColumn({ name: "CONSIDERATION_REPORT_ID", comment: "รหัสข้อมูลรายงานกระบวนพิจารณา(AUTO INCREMENT)" }) considerationReportId: number;
  @Column({ name: "ORDER_NO", type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "ACCUSER_NAME", comment: "ชื่อโจทก์" }) accuserName: string;
  @Column({ name: "CASE_ID", comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "CONSIDERATION_REPORT_DATE", type: "timestamp", nullable: true, comment: "วันที่รายงานกระบวนพิจารณา" }) considerationReportDate: Date;
  @Column({ name: "CONSIDERATION_REPORT_TIME", comment: "เวลารายงานกระบวนพิจารณา" }) considerationReportTime: string;
  @Column({ name: "DEFENDANT_NAME", comment: "ชื่ื่อจำเลย" }) defendantName: string;
  @Column({ name: "OFFICER_ID", comment: "รหัสเจ้าหน้าที่ เชื่อมโยง PC_USER_PROFILE" }) officerId: number;
  @Column({ name: "POSITION_ID", comment: "รหัสตำแหน่ง เชื่อมโยง PC_LOOKUP_POSITION" }) positionId: number;
  @Column({ name: "REPORT_CONTENT_ID", comment: "รหัสตั้งค่าใจความรายงานกระบวน เชื่อมโยง  PC_PROCEED_CONSIDERATION_CONFIG" }) reportContentId: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { considerationReportId, orderNo, accuserName, caseId, considerationReportDate, considerationReportTime, defendantName, officerId, positionId, reportContentId, createdBy, removedBy, updatedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { considerationReportId, orderNo, accuserName, caseId, considerationReportDate, considerationReportTime, defendantName, officerId, positionId, reportContentId, createdBy, removedBy, updatedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}