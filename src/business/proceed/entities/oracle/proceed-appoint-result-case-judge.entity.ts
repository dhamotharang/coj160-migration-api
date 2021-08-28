import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_APPOINT_RESULT_CASE_JUDGE" })
export class OracleProceedAppointResultCaseJudges {
  @PrimaryGeneratedColumn({ name: "APPOINT_CASE_JUDGE_ID", comment: "รหัสข้อมูลผู้พิพากษาผลลัพธ์นัดความ(AUTO INCREMENT)" }) appointCaseJudgeId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "APPOINT_RESULT_ID", comment: "รหัสผลลัพธ์นัดความ เชื่อมโยง PC_PROCEED_APPOINT_RESULT" }) appointResultId: number;
  @Column({ name: "COURT_ID	", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "JUDGE_END_DATE", nullable: true, type: "timestamp", comment: "วันที่สิ้นสุดทำคดี" }) judgeEndDate: Date;
  @Column({ name: "JUDGE_ID", nullable: true, comment: "รหัสผู้พิพากษา เชื่อมโยง PC_LOOKUP_JUDGE" }) judgeId: number;
  @Column({ name: "JUDGE_START_DATE", nullable: true, type: "timestamp", comment: "วันที่เริ่มแต่งตั้งทำคดี" }) judgeStartDate: Date;
  @Column({ name: "JUDGE_TYPE_ID", nullable: true, comment: "รหัสประเภทผู้พิพากษา เชื่อมโยง PC_LOOKUP_JUDGE_TYPE" }) judgeTypeId: number;
  @Column({ name: "RUNNING", nullable: true, comment: "รันนิ่ง นัมเบอร์" }) running: number;
  @Column({ name: "TEMPORARY_JUDGE_FLAG", nullable: true, enum: [1, 2, 3, 4], comment: "ผู้พิพากษาดำรงตำแหน่งชั่วคราว(1 : จ่ายชั่วคราว 2 : โอนสำนวน 3 : จ่ายต่อเนื่อง 4 : จ่ายสำนวน(ปกติ))" }) temporaryJudgeFlag: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { appointCaseJudgeId, orderNo, appointResultId, courtId, judgeEndDate, judgeId, judgeStartDate, judgeTypeId, running, temporaryJudgeFlag, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { appointCaseJudgeId, orderNo, appointResultId, courtId, judgeEndDate, judgeId, judgeStartDate, judgeTypeId, running, temporaryJudgeFlag, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}