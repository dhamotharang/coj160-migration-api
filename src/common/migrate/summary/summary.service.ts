import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { PostgreSQLMigrationSummaryDTO } from '../dto/migration-summry.dto';
import { PostgreSQLMigrationSummaries } from '../entities/postgres/migration-summry.entity';
import { MigrationLogService } from '../migration-log/migration-log.service';

@Injectable()
export class SummaryService extends HelperService {
  constructor(
    @InjectRepository(PostgreSQLMigrationSummaries, "postgresql")
    private postgreSQLMigrationSummaryService: Repository<PostgreSQLMigrationSummaries>,
  ) {
    super();
  }

  // Filter
  async filter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId !== 0) {
        await conditions.where("A.id = :moduleId", { moduleId });
      } else {
        await conditions.where("A.id <> 0");
      }

      if (filters) {
        const { text, module, errorTotal, duplicateTotal } = filters;

        if (typeof text !== "undefined" && text !== "") {
          await conditions.andWhere(`A.module LIKE '%${text}%'`)
        }

        if (typeof module !== "undefined") {
          await conditions.andWhere("A.module = :module", { module });
        }

        if (typeof errorTotal !== "undefined") {
          await conditions.andWhere("A.errorTotal BETWEEN 0 AND :errorTotal", { errorTotal });
        }

        if (typeof duplicateTotal !== "undefined") {
          await conditions.andWhere("A.duplicateTotal BETWEEN 0 AND :duplicateTotal", { duplicateTotal });
        }
      }

      return await conditions;
    } catch (error) {
      throw new HttpException(`[postgres: filter failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


  // GET Method
  async findData(filters: any = null, pages: any = null) {
    try {
      const conditions = await this.postgreSQLMigrationSummaryService.createQueryBuilder("A");

      await this.filter(conditions, filters);

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
        await conditions
          .orderBy("A.id", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[postgres: find summary migration failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.postgreSQLMigrationSummaryService.createQueryBuilder("A");

      await this.filter(conditions, filters, moduleId);

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[postgres: find one summary migration failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


  // POST Method
  async createData(payloadId: number, data: PostgreSQLMigrationSummaryDTO) {
    try {
      const createAt = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const created = await this.postgreSQLMigrationSummaryService.create({ ...data, createBy: payloadId, createAt, modifyAt: createAt });
      await this.postgreSQLMigrationSummaryService.save(created);
      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[postgres: create summary migration failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
