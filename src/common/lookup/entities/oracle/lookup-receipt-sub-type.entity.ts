import { HttpException, HttpStatus } from "@nestjs/common";
import { BeforeInsert, Column, Entity, getManager, PrimaryColumn } from "typeorm";

@Entity({ name: "PC_LOOKUP_RECEIPT_SUB_TYPE" })
export class OracleLookupReceiptSubTypes {
  @PrimaryColumn({ name: "RECEIPT_SUB_TYPE_ID" }) receiptSubTypeId: number;
  @Column({ name: "ORDER_NO", type: "float", nullable: true }) orderNo: number;
  @Column({ name: "ACTIVE_FLAG", nullable: true }) activeFlag: number;
  @Column({ name: "COST_FLAG", nullable: true }) costFlag: number;
  @Column({ name: "COURT_ID", nullable: true }) courtId: number;
  @Column({ name: "DEFAULT_VALUE", nullable: true }) defaultValue: number;
  @Column({ name: "FINE_TYPE", nullable: true }) fineType: number;
  @Column({ name: "NO_EDIT_CODE", nullable: true }) noEditCode: string;
  @Column({ name: "NO_EDIT_FLAG", nullable: true }) noEditFlag: number;
  @Column({ name: "OTHER_FLAG", nullable: true }) otherFlag: number;
  @Column({ name: "PRINT_FLAG", nullable: true }) printFlag: number;
  @Column({ name: "PRINT_GROUP", nullable: true }) printGroup: number;
  @Column({ name: "RECEIPT_SUB_TYPE_CODE", nullable: true }) receiptSubTypeCode: string;
  @Column({ name: "RECEIPT_SUB_TYPE_NAME" }) receiptSubTypeName: string;
  @Column({ name: "RECEIPT_TYPE_ID", nullable: true }) receiptTypeId: number;
  @Column({ name: "SELECT_CODE", nullable: true }) selectCode: string;
  @Column({ name: "CREATED_BY", default: 0 }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true }) updatedBy: number;
  @Column({ name: "REMOVED_BY", default: 0 }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", nullable: true }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true }) removedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_LOOKUP_RECEIPT_SUB_TYPE_SEQ".nextval ID FROM DUAL`);
      this.receiptSubTypeId = res[0].ID;
      this.orderNo = res[0].ID;
      this.receiptSubTypeCode = `${res[0].ID}`.padStart(3, '0');
      this.selectCode = `${res[0].ID}`.padStart(3, '0');
    } catch (error) {
      throw new HttpException(`[generate code failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  toResponseObject() {
    const {
      receiptSubTypeId, orderNo, activeFlag, costFlag, courtId, defaultValue, fineType, noEditCode, noEditFlag, otherFlag,
      printFlag, printGroup, receiptSubTypeCode, receiptSubTypeName, receiptTypeId, selectCode, createdBy, updatedBy,
      removedBy, createdDate, updatedDate, removedDate
    } = this;

    const responseObject = {
      receiptSubTypeId, orderNo, activeFlag, costFlag, courtId, defaultValue, fineType, noEditCode, noEditFlag, otherFlag,
      printFlag, printGroup, receiptSubTypeCode, receiptSubTypeName, receiptTypeId, selectCode, createdBy, updatedBy,
      removedBy, createdDate, updatedDate, removedDate
    };

    return responseObject;
  }
}