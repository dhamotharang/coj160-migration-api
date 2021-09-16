import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "PC_LOOKUP_TITLE_CASE" })
export class OracleLookupTitleCases {
  @PrimaryColumn({ name: "TITLE_CASE_ID" }) titleCaseId: number;
  @Column({ name: "ORDER_NO", type: "float", default: 0.0 }) orderNo: number;
  @Column({ name: "ACTIVE_FLAG", nullable: true }) activeFlag: number;
  @Column({ name: "CASE_TYPE_STAT", nullable: true }) caseTypeStat: number;
  @Column({ name: "COURT_ID", nullable: true }) courtId: number;
  @Column({ name: "DEFAULT_FLAG", nullable: true }) defaultFlag: number;
  @Column({ name: "DEFAULT_VALUE", nullable: true }) defaultValue: number;
  @Column({ name: "IMPRISON_AMOUNT", nullable: true }) imprisonAmount: number;
  @Column({ name: "IMPRISON_DAYS", nullable: true }) imprisonDays: number;
  @Column({ name: "SELECT_CODE", nullable: true }) selectCode: string;
  @Column({ name: "TITLE_CASE_BARCODE", nullable: true }) titleCaseBarcode: string;
  @Column({ name: "TITLE_CASE_CODE", nullable: true }) titleCaseCode: string;
  @Column({ name: "TITLE_CASE_DESC", nullable: true }) titleCaseDesc: string;
  @Column({ name: "TITLE_CASE_GROUP", nullable: true }) titleCaseGroup: number;
  @Column({ name: "TITLE_CASE_NAME", nullable: true }) titleCaseName: string;
  @Column({ name: "CASE_CATE_ID", nullable: true }) caseCateId: number;
  @Column({ name: "CREATED_BY", default: 0 }) createdBy: number;
  @Column({ name: "UPDATED_BY", default: 0 }) updatedBy: number;
  @Column({ name: "REMOVED_BY", default: 0 }) removedBy: number;
  @CreateDateColumn({ name: "CREATED_DATE", type: "timestamp" }) createdDate: Date;
  @UpdateDateColumn({ name: "UPDATED_DATE", type: "timestamp" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp" }) removedDate: Date;

  toResponseObject() {
    const { titleCaseId, orderNo, activeFlag, caseTypeStat, courtId, defaultFlag, defaultValue, imprisonAmount, imprisonDays, selectCode, titleCaseBarcode, titleCaseCode, titleCaseDesc, titleCaseGroup, titleCaseName, caseCateId, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { titleCaseId, orderNo, activeFlag, caseTypeStat, courtId, defaultFlag, defaultValue, imprisonAmount, imprisonDays, selectCode, titleCaseBarcode, titleCaseCode, titleCaseDesc, titleCaseGroup, titleCaseName, caseCateId, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}