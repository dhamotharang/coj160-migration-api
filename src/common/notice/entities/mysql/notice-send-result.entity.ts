import { HelperService } from "src/shared/helpers/helper.service";
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "pnotice_send_result" })
export class MySQLNoticeSendResults extends HelperService {
  constructor() {
    super();
  }
  @PrimaryGeneratedColumn({ name: "notice_send_id", comment: "รหัส" }) noticeSendId: number;
  @PrimaryColumn({ name: "court_running", comment: "รหัสศาลเจ้าของระบบ" }) courtRunning: number;
  @Column({ name: "notice_send_desc", nullable: true, comment: "รายละเอียด" }) noticeSendDesc: string;
  @Column({ name: "send_by", nullable: true, comment: "1 ไปรษณีย์ 2 เจ้าหน้าที่" }) sendBy: number;
  @Column({ name: "result_flag", nullable: true, comment: "1 ส่งได้ 2 ส่งไม่ได้ 3 ส่งไม่ได้แล้วส่งใหม่" }) resultFlag: number;
  @Column({ name: "key_in_flag", nullable: true, comment: "1 key เพิ่ม 2 ไม่ต้องkey" }) keyInFlag: number;
  @Column({ name: "order_no", nullable: true, comment: "เรียงข้อ" }) orderNo: number;
  @Column({ name: "create_dep_code", nullable: true, comment: "รหัสหน่วยงานที่สร้าง record" }) createDepCode: number;
  @Column({ name: "create_user_id", nullable: true, comment: "รหัส user ที่สร้าง record" }) createUserId: string;
  @Column({ name: "create_user", nullable: true, comment: "user ที่สร้าง record" }) createUser: string;
  @Column({ name: "update_dep_code", nullable: true, comment: "รหัสหน่วยงานที่ update" }) updateDepCode: number;
  @Column({ name: "update_user_id", nullable: true, comment: "รหัส user ที่ update record" }) updateUserId: string;
  @Column({ name: "update_user", nullable: true, comment: "user ที่ update record" }) updateUser: string;
  @Column({ name: "ref_id", nullable: true, comment: "" }) refId: string;
  @CreateDateColumn({ name: "create_date", nullable: true, type: "timestamp", comment: "วันที่เวลาสร้าง record" }) createDate: Date;
  @UpdateDateColumn({ name: "update_date", nullable: true, type: "timestamp", comment: "วันที่ เวลา update record" }) updateDate: Date;

  toResponseObject() {
    const {
      courtRunning, noticeSendId, noticeSendDesc, sendBy, resultFlag, keyInFlag, orderNo, createDepCode, createUserId,
      createUser, createDate, updateDepCode, updateUserId, updateUser, updateDate, refId
    } = this;
    const responseObject = {
      noticeSendId, courtRunning, noticeSendDesc, sendBy, resultFlag, keyInFlag, orderNo, createDepCode, createUserId, createUser,
      updateDepCode, updateUserId, updateUser, refId,
      createDate: createDate ? this.dateFormat("YYYY-MM-DD H:i:s", createDate) : null,
      updateDate: updateDate ? this.dateFormat("YYYY-MM-DD H:i:s", updateDate) : null,
    };
    return responseObject;
  }
}