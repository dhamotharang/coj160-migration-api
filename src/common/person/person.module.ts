import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLOfficers } from './entities/mysql/officer.entity';
import { OfficerController } from './officer/officer.controller';
import { OfficerService } from './officer/officer.service';
import { UserProfileService } from './user-profile/user-profile.service';
import { UserProfileController } from './user-profile/user-profile.controller';
import { OracleUserProfiles } from './entities/oracle/user-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OracleUserProfiles
    ]),
    TypeOrmModule.forFeature([
      MySQLOfficers
    ], "mysql"),
  ],
  controllers: [OfficerController, UserProfileController],
  providers: [OfficerService, UserProfileService],
  exports: [OfficerService, UserProfileService]
})
export class PersonModule { }
