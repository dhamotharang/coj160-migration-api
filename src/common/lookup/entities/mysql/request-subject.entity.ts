import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "prequest_subject" })
export class MySQLRequestSubjects {
  @PrimaryGeneratedColumn({ name: "subject_id", comment: "รหัสคำคู่ความ" }) subjectId: number;
  @PrimaryColumn({ name: "court_running", comment: "รหัสศาลเจ้าของระบบ" }) courtRunning: number;
  @Column({ name: "subject_name", comment: "ชื่อคำคู่ความ" }) subjectName: number;
  @Column({ name: "ud_flag", comment: "คำร้องเกี่ยวกับอุทธรณ์/ฎีกา" }) udFlag: number;
  @Column({ name: "date_flag", comment: "บันทึกศาลอนุญาตถึงวันที่" }) dateFlag: number;
  @Column({ name: "create_dep_code", comment: "รหัสหน่วยงานที่สร้าง record" }) createDepCode: number;
  @Column({ name: "create_user_id", comment: "รหัส user ที่สร้าง record" }) createUserId: number;
  @Column({ name: "create_user", comment: "user ที่สร้าง record" }) createUser: number;
  @Column({ name: "create_date", comment: "วันที่เวลาสร้าง record" }) createDate: number;
  @Column({ name: "update_dep_code", comment: "รหัสหน่วยงานที่ update" }) updateDepCode: number;
  @Column({ name: "update_user_id", comment: "รหัส user ที่ update record" }) updateUserId: number;
  @Column({ name: "update_user", comment: "user ที่ update record" }) updateUser: number;
  @Column({ name: "update_date", comment: "วันที่ เวลา update record" }) updateDate: number;
  @Column({ name: "ref_id", comment: "transfer" }) refId: number;

  toResponseObject() {
    const { subjectId, courtRunning, subjectName, udFlag, dateFlag, createDepCode, createUserId, createUser, createDate, updateDepCode, updateUserId, updateUser, updateDate, refId } = this;
    const responseObject = { subjectId, courtRunning, subjectName, udFlag, dateFlag, createDepCode, createUserId, createUser, createDate, updateDepCode, updateUserId, updateUser, updateDate, refId };
    return responseObject;
  }

}