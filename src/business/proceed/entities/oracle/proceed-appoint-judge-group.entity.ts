import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_APPOINT_JUDGE_GROUP" })
export class OracleProceedAppointJudgeGroups {
  @PrimaryGeneratedColumn({ name: "APP_JUDGE_GROUP_ID", comment: "รหัสข้อมูลองค์คณะของการนัดความ(AUTO INCREMENT)" }) appJudgeGroupId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "APPOINT_ID", comment: "รหัสนัดความ เชื่อมโยงตาราง PC_PROCEED_APPOINT" }) appointId: number;
  @Column({ name: "JUDGE_GROUP_ID", comment: "รหัสองค์คณะ เชื่อมโยง PC_LOOKUP_ JUDGE_GROUP" }) judgeGroupId: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", nullable: true, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;

  toResponseObject() {
    const { appJudgeGroupId, createdBy, createdDate, orderNo, removedBy, removedDate, updatedBy, updatedDate, appointId, judgeGroupId } = this;
    const responseObject = { appJudgeGroupId, createdBy, createdDate, orderNo, removedBy, removedDate, updatedBy, updatedDate, appointId, judgeGroupId };
    return responseObject;
  }
}