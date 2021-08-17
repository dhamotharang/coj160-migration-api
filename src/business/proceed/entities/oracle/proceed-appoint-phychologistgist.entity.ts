import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_APPOINT_PHYCHOLOGIST" })
export class OracleProceedAppointPhychologists {
  @PrimaryGeneratedColumn({ name: "APP_PHYCHOLOGIST_ID", comment: "รหัสข้อมูลนักจิตวิทยาของนัดความ(AUTO INCREMENT)" }) appPhychologistId: number;
  @Column({ name: "ORDER_NO", type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "APPOINT_ID", comment: "รหัสนัดความ เชื่อมโยงตาราง PC_PROCEED_APPOINT" }) appointId: number;
  @Column({ name: "COMPENSATION_AMOUNT", type: "float", comment: "ค่านักจิตวิทยา" }) compensationAmount: number;
  @Column({ name: "END_DATE", type: "timestamp", comment: "วันที่และเวลาที่สิ้นสุด" }) endDate: Date;
  @Column({ name: "NAME", comment: "ชื่อนักจิตวิทยา" }) name: string;
  @Column({ name: "START_DATE", type: "timestamp", comment: "วันที่และเวลาที่เริ่ม" }) startDate: Date;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { appPhychologistId, orderNo, appointId, compensationAmount, endDate, name, startDate, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { appPhychologistId, orderNo, appointId, compensationAmount, endDate, name, startDate, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}