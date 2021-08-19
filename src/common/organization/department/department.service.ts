import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleLookupDepartmentDTO } from '../dto/lookup-department.dto';
import { MySQLDepartments } from '../entities/mysql/department.entity';
import { OracleLookupDepartments } from '../entities/oracle/lookup-department.entity';

@Injectable()
export class DepartmentService extends HelperService {
  constructor(
    @InjectRepository(OracleLookupDepartments)
    private readonly oracleLookupDepartmentRepositories: Repository<OracleLookupDepartments>,
    @InjectRepository(MySQLDepartments, "mysql")
    private readonly mysqlDepartmentRepositories: Repository<MySQLDepartments>
  ) {
    super();
  }

  async findORACLEData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const conditions = await this.oracleLookupDepartmentRepositories.createQueryBuilder("A")
        .where("A.depCode <> 0");

      if (filters) {
        const { text, departmentId, departmentName, orderNo, activeFlag, address, bankId } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.departmentName LIKE '%${text}%' OR A.address LIKE '%${text}%')`)
        }

        if (typeof departmentId !== "undefined") {
          await conditions.andWhere("A.departmentId = :departmentId", { departmentId });
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof activeFlag !== "undefined") {
          await conditions.andWhere("A.activeFlag = :activeFlag", { activeFlag });
        }

        if (typeof departmentName !== "undefined") {
          await conditions.andWhere("A.departmentName = :departmentName", { departmentName });
        }

        if (typeof bankId !== "undefined") {
          await conditions.andWhere("A.bankId = :bankId", { bankId });
        }
      }

      const total = await conditions.getCount();

      if (pages) {
        await conditions
          .skip(pages.start)
          .take(pages.limit);
      }

      if (filters) {
        if (typeof filters.sort !== "undefined") {
          const _sorts = `${filters.sort}`.split('-');
          await conditions.orderBy(`A.${_sorts[0]}`, _sorts[1] === "DESC" ? "DESC" : "ASC");
        }
      } else {
        await conditions.orderBy("A.depCode", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[find mysql data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(departmentId: number = null, filters: any = null) {
    try {
      const conditions = await this.oracleLookupDepartmentRepositories.createQueryBuilder("A")
        .where("A.offId <> 0");

      if (departmentId) {
        await conditions.andWhere("A.departmentId = :departmentId", { departmentId });
      }

      if (filters) {
        const { text, departmentName, orderNo, activeFlag, address, bankId } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.departmentName LIKE '%${text}%' OR A.address LIKE '%${text}%')`)
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof activeFlag !== "undefined") {
          await conditions.andWhere("A.activeFlag = :activeFlag", { activeFlag });
        }

        if (typeof departmentName !== "undefined") {
          await conditions.andWhere("A.departmentName = :departmentName", { departmentName });
        }

        if (typeof bankId !== "undefined") {
          await conditions.andWhere("A.bankId = :bankId", { bankId });
        }
      }

      const getItems = await conditions.getOne();
      const items = await getItems.toResponseObject();

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[find mysql one data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const conditions = await this.mysqlDepartmentRepositories.createQueryBuilder("A")
        .where("A.depCode <> 0");

      if (filters) {
        const { text, depCode, courtRunning, depName, viewAdmin, layOut } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.depName LIKE '%${text}%'`)
        }

        if (typeof depCode !== "undefined") {
          await conditions.andWhere("A.depCode = :depCode", { depCode });
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof depName !== "undefined") {
          await conditions.andWhere("A.depName = :depName", { depName });
        }

        if (typeof viewAdmin !== "undefined") {
          await conditions.andWhere("A.viewAdmin = :viewAdmin", { viewAdmin });
        }

        if (typeof layOut !== "undefined") {
          await conditions.andWhere("A.layOut = :layOut", { layOut });
        }
      }

      const total = await conditions.getCount();

      if (pages) {
        await conditions
          .skip(pages.start)
          .take(pages.limit);
      }

      if (filters) {
        if (typeof filters.sort !== "undefined") {
          const _sorts = `${filters.sort}`.split('-');
          await conditions.orderBy(`A.${_sorts[0]}`, _sorts[1] === "DESC" ? "DESC" : "ASC");
        }
      } else {
        await conditions.orderBy("A.depCode", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[find mysql data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLOneData(depCode: number = null, filters: any = null) {
    try {
      const conditions = await this.mysqlDepartmentRepositories.createQueryBuilder("A")
        .where("A.offId <> 0");

      if (depCode) {
        await conditions.andWhere("A.depCode = :depCode", { depCode });
      }

      if (filters) {
        const { text, courtRunning, depName, viewAdmin, layOut } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.depName LIKE '%${text}%'`)
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof depName !== "undefined") {
          await conditions.andWhere("A.depName = :depName", { depName });
        }

        if (typeof viewAdmin !== "undefined") {
          await conditions.andWhere("A.viewAdmin = :viewAdmin", { viewAdmin });
        }

        if (typeof layOut !== "undefined") {
          await conditions.andWhere("A.layOut = :layOut", { layOut });
        }
      }

      const getItems = await conditions.getOne();
      const items = await getItems.toResponseObject();

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[find mysql one data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  // POST Method
  async createData(payloadId: number, data: OracleLookupDepartmentDTO) {
    try {
      const createdDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const created = await this.oracleLookupDepartmentRepositories.create({ ...data, activeFlag: 1, createdBy: payloadId, updatedBy: payloadId, removedBy: 0, createdDate, updatedDate: createdDate });
      await this.oracleLookupDepartmentRepositories.save(created);
      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[create data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
