export class PostgreSQLMigrationSummaryDTO {
  module: string;
  moduleName: string;
  sourceTotal: number;
  destinationOldTotal: number;
  destinationNewTotal: number;
  destinationTotal: number;
  errorTotal: number;
  duplicateTotal: number;
}