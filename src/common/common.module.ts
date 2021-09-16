import { Module } from '@nestjs/common';
import { MigrateModule } from './migrate/migrate.module';
import { SettingModule } from './setting/setting.module';
import { PersonModule } from './person/person.module';
import { LookupModule } from './lookup/lookup.module';
import { LookupNoticeSendTypeResultService } from './notice/lookup-notice-send-type-result/lookup-notice-send-type-result.service';
import { LookupNoticeSendTypeResultController } from './notice/lookup-notice-send-type-result/lookup-notice-send-type-result.controller';

@Module({
  imports: [
    MigrateModule,
    SettingModule,
    PersonModule,
    LookupModule
  ],
  controllers: [LookupNoticeSendTypeResultController],
  providers: [LookupNoticeSendTypeResultService]
})
export class CommonModule { }
