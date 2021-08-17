import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OracleParams } from './entities/oracle/param.entity';
import { ParamController } from './param/param.controller';
import { ParamService } from './param/param.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([OracleParams])
  ],
  controllers: [ParamController],
  providers: [ParamService],
  exports: [ParamService],
})
export class SettingModule { }
