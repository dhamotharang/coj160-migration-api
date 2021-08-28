import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_CONSIDERATION_CONFIG" })
export class OracleProceedConsiderationConfigs {
  @PrimaryGeneratedColumn({ name: "CONSIDERATION_CONFIG_ID", comment: "รหัสข้อมูลตั้งค่าใจความรายงานกระบวน(AUTO INCREMENT)" }) considerationConfigId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "CONSIDERATION_CONFIG_DETAIL", type: "clob", nullable: true, comment: "รายละเอียดใจความฟ้อง" }) considerationConfigDetail: string;
  @Column({ name: "CONSIDERATION_CONFIG_TOPIC", comment: "ใจความรายงานกระบวน" }) considerationConfigTopic: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", nullable: true, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { considerationConfigId, orderNo, considerationConfigDetail, considerationConfigTopic, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { considerationConfigId, orderNo, considerationConfigDetail, considerationConfigTopic, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}