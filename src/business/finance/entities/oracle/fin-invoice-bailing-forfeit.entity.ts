import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_FIN_INVOICE_BAILING_FORFEIT" })
export class OracleFinInvoiceBailingForfeits {
  @PrimaryGeneratedColumn({ name: "INVOICE_FORFEIT_ID", comment: "รหัสข้อมูลการแจ้งชำระเงินค่าปรับผู้ประกัน(AUTO INCREMENT)" }) invoiceForfeitId: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "CASE_ID", nullable: true, comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "MONEY_TYPE_BY", comment: "รหัสประเภทเงิน เชื่อมโยง PC_LOOKUP_RECEIPT_TYPE" }) moneyTypeBy: number;
  @Column({ name: "LIT_TYPE_ID", nullable: true, comment: "รหัสประเภทผู้ชำระเงิน เชื่อมโยง PC_LOOKUP_LIT_TYPE" }) litTypeId: number;
  @Column({ name: "PAYER_NAME", comment: "ชื่อผู้วางเงิน" }) payerName: string;
  @Column({ name: "NATIONAL_ID", nullable: true, comment: "เลขที่บัตรประชาชนผู้วางเงิน" }) nationalId: string;
  @Column({ name: "PAYIN_DATE", nullable: true, type: "timestamp", comment: "วันที่ออกใบ Payin" }) payinDate: Date;
  @Column({ name: "REF1", nullable: true, comment: "ข้อมูล REF 1" }) ref1: string;
  @Column({ name: "REF2", nullable: true, comment: "ข้อมูล REF 2" }) ref2: string;
  @Column({ name: "MONEY_SUBTYPE_BY", comment: "รหัสประเภทเงินย่อย เชื่อมโยง PC_LOOKUP_RECEIPT_SUB_TYPE" }) moneySubtypeBy: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", nullable: true, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { invoiceForfeitId, courtId, caseId, orderNo, moneyTypeBy, litTypeId, payerName, nationalId, payinDate, ref1, ref2, moneySubtypeBy, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { invoiceForfeitId, courtId, caseId, orderNo, moneyTypeBy, litTypeId, payerName, nationalId, payinDate, ref1, ref2, moneySubtypeBy, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}