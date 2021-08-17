import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_FIN_PAID_LAWYER" })
export class OracleFinPaidLawyers {
  @PrimaryGeneratedColumn({ name: "PAID_LAWYER_ID", comment: "รหัสข้อมูลคำร้องขอรับเงินรางวัลทนายขอแรง(AUTO INCREMENT)" }) paidLawyerId: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "CASE_ID", nullable: true, comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;
  @Column({ name: "ORDER_NO", type: 'float', nullable: true, comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "LAWYER_ID", comment: "รหัสทนาย เชื่อมโยงตาราง PC_LOOKUP_LAWYER" }) lawyerId: number;
  @Column({ name: "CASE_CATE_ID", comment: "รหัสประเภทคดี เชื่อมโยง PC_CASE_CATE" }) caseCateId: number;
  @Column({ name: "PAID_DATE", type: "timestamp", comment: "วันที่จ่ายเงิน" }) paidDate: Date;
  @Column({ name: "ORDER_DATE", type: "timestamp", comment: "วันที่มีคำสั่งศาลจ่ายเงิน" }) orderDate: Date;
  @Column({ name: "BANK_ID", comment: "รหัสธนาคาร เชื่อมโยง PC_LOOKUP_BANK" }) bankId: number;
  @Column({ name: "BRANCH", comment: "สาขาธนาคาร" }) branch: string;
  @Column({ name: "ACCOUNT_NO", comment: "หมายเลขบัญชี" }) accountNo: string;
  @Column({ name: "TOTAL_AMOUNT", type: 'float', nullable: true, comment: "จำนวนเงินทั้งหมด" }) totalAmount: number;
  @Column({ name: "NOTES", nullable: true, type: "float", comment: "หมายเหตุ" }) notes: string;
  @Column({ name: "PENALTY_RATE", nullable: true, comment: "อัตราโทษ" }) penaltyRate: string;

  toResponseObject() {
    const { paidLawyerId, courtId, caseId, createdBy, createdDate, updatedBy, updatedDate, removedBy, removedDate, orderNo, lawyerId, caseCateId, paidDate, orderDate, bankId, branch, accountNo, totalAmount, notes, penaltyRate } = this;
    const responseObject = { paidLawyerId, courtId, caseId, createdBy, createdDate, updatedBy, updatedDate, removedBy, removedDate, orderNo, lawyerId, caseCateId, paidDate, orderDate, bankId, branch, accountNo, totalAmount, notes, penaltyRate };
    return responseObject;
  }
}