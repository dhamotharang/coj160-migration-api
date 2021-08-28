import { HelperService } from "src/shared/helpers/helper.service";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "pappoint_delay" })
export class MySQLAppointDelays extends HelperService {
  @PrimaryColumn({ name: "court_running", comment: "รหัสศาล Running" }) courtRunning: number;
  @PrimaryColumn({ name: "delay_id", comment: "รหัสเลื่อน" }) delayId: number;
  @Column({ name: "delay_type", comment: "1 เหตุที่เลื่อน 2 ผลการพิจารณา" }) delayType: number;
  @Column({ name: "delay_name", comment: "รายละเอียดการเลื่อน" }) delayName: string;
  @Column({ name: "std_id", comment: "รหัสมาตราฐาน fk std_pappoint_delay.std_id" }) stdId: number;
  @Column({ name: "create_dep_code", comment: "รหัสหน่วยงานที่สร้าง record" }) createDepCode: number;
  @Column({ name: "update_dep_code", comment: "รหัสหน่วยงานที่ update" }) updateDepCode: number;
  @Column({ name: "create_user_id", comment: "รหัส user ที่สร้าง record" }) createUserId: string;
  @Column({ name: "create_user", nullable: true, comment: "user ที่สร้าง record" }) createUser: string;
  @Column({ name: "update_user_id", comment: "รหัส user ที่ update record" }) updateUserId: string;
  @Column({ name: "update_user", nullable: true, comment: "user ที่ update record" }) updateUser: string;
  @Column({ name: "create_date", nullable: true, type: "datetime", comment: "วันที่เวลาสร้าง record" }) createDate: Date;
  @Column({ name: "update_date", nullable: true, type: "datetime", comment: "วันที่ เวลา update record" }) updateDate: Date;

  toResponseObject() {
    const { courtRunning, delayId, delayType, delayName, stdId, createDepCode, createUserId, createUser, createDate, updateDepCode, updateUserId, updateUser, updateDate, } = this;
    const responseObject = {
      delayId, courtRunning, delayType, delayName, stdId, createDepCode, createUserId, createUser, updateDepCode, updateUserId, updateUser,
      createDate: this.dateFormat("YYYY-MM-DD H:i:s", createDate),
      updateDate: this.dateFormat("YYYY-MM-DD H:i:s", updateDate),
    };
    return responseObject;
  }
}