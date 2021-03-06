import { HttpException, HttpStatus } from "@nestjs/common";
import { BeforeInsert, Column, Entity, getManager, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_FIN_PAYMENT_DETAIL" })
export class OracleFinPaymentDetails {
  @PrimaryColumn({ name: "PAYMENT_DETAIL_ID" }) paymentDetailId: number;
  @Column({ name: "ORDER_NO", nullable: true }) orderNo: number;
  @Column({ name: "RECEIPT_SUB_TYPE" }) receiptSubType: number;
  @Column({ name: "RECEIPT_TYPE" }) receiptType: number;
  @Column({ name: "TOTAL_AMOUNT", nullable: true }) totalAmount: number;
  @Column({ name: "PAYMENT_ID" }) paymentId: number;
  // @Column({ name: "BNUM_OLD", nullable: true }) bnumOld: string;
  @Column({ name: "CREATED_BY" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true }) updatedBy: number;
  @Column({ name: "REMOVED_BY" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp" }) removedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_FIN_PAYMENT_DETAIL_SEQ".nextval ID FROM DUAL`);
      this.paymentDetailId = res[0].ID;
      this.orderNo = res[0].ID;
    } catch (error) {
      throw new HttpException(`[generate code failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


  toResponseObject() {
    const { paymentDetailId, orderNo, receiptSubType, receiptType, totalAmount, paymentId, /* bnumOld, */ createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate, } = this;
    const responseObject = { paymentDetailId, orderNo, receiptSubType, receiptType, totalAmount, paymentId, /* bnumOld, */ createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}