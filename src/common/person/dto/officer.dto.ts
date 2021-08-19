import { ApiProperty } from "@nestjs/swagger";

export class OfficerDTO {
  @ApiProperty() offId: string;
  @ApiProperty() offName: string;
  @ApiProperty() depCode: string;
  @ApiProperty() postId: number;
  @ApiProperty() postLevelId: number;
  @ApiProperty() atCourtRunning: number;
  @ApiProperty() printFlag: number;
  @ApiProperty() headFlag: number;
  @ApiProperty() noEditFlag: number;
  @ApiProperty() fingerScanDate: number;
  @ApiProperty() fingerData: string;
  @ApiProperty() createDepCode: number;
  @ApiProperty() updateDepCode: number;
}