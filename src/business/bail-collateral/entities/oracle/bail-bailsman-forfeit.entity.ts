import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_BAIL_BAILSMAN_FORFEIT" })
export class OracleBailBailsmanForfeits {
  @PrimaryGeneratedColumn({ name: "FORFEIT_ID", comment: "รหัสข้อมูลปรับนายประกัน(AUTO INCREMENT)" }) forfeitId: number;
  @Column({ name: "BAIL_ID", comment: "รหัสการประกันตัว เชื่อมโยง PC_BAIL" }) bailId: number;
  @Column({ name: "BAILSMAN_ID", comment: "รหัสนายประกัน เชื่อมโยง PC_BAIL_BAILSMAN" }) bailsmanId: number;
  @Column({ name: "DEFENDANT_ID", comment: "รหัสจำเลย" }) defendantId: number;
  @Column({ name: "RECEIPT_ID", nullable: true, comment: "รหัสใบเสร็จ เชื่อมโยง PC_FIN_RECEIPT" }) receiptId: number;

  @Column({ name: "ORDER_NO", type: "float", nullable: true, comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "FORFEIT_SEQ", nullable: true, comment: "ครั้งที่ปรับ" }) forfeitSeq: number;
  @Column({ name: "FORFEIT_AMOUNT", type: "float", comment: "จำนวนค่าปรับ" }) forfeitAmount: number;
  @Column({ name: "FORFEIT_ORDER_DATE", type: "timestamp", comment: "วันที่สั่งปรับ" }) forfeitOrderDate: Date;
  @Column({ name: "DISCOUNT_DATE", nullable: true, type: "timestamp", comment: "วันที่สั่งลดค่าปรับ" }) discountDate: Date;
  @Column({ name: "DISCOUNT_AMOUNT", type: "float", nullable: true, comment: "ค่าปรับลดเหลือ" }) discountAmount: number;
  @Column({ name: "PAID_AMOUNT", type: "float", nullable: true, comment: "ชำระไปแล้ว" }) paidAmount: number;
  @Column({ name: "FORFEIT_WITHIN_DAYS", nullable: true, comment: "จำนวนวันกำหนดปรับ" }) forfeitWithinDays: number;
  @Column({ name: "FORFEIT_START_DATE", type: "timestamp", comment: "วันที่ที่เริ่มปรับ" }) forfeitStartDate: Date;
  @Column({ name: "ORDER_NOTICE_BY", comment: "แจ้งคำสั่งศาลโดย 1 = รับหมายเอง 2 = ปิดหมาย" }) orderNoticeBy: number;
  @Column({ name: "DUE_DATE", type: "timestamp", comment: "วันครบกำหนดชำระ" }) dueDate: Date;
  @Column({ name: "PAID_TYPE", comment: "ประเภทการชำระ 1 = ชำระทั้งหมด 2 = ผ่อนชำระ" }) paidType: number;
  @Column({ name: "PAID_PERIOD", comment: "งวดที่" }) paidPeriod: number;
  @Column({ name: "PAID_PERIOD_AMOUNT", type: "float", comment: "จำนวนเงินที่จ่ายในงวดนั้นๆ" }) paidPeriodAmount: number;
  @Column({ name: "NOTES", type: "clob", nullable: true, comment: "หมายเหตุ" }) notes: string;
  @Column({ name: "SEC_ID", comment: "รหัสหลักทรัพย์ เชื่อมโยง PC_BAIL_SEC" }) secId: number;
  @Column({ name: "CASE_ID_OLD", nullable: true, comment: "Temp สำหรับ Migrate" }) caseIdOld: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { forfeitId, bailId, bailsmanId, defendantId, receiptId, orderNo, forfeitSeq, forfeitAmount, forfeitOrderDate, discountDate, discountAmount, paidAmount, forfeitWithinDays, forfeitStartDate, orderNoticeBy, dueDate, paidType, paidPeriod, paidPeriodAmount, notes, secId, caseIdOld, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate, } = this;
    const responseObject = { forfeitId, bailId, bailsmanId, defendantId, receiptId, orderNo, forfeitSeq, forfeitAmount, forfeitOrderDate, discountDate, discountAmount, paidAmount, forfeitWithinDays, forfeitStartDate, orderNoticeBy, dueDate, paidType, paidPeriod, paidPeriodAmount, notes, secId, caseIdOld, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}