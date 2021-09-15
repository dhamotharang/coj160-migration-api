import { Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiParam, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGaurd } from 'src/shared/guard/auth.guard';
import { ResponseDataController } from 'src/shared/response/response-data.controller';
import { OracleLookupDepartmentDTO } from '../dto/lookup-department.dto';
import { LookupDepartmentService } from './lookup-department.service';

@ApiTags("Lookup: Department")
@Controller('lookup/department')
export class LookupDepartmentController {
  constructor(
    private readonly mainService: LookupDepartmentService,
    private readonly resdata: ResponseDataController
  ) { }

  // Get Method
  @Get()
  @ApiQuery({ name: "dbtype", enum: ["oracle", "mysql"] })
  async findData(@Res() res, @Req() req, @Query() query) {
    let dbtype = "ORACLE";
    if (typeof query.dbtype !== "undefined") {
      dbtype = query.dbtype.toUpperCase();
    }

    const resdata = await this.mainService[`find${dbtype}Data`](query, null);
    return this.resdata.responseFindSuccess(req, res, resdata.items, resdata.total);
  }

  @Get(':start/:limit/pages')
  @ApiParam({ name: "start" })
  @ApiParam({ name: "limit" })
  @ApiOperation({ summary: "เรียกดูข้อมูลทั้งหมด แบบ Page" })
  @ApiQuery({ name: "dbtype", enum: ["oracle", "mysql"] })
  async findPageData(@Res() res, @Req() req, @Query() query, @Param() param) {
    let dbtype = "ORACLE";
    if (typeof query.dbtype !== "undefined") {
      dbtype = query.dbtype.toUpperCase();
    }
    const { start, limit } = param;
    const resdata = await this.mainService[`find${dbtype}Data`](query, { start, limit });
    return this.resdata.responseFindSuccess(req, res, resdata.items, resdata.total);
  }


  @Get(':departmentId')
  @ApiParam({ name: "start" })
  @ApiParam({ name: "limit" })
  @ApiOperation({ summary: "เรียกดูข้อมูล แบบ ID" })
  async findOneData(@Res() res, @Req() req, @Query() query, @Param("departmentId") departmentId) {
    const resdata = await this.mainService.findORACLEOneData(null, departmentId);
    return this.resdata.responseFindOneSuccess(req, res, resdata.items, resdata.total);
  }


  // POST Method
  @Post()
  @ApiOperation({ summary: "เพิ่มข้อมูล" })
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  async createData(@Res() res, @Req() req, @Body() body: OracleLookupDepartmentDTO) {
    const resdata = await this.mainService.createData(999, body);
    return this.resdata.responseCreateSuccess(req, res, resdata, 100);
  }

  @Post('migration')
  @ApiOperation({ summary: "นำเข้าข้อมูล" })
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  async createMigration(@Res() res, @Req() req, @Body() body) {
    const resdata = await this.mainService.createMigrationData(999, body);
    return this.resdata.responseCreateSuccess(req, res, resdata, 100);
  }
}
