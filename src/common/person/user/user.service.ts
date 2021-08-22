import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { PostgresUserDTO } from '../dto/user.dto';
import { PostgresUsers } from '../entities/postgres/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService extends HelperService {
  oracleLookupAppointListReposities: any;
  constructor(
    @InjectRepository(PostgresUsers, "postgresql")
    private readonly postgresUserRepositories: Repository<PostgresUsers>
  ) {
    super();
  }

  // Filter
  async filterPostgres(conditions, filters: any = null, moduleId: number = 0) {
    try {
      await conditions.where("A.isDelete = false");

      if (moduleId > 0) {
        await conditions.andWhere("A.id = :moduleId", { moduleId });
      }

      if (filters) {
        const { text, type, username, email } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.username LIKE '%${text}%' OR A.firstname LIKE '%${text}%' OR A.lastname LIKE '%${text}%' OR A.email LIKE '%${text}%')`);
        }

        if (typeof type !== "undefined") {
          await conditions.andWhere("A.type = :type", { type });
        }

        if (typeof username !== "undefined") {
          await conditions.andWhere("A.username = :username", { username });
        }

        if (typeof email !== "undefined") {
          await conditions.andWhere("A.email = :email", { email });
        }
      }

    } catch (error) {
      throw new HttpException(`[postgres: filter failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


  async findPOSTGRESData(filters: any = null, pages: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.postgresUserRepositories.createQueryBuilder("A");

      await this.filterPostgres(conditions, filters, moduleId);

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
      throw new HttpException(`[postgres: find user failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findPOSTGRESOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.postgresUserRepositories.createQueryBuilder("A");

      await this.filterPostgres(conditions, filters, moduleId);

      const getItems = await conditions.getOne();
      const items = await getItems.toResponseObject();

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[postgres: find user failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async verify(username: string): Promise<any> {
    try {
      return await this.postgresUserRepositories.findOne({
        where: {
          isActive: true,
          isDelete: false,
          username
        }
      });
    } catch (error) {
      throw new HttpException(`[User validate] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  async createData(payloadId: number, data: PostgresUserDTO) {
    try {
      const createAt = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const created = await this.postgresUserRepositories.create({ ...data, createBy: payloadId, modifyBy: payloadId, createAt, modifyAt: createAt });
      await this.postgresUserRepositories.save(created);
      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[postgres: create user failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }





  // PUT Method
  async updateData(id: number, payloadId: number, data: PostgresUserDTO) {
    try {
      const modifyAt = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      let updateData = { ...data, createBy: payloadId, modifyBy: payloadId, modifyAt };
      if (data.password !== "") {
        Object.assign(updateData, {
          password: await bcrypt.hash(`${data.password}`.trim(), 10)
        });
      }
      await this.postgresUserRepositories.update({ id }, updateData);
      const users = await this.postgresUserRepositories.findOne(id);
      return await users.toResponseObject();
    } catch (error) {
      throw new HttpException(`[postgres: create user failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
