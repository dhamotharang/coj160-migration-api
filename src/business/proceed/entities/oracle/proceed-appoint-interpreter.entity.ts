import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_APPOINT_INTERPRETER" })
export class OracleProceedAppointInterpreters {
  @PrimaryGeneratedColumn({ name: "APP_INTERPRETER_ID", comment: "รหัสข้อมูลล่ามของนัดความ(AUTO INCREMENT)" }) appInterpreterId: number;
  @Column({ name: "ORDER_NO", type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "APPOINT_ID", comment: "รหัสนัดความ เชื่อมโยงตาราง PC_PROCEED_APPOINT" }) appointId: number;
  @Column({ name: "COMPENSATION_AMOUNT", type: "float", comment: "ค่าล่าม" }) compensationAmount: number;
  @Column({ name: "END_DATE", type: "timestamp", comment: "วันที่และเวลาที่สิ้นสุด" }) endDate: Date;
  @Column({ name: "INTERPRETER_ID", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_LOOKUP_INTERPRETER" }) interpreterId: number;
  @Column({ name: "START_DATE", type: "timestamp", comment: "วันที่และเวลาที่เริ่ม" }) startDate: Date;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", nullable: true, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @CreateDateColumn({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @UpdateDateColumn({ name: "UPDATED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @UpdateDateColumn({ name: "REMOVED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { appInterpreterId, orderNo, appointId, compensationAmount, endDate, interpreterId, startDate, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { appInterpreterId, orderNo, appointId, compensationAmount, endDate, interpreterId, startDate, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}