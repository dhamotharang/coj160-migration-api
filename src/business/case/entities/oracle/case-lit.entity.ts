import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "PC_CASE_LIT" })
export class OracleCaseLits {
  @PrimaryColumn({ name: "CASE_LIT_ID" }) caseLitid: number;
  @Column({ name: "ORDER_NO", type: "float", default: 0.0 }) orderNo: number;
  @Column({ name: "COURT_ID", nullable: true }) courtId: number;
  @Column({ name: "COMPLAINANT_ID", nullable: true }) complainantId: number;
  @Column({ name: "LITIGANT_AGE", nullable: true }) litigantAge: number;
  @Column({ name: "LITIGANT_BIRTH_DATE", type: "timestamp" }) litigantBirthdate: Date;
  @Column({ name: "LITIGANT_FIRST_NAME", default: "-" }) litigantFirstname: string;
  @Column({ name: "INTER_ID", nullable: true }) interId: number;
  @Column({ name: "LITIGANT_LAST_NAME", default: "-" }) litigantLastname: string;
  @Column({ name: "LITIGANT_NAME" }) litigantName: string;
  @Column({ name: "LITIGANT_OCC_ID", nullable: true }) litigantOccid: number;
  @Column({ name: "LITIGANT_OLD_STATUS_ID", nullable: true }) litigantOldstatusid: number;
  @Column({ name: "RACE_ID", nullable: true }) raceId: number;
  @Column({ name: "LITIGANT_SEX", nullable: true }) litigantSex: number;
  @Column({ name: "LITIGANT_SITUATION_ID", nullable: true }) litigantSituationid: number;
  @Column({ name: "LITIGANT_STATUS_ID", nullable: true }) litigantStatusid: number;
  @Column({ name: "LITIGANT_TITLE_ID", nullable: true }) litigantTitleid: number;
  @Column({ name: "LITIGANT_TYPE_ID" }) litigantTypeid: number;
  @Column({ name: "LITIGANT_TYPE_NAME", nullable: true }) litigantTypename: string;
  @Column({ name: "PERSON_TYPE_ID", nullable: true }) personTypeid: number;
  @Column({ name: "REMARK	VARCHAR2" }) remark: string;
  @Column({ name: "CASE_ID" }) caseId: number;
  @Column({ name: "CREATED_BY", default: 0 }) createdBy: number;
  @Column({ name: "UPDATED_BY", default: 0 }) updatedBy: number;
  @Column({ name: "REMOVED_BY", default: 0 }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp" }) removedDate: Date;

  toResponseObject() {
    const { caseLitid, orderNo, courtId, complainantId, litigantAge, litigantBirthdate, litigantFirstname, interId, litigantLastname, litigantName, litigantOccid, litigantOldstatusid, raceId, litigantSex, litigantSituationid, litigantStatusid, litigantTitleid, litigantTypeid, litigantTypename, personTypeid, remark, caseId, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { caseLitid, orderNo, courtId, complainantId, litigantAge, litigantBirthdate, litigantFirstname, interId, litigantLastname, litigantName, litigantOccid, litigantOldstatusid, raceId, litigantSex, litigantSituationid, litigantStatusid, litigantTitleid, litigantTypeid, litigantTypename, personTypeid, remark, caseId, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}