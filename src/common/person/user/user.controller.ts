import { Body, Controller, Get, Param, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiQuery, ApiOperation, ApiParam, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGaurd } from 'src/shared/guard/auth.guard';
import { ResponseDataController } from 'src/shared/response/response-data.controller';
import { PostgresUserDTO } from '../dto/user.dto';
import { UserService } from './user.service';

@ApiTags("Person: User (ผู้ใช้งาน)")
@Controller('user')
export class UserController {
  constructor(
    private readonly mainService: UserService,
    private readonly resdata: ResponseDataController,
  ) { }

  // Get Method
  @Get()
  @ApiQuery({ name: "dbtype", enum: ["postgres", "mysql", "oracle"] })
  @ApiOperation({ summary: "เรียกดูข้อมูลทั้งหมด" })
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  async findData(@Res() res, @Req() req, @Query() query) {
    let dbtype = "ORACLE";
    if (typeof query.dbtype !== "undefined") {
      dbtype = query.dbtype.toUpperCase();
    }

    const resdata = await this.mainService[`find${dbtype}Data`](query, null);
    return this.resdata.responseFindSuccess(req, res, resdata.items, resdata.total, "", { query });
  }

  @Get(':start/:limit/pages')
  @ApiParam({ name: "limit" })
  @ApiParam({ name: "start" })
  @ApiQuery({ name: "dbtype", enum: ["postgres", "mysql", "oracle"] })
  @ApiQuery({ name: "text", required: false })
  @ApiQuery({ name: "username", required: false })
  @ApiQuery({ name: "type", required: false })
  @ApiQuery({ name: "email", required: false })
  @ApiOperation({ summary: "เรียกดูข้อมูลแบบ Page" })
  async findPageData(@Res() res, @Req() req, @Query() query, @Param() param) {
    let dbtype = "POSTGRES";
    if (typeof query.dbtype !== "undefined") {
      dbtype = query.dbtype.toUpperCase();
    }

    const { start, limit } = param;

    const resdata = await this.mainService[`find${dbtype}Data`](query, { start, limit });
    return this.resdata.responseFindSuccess(req, res, resdata.items, resdata.total, "", { param, query });
  }

  @Get(':userId')
  @ApiQuery({ name: "dbtype", enum: ["postgres", "mysql", "oracle"] })
  @ApiParam({ name: "userId" })
  @ApiOperation({ summary: "ค้นหาด้วย id" })
  async findOneData(@Res() res, @Req() req, @Query() query, @Param() param) {
    let dbtype = "POSTGRES";
    if (typeof query.dbtype !== "undefined") {
      dbtype = query.dbtype.toUpperCase();
    }

    const resdata = await this.mainService[`find${dbtype}OneData`](null, param.userId);
    return this.resdata.responseFindSuccess(req, res, resdata.items, resdata.total, "", { query });
  }




  // POST Method
  @Post()
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  @ApiOperation({ summary: "เพิ่มข้อมูล" })
  async createData(@Res() res, @Req() req, @Body() body: PostgresUserDTO) {
    const resdata = await this.mainService.createData(999, body);
    return this.resdata.responseCreateSuccess(req, res, resdata, 100);
  }

  @Post('register')
  @ApiOperation({ summary: "สมัครสมาชิก" })
  async registerData(@Res() res, @Req() req, @Body() body: PostgresUserDTO) {
    const resdata = await this.mainService.createData(999, body);
    return this.resdata.responseCreateSuccess(req, res, resdata, 100);
  }




  // POST Method
  @Put(':id')
  @ApiParam({ name: "id" })
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  @ApiOperation({ summary: "แก้ไขข้อมูล" })
  async updateData(@Res() res, @Req() req, @Body() body: PostgresUserDTO, @Param() param) {
    const resdata = await this.mainService.updateData(param.id, 999, body);
    return this.resdata.responseUpdateSuccess(req, res, resdata, 100);
  }
}
