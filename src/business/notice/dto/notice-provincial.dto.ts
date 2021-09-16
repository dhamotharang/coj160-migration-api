import { ApiProperty } from "@nestjs/swagger";

export class OracleNoticeProvincialDTO {
  @ApiProperty() address: string;
  @ApiProperty() noticeTypeId: number;
  @ApiProperty() noticeCodeNo: number;
  @ApiProperty() noticeCodeYear: number;
  @ApiProperty() blackTitleId: number;
  @ApiProperty() blackIdnum: number;
  @ApiProperty() blackYear: number;
  @ApiProperty() moo: string;
  @ApiProperty() currentSubdistrictId: number;
  @ApiProperty() currentProvinceId: number;
  @ApiProperty() currentDistrictId: number;
  @ApiProperty() accuDesc: string;
  @ApiProperty() litTypeId: number;
  @ApiProperty() litigantName: string;
  @ApiProperty() prosDesc: string;
  @ApiProperty() road: string;
  @ApiProperty() sendDate: Date;
  @ApiProperty() sendFee: number;
  @ApiProperty() sendMethod: number;
  @ApiProperty() sendBy: number;
  @ApiProperty() noticeSendStatus: number;
}