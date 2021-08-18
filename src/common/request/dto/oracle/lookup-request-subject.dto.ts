import { ApiProperty } from "@nestjs/swagger";

export class OracleLookupRequestSubjectDTO {
  @ApiProperty() requestSubjectName: string;
  @ApiProperty() activeFlag: number;
  @ApiProperty() courtId: number;
}