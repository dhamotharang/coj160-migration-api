import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_NOTICE_ISSUED" })
export class OracleNoticeIssueds {
  @PrimaryGeneratedColumn({ name: "ISSUED_ID", comment: "รหัสข้อมูลการจ่ายหมาย(AUTO INCREMENT)" }) issuedId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "วันเวลาที่สร้างข้อมูล" }) orderNo: number;
  @Column({ name: "EMS_CODE", nullable: true, comment: "หมายเลข EMS" }) emsCode: string;
  @Column({ name: "HAS_MONEY", nullable: true, comment: "ตัวเลือกมีเงินสำหรับค่าส่งหมายหรือไม่มีเงิน" }) hasMoney: number;
  @Column({ name: "IS_CANCEL_ISSUED", nullable: true, comment: "ตัวเลือกยกเลิกการจ่ายหมาย" }) isCancelIssued: number;
  @Column({ name: "IS_COURT_AREA", nullable: true, comment: "หมายในเขต" }) isCourtArea: number;
  @Column({ name: "NOTES", type: "clob", nullable: true, comment: "หมายเหตุ" }) notes: string;
  @Column({ name: "NOTICE_ID", comment: "รหัสหมายประกาศ เชื่อมโยงตาราง PC_NOTICE" }) noticeId: number;
  @Column({ name: "RECEIPT_ID", nullable: true, comment: "รหัสใบเสร็จ เชื่อมโยง PC_FIN_RECEIPT" }) receiptId: number;
  @Column({ name: "RECEIVED_NOTICE_DATE", type: "timestamp", comment: "วันที่และเวลารับหมาย" }) receivedNoticeDate: Date;
  @Column({ name: "SEND_NOTICE_DATE", comment: "วันที่และเวลาส่งหมาย" }) sendNoticeDate: Date;
  @Column({ name: "PN_TYPE", nullable: true, comment: "รหัสจำแนกประเภทหมาย" }) pnType: number;
  @Column({ name: "SUBDISTRICT_NAME", nullable: true, comment: "ชื่ออำเภอที่จ่ายหมาย" }) subdistrictName: string;
  @Column({ name: "CHEQUE_NO", nullable: true, comment: "เลขที่บัญชี/เลขที่เชค" }) chequeNo: string;
  @Column({ name: "PAY_DATE", nullable: true, comment: "วันที่ตัดจ่ายเงิน(จ่ายเช็คใน acess)" }) payDate: Date;
  @Column({ name: "CREATED_BY", comment: "รหัสหมายประกาศ เชื่อมโยงตาราง PC_NOTICE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) removedDate: Date;

  toResponseObject() {
    const { issuedId, orderNo, emsCode, hasMoney, isCancelIssued, isCourtArea, notes, noticeId, receiptId, receivedNoticeDate, sendNoticeDate, pnType, subdistrictName, chequeNo, payDate, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { issuedId, orderNo, emsCode, hasMoney, isCancelIssued, isCourtArea, notes, noticeId, receiptId, receivedNoticeDate, sendNoticeDate, pnType, subdistrictName, chequeNo, payDate, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}