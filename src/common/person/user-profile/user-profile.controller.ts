import { Body, Controller, Get, Logger, Post, Query, Req, Res } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { LookupRequestTypeDTO } from 'src/common/request/dto/oracle/lookup-request-type.dto';
import { ResponseDataController } from 'src/shared/response/response-data.controller';
import { UserProfileService } from './user-profile.service';

@ApiTags("Person: User Profile")
@Controller('userProfile')
export class UserProfileController {
  constructor(
    private readonly mainService: UserProfileService,
    private readonly resdata: ResponseDataController
  ) { }

  // Get Method
  @Get()
  @ApiQuery({ name: "dbtype" })
  async findData(@Res() res, @Req() req, @Query() query) {
    let dbtype = "ORACLE";
    if (typeof query.dbtype !== "undefined") {
      dbtype = query.dbtype.toUpperCase();
    }

    const resdata = await this.mainService[`find${dbtype}Data`](query, null);
    return this.resdata.responseFindSuccess(req, res, resdata.items, resdata.total);
  }
}
