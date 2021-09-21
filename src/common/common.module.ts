import { Module } from '@nestjs/common';
import { MigrateModule } from './migrate/migrate.module';
import { SettingModule } from './setting/setting.module';
import { PersonModule } from './person/person.module';
import { LookupModule } from './lookup/lookup.module';

@Module({
  imports: [
    MigrateModule,
    SettingModule,
    PersonModule,
    LookupModule
  ],
})
export class CommonModule { }
