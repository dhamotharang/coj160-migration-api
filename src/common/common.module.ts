import { Module } from '@nestjs/common';
import { RequestModule } from './request/request.module';
import { MigrateModule } from './migrate/migrate.module';
import { SettingModule } from './setting/setting.module';
import { OrganizationModule } from './organization/organization.module';
import { PersonModule } from './person/person.module';
import { LookupModule } from './lookup/lookup.module';

@Module({
  imports: [
    MigrateModule,
    RequestModule,
    SettingModule,
    OrganizationModule,
    PersonModule,
    LookupModule
  ],
  controllers: []
})
export class CommonModule { }
