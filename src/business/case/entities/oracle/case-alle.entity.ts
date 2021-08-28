import { HelperService } from "src/shared/helpers/helper.service";
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "PC_CASE_ALLE" })
export class OracleCaseAlles extends HelperService {
  constructor() {
    super();
  }
  @PrimaryColumn({ name: "CASE_ALLE_ID" }) caseAlleId: number;
  @Column({ name: "ORDER_NO", type: "float" }) orderNo: number;
  @Column({ name: "ALLEGATION_ID", nullable: true }) allegationId: number;
  @Column({ name: "COURT_ID", nullable: true }) courtId: number;
  @Column({ name: "CASE_ID" }) caseId: number;
  @Column({ name: "CREATED_BY", default: 0 }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, default: 0 }) updatedBy: number;
  @Column({ name: "REMOVED_BY", default: 0 }) removedBy: number;
  @CreateDateColumn({ name: "CREATED_DATE", type: "timestamp" }) createdDate: Date;
  @UpdateDateColumn({ name: "UPDATED_DATE", nullable: true, type: "timestamp" }) updatedDate: Date;
  @UpdateDateColumn({ name: "REMOVED_DATE", nullable: true, type: "timestamp" }) removedDate: Date;

  toResponseObject() {
    const {
      caseAlleId, orderNo, allegationId, courtId, caseId, createdBy, updatedBy, removedBy,
      createdDate, updatedDate, removedDate
    } = this;

    const responseObject = {
      caseAlleId, orderNo, allegationId, courtId, caseId, createdBy, updatedBy, removedBy,
      createdDate: createdDate ? this.dateFormat("YYYY-MM-DD H:i:s", createdDate) : null,
      updatedDate: updatedDate ? this.dateFormat("YYYY-MM-DD H:i:s", updatedDate) : null,
      removedDate: removedDate ? this.dateFormat("YYYY-MM-DD H:i:s", removedDate) : null
    };

    return responseObject;
  }
}