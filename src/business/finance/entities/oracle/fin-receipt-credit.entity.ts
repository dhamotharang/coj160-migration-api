import { HttpException, HttpStatus } from "@nestjs/common";
import { BeforeInsert, Column, Entity, getManager, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_FIN_RECEIPT_CREDIT" })
export class OracleFinReceiptCredits {
  @PrimaryGeneratedColumn({ name: "CREDIT_ID", comment: "รหัสข้อมูลบัตรเครดิต(AUTO INCREMENT)" }) creaditId: number;
  @Column({ name: "RECEIPT_ID", comment: "รหัสใบเสร็จ เชื่อมโยง PC_FIN_RECEIPT" }) receiptId: number;
  @Column({ name: "ORDER_NO", type: "float", nullable: true, comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "CREDIT_NO", comment: "เลขที่บัตรเครดิต" }) creditNo: string;
  @Column({ name: "CARD_HOLDER_NAME", comment: "ชื่อผู้ถือบัตร" }) cardHolderName: string;
  @Column({ name: "EXPIRED_DATE", type: "timestamp", comment: "วันที่บัตรหมดอายุ" }) expiredDate: Date;
  @Column({ name: "BANK_CODE", comment: "รหัสธนาคารเจ้าของบัตร เชื่อมโยง PC_LOOKUP_BANK" }) bankCode: number;
  @Column({ name: "NOTES", nullable: true, type: "clob", comment: "หมายเหตุ" }) notes: string;
  @Column({ name: "PAID_DATE", type: "timestamp", comment: "วันที่สั่งจ่าย" }) paidDate: Date;
  @Column({ name: "AMOUNT", type: "float", comment: "จำนวนเงิน" }) amount: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "RECEIPT_DETAIL_ID", nullable: true, comment: "รหัสรายละเอียดใบเสร็จ เชื่อมโยง PC_FIN_RECEIPT_DETAIL" }) receiptDetailId: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_FIN_RECEIPT_CREDIT_SEQ".nextval ID FROM DUAL`);
      this.creaditId = res[0].ID;
      this.orderNo = res[0].ID;
    } catch (error) {
      throw new HttpException(`[generate code failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  toResponseObject() {
    const { creaditId, receiptId, orderNo, creditNo, cardHolderName, expiredDate, bankCode, notes, paidDate, amount, courtId, receiptDetailId, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { creaditId, receiptId, orderNo, creditNo, cardHolderName, expiredDate, bankCode, notes, paidDate, amount, courtId, receiptDetailId, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}