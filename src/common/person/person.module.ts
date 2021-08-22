import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MySQLOfficers } from './entities/mysql/officer.entity';
import { OfficerController } from './officer/officer.controller';
import { OfficerService } from './officer/officer.service';
import { UserProfileService } from './user-profile/user-profile.service';
import { UserProfileController } from './user-profile/user-profile.controller';
import { OracleUserProfiles } from './entities/oracle/user-profile.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PostgresUsers } from './entities/postgres/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OracleUserProfiles
    ]),
    TypeOrmModule.forFeature([
      MySQLOfficers
    ], "mysql"),
    TypeOrmModule.forFeature([
      PostgresUsers
    ], "postgresql"),
  ],
  controllers: [OfficerController, UserProfileController, UserController],
  providers: [OfficerService, UserProfileService, UserService],
  exports: [OfficerService, UserProfileService, UserService]
})
export class PersonModule { }
