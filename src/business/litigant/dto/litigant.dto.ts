import { ApiProperty } from "@nestjs/swagger";

export class OracleLitigantDTO {
  @ApiProperty() courtId: number;
  @ApiProperty() caseId: number;
  @ApiProperty() reqNo: number;
  @ApiProperty() reqNoYear: string;
  @ApiProperty() refNo: number;
  @ApiProperty() refNoYear: string;
  @ApiProperty() litigantTypeId: number;
  @ApiProperty() litigantSubTypeCode: string;
  @ApiProperty() reqDescription: string;
  @ApiProperty() reqDate: Date;
  @ApiProperty() reqReceivedBy: number;
  @ApiProperty() reqName: string;
  @ApiProperty() submitReqBy: number;
  @ApiProperty() submitDate: Date;
  @ApiProperty() courtOrderDetail: string;
  @ApiProperty() courtOrderDate: Date;
  @ApiProperty() judgeId: number;
  @ApiProperty() sendOrderDate: Date;
  @ApiProperty() sendOrderDept: number;
  @ApiProperty() sendOrderDescription: string;
  @ApiProperty() notes: string;
  @ApiProperty() acceptRequestDate: Date;
  @ApiProperty() acceptRequestName: string;
  @ApiProperty() acceptRequestDepartment: number;
  @ApiProperty() courtOrderRecordDate: Date;
  @ApiProperty() courtOrderRecordName: string;
  @ApiProperty() courtOrderRecordDepartment: number;
  @ApiProperty() litigantSubTypeName: string;
}