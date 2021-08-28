import { ApiProperty } from "@nestjs/swagger";

export class OracleLookupAllegationDTO {
  @ApiProperty() allegationName: string;
  @ApiProperty() casetypeId: number;
  @ApiProperty() courtId: number;
  @ApiProperty() fineAmount: number;
  @ApiProperty() matraName: string;
  @ApiProperty() offenseId: number;
  @ApiProperty() printReport: number;
  @ApiProperty() selectCode: string;
  @ApiProperty() statGroup: number;
  @ApiProperty() statId: number;
}