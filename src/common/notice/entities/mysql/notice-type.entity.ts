import { HelperService } from "src/shared/helpers/helper.service";
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "pnotice_type" })
export class MySQLNoticeTypes extends HelperService {
  constructor() {
    super();
  }
  @PrimaryGeneratedColumn({ name: "notice_type_id", comment: "รหัสประเภทหมาย" }) noticeTypeId: number;
  @PrimaryColumn({ name: "court_running", comment: "รหัสศาลเจ้าของระบบ" }) courtRunning: number;
  @Column({ name: "notice_type_name", nullable: true, comment: "ประเภทหมาย" }) noticeTypeName: string;
  @Column({ name: "notice_name_short", nullable: true, comment: "เพื่อพิมพ์ label ซองจดหมาย" }) noticeNameShort: string;
  @Column({ name: "notice_print", nullable: true, comment: "รหัสแบบพิมพ์" }) noticePrint: string;
  @Column({ name: "notice_printleft", nullable: true, comment: "รหัสในหมาย" }) noticePrintleft: string;
  @Column({ name: "case_type", nullable: true, comment: "ประเภทความ fk:pcase.case_type" }) caseType: number;
  @Column({ name: "order_display", nullable: true, comment: "เรียงข้อมูล" }) orderDisplay: string;
  @Column({ name: "notice_group", nullable: true, comment: "กลุ่มการ run เลขที่หมาย" }) noticeGroup: number;
  @Column({ name: "gen_notice_flag", nullable: true, comment: "สร้างหมายอัตโนมัติ" }) genNoticeFlag: number;
  @Column({ name: "no_edit_flag", nullable: true, comment: "ห้ามแก้ไข" }) noEditFlag: number;
  @Column({ name: "std_id", comment: "รหัสมาตราฐาน fk std_pnotice_type.std_id" }) stdId: number;
  @Column({ name: "color_flag", comment: "1 หมายสี" }) colorFlag: number;
  @Column({ name: "announce_flag", nullable: true, comment: "1 ประกาศ" }) announceFlag: number;
  @Column({ name: "create_dep_code", nullable: true, comment: "รหัสหน่วยงานที่สร้าง record" }) createDepCode: number;
  @Column({ name: "create_user_id", nullable: true, comment: "รหัส user ที่สร้าง record" }) createUserId: string;
  @Column({ name: "create_user", nullable: true, comment: "user ที่สร้าง record" }) createUser: string;
  @Column({ name: "update_dep_code", nullable: true, comment: "รหัสหน่วยงานที่ update" }) updateDepCode: number;
  @Column({ name: "update_user_id", nullable: true, comment: "รหัส user ที่ update record" }) updateUserId: string;
  @Column({ name: "update_user", nullable: true, comment: "user ที่ update record" }) updateUser: string;
  @CreateDateColumn({ name: "create_date", nullable: true, type: "datetime", comment: "วันที่เวลาสร้าง record" }) createDate: Date;
  @UpdateDateColumn({ name: "update_date", nullable: true, type: "datetime", comment: "วันที่ เวลา update record" }) updateDate: Date;

  toResponseObject() {
    const { courtRunning, noticeTypeId, noticeTypeName, noticeNameShort, noticePrint, noticePrintleft, caseType, orderDisplay, noticeGroup, genNoticeFlag, noEditFlag, stdId, colorFlag, announceFlag, createDepCode, createUserId, createUser, createDate, updateDepCode, updateUserId, updateUser, updateDate } = this;
    const responseObject = {
      courtRunning, noticeTypeId, noticeTypeName, noticeNameShort, noticePrint, noticePrintleft, caseType, orderDisplay,
      noticeGroup, genNoticeFlag, noEditFlag, stdId, colorFlag, announceFlag, createDepCode, createUserId, createUser,
      updateDepCode, updateUserId, updateUser,
      createDate: createDate ? this.dateFormat("YYYY-MM-DD H:i:s", createDate) : null,
      updateDate: updateDate ? this.dateFormat("YYYY-MM-DD H:i:s", updateDate) : null,
    };
    return responseObject;
  }
}