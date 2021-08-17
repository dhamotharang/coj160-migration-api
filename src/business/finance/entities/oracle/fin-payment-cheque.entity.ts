import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "PC_FIN_PAYMENT_CHEQUE" })
export class OracleFinPaymentCheques {
  @PrimaryGeneratedColumn({ name: "CHEQUE_ID", comment: "รหัสข้อมูลจ่ายค่าตอบแทน(AUTO INCREMENT)" }) chequeId: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "PAYMENT_ID", comment: "รหัสการสั่งจ่ายเงิน เชื่อมโยงตาราง PC_FIN_PAYMENT" }) paymentId: number;
  @Column({ name: "ORDER_NO", type: "float", nullable: true, comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "CHEQUE_CODE", comment: "เลขที่เช็ค" }) chequeCode: string;
  @Column({ name: "BANK_ID", comment: "รหัสธนาคาร เชื่อมโยง PC_LOOKUP_BANK" }) bankId: number;
  @Column({ name: "BRANCH", comment: "สาขาธนาคาร" }) branch: string;
  @Column({ name: "NOTES", type: "clob", nullable: true, comment: "หมายเหตุ" }) notes: string;
  @Column({ name: "PAID_DATE", type: "timestamp", comment: "วันที่สั่งจ่าย" }) paidDate: Date;
  @Column({ name: "AMOUNT", type: "float", comment: "จำนวนเงินบนเช็ค" }) amount: number;
  @Column({ name: "PAYMENT_SUB_DETAIL_ID", nullable: true, comment: "รหัสรายละเอียดย่อยการสั่งจ่ายเงิน PC_FIN_PAYMENT_SUB_DETAIL" }) paymentSubDetailId: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @CreateDateColumn({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @UpdateDateColumn({ name: "UPDATED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;
}