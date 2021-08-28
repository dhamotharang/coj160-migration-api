import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_HOLD_JUDGE_GROUP" })
export class OracleProceedHoldJudgeGroups {
  @PrimaryGeneratedColumn({ name: "HOLD_JUDGE_GROUP_ID", comment: "รหัสข้อมูลองค์คณะของการค้างพิจารณา(AUTO INCREMENT)" }) holdJudgeGroupId: number;
  @Column({ name: "ORDER_NO	", type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "HOLD_ID", comment: "รหัสคดีค้างพิจารณา เชื่อมโยงตาราง PC_PROCEED_HOLD" }) holdId: number;
  @Column({ name: "JUDGE_GROUP_ID", comment: "รหัสองค์คณะ เชื่อมโยง PC_LOOKUP_ JUDGE_GROUP" }) judgeGroupId: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;

  toResponseObject() {
    const { holdJudgeGroupId, orderNo, holdId, judgeGroupId, createdBy, updatedBy, removedBy, createdDate, removedDate, updatedDate } = this;
    const responseObject = { holdJudgeGroupId, orderNo, holdId, judgeGroupId, createdBy, updatedBy, removedBy, createdDate, removedDate, updatedDate };
    return responseObject;
  }
}
