import { Controller, Get, Param, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGaurd } from 'src/shared/guard/auth.guard';
import { ResponseDataController } from 'src/shared/response/response-data.controller';
import { MigrationLogService } from './migration-log.service';

@ApiTags("Migration Logs")
@Controller('migrationLog')
export class MigrationLogController {
  constructor(
    private readonly mainService: MigrationLogService,
    private readonly resdata: ResponseDataController
  ) { }

  // GET Method
  @Get()
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  @ApiOperation({ summary: "เรียกดูข้อมูลทั้งหมด" })
  async findData(@Res() res, @Req() req, @Query() query) {
    const resdata = await this.mainService.findPOSTGRESData(query);
    return this.resdata.responseFindSuccess(req, res, resdata.items, resdata.total);
  }

  @ApiQuery({ name: "text", required: false })
  @ApiQuery({ name: "serverType", required: false })
  @ApiQuery({ name: "status", required: false })
  @ApiQuery({ name: "sourceDBType", required: false })
  @ApiQuery({ name: "sourceTableName", required: false })
  @ApiQuery({ name: "sourceId", required: false })
  @ApiQuery({ name: "destinationTableName", required: false })
  @ApiParam({ name: "start" })
  @ApiParam({ name: "limit" })
  @ApiOperation({ summary: "นำเข้าข้อมูล" })
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  @Get(':start/:limit/pages')
  async findPageData(@Res() res, @Req() req, @Query() query, @Param() param) {
    const { start, limit } = param;
    const resdata = await this.mainService.findPOSTGRESData(query, { start, limit });
    return this.resdata.responseFindSuccess(req, res, resdata.items, resdata.total);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  @ApiParam({ name: "id" })
  @ApiOperation({ summary: "เรียกดูข้อมูล Table ทั้งหมด" })
  async findById(@Res() res, @Req() req, @Param('id') id) {
    const resdata = await this.mainService.findPOSTGRESOneData(id);
    return this.resdata.responseFindSuccess(req, res, resdata.items, resdata.total);
  }


  @Get(':type/tableName')
  @ApiBearerAuth()
  @UseGuards(new AuthGaurd())
  @ApiParam({ name: "type" })
  @ApiOperation({ summary: "เรียกดูข้อมูล Table ทั้งหมด" })
  async findTable(@Res() res, @Req() req, @Param('type') type) {
    const resdata = await this.mainService.findTable(type);
    return this.resdata.responseFindSuccess(req, res, resdata.items, resdata.total);
  }

}
