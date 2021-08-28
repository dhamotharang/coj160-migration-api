import { ApiProperty } from "@nestjs/swagger";

export class OracleProceedAppointResultDTO {
  @ApiProperty() offenseDetail: string;
  @ApiProperty() appointDate: Date;
  @ApiProperty() appointDelayId: number;
  @ApiProperty() appointId: number;
  @ApiProperty() apointTime: string;
  @ApiProperty() caseId: number;
  @ApiProperty() investigateAccuser: number;
  @ApiProperty() investigateAccuserDate: number;
  @ApiProperty() investigateDefendant: number;
  @ApiProperty() investigateDefendantDate: number;
  @ApiProperty() investigateOther: number;
  @ApiProperty() investigateOtherDate: number;
  @ApiProperty() status: number;
}