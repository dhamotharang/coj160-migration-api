import { Module } from '@nestjs/common';
import { RequestModule } from './request/request.module';
import { MigrateModule } from './migrate/migrate.module';
import { SettingModule } from './setting/setting.module';
import { OrganizationModule } from './organization/organization.module';
import { JudgeModule } from './judge/judge.module';
import { PersonModule } from './person/person.module';
import { AppointModule } from './appoint/appoint.module';

@Module({
  imports: [RequestModule, MigrateModule, SettingModule, OrganizationModule, JudgeModule, PersonModule, AppointModule],
  controllers: []
})
export class CommonModule { }
