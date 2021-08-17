import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MigrationLogDTO } from '../dto/migration-log.dto';
import { PostgresMigrationLogs } from '../entities/postgres/migration-log.entity';

@Injectable()
export class MigrationLogService {
  constructor(
    @InjectRepository(PostgresMigrationLogs, "postgresql") private readonly migrationLogRepositories: Repository<PostgresMigrationLogs>
  ) { }

  async findPOSTGRESData(filters: any = null, pages: any = null) {
    try {
      const { text, serverType, date, dateStart, dateEnd, sourceDBType, sourceTableName, sourceId, destinationDBType, destinationTableName, destinationId, sort } = filters;
      const conditions = await this.migrationLogRepositories.createQueryBuilder("A")
        .where("A.id <> 0");

      if (typeof text !== "undefined") {
        await conditions.andWhere(`(A.code = '%${text}%' OR A.name = '%${text}%')`);
      }

      if (typeof serverType !== "undefined") {
        await conditions.andWhere("A.serverType = :serverType", { serverType });
      }

      if (typeof date !== "undefined") {
        await conditions.andWhere("TO_CHAR(A.datetime, 'YYYY-MM-DD') = :date", { date });
      }

      if (typeof dateStart !== "undefined" && typeof dateEnd !== "undefined") {
        await conditions.andWhere("TO_CHAR(A.datetime, 'YYYY-MM-DD') BETWEEN :dateStart AND :dateEnd ", { dateStart, dateEnd });
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

      const total = await conditions.getCount();

      if (pages) {
        await conditions
          .skip(pages.start)
          .take(pages.limit);
      }

      if (typeof sort !== "undefined") {
        const _sorts = `${sort}`.split('-');
        await conditions.orderBy(`A.${_sorts[0]}`, _sorts[1] === "DESC" ? "DESC" : "ASC");
      } else {
        await conditions.orderBy("A.id", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[find migration data fail] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findOnePOSTGRESData(migrationId: number) {
    try {
      const conditions = await this.migrationLogRepositories.createQueryBuilder("A")
        .where("A.id = :migrationId", { migrationId });
      const total = 1;
      const getItems = await conditions.getOne();
      const items = await getItems.toResponseObject();

      return { items, total };
    } catch (error) {
      throw new HttpException(`[find migration data fail] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async createPOSTGRESData(data: MigrationLogDTO) {
    try {
      const created = await this.migrationLogRepositories.create(data);
      await this.migrationLogRepositories.save(created);
      return created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[create migrate log] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
