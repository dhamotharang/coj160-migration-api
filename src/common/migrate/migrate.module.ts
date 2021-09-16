import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresMigrationLogs } from './entities/postgres/migration-log.entity';
import { PostgreSQLMigrationSummaries } from './entities/postgres/migration-summry.entity';
import { MigrationLogController } from './migration-log/migration-log.controller';
import { MigrationLogService } from './migration-log/migration-log.service';
import { SummaryController } from './summary/summary.controller';
import { SummaryService } from './summary/summary.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostgresMigrationLogs,
      PostgreSQLMigrationSummaries
    ], "postgresql")
  ],
  controllers: [MigrationLogController, SummaryController],
  providers: [MigrationLogService, SummaryService],
  exports: [MigrationLogService]
})
export class MigrateModule { }
