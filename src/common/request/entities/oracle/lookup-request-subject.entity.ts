import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_LOOKUP_REQUEST_SUBJECT" })
export class OracleLookupRequestSubjects {
  @PrimaryGeneratedColumn({ name: "REQUEST_SUBJECT_ID" }) requestSubjectId: number;
  @Column({ name: "REQUEST_SUBJECT_CODE", nullable: true }) requestSubjectCode: string;
  @Column({ name: "REQUEST_SUBJECT_NAME" }) requestSubjectName: string;
  @Column({ name: "ORDER_NO", default: 0.0, type: "float" }) orderNo: number;
  @Column({ name: "DATE_FLAG", type: "timestamp", nullable: true }) dateFlag: Date;
  @Column({ name: "ACTIVE_FLAG", nullable: true }) activeFlag: number;
  @Column({ name: "COURT_ID", nullable: true }) courtId: number;
  @Column({ name: "SELECT_CODE", nullable: true }) selectCode: string;
  @Column({ name: "CREATED_BY", default: 0 }) createdBy: number;
  @Column({ name: "UPDATED_BY", default: 0, nullable: true }) updatedBy: number;
  @Column({ name: "REMOVED_BY", nullable: true }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", nullable: true }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true }) removedDate: Date;

  toResponseObject() {
    const { requestSubjectId, requestSubjectCode, requestSubjectName, orderNo, dateFlag, activeFlag, courtId, selectCode, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { requestSubjectId, requestSubjectCode, requestSubjectName, orderNo, dateFlag, activeFlag, courtId, selectCode, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}