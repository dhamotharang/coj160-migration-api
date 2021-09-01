import { Column, Entity, PrimaryColumn } from "typeorm";

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