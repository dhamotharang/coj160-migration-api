import { HelperService } from "src/shared/helpers/helper.service";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "PC_LOOKUP_PROVINCE" })
export class OracleLookupProvinces extends HelperService {
  constructor() {
    super();
  }

  @PrimaryColumn({ name: "PROVINCE_ID" }) provinceI: number;
  @Column({ name: "ORDER_NO", type: "float", nullable: true }) orderNo: number;
  @Column({ name: "COURT_ID", nullable: true }) courtId: number;
  @Column({ name: "PART", nullable: true }) par: number;
  @Column({ name: "PROVINCE_CODE", nullable: true }) provinceCod: string;
  @Column({ name: "PROVINCE_NAME" }) provinceNam: string;
  @Column({ name: "SELECT_CODE", nullable: true }) selectCod: string;
  @Column({ name: "ACTIVE_FLAG", nullable: true }) activeFla: number;
  @Column({ name: "CREATED_BY", default: 0 }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, default: 0 }) updatedBy: number;
  @Column({ name: "REMOVED_BY", default: 0 }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp" }) removedDate: Date;

  toResponseObject() {
    const {
      provinceI, orderNo, courtId, par, provinceCod, provinceNam, selectCod, activeFla, createdBy, updatedBy,
      removedBy, createdDate, updatedDate, removedDate
    } = this;

    const responseObject = {
      provinceI, orderNo, courtId, par, provinceCod, provinceNam, selectCod, activeFla, createdBy, updatedBy, removedBy,
      createdDate: createdDate ? this.dateFormat("YYYY-MM-DD H:i:s", createdDate) : null,
      updatedDate: updatedDate ? this.dateFormat("YYYY-MM-DD H:i:s", updatedDate) : null,
      removedDate: removedDate ? this.dateFormat("YYYY-MM-DD H:i:s", removedDate) : null,
    };
    return responseObject;
  }
}