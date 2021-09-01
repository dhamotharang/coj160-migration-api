import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_FIN_PAYMENT" })
export class OracleFinPayments {
  @PrimaryGeneratedColumn({ name: "PAYMENT_ID", comment: "รหัสข้อมูลการสั่งจ่ายเงิน(AUTO INCREMENT)" }) paymentId: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "JUDGE_ID", nullable: true, comment: "รหัสผู้พิพากษาออกหมาย เชื่อมโยง PC_LOOKUP_JUDGE" }) judgeId: number;
  @Column({ name: "REF_CODE_NO", comment: "หมายเลขอ้างอิง" }) refCodeNo: number;
  @Column({ name: "REF_CODE_YEAR", nullable: true, comment: "ปีอ้างอิง" }) refCodeYear: string;
  @Column({ name: "TOTAL_AMOUNT", nullable: true, type: "float", comment: "จำนวนเงินทั้งหมด" }) totalAmount: number;
  @Column({ name: "PAYMENT_DATE", comment: "วันที่สั่งจ่ายเงิน" }) paymentDate: Date;
  // @Column({ name: "IS_CANCEL_PAYMENT", nullable: true, comment: "ตัวเลือกยกเลิกใบสั่งจ่ายเงิน" }) isCancelPayment: number;
  // @Column({ name: "ACCOUNT_NO", comment: "หมายเลขบัญชีกระแสรายวัน" }) accountNo: string;
  // @Column({ name: "SERVICE_CODE", comment: "รหัส Service Code" }) serviceCode: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { paymentId, courtId, orderNo, judgeId, refCodeNo, refCodeYear, totalAmount, paymentDate, /* isCancelPayment,accountNo, serviceCode,  */createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { paymentId, courtId, orderNo, judgeId, refCodeNo, refCodeYear, totalAmount, paymentDate, /* isCancelPayment,accountNo, serviceCode,  */createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}