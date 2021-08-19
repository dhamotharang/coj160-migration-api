import { ApiProperty } from "@nestjs/swagger";

export class OracleLookupDepartmentDTO {
  @ApiProperty() bankId: number;
  @ApiProperty() bookAccount: string;
  @ApiProperty() courtId: number;
  @ApiProperty() departmentName: string;
  @ApiProperty() tel: string;
}