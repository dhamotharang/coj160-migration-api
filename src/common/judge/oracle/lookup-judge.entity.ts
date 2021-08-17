import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_LOOKUP_JUDGE" })
export class OracleLookupJudges {
  @PrimaryGeneratedColumn({ name: "JUDGE_ID" }) judgeId: number;
  @Column({ name: "ORDER_NO", default: 0.0 }) orderNo: number;
  @Column({ name: "ACTIVE_FLAG", nullable: true }) activeFlag: number;
  @Column({ name: "ACTIVE_FROM_DATE", type: "timestamp", nullable: true }) activeFromDate: Date;
  @Column({ name: "ACTIVE_TO_DATE", type: "timestamp", nullable: true }) activeToDate: Date;
  @Column({ name: "ADDRESS", nullable: true }) address: string;
  @Column({ name: "COURT_ID", nullable: true }) courtId: number;
  @Column({ name: "DISTRICT_ID", nullable: true }) districtId: number;
  @Column({ name: "FAX", nullable: true }) fax: string;
  @Column({ name: "FIRST_NAME", nullable: true }) firstName: string;
  @Column({ name: "FLAG_JUDGE", nullable: true }) flagJudge: number;
  @Column({ name: "FROM_COURT", nullable: true }) fromCourt: number;
  @Column({ name: "GEN_NO", nullable: true }) genNo: string;
  @Column({ name: "HEAD_LEVEL_FLAG", nullable: true }) headLevelFlag: number;
  @Column({ name: "ID_NO", nullable: true }) idNo: string;
  @Column({ name: "JUDGE_ASSIGN", nullable: true }) hudgeAssign: number;
  @Column({ name: "JUDGE_CODE", nullable: true }) judgeCode: string;
  @Column({ name: "JUDGE_NAME" }) judgeName: string;
  @Column({ name: "JUDGE_SALARY", nullable: true }) judgeSalary: number;
  @Column({ name: "JUDGE_SALARY_STEP", nullable: true }) judgeSalaryStep: number;
  @Column({ name: "JUDGE_STATUS" }) judgeStatus: number;
  @Column({ name: "JUDGE_TYPE_ID", nullable: true }) judgeTypeId: number;
  @Column({ name: "LAST_NAME", nullable: true }) lastName: string;
  @Column({ name: "MOO", nullable: true }) moo: string;
  @Column({ name: "POSITION_ID", nullable: true }) positionId: number;
  @Column({ name: "POST_CODE", nullable: true }) postCode: string;
  @Column({ name: "PROVINCE_ID", nullable: true }) provinceId: number;
  @Column({ name: "REF_ID", nullable: true }) refId: number;
  @Column({ name: "ROAD", nullable: true }) road: string;
  @Column({ name: "ROOM_ID", nullable: true }) roomId: number;
  @Column({ name: "SELECT_CODE", nullable: true }) selectCode: string;
  @Column({ name: "SIGNATURE", nullable: true }) signature: string;
  @Column({ name: "SOI", nullable: true }) soi: string;
  @Column({ name: "SUBDISTRICT_ID", nullable: true }) subdistrictId: number;
  @Column({ name: "SUPER_ID", nullable: true }) superId: number;
  @Column({ name: "TEL", nullable: true }) tel: string;
  @Column({ name: "TO_COURT", nullable: true }) toCourt: number;
  @Column({ name: "TITLE_ID", nullable: true }) titleId: number;
  @Column({ name: "CREATED_BY", default: 0 }) createdBy: number;
  @Column({ name: "UPDATED_BY", default: 0 }) updatedBy: number;
  @Column({ name: "REMOVED_BY", default: 0 }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp" }) createdDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true }) removedDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", nullable: true }) updatedDate: Date;

  toResponseObject() {
    const { judgeId, orderNo, activeFlag, activeFromDate, activeToDate, address, courtId, districtId, fax, firstName, flagJudge, fromCourt, genNo, headLevelFlag, idNo, hudgeAssign, judgeCode, judgeName, judgeSalary, judgeSalaryStep, judgeStatus, judgeTypeId, lastName, moo, positionId, postCode, provinceId, refId, road, roomId, selectCode, signature, soi, subdistrictId, superId, tel, toCourt, titleId, createdBy, updatedBy, removedBy, createdDate, removedDate, updatedDate } = this;
    const responseObject = { judgeId, orderNo, activeFlag, activeFromDate, activeToDate, address, courtId, districtId, fax, firstName, flagJudge, fromCourt, genNo, headLevelFlag, idNo, hudgeAssign, judgeCode, judgeName, judgeSalary, judgeSalaryStep, judgeStatus, judgeTypeId, lastName, moo, positionId, postCode, provinceId, refId, road, roomId, selectCode, signature, soi, subdistrictId, superId, tel, toCourt, titleId, createdBy, updatedBy, removedBy, createdDate, removedDate, updatedDate };
    return responseObject;
  }
}