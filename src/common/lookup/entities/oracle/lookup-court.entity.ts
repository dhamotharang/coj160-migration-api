import { HelperService } from "src/shared/helpers/helper.service";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "PC_LOOKUP_COURT" })
export class OracleLookupCourts extends HelperService {
  constructor() {
    super();
  }
  @PrimaryColumn({ name: "COURT_ID" }) courtId: number;
  @Column({ name: "ORDER_NO", type: "float" }) orderNo: number;
  @Column({ name: "ADDRESS", nullable: true }) address: string;
  @Column({ name: "C_LAN", nullable: true }) cLan: number;
  @Column({ name: "COURT_ADDR", nullable: true }) courtAddr: string;
  @Column({ name: "COURT_CODE", nullable: true }) courtCode: string;
  @Column({ name: "COURT_LEVEL_ID", nullable: true }) courtLevelID: number;
  @Column({ name: "COURT_NAME_EN", nullable: true }) courtNameEN: string;
  @Column({ name: "COURT_NAME_TH", nullable: true }) courtNameTH: string;
  @Column({ name: "COURT_PART", nullable: true }) courtPart: string;
  @Column({ name: "COURT_TYPE_ID", nullable: true }) courtTypeId: number;
  @Column({ name: "DISTRICT_ID", nullable: true }) districtId: number;
  @Column({ name: "DOC_ID", nullable: true }) docId: string;
  @Column({ name: "E_MAIL", nullable: true }) eMail: string;
  @Column({ name: "EMS_CODE", nullable: true }) emsCode: string;
  @Column({ name: "FAX", nullable: true }) fax: string;
  @Column({ name: "FROM_BKK", nullable: true }) fromBkk: number;
  @Column({ name: "LICENSE_NO", nullable: true }) licenseNo: string;
  @Column({ name: "MOO", nullable: true }) moo: string;
  @Column({ name: "NOTICE_TO", nullable: true }) noticeTo: string;
  @Column({ name: "OVER_RUN_ID", nullable: true }) overRunId: string;
  @Column({ name: "POST_CODE", nullable: true }) postCode: string;
  @Column({ name: "POST_DEPOSIT", nullable: true }) postDeposit: string;
  @Column({ name: "POST_LICENCE", nullable: true }) postLicence: string;
  @Column({ name: "PROVINCE_ID", nullable: true }) provinceId: number;
  @Column({ name: "QRCODE_LINK", nullable: true }) qrcodeLink: string;
  @Column({ name: "ROAD", nullable: true }) road: string;
  @Column({ name: "SELECT_CODE", nullable: true }) selectCode: string;
  @Column({ name: "SOI", nullable: true }) soi: string;
  @Column({ name: "SUBDISTRICT_ID", nullable: true }) subdistrictId: number;
  @Column({ name: "SYSTEM_START_DATE", nullable: true, type: "timestamp" }) systemStartDate: Date;
  @Column({ name: "TAX_ID", nullable: true }) taxId: string;
  @Column({ name: "TEL", nullable: true }) tel: string;
  @Column({ name: "TITLE_DOC", nullable: true }) titleDoc: string;
  @Column({ name: "WEBSITE_URL", nullable: true }) websiteUrl: string;
  @Column({ name: "ACTIVE_FLAG", nullable: true }) activeFlag: number;
  @Column({ name: "CREATED_BY" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true }) updatedBy: number;
  @Column({ name: "REMOVED_BY" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp" }) removedDate: Date;

  toResponseObject() {
    const {
      courtId, orderNo, address, cLan, courtAddr, courtCode, courtLevelID, courtNameEN, courtNameTH, courtPart, courtTypeId,
      districtId, docId, eMail, emsCode, fax, fromBkk, licenseNo, moo, noticeTo, overRunId, postCode, postDeposit, postLicence,
      provinceId, qrcodeLink, road, selectCode, soi, subdistrictId, systemStartDate, taxId, tel, titleDoc, websiteUrl,
      activeFlag, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate
    } = this;

    const responseObject = {
      courtId, orderNo, address, cLan, courtAddr, courtCode, courtLevelID, courtNameEN, courtNameTH, courtPart, courtTypeId, districtId,
      docId, eMail, emsCode, fax, fromBkk, licenseNo, moo, noticeTo, overRunId, postCode, postDeposit, postLicence, provinceId, qrcodeLink,
      road, selectCode, soi, subdistrictId, systemStartDate, taxId, tel, titleDoc, websiteUrl, activeFlag,
      createdBy, updatedBy, removedBy,
      createdDate: createdDate ? this.dateFormat("YYYY-MM-DD H:i:s", createdDate) : null,
      updatedDate: updatedDate ? this.dateFormat("YYYY-MM-DD H:i:s", updatedDate) : null,
      removedDate: removedDate ? this.dateFormat("YYYY-MM-DD H:i:s", removedDate) : null
    };
    return responseObject;
  }
}