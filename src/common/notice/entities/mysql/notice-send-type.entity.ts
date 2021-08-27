import { HelperService } from "src/shared/helpers/helper.service";
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "pnotice_send_type" })
export class MySQLNoticeSendTypes extends HelperService {
  constructor() {
    super();
  }

  @PrimaryGeneratedColumn({ name: "send_by_id", comment: "รหัสคำสั่งหมาย" }) sendById: number;
  @PrimaryColumn({ name: "court_running", comment: "รหัสศาล Running" }) courtRunning: number;
  @Column({ name: "send_by_name", comment: "รายละเอียดคำสั่งหมาย" }) sendByName: string;
  @Column({ name: "send_by_type", nullable: true, comment: "ส่งโดย" }) sendByType: number;
  @Column({ name: "no_edit_flag", nullable: true, comment: "ห้ามแก้ไข/ลบ" }) noEditFlag: number;
  @Column({ name: "create_dep_code", nullable: true, comment: "รหัสหน่วยงานที่สร้าง record" }) createDepCode: number;
  @Column({ name: "create_user_id", nullable: true, comment: "รหัส user ที่สร้าง record" }) createUserId: string;
  @Column({ name: "create_user", nullable: true, comment: "user ที่สร้าง record" }) createUser: string;
  @Column({ name: "update_dep_code", nullable: true, comment: "รหัสหน่วยงานที่ update" }) updateDepCode: number;
  @Column({ name: "update_user_id", nullable: true, comment: "รหัส user ที่ update record" }) updateUserId: string;
  @Column({ name: "update_user", nullable: true, comment: "user ที่ update record" }) updateUser: string;
  @CreateDateColumn({ name: "create_date", nullable: true, type: "timestamp", comment: "วันที่เวลาสร้าง record" }) createDate: Date;
  @UpdateDateColumn({ name: "update_date", nullable: true, type: "timestamp", comment: "วันที่ เวลา update record" }) updateDate: Date;

  toResponseObject() {
    const {
      courtRunning, sendById, sendByName, sendByType, noEditFlag, createDepCode, createUserId,
      createUser, createDate, updateDepCode, updateUserId, updateUser, updateDate
    } = this;

    const responseObject = {
      sendById, courtRunning, sendByName, sendByType, noEditFlag, createDepCode, createUserId, createUser,
      updateDepCode, updateUserId, updateUser,
      createDate: createDate ? this.dateFormat('YYYY-MM-DD H:i:s', createDate) : null,
      updateDate: updateDate ? this.dateFormat('YYYY-MM-DD H:i:s', updateDate) : null,
    };

    return responseObject;
  }
}