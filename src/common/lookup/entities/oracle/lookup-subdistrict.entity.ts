import { HelperService } from "src/shared/helpers/helper.service";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_LOOKUP_SUBDISTRICT" })
export class OracleLookupSubdistricts extends HelperService {
  constructor() {
    super();
  }
  @PrimaryColumn({ name: "SUBDISTRICT_ID" }) subdistrictId: number;
  @Column({ name: "ORDER_NO", type: "float", nullable: true }) orderNo: number;
  @Column({ name: "ACTIVE_FLAG", nullable: true }) activeFlag: number;
  @Column({ name: "COURT_ID", nullable: true }) courtId: number;
  @Column({ name: "DISTRICT_ID", nullable: true }) districtId: number;
  @Column({ name: "POST_CODE", nullable: true }) postCode: string;
  @Column({ name: "PROVINCE_ID", nullable: true }) provinceId: number;
  @Column({ name: "SELECT_CODE", nullable: true }) selectCode: string;
  @Column({ name: "SUBDISTRICT_CODE", nullable: true }) subdistrictCode: string;
  @Column({ name: "SUBDISTRICT_NAME" }) subdistrictName: string;
  @Column({ name: "CREATED_BY", default: 0 }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, default: 0 }) updatedBy: number;
  @Column({ name: "REMOVED_BY", default: 0 }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: 'timestamp' }) createdDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp" }) removedDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp" }) updatedDate: Date;

  toResponseObject() {
    const {
      subdistrictId, createdBy, createdDate, orderNo, removedBy, removedDate, updatedBy, updatedDate,
      activeFlag, courtId, districtId, postCode, provinceId, selectCode, subdistrictCode, subdistrictName
    } = this;

    const responseObject = {
      subdistrictId, orderNo, activeFlag, courtId, districtId, postCode, provinceId,
      selectCode, subdistrictCode, subdistrictName, createdBy, updatedBy, removedBy,
      createdDate: createdDate ? this.dateFormat('YYYY-MM-DD H:i:s', createdDate) : null,
      removedDate: removedDate ? this.dateFormat('YYYY-MM-DD H:i:s', removedDate) : null,
      updatedDate: updatedDate ? this.dateFormat('YYYY-MM-DD H:i:s', updatedDate) : null,
    };
    return responseObject;
  }
}