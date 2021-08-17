import { ApiProperty } from "@nestjs/swagger";

export class LookupRequestTypeDTO {
  @ApiProperty({ required: false }) activeFlag: number;
  @ApiProperty() courtId: number;
  @ApiProperty() requestTypeName: string;
  @ApiProperty() selectCode: string;
}