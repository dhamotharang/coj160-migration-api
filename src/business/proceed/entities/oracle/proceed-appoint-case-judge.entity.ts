import { HttpException, HttpStatus } from "@nestjs/common";
import { BeforeInsert, Column, CreateDateColumn, Entity, getManager, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OracleProceedAppoints } from "./proceed-appoint.entity";

@Entity({ name: "PC_PROCEED_APPOINT_CASE_JUDGE" })
export class OracleProceedAppointCaseJudges {
  @PrimaryGeneratedColumn({ name: "APPOINT_CASE_JUDGE_ID", comment: "รหัสข้อมูลผู้พิพากษานัดความ(AUTO INCREMENT)" }) appointCaseJudgeId: number;
  @Column({ name: "ORDER_NO", type: "float", nullable: true, comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "APPOINT_ID", comment: "รหัสนัดความ เชื่อมโยง PC_PROCEED_APPOINT" }) appointId: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "JUDGE_END_DATE", type: "timestamp", nullable: true, comment: "วันที่สิ้นสุดทำคดี" }) judgeEndDate: Date;
  @Column({ name: "JUDGE_ID", nullable: true, comment: "รหัสผู้พิพากษา เชื่อมโยง PC_LOOKUP_JUDGE" }) judgeId: number;
  @Column({ name: "JUDGE_START_DATE", nullable: true, comment: "วันที่เริ่มแต่งตั้งทำคดี" }) judgeStartDate: Date;
  @Column({ name: "JUDGE_TYPE_ID", nullable: true, comment: "รหัสประเภทผู้พิพากษา เชื่อมโยง PC_LOOKUP_JUDGE_TYPE" }) judgeTypeId: number;
  @Column({ name: "RUNNING", nullable: true, comment: "รันนิ่ง นัมเบอร์" }) running: number;
  @Column({ name: "TEMPORARY_JUDGE_FLAG", nullable: true, enum: [1, 2, 3, 4], comment: "ผู้พิพากษาดำรงตำแหน่งชั่วคราว(1 : จ่ายชั่วคราว 2 : โอนสำนวน 3 : จ่ายต่อเนื่อง 4 : จ่ายสำนวน(ปกติ))" }) temporaryJudgeFlage: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @CreateDateColumn({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @UpdateDateColumn({ name: "UPDATED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @UpdateDateColumn({ name: "REMOVED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_PROCEED_APPOINT_CASE_JUDGE_SEQ".nextval ID FROM DUAL`);
      this.appointId = res[0].ID;
      this.orderNo = res[0].ID;
    } catch (error) {
      throw new HttpException(`[oracle: before insert failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  @ManyToOne(type => OracleProceedAppoints, continunes => continunes.appointId)
  @JoinColumn({ name: "APPOINT_ID" }) proceedAppoints: OracleProceedAppoints;

  toResponseObject() {
    const { appointCaseJudgeId, orderNo, appointId, courtId, judgeEndDate, judgeId, judgeStartDate, judgeTypeId, running, temporaryJudgeFlage, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { appointCaseJudgeId, orderNo, appointId, courtId, judgeEndDate, judgeId, judgeStartDate, judgeTypeId, running, temporaryJudgeFlage, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}