import { ApiProperty } from "@nestjs/swagger";

export class OracleProceedAppointDTO {
  @ApiProperty() caseId: number;
  @ApiProperty() reasonAppointId: number;
  @ApiProperty() appointTableId: number;
  @ApiProperty() isElectronicFiling: number;
}