import { ApiProperty } from "@nestjs/swagger";

export class OracleLookupAppointListDTO {
  @ApiProperty({ default: 1 }) activeFlag: number;
  @ApiProperty() appointListName: string;
  @ApiProperty() courtId: number;
}