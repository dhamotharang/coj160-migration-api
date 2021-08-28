import { HelperService } from "src/shared/helpers/helper.service";
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "PC_LOOKUP_ALLEGATION" })
export class OracleLookupAllegations extends HelperService {
  constructor() {
    super();
  }
  @PrimaryColumn({ name: "ALLEGATION_ID" }) allegationId: number;
  @Column({ name: "ORDER_NO", type: "float", default: 0.0 }) orderNo: number;
  @Column({ name: "ACTIVE_FLAG", nullable: true }) activeFlag: number;
  @Column({ name: "ALLEGATION_CODE", nullable: true }) allegationCode: string;
  @Column({ name: "ALLEGATION_NAME" }) allegationName: string;
  @Column({ name: "CASE_TYPE_ID", nullable: true }) casetypeId: number;
  @Column({ name: "COURT_ID", nullable: true }) courtId: number;
  @Column({ name: "FINE_AMOUNT", nullable: true, type: "float" }) fineAmount: number;
  @Column({ name: "MATRA_NAME", nullable: true }) matraName: string;
  @Column({ name: "OFFENSE_ID", nullable: true }) offenseId: number;
  @Column({ name: "PRINT_REPORT", nullable: true }) printReport: number;
  @Column({ name: "SELECT_CODE", nullable: true }) selectCode: string;
  @Column({ name: "STAT_GROUP", nullable: true }) statGroup: number;
  @Column({ name: "STAT_ID", nullable: true }) statId: number;
  @Column({ name: "CREATED_BY", default: 0 }) createdBy: number;
  @Column({ name: "REMOVED_BY", default: 0 }) removedBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, default: 0 }) updatedBy: number;
  @CreateDateColumn({ name: "CREATED_DATE", type: "timestamp" }) createdDate: Date;
  @UpdateDateColumn({ name: "UPDATED_DATE", nullable: true, type: "timestamp" }) updatedDate: Date;
  @UpdateDateColumn({ name: "REMOVED_DATE", nullable: true, type: "timestamp" }) removedDate: Date;

  toResponseObject() {
    const {
      allegationId, orderNo, activeFlag, allegationCode, allegationName, casetypeId, courtId, fineAmount, matraName, offenseId,
      printReport, selectCode, statGroup, statId, createdBy, removedBy, updatedBy, createdDate, updatedDate, removedDate
    } = this;

    const responseObject = {
      allegationId, orderNo, activeFlag, allegationCode, allegationName, casetypeId, courtId, fineAmount,
      matraName, offenseId, printReport, selectCode, statGroup, statId, createdBy, removedBy, updatedBy,
      createdDate: createdDate ? this.dateFormat("YYYY-MM-DD H:i:s", createdDate) : null,
      updatedDate: updatedDate ? this.dateFormat("YYYY-MM-DD H:i:s", updatedDate) : null,
      removedDate: removedDate ? this.dateFormat("YYYY-MM-DD H:i:s", removedDate) : null
    };

    return responseObject;
  }
}