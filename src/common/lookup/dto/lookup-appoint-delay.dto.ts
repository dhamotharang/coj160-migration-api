import { ApiProperty } from "@nestjs/swagger";

export class OracleLookupAppointDelayDTO {
  @ApiProperty() activeFlag: number;
  @ApiProperty() appointDelayName: string;
  @ApiProperty() courtId: number;
}