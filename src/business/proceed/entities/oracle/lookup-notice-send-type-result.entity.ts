import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "PC_LOOKUP_NOTICE_SEND_TYPE_RESULT" })
export class OracleLookupNoticeSendTypeResults {
  @PrimaryColumn({ name: "NOTICE_SEND_TYPE_RESULT_ID" }) noticeSendTypeResultId: number;
  @Column({ name: "ORDER_NO", type: "float", default: 0.0 }) orderNo: number;
  @Column({ name: "ACTIVE_FLAG", nullable: true }) activeFlag: number;
  @Column({ name: "COST_FLAG", nullable: true }) costFlag: number;
  @Column({ name: "COURT_ID", nullable: true }) courtId: number;
  @Column({ name: "NOTICE_SEND_TYPE_RESULT_CODE", nullable: true }) noticeSendTypeResultCode: string;
  @Column({ name: "NOTICE_SEND_TYPE_RESULT_NAME" }) noticeSendTypeResultName: string;
  @Column({ name: "SELECT_CODE" }) selectCode: string;
  @Column({ name: "CREATED_BY", default: 0 }) createdBy: number;
  @Column({ name: "REMOVED_BY", default: 0 }) removedBy: number;
  @Column({ name: "UPDATED_BY", default: 0 }) updatedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp" }) removedDate: Date;

  toResponseObject() {
    const { noticeSendTypeResultId, orderNo, activeFlag, costFlag, courtId, noticeSendTypeResultCode, noticeSendTypeResultName, selectCode, createdBy, removedBy, updatedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { noticeSendTypeResultId, orderNo, activeFlag, costFlag, courtId, noticeSendTypeResultCode, noticeSendTypeResultName, selectCode, createdBy, removedBy, updatedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}