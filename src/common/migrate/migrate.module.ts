import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresMigrationLogs } from './entities/postgres/migration-log.entity';
import { MigrationLogController } from './migration-log/migration-log.controller';
import { MigrationLogService } from './migration-log/migration-log.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([PostgresMigrationLogs], "postgresql")
  ],
  controllers: [MigrationLogController],
  providers: [MigrationLogService],
  exports: [MigrationLogService]
})
export class MigrateModule { }
