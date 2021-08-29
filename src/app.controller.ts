import { Controller, Request, Post, UseGuards, Body, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { PostgresUserAuthDTO } from './common/person/dto/user.dto';
import { ResponseDataController } from './shared/response/response-data.controller';

@ApiTags("Authentication & Access")
@Controller()
export class AppController {
  constructor(
    private resdata: ResponseDataController
  ) { }

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: "เข้าสู่ระบบ" })
  @Post('auth/login')
  async login(@Request() req, @Body() body: PostgresUserAuthDTO, @Res() res) {
    return this.resdata.responseAuthSuccess(req, res, req.user);
  }
}
