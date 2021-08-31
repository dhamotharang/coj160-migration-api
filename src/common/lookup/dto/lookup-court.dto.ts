import { ApiProperty } from "@nestjs/swagger";

export class OracleLookupCourtDTO {
  @ApiProperty() address: string;
  @ApiProperty() cLan: number;
  @ApiProperty() courtAddr: string;
  @ApiProperty() courtCode: string;
  @ApiProperty() courtLevelID: number;
  @ApiProperty() courtNameEN: string;
  @ApiProperty() courtNameTH: string;
  @ApiProperty() courtPart: string;
  @ApiProperty() courtTypeId: number;
  @ApiProperty() districtId: number;
  @ApiProperty() docId: string;
  @ApiProperty() eMail: string;
  @ApiProperty() emsCode: string;
  @ApiProperty() fax: string;
  @ApiProperty() fromBkk: number;
  @ApiProperty() licenseNo: string;
  @ApiProperty() moo: string;
  @ApiProperty() noticeTo: string;
  @ApiProperty() overRunId: string;
  @ApiProperty() postCode: string;
  @ApiProperty() postDeposit: string;
  @ApiProperty() postLicence: string;
  @ApiProperty() provinceId: number;
  @ApiProperty() qrcodeLink: string;
  @ApiProperty() road: string;
  @ApiProperty() selectCode: string;
  @ApiProperty() soi: string;
  @ApiProperty() subdistrictId: number;
  @ApiProperty() systemStartDate: Date;
  @ApiProperty() taxId: string;
  @ApiProperty() tel: string;
  @ApiProperty() titleDoc: string;
  @ApiProperty() websiteUrl: string;
}