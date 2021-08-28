import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "pofficer" })
export class MySQLOfficers {
  @PrimaryColumn({ name: "off_id", comment: "รหัสเจ้าหน้าที่" }) offId: string;
  @PrimaryColumn({ name: "court_running", comment: "รหัสศาลเจ้าของระบบ" }) courtRunning: number;
  @Column({ name: "off_name", comment: "ชื่อเจ้าหน้าที่" }) offName: string;
  @Column({ name: "dep_code", comment: "หน่วยงาน" }) depCode: string;
  @Column({ name: "post_id", comment: "ตำแหน่ง" }) postId: number;
  @Column({ name: "post_level_id", comment: "ระดับตำแหน่ง" }) postLevelId: number;
  @Column({ name: "at_court_running", comment: "ประจำการที่ศาล(รหัสศาล) fk: pcourt.court_running" }) atCourtRunning: number;
  @Column({ name: "print_flag", comment: "ผู้พิมพ์" }) printFlag: number;
  @Column({ name: "head_flag", comment: "1-หัวหน้าแผนก" }) headFlag: number;
  @Column({ name: "no_edit_flag", comment: "ห้ามแก้ไข" }) noEditFlag: number;
  @Column({ name: "finger_scan_date", type: "datetime", comment: "วันที่ scan ล่านิ้วมือ" }) fingerScanDate: number;
  @Column({ name: "finger_data", comment: "ลายนิ้วมือ" }) fingerData: string;
  @Column({ name: "create_dep_code", comment: "รหัสหน่วยงานที่สร้าง record" }) createDepCode: number;
  @Column({ name: "create_user_id", comment: "รหัส user ที่สร้าง record" }) createUserId: string;
  @Column({ name: "create_user", comment: "user ที่สร้าง record" }) createUser: string;
  @Column({ name: "create_date", type: "datetime", comment: "วันที่เวลาสร้าง record" }) createDate: number;
  @Column({ name: "update_dep_code", comment: "รหัสหน่วยงานที่ update" }) updateDepCode: number;
  @Column({ name: "update_user_id", comment: "รหัส user ที่ update record" }) updateUserId: string;
  @Column({ name: "update_user", comment: "user ที่ update record" }) updateUser: string;
  @Column({ name: "update_date", type: "datetime", comment: "วันที่ เวลา update record" }) updateDate: number;

  toResponseObject() {
    const { courtRunning, offId, offName, depCode, postId, postLevelId, atCourtRunning, printFlag, headFlag, noEditFlag, fingerScanDate, fingerData, createDepCode, createUserId, createUser, createDate, updateDepCode, updateUserId, updateUser, updateDate } = this;
    const responseObject = { courtRunning, offId, offName, depCode, postId, postLevelId, atCourtRunning, printFlag, headFlag, noEditFlag, fingerScanDate, fingerData, createDepCode, createUserId, createUser, createDate, updateDepCode, updateUserId, updateUser, updateDate };
    return responseObject;
  }
}