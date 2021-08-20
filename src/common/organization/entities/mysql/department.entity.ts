import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "pdepartment" })
export class MySQLDepartments {
  @PrimaryColumn({ name: "dep_code", comment: "รหัสหน่วยงาน" }) depCode: number;
  @PrimaryColumn({ name: "court_running", comment: "รหัสศาลเจ้าของระบบ" }) courtRunning: number;
  @Column({ name: "dep_name", comment: "ชื่อหน่วยงาน" }) depName: string;
  @Column({ name: "view_admin", comment: "สำหรับใช้งานในการเขียนโปรแกรม" }) viewAdmin: string;
  @Column({ name: "lay_out", comment: "รหัสหน้าจอที่แสดง" }) layOut: string;
  @Column({ name: "dep_tel_no", comment: "เบอร์โทรหน่วยงาน" }) depTelNo: string;
  @Column({ name: "dep_tel_fax", comment: "fax" }) depTelFax: string;
  @Column({ name: "book_account", comment: "เลขที่บัญชี" }) bookAccount: string;
  @Column({ name: "bank_id", comment: "รหัสธนาคาร" }) bankId: number;
  @Column({ name: "bankbranch", comment: "สาขาธนาคาร" }) bankbranch: string;
  @Column({ name: "send_running", comment: "เลขส่งสำนวน1 รวมหน่วยงาน 2 แยกแต่ละ user" }) sendRunning: number;
  @Column({ name: "remark", comment: "หมายเหตุส่งสำนวน" }) remark: string;
  @Column({ name: "no_edit_flag", comment: "ห้ามแก้ไข" }) noEditFlag: number;
  @Column({ name: "ext_flag", comment: "หน่วยงานภายนอกศาล" }) extFlag: number;
  @Column({ name: "disable_flag", comment: "ไม่ใช้งาน" }) disableFlag: number;
  @Column({ name: "notice_flag", comment: "แก้ไข/ลบหมายของหน่วยงานอื่นได้" }) noticeFlag: number;
  @Column({ name: "table_id", comment: "รางนัดความเบื้องต้น" }) tableId: number;
  @Column({ name: "create_dep_code", comment: "รหัสหน่วยงานที่สร้าง record" }) createDepCode: number;
  @Column({ name: "create_user_id", comment: "รหัส user ที่สร้าง record" }) createUserId: string;
  @Column({ name: "create_user", comment: "user ที่สร้าง record" }) createUser: string;
  @Column({ name: "create_date", type: "datetime", comment: "วันที่เวลาสร้าง record" }) createDate: number;
  @Column({ name: "update_dep_code", comment: "รหัสหน่วยงานที่ update" }) updateDepCode: number;
  @Column({ name: "update_user_id", comment: "รหัส user ที่ update record" }) updateUserId: string;
  @Column({ name: "update_user", comment: "user ที่ update record" }) updateUser: string;
  @Column({ name: "update_date", type: "datetime", comment: "วันที่ เวลา update record" }) updateDate: number;
  @Column({ name: "ref_id", comment: "ref id" }) refId: string;

  toResponseObject() {
    const { depCode, courtRunning, depName, viewAdmin, layOut, depTelNo, depTelFax, bookAccount, bankId, bankbranch, sendRunning, remark, noEditFlag, extFlag, disableFlag, noticeFlag, tableId, createDepCode, createUserId, createUser, createDate, updateDepCode, updateUserId, updateUser, updateDate, refId, } = this;
    const responseObject = { depCode, courtRunning, depName, viewAdmin, layOut, depTelNo, depTelFax, bookAccount, bankId, bankbranch, sendRunning, remark, noEditFlag, extFlag, disableFlag, noticeFlag, tableId, createDepCode, createUserId, createUser, createDate, updateDepCode, updateUserId, updateUser, updateDate, refId, };

    return responseObject;
  }
}