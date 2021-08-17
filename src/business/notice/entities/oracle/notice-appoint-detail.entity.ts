import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_NOTICE_APPOINT_DETAIL" })
export class OracleNoticeAppointDetails {
  @PrimaryGeneratedColumn({ name: "APPOINT_ID", comment: "รหัสข้อมูลรายละเอียดนัดในหมายประกาศ(AUTO INCREMENT)" }) appointId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "วันเวลาที่สร้างข้อมูล" }) orderNo: number;
  @Column({ name: "APPOINT_DATE", type: "timestamp", comment: "วันที่และเวลาที่นัด" }) appointDate: Date;
  @Column({ name: "APPOINT_DETAIL", nullable: true, comment: "รหัสพยานที่จะส่งหมาย เชื่อมโยง PC_NOTICE_WITNESS" }) appointDetail: string;
  @Column({ name: "APPOINT_LIST_ID", nullable: true, comment: "รหัสนัดเพื่อ เชื่อมโยง PC_LOOKUP_APPOINT_LIST" }) appointListId: number;
  @Column({ name: "NOTICE_ID", comment: "รหัสหมายประกาศ เชื่อมโยงตาราง PC_NOTICE" }) noticeId: number;
  @Column({ name: "CREATED_BY", comment: "รหัสหมายประกาศ เชื่อมโยงตาราง PC_NOTICE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) removedDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) updatedDate: Date;

  toResponseObject() {
    const { appointId, orderNo, appointDate, appointDetail, appointListId, noticeId, createdBy, updatedBy, removedBy, createdDate, removedDate, updatedDate } = this;
    const responseObject = { appointId, orderNo, appointDate, appointDetail, appointListId, noticeId, createdBy, updatedBy, removedBy, createdDate, removedDate, updatedDate };
    return responseObject;
  }
}