import { HttpException, HttpStatus, Logger } from "@nestjs/common";
import { BeforeInsert, Column, Entity, getManager, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_LOOKUP_DEPARTMENT" })
export class OracleLookupDepartments {
  @PrimaryGeneratedColumn({ name: "DEPARTMENT_ID" }) departmentId: number;
  @Column({ name: "ORDER_NO", type: "float", default: 0.0 }) orderNo: number;
  @Column({ name: "ACTIVE_FLAG", nullable: true }) activeFlag: number;
  @Column({ name: "ADDRESS" }) address: string;
  @Column({ name: "BANK_ID", nullable: true }) bankId: number;
  @Column({ name: "BOOK_ACCOUNT", nullable: true }) bookAccount: string;
  @Column({ name: "BOOK_ACCOUNT_ID", nullable: true }) bookAccountId: number;
  @Column({ name: "COURT_ID", nullable: true }) courtId: number;
  @Column({ name: "DEPARTMENT_CODE", nullable: true }) departmentCode: string;
  @Column({ name: "DEPARTMENT_NAME" }) departmentName: string;
  @Column({ name: "DISTRICT_ID", nullable: true }) districtId: number;
  @Column({ name: "MOO", nullable: true }) moo: string;
  @Column({ name: "NAME_TOR", nullable: true }) nameTor: string;
  @Column({ name: "POST_CODE", nullable: true }) postCode: string;
  @Column({ name: "PROGRAM_ID", nullable: true }) programId: number;
  @Column({ name: "PROVINCE_ID", nullable: true }) provinceId: number;
  @Column({ name: "ROAD", nullable: true }) road: string;
  @Column({ name: "SELECT_CODE", nullable: true }) selectCode: string;
  @Column({ name: "SEND_NO", nullable: true }) sendNo: number;
  @Column({ name: "SOI", nullable: true }) soi: string;
  @Column({ name: "SUBDISTRICT_ID", default: 0 }) subDistrictId: number;
  @Column({ name: "TEL", nullable: true }) tel: string;
  @Column({ name: "NOTICE_TO", nullable: true }) noticeTo: string;
  @Column({ name: "CREATED_BY", default: 0 }) createdBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp" }) createdDate: Date;
  @Column({ name: "REMOVED_BY", default: 0 }) removedBy: number;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true }) removedDate: Date;
  @Column({ name: "UPDATED_BY", nullable: true, default: 0 }) updatedBy: number;
  @Column({ name: "UPDATED_DATE", type: "timestamp", nullable: true }) updatedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_LOOKUP_DEPARTMENT_SEQ".nextval ID FROM DUAL`);
      this.departmentId = res[0].ID;
      this.orderNo = res[0].ID;
      this.departmentCode = `${res[0].ID}`.padStart(3, '0');
      this.selectCode = `${res[0].ID}`.padStart(3, '0');
    } catch (error) {
      throw new HttpException(`[before insert department failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  toResponseObject() {
    const { departmentId, orderNo, activeFlag, address, bankId, bookAccount, bookAccountId, courtId, departmentCode, departmentName, districtId, moo, nameTor, postCode, programId, provinceId, road, selectCode, sendNo, soi, subDistrictId, tel, noticeTo, createdBy, createdDate, removedBy, removedDate, updatedBy, updatedDate } = this;
    const responseObject = { departmentId, orderNo, activeFlag, address, bankId, bookAccount, bookAccountId, courtId, departmentCode, departmentName, districtId, moo, nameTor, postCode, programId, provinceId, road, selectCode, sendNo, soi, subDistrictId, tel, noticeTo, createdBy, createdDate, removedBy, removedDate, updatedBy, updatedDate };
    return responseObject;
  }
}