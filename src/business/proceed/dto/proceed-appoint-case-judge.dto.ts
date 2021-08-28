import { ApiProperty } from "@nestjs/swagger";

export class OracleProceedAppointCaseJudgeDTO {
  @ApiProperty() appointId: number;
  @ApiProperty() courtId: number;
  @ApiProperty() judgeEndDate: Date;
  @ApiProperty() judgeId: number;
  @ApiProperty() judgeStartDate: Date;
  @ApiProperty() judgeTypeId: number;
  @ApiProperty() temporaryJudgeFlage: number;
}