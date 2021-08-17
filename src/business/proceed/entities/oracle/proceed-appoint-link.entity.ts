import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_APPOINT_LINK" })
export class OracleProceedAppointLinks {
  @PrimaryGeneratedColumn({ name: "APPOINT_LINK_ID", comment: "รหัสข้อมูลรายละเอียดการเชื่อมโยง E-Filing ของการนัดความ(AUTO INCREMENT)" }) appointLinkId: number;
  @Column({ name: "ORDER_NO", type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "COURT_CODE", comment: "รหัสศาล ระบบภายนอก" }) courtCode: string;
  @Column({ name: "REF_CODE", comment: "ประเภทของ Reference ระบบภายนอก" }) refCode: string;
  @Column({ name: "REF_TYPE", comment: "รหัสสำหรับ Reference ระบบภายนอก" }) refType: string;
  @Column({ name: "APPOINT_ID", comment: "รหัสนัดความ เชื่อมโยงตาราง PC_PROCEED_APPOINT" }) appointId: number;
  @Column({ name: "UPDATED_BY", comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { appointLinkId, orderNo, courtCode, refCode, refType, appointId, updatedBy, createdBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { appointLinkId, orderNo, courtCode, refCode, refType, appointId, updatedBy, createdBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}