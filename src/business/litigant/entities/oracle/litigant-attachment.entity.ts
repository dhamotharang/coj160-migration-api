import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "PC_LITIGANT_ATTACHMENT" })

export class LitigantAttachments {
  @PrimaryColumn({ name: "ATTACH_ID", comment: "รหัสข้อมูลไฟล์แนบคำคู่ความ (AUTO INCREMENT)" }) attachId: number;
  @Column({ name: "LITIGANT_ID", comment: "รหัสคำคู่ความ เชื่อมโยง PC_LITIGANT" }) litigantId: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "CREATED_DATE", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_BY", comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "UPDATED_DATE", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "REMOVED_DATE", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;
  @Column({ name: "ORDER_NO", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "FILE_NAME", comment: "ชื่อไฟล์แนบ" }) fileName: string;
  @Column({ name: "FILE_DESCRIPTION", comment: "รายละเอียดไฟล์แนบ" }) fileDescription: string;
  @Column({ name: "FILE_URL", comment: "ของไฟล์แนบ" }) fileUrl: string;
  @Column({ name: "FILE_MIME_TYPE", comment: "ประเภท (MIME TYPE) ของไฟล์แนบ" }) fileMimeType: string;
}