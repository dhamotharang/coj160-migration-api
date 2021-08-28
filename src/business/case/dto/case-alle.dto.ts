import { Column } from "typeorm";

export class OracleCaseAlleDTO {
  @Column() allegationId: number;
  @Column() courtId: number;
  @Column() caseId: number;
}