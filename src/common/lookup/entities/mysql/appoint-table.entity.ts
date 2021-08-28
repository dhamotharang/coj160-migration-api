import { HelperService } from "src/shared/helpers/helper.service";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "pappoint_table" })

export class MySQLAppointTables extends HelperService {
  constructor() {
    super();
  }

  @PrimaryColumn({ name: "court_running", comment: "รหัสศาลเจ้าของระบบ" }) courtRunning: number;
  @PrimaryColumn({ name: "table_id", comment: "running ตาราง" }) tableId: number;
  @Column({ name: "table_name", nullable: true, comment: "ชื่อราง" }) tableName: string;
  @Column({ name: "case_cate_id", comment: "ประเภทคดี" }) caseCateId: number;
  @Column({ name: "case_status", comment: "ชั้นพิจารณา" }) caseStatus: number;
  @Column({ name: "table_type", nullable: true, comment: "ประเภทราง1 นัดต่อเนื่อง 2 ปฎิทิน" }) tableType: number;
  @Column({ name: "mon", nullable: true, comment: "นัดวันจันทร์" }) mon: number;
  @Column({ name: "tue", nullable: true, comment: "นัดวันอังคาร" }) tue: number;
  @Column({ name: "wed", nullable: true, comment: "นัดวันพุธ" }) wed: number;
  @Column({ name: "thu", nullable: true, comment: "นัดวันพฤหัส" }) thu: number;
  @Column({ name: "fri", nullable: true, comment: "นัดวันศุกร์" }) fri: number;
  @Column({ name: "sat", nullable: true, comment: "ลงนัดวันเสาร์" }) sat: number;
  @Column({ name: "sun", nullable: true, comment: "ลงนัดวันอาทิตย์" }) sun: number;
  @Column({ name: "branch_case", nullable: true, comment: "ประเภท 1ไกล่เกลี่ย" }) branchCase: number;
  @Column({ name: "cond_flag", nullable: true, comment: "ประเภทไกล่เกลี่ย" }) condFlag: number;
  @Column({ name: "dep_code", nullable: true, comment: "สำหรับหน่วยงาน" }) depCode: number;
  @Column({ name: "remark", type: "text", comment: "หมายเหตุ" }) remark: number;
  @Column({ name: "con_app_after_case", comment: "นัดต่อเนื่องนับจากวันที่รับฟ้อง ถึงนัดต่อเนื่องนัดแรกต้องไม่เกิน....วัน" }) conAppAfterCase: number;
  @Column({ name: "create_dep_code", nullable: true, comment: "รหัสหน่วยงานที่สร้าง record" }) createDepCode: number;
  @Column({ name: "create_user_id", nullable: true, comment: "รหัส user ที่สร้าง record" }) createUserId: string;
  @Column({ name: "create_user", nullable: true, comment: "user ที่สร้าง record" }) createUser: string;
  @Column({ name: "create_date", type: "datetime", comment: "วันที่เวลาสร้าง record" }) createDate: number;
  @Column({ name: "update_dep_code", nullable: true, comment: "รหัสหน่วยงานที่ update" }) updateDepCode: number;
  @Column({ name: "update_user_id", nullable: true, comment: "รหัส user ที่ update record" }) updateUserId: string;
  @Column({ name: "update_user", nullable: true, comment: "user ที่ update record" }) updateUser: string;
  @Column({ name: "update_date", type: "datetime", comment: "วันที่ เวลา update record" }) updateDate: number;

  toResponseObject() {
    const { courtRunning, tableId, tableName, caseCateId, caseStatus, tableType, mon, tue, wed, thu, fri, sat, sun, branchCase, condFlag, depCode, remark, conAppAfterCase, createDepCode, createUserId, createUser, createDate, updateDepCode, updateUserId, updateUser, updateDate } = this;
    const responseObject = {
      tableId, courtRunning, tableName, caseCateId, caseStatus, tableType,
      mon, tue, wed, thu, fri, sat, sun, branchCase, condFlag, depCode,
      remark, conAppAfterCase, createDepCode, createUserId, createUser,
      updateUserId, updateUser, updateDepCode,
      createDate: this.dateFormat("YYYY-MM-DD H:i:s"),
      updateDate: this.dateFormat("YYYY-MM-DD H:i:s"),
    };
    return responseObject;
  }
}