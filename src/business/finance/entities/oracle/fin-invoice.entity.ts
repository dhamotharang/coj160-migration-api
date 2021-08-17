import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_FIN_INVOICE" })
export class OracleFinInvoices {
  @PrimaryGeneratedColumn({ name: "INVOICE_ID", comment: "รหัสข้อมูลการแจ้งชำระเงิน(AUTO INCREMENT)" }) invoiceId: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "CASE_ID", nullable: true, comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "MONEY_TYPE_BY", comment: "รหัสประเภทเงิน เชื่อมโยง PC_LOOKUP_RECEIPT_TYPE" }) moneyTypeBy: number;
  @Column({ name: "PAYER_ID", nullable: true, comment: "รหัสประเภทผู้ชำระเงิน เชื่อมโยง PC_CASE_LIT" }) payerId: number;
  @Column({ name: "PAYER_NAME", comment: "ชื่อผู้ชำระเงิน" }) payerName: string;
  @Column({ name: "SEQ", nullable: true, comment: "ครั้งที่" }) seq: string;
  @Column({ name: "PAYIN_DATE", nullable: true, type: "timestamp", comment: "วันที่ออกใบ Payin" }) payinDate: Date;
  @Column({ name: "COURT_ACCEPTED_DAYS", nullable: true, comment: "จำนวนวันที่ศาลอนุญาต" }) courtAcceptedDays: Date;
  @Column({ name: "DUE_DATE", nullable: true, type: "timestamp", comment: "วันครบกำหนดชำระ" }) dueDate: Date;
  @Column({ name: "CAPITAL_AMOUNT", nullable: true, type: "float", comment: "ทุนทรัพย์" }) capitalAmount: number;
  @Column({ name: "COURT_FEE_ID", nullable: true, comment: "รหัสประเภทค่าขึ้นศาล เชื่อมโยง PC_LOOKUP_COURT_FEE" }) courtFeeId: number;
  @Column({ name: "COURT_FEE", nullable: true, type: "float", comment: "ค่าขึ้นศาล" }) courtFee: number;
  @Column({ name: "FUTURE_COURT_FEE", nullable: true, type: "float", comment: "ค่าขึ้นศาลอนาคต" }) futureCourtFee: number;
  @Column({ name: "TOTAL_PAID_AMOUNT", nullable: true, type: "float", comment: "จำนวนเงินที่ต้องชำระ" }) totalPaidAmount: number;
  @Column({ name: "REF1", nullable: true, comment: "ข้อมูล REF 1" }) ref1: string;
  @Column({ name: "REF2", nullable: true, comment: "ข้อมูล REF 2" }) ref2: string;
  @Column({ name: "MONEY_SUBTYPE_BY", comment: "รหัสประเภทเงินย่อย เชื่อมโยง PC_LOOKUP_RECEIPT_SUB_TYPE" }) moneySubtypeBy: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", nullable: true, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { invoiceId, courtId, caseId, orderNo, moneyTypeBy, payerId, payerName, seq, payinDate, courtAcceptedDays, dueDate, capitalAmount, courtFeeId, courtFee, futureCourtFee, totalPaidAmount, ref1, ref2, moneySubtypeBy, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { invoiceId, courtId, caseId, orderNo, moneyTypeBy, payerId, payerName, seq, payinDate, courtAcceptedDays, dueDate, capitalAmount, courtFeeId, courtFee, futureCourtFee, totalPaidAmount, ref1, ref2, moneySubtypeBy, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}