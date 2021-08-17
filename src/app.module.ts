import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { BusinessModule } from './business/business.module';
import { HelpersModule } from './shared/helpers/helpers.module';
import { ResponseModule } from './shared/response/response.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'oracle',
      username: `${process.env.ORA_USERNAME}`,
      password: `${process.env.ORA_PASSWORD}`,
      connectString: `(DESCRIPTION=(ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = ${process.env.ORA_HOST})(PORT = ${process.env.ORA_PORT})))(CONNECT_DATA=(SID=${process.env.ORA_SID})))`,
      entities: ['dist/**/**/oracle/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
    }),
    TypeOrmModule.forRoot({
      name: 'mysql',
      type: 'mysql',
      host: `${process.env.MYSQL_HOST}`,
      port: parseInt(process.env.MYSQL_PORT),
      username: `${process.env.MYSQL_USERNAME}`,
      password: `${process.env.MYSQL_PASSWORD}`,
      database: `${process.env.MYSQL_DATABASE}`,
      entities: ['dist/**/**/mysql/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
    }),
    TypeOrmModule.forRoot({
      name: 'postgresql',
      type: 'postgres',
      host: `${process.env.PG_HOST}`,
      port: parseInt(process.env.PG_PORT),
      username: `${process.env.PG_USERNAME}`,
      password: `${process.env.PG_PASSWORD}`,
      database: `${process.env.PG_DATABASE}`,
      schema: `${process.env.PG_SCHEMA}`,
      entities: ['dist/**/**/postgres/*.entity{.ts,.js}'],
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
          ca: process.env.PG_SSL_CERT,
        },
      },
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
      keepConnectionAlive: true
    }),
    HelpersModule,
    ResponseModule,
    CommonModule,
    BusinessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
