import { HttpException, HttpStatus } from "@nestjs/common";
import { BeforeInsert, Column, CreateDateColumn, Entity, getManager, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "PC_LOOKUP_RECEIPT_TYPE" })
export class OracleLookupReceiptTypes {
  @PrimaryColumn({ name: "RECEIPT_TYPE_ID" }) receiptTypeId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float" }) orderNo: number;
  @Column({ name: "ACTIVE_FLAG", nullable: true }) activeFlag: number;
  @Column({ name: "COST_FLAG", nullable: true }) costFlag: number;
  @Column({ name: "COURT_ID", nullable: true }) courtId: number;
  @Column({ name: "RECEIPT_TYPE_CODE", nullable: true }) receiptTypeCode: string;
  @Column({ name: "RECEIPT_TYPE_NAME" }) receiptTypeName: string;
  @Column({ name: "SELECT_CODE", nullable: true }) selectCode: string;
  @Column({ name: "CREATED_BY", default: 0 }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, default: 0 }) updatedBy: number;
  @Column({ name: "REMOVED_BY", default: 0 }) removedBy: number;
  @CreateDateColumn({ name: "CREATED_DATE", type: "timestamp" }) createdDate: Date;
  @UpdateDateColumn({ name: "UPDATED_DATE", nullable: true, type: "timestamp" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp" }) removedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_LOOKUP_RECEIPT_TYPE_SEQ".nextval ID FROM DUAL`);
      this.receiptTypeId = res[0].ID;
      this.orderNo = res[0].ID;
      this.receiptTypeCode = `${res[0].ID}`.padStart(3, '0');
      this.selectCode = `${res[0].ID}`.padStart(3, '0');
    } catch (error) {
      throw new HttpException(`[generate code failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  toResponseObject() {
    const {
      receiptTypeId, orderNo, activeFlag, costFlag, courtId, receiptTypeCode, receiptTypeName,
      selectCode, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate
    } = this;

    const responseObject = {
      receiptTypeId, orderNo, activeFlag, costFlag, courtId, receiptTypeCode, receiptTypeName,
      selectCode, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate
    };

    return responseObject;
  }
}
