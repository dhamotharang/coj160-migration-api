import { ApiProperty } from "@nestjs/swagger";

export class OracleProceedHoldReasonDTO {
  @ApiProperty() activeFlag: number;
  @ApiProperty() courtId: number;
  @ApiProperty() holdDescription: string;
  @ApiProperty() holdReason: string;
}