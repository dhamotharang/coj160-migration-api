import { HttpException, HttpStatus } from "@nestjs/common";
import { BeforeInsert, Column, CreateDateColumn, Entity, getManager, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "PC_FIN_RECEIPT_DETAIL" })
export class OracleFinReceiptDetails {
  @PrimaryGeneratedColumn({ name: "DETAIL_ID", comment: "รหัสข้อมูลรายละเอียดใบเสร็จรับเงิน(AUTO INCREMENT)" }) detailId: number;
  @Column({ name: "RECEIPT_ID", comment: "รหัสใบเสร็จ เชื่อมโยง PC_FIN_RECEIPT" }) receiptId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "PAID_TYPE", comment: "รหัสประเภทการจ่ายเงิน เชื่อมโยง PC_FIN_RECEIPT_PAID_TYPE" }) paidType: number;
  @Column({ name: "PAID_DESCRIPTION", comment: "รายละเอียดการจ่ายเงิน" }) paidDescription: string;
  @Column({ name: "CASH_AMOUNT", nullable: true, type: "float", comment: "จำนวนเงินสด" }) cashAmount: number;
  @Column({ name: "CHEQUE_AMOUNT", nullable: true, type: "float", comment: "จำนวนเงินในเช็ค" }) chequeAmount: number;
  @Column({ name: "TRANSFER_AMOUNT", nullable: true, type: "float", comment: "จำนวนเงินโอน" }) transferAmount: number;
  @Column({ name: "CREDIT_AMOUNT", nullable: true, type: "float", comment: "จำนวนเงินผ่านบัตรเครดิต" }) creditAmount: number;
  @Column({ name: "TOTAL_AMOUNT", nullable: true, type: "float", comment: "จำนวนเงินรวม" }) totalAmount: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "RECEIPT_TYPE", comment: "รหัสประเภทใบเสร็จ เชื่อมโยง PC_LOOKUP_RECEIPT_TYPE" }) receiptType: number;
  @Column({ name: "RECEIPT_SUB_TYPE", comment: "รหัสประเภทใบเสร็็จ เชื่อมโยง PC_LOOKUP_RECEIPT_SUB_TYPE" }) receiptSubType: number;
  @Column({ name: "BALANCE", nullable: true, type: "float", comment: "จำนวนเงินคงเหลือ" }) balance: number;
  @Column({ name: "TRANSFER_BANK_ID", nullable: true, comment: "รหัสธนาคาร เชื่อมโยง PC_LOOKUP_BANK" }) transferBankId: number;
  @Column({ name: "TRANSFER_DATE", nullable: true, type: "timestamp", comment: "วันที่โอนเงิน" }) transferDate: Date;
  @Column({ name: "TRANSFER_TYPE_NAME", nullable: true, comment: "ชื่อประเภทธนาคาร" }) transferTypeName: string;
  @Column({ name: "IS_RECEIPT_USED", comment: "ตัวเลือกใช้ข้อมูลรายละเอียดใบเสร็จนี้แล้วหรือไม่?" }) isReceiptUsed: number;
  @Column({ name: "OTHER_DETAIL", nullable: true, comment: "รายละเอียดของค่าอื่น ๆ(กรณีเลือกประเภทใบเสร็จ = 'ค่าธรรมเนียม' และ ประเภทใบเสร็จย่อย = 'ค่าอื่น ๆ')" }) otherDetail: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, type: "timestamp", comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @CreateDateColumn({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @UpdateDateColumn({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_FIN_RECEIPT_DETAIL_SEQ".nextval ID FROM DUAL`);
      this.detailId = res[0].ID;
      this.orderNo = res[0].ID;
    } catch (error) {
      throw new HttpException(`[generate code failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  toResponseObject() {
    const {
      detailId, receiptId, orderNo, paidType, paidDescription, cashAmount, chequeAmount, transferAmount, creditAmount, totalAmount, courtId,
      receiptType, receiptSubType, balance, transferBankId, transferDate, transferTypeName, isReceiptUsed, otherDetail, createdBy, updatedBy,
      removedBy, createdDate, updatedDate, removedDate
    } = this;
    const responseObject = { detailId, receiptId, orderNo, paidType, paidDescription, cashAmount, chequeAmount, transferAmount, creditAmount, totalAmount, courtId, receiptType, receiptSubType, balance, transferBankId, transferDate, transferTypeName, isReceiptUsed, otherDetail, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}