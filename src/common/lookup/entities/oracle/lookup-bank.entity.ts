import { HttpException, HttpStatus } from "@nestjs/common";
import { BeforeInsert, Column, Entity, getManager, PrimaryColumn } from "typeorm";

@Entity({ name: "PC_LOOKUP_BANK" })
export class OracleLookupBanks {
  @PrimaryColumn({ name: "BANK_ID" }) bankId: number;
  @Column({ name: "ORDER_NO", type: "float" }) orderNo: number;
  @Column({ name: "ACTIVE_FLAG", nullable: true, default: 0 }) activeFlag: number;
  @Column({ name: "BANK_CODE", nullable: true }) bankCode: string;
  @Column({ name: "BANK_NAME" }) bankName: string;
  @Column({ name: "COURT_ID", nullable: true, default: 0 }) courtId: number;
  @Column({ name: "NOTICE_TO" }) noticeTo: string;
  @Column({ name: "SELECT_CODE", nullable: true }) selectCode: string;
  @Column({ name: "CREATED_BY", default: 0 }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, default: 0 }) updatedBy: number;
  @Column({ name: "REMOVED_BY", default: 0 }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", nullable: true }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true }) removedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_LOOKUP_BANK_SEQ".nextval ID FROM DUAL`);
      this.bankId = res[0].ID;
      this.orderNo = res[0].ID;
      this.bankCode = `${res[0].ID}`.padStart(3, '0');
      this.selectCode = `${res[0].ID}`.padStart(3, '0');
    } catch (error) {
      throw new HttpException(`[before insert bank failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  toResponseObject() {
    const {
      bankId, orderNo, activeFlag, bankCode, bankName, courtId, noticeTo, selectCode, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate,
    } = this;
    const responseObject = {
      bankId, orderNo, activeFlag, bankCode, bankName, courtId, noticeTo, selectCode, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate,
    }

    return responseObject;
  }
}