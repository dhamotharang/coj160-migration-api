import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MigrationLogDTO } from '../dto/migration-log.dto';
import { PostgresMigrationLogs } from '../entities/postgres/migration-log.entity';

@Injectable()
export class MigrationLogService {
  constructor(
    @InjectRepository(PostgresMigrationLogs, "postgresql")
    private migrationLogRepositories: Repository<PostgresMigrationLogs>
  ) { }

  // Filter zone
  async postgresFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.where("A.id = :moduleId", { moduleId });
      } else {
        await conditions.where("A.id <> 0");
      }

      if (filters) {
        const { text, code, serverType, status, date, sourceDBType, sourceTableName, sourceId, destinationDBType, destinationTableName, destinationId } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`(
            A.code LIKE '%${text}%' OR 
            A.name LIKE '%${text}%' OR 
            A.sourceTableName LIKE '%${text}%' OR
            A.sourceData LIKE '%${text}%' OR
            A.destinationTableName LIKE '%${text}%' OR
            A.destinationData LIKE '%${text}%'
          )`)
        }

        if (typeof code !== "undefined") {
          await conditions.andWhere("A.code = :code", { code });
        }

        if (typeof serverType !== "undefined") {
          await conditions.andWhere("A.serverType = :serverType", { serverType });
        }

        if (typeof status !== "undefined") {
          await conditions.andWhere("A.status = :status", { status });
        }

        if (typeof date !== "undefined") {
          await conditions.andWhere("TO_CHAR(A.datetime, 'YYYY-MM-DD') = :date", { date });
        }

        if (typeof sourceDBType !== "undefined") {
          await conditions.andWhere("A.sourceDBType = :sourceDBType", { sourceDBType });
        }

        if (typeof sourceTableName !== "undefined") {
          await conditions.andWhere("A.sourceTableName = :sourceTableName", { sourceTableName });
        }

        if (typeof sourceId !== "undefined") {
          await conditions.andWhere("A.sourceId = :sourceId", { sourceId });
        }

        if (typeof destinationDBType !== "undefined") {
          await conditions.andWhere("A.destinationDBType = :destinationDBType", { destinationDBType });
        }

        if (typeof destinationTableName !== "undefined") {
          await conditions.andWhere("A.destinationTableName = :destinationTableName", { destinationTableName });
        }

        if (typeof destinationId !== "undefined") {
          await conditions.andWhere("A.destinationId = :destinationId", { destinationId });
        }
      }

      return await conditions;
    } catch (error) {
      throw new HttpException(`[postgres: filter failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  async findPOSTGRESData(filters: any = null, pages: any = null) {
    try {
      const conditions = await this.migrationLogRepositories.createQueryBuilder("A");

      await this.postgresFilter(conditions, filters);

      const total = await conditions.getCount();

      if (pages) {
        await conditions
          .skip(pages.start)
          .take(pages.limit);
      }

      if (typeof filters.sort !== "undefined") {
        const _sorts = `${filters.sort}`.split('-');
        await conditions.orderBy(`A.${_sorts[0]}`, _sorts[1] === "DESC" ? "DESC" : "ASC");
      } else {
        await conditions.orderBy("A.id", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[postgres: find migration log fail] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findPOSTGRESOneData(migrationId: number) {
    try {
      const conditions = await this.migrationLogRepositories.createQueryBuilder("A")
        .where("A.id = :migrationId", { migrationId });
      const total = 1;
      const getItems = await conditions.getOne();
      const items = await getItems.toResponseObject();

      return { items, total };
    } catch (error) {
      throw new HttpException(`[postgres: find one migration log failed] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async countData(filters: any = null, migrationId: number = 0) {
    try {
      const conditions = await this.migrationLogRepositories.createQueryBuilder("A");
      await this.postgresFilter(conditions, filters, migrationId);
      return await conditions.getCount();
    } catch (error) {
      throw new HttpException(`[postgres: count migration log failed] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


  async findTable(type: string = "source") {
    try {
      const items = await this.migrationLogRepositories
        .query(`
        SELECT
          "A"."${type}_table_name" "tableName"
        FROM
          "${process.env.PG_SCHEMA}"."migration_logs" "A"
        GROUP BY "A"."${type}_table_name"
        ORDER BY "A"."${type}_table_name" ASC
        `);

      const total = items.length;

      return { items, total };
    } catch (error) {
      throw new HttpException(`[postgres: find table name fail] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async createPOSTGRESData(data: MigrationLogDTO) {
    try {
      const created = await this.migrationLogRepositories.create(data);
      await this.migrationLogRepositories.save(created);
      return created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[postgres: create migrate log] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
