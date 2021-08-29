import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "PC_LOOKUP_DISTRICT" })
export class OracleLookupDistricts {
  @PrimaryColumn({ name: "DISTRICT_ID" }) districtId: number;
  @Column({ name: "ORDER_NO", type: "float", default: 0.0 }) orderNo: number;
  @Column({ name: "COURT_ID", nullable: true }) courtId: number;
  @Column({ name: "DISTRICT_CODE", nullable: true }) districtCode: string;
  @Column({ name: "DISTRICT_NAME" }) districtName: string;
  @Column({ name: "POST_CODE", nullable: true }) postCode: string;
  @Column({ name: "PROVINCE_ID", nullable: true }) provinceId: number;
  @Column({ name: "SELECT_CODE", nullable: true }) selectCode: string;
  @Column({ name: "ACTIVE_FLAG", nullable: true }) activeFlag: number;
  @Column({ name: "CREATED_BY", default: 0 }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, default: 0 }) updatedBy: number;
  @Column({ name: "REMOVED_BY", default: 0 }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp" }) removedDate: Date;

}