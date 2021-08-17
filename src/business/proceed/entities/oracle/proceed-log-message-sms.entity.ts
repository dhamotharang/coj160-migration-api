import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_LOG_MESSAGE_SMS" })
export class OracleProceedLogMessages {
  @PrimaryGeneratedColumn({ name: "LOG_MESSAGE_SMS_ID", comment: "รหัสข้อมูลบัญชีพยาน(AUTO INCREMENT)" }) logMessageSMSId: number;
  @Column({ name: "ORDER_NO", type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "CASE_ID", comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "IP_ADDRESS", comment: "IP Address ของเครื่อง Client" }) ipAddress: string;
  @Column({ name: "MESSAGE", comment: "รายละเอียดข้อความที่ต้องการส่ง" }) message: string;
  @Column({ name: "MSISDN", comment: "เบอร์โทรศัพท์ปลายทาง ส่งได้เฉพาะ 06, 08, 09 หากส่งเบอร์เดียว 0891234567 ส่งมากกว่า 1 เบอร์ให้คั่นแต่ละเบอร์ด้วย Comma" }) msisdn: string;
  @Column({ name: "REMAIN_CREDIT", comment: "จำนวนเครดิตที่เหลือ" }) remainCredit: number;
  @Column({ name: "REMARK", nullable: true, comment: "หมายเหตุ เวลาส่งข้อความไม่ได้" }) remark: string;
  @Column({ name: "SEND_STATUS", comment: "สถานะการส่งข้อความ" }) sendStatus: number;
  @Column({ name: "SENDER", comment: "ที่อยู่ในรายการของ username นั้น" }) sender: string;
  @Column({ name: "USERD_CREDIT", comment: "จำนวนเครดิตที่ใช้ส่งข้อความ" }) userdCredit: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { logMessageSMSId, orderNo, caseId, ipAddress, message, msisdn, remainCredit, remark, sendStatus, sender, userdCredit, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { logMessageSMSId, orderNo, caseId, ipAddress, message, msisdn, remainCredit, remark, sendStatus, sender, userdCredit, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}