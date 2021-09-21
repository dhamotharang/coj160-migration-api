import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getManager, Repository } from 'typeorm';
import { MigrationLogDTO } from '../dto/migration-log.dto';
import { PostgresMigrationLogs } from '../entities/postgres/migration-log.entity';

@Injectable()
export class MigrationLogService {
  constructor(
    @InjectRepository(PostgresMigrationLogs, "postgresql")
    private migrationLogRepositories: Repository<PostgresMigrationLogs>
  ) { }

  private allTable = [
    { sourceTable: "prequest_type", destinationTable: "PC_LOOKUP_REQUEST_TYPE", title: "ระบบคำคู่ความ: ประเภทคำร้อง" },
    { sourceTable: "prequest_subject", destinationTable: "PC_LOOKUP_REQUEST_SUBJECT", title: "ระบบคำคู่ความ: เรื่องประเภทคำร้อง" },
    { sourceTable: "prequest", destinationTable: "PC_LITIGANT", title: "ระบบคำคู่ความ" },
    { sourceTable: "pappoint_delay", destinationTable: "PC_PROCEED_HOLD_REASON", title: "ระบบพิจารณาคดี: ค้างพิจารณาคดี" },
    { sourceTable: "pappoint_list | pappoint_list1 | pappoint_sub_list", destinationTable: "PC_LOOKUP_APPOINT_LIST", title: "ระบบพิจารณาคดี: รายการนัด" },
    { sourceTable: "pappoint_table", destinationTable: "PC_LOOKUP_APPOINT_TABLE", title: "ระบบพิจารณาคดี: ประเภทรางนัด" },
    { sourceTable: "pappointment", destinationTable: "PC_PROCEED_APPOINT", title: "ระบบพิจารณาคดี: นัดความ" },
    { sourceTable: "pappointment", destinationTable: "PC_PROCEED_APPOINT_CONTINUE", title: "ระบบพิจารณาคดี: ข้อมูลแจ้งเตือนพยาน" },
    { sourceTable: "pappointment", destinationTable: "PC_PROCEED_APPOINT_CASE_JUDGE", title: "ระบบพิจารณาคดี: ข้อมูลองค์คณะของการนัดความ" },
    { sourceTable: "pappointment", destinationTable: "PC_PROCEED_APPOINT_RESULT", title: "ระบบพิจารณาคดี: ข้อมูลผลลัพธ์นัดความ" },
    { sourceTable: "pnotice_type", destinationTable: "PC_LOOKUP_NOTICE_TYPE", title: "ระบบหมาย/ประกาศ: ประเภทหมาย/ประกาศ" },
    { sourceTable: "pnotice_send_result", destinationTable: "PC_LOOKUP_NOTICE_SEND_RESULT", title: "ระบบหมาย/ประกาศ: ประเภทผลการส่งหมาย" },
    { sourceTable: "pnotice_send_type", destinationTable: "PC_LOOKUP_SEND_METHOD", title: "ระบบหมาย/ประกาศ: วิธีการส่งหมาย" },
    { sourceTable: "pnotice", destinationTable: "PC_NOTICE", title: "ระบบหมาย/ประกาศ" },
    { sourceTable: "pnotice", destinationTable: "PC_NOTICE_PROVINCIAL", title: "ระบบหมาย/ประกาศ: หมายนอกเขต" },
    { sourceTable: "pnotice_send", destinationTable: "PC_NOTICE_ISSUED", title: "ระบบหมาย/ประกาศ: ข้อมูลการจ่ายหมาย" },
    { sourceTable: "pnotice_send", destinationTable: "PC_NOTICE_SEND_RESULT", title: "ระบบหมาย/ประกาศ: ข้อมูลการจ่ายหมาย" },
    { sourceTable: "preceipt_type", destinationTable: "PC_LOOKUP_RECEIPT_TYPE", title: "ระบบการเงิน: ประเภทใบเสร็จ" },
    { sourceTable: "preceipt_sub_type", destinationTable: "PC_LOOKUP_RECEIPT_SUB_TYPE", title: "ระบบการเงิน: ประเภทย่อยใบเสร็จ" },
    { sourceTable: "preceipt", destinationTable: "PC_FIN_RECEIPT", title: "ระบบการเงิน: ใบเสร็จ" },
    { sourceTable: "preceipt_detail", destinationTable: "PC_FIN_RECEIPT_DETAIL", title: "ระบบการเงิน: รายละเอียดใบเสร็จ" },
    { sourceTable: "preceipt", destinationTable: "PC_FIN_RECEIPT_CHEQUE", title: "ระบบการเงิน: ข้อมูล  CHEQUE" },
    { sourceTable: "preceipt", destinationTable: "PC_FIN_RECEIPT_CREDIT", title: "ระบบการเงิน: ข้อมูล  CREDIT" },
    { sourceTable: "preceipt", destinationTable: "PC_FIN_RECEIPT_CANCEL", title: "ระบบการเงิน: ข้อมูลการยกเลิกใบเสร็จ" },
    { sourceTable: "preturn_receipt", destinationTable: "PC_FIN_PAYMENT", title: "ระบบการเงิน: ข้อมูลการชำระเงิน" },
    { sourceTable: "preturn_receipt", destinationTable: "PC_FIN_PAYMENT_DETAIL", title: "ระบบการเงิน: ข้อมูลร่ยละเอียดการชำระเงิน" },
    { sourceTable: "preturn_receipt", destinationTable: "PC_FIN_RECEIPT_BALANCE_HISTORY", title: "ระบบการเงิน: ประวัติการชำระและยอดเงินคงเหลือ" },
  ];

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

  async summaryLogData() {
    try {
      const items = await Promise.all(await this.allTable.map(async element => {
        return await this.summaryConditionLogData(element);
      }));

      return { items, total: this.allTable.length };
    } catch (error) {
      throw new HttpException(`[postgres: summary migration log failed] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async summaryConditionLogData(data: any) {
    try {
      const filterCountLogs = await {
        serverType: `${process.env.SERVER_TYPE}`,
        destinationDBType: "ORACLE",
        destinationTableName: data.destinationTable,
      };

      let myQueryString = "";
      if (data.destinationTable === "PC_LOOKUP_APPOINT_LIST") {
        myQueryString = await `
        SELECT
          COUNT(*) sourceCNT
        FROM (
          SELECT
            A.app_id appId,
            A.app_name appName,
            'pappoint_list' appTable
          FROM pappoint_list A

          UNION

          SELECT
            B.app_id appId,
            B.app_name appName,
            'pappoint_list1' appTable
          FROM pappoint_list1 B

          UNION

          SELECT
            C.app_sub_id appId,
            C.app_sub_name appName,
            'pappoint_sub_list' appTable
          FROM pappoint_sub_list C
        ) AppointList
        `;
      } else {
        myQueryString = await `SELECT COUNT(*) sourceCNT FROM ${data.sourceTable}`;
      }
      const orQueryString = await `SELECT COUNT(*) DESTCNT FROM "${process.env.ORA_USERNAME}"."${data.destinationTable}" "A"`;

      const sourceTotal = await (await getManager("mysql").query(myQueryString))[0].sourceCNT;

      const errorTotal = await this.countData({ ...filterCountLogs, status: "ERROR" });
      const duplicateTotal = await this.countData({ ...filterCountLogs, status: "DUPLICATE" });
      const unknowTotal = await this.countData({ ...filterCountLogs, status: "UNKNOW" });

      const destinationOldTotal = await (await getManager().query(`${orQueryString} WHERE "A"."CREATED_BY" <> 999`))[0].DESTCNT;
      const destinationNewTotal = await (await getManager().query(`${orQueryString} WHERE "A"."CREATED_BY" = 999`))[0].DESTCNT;
      const destinationTotal = await (await getManager().query(`${orQueryString}`))[0].DESTCNT;

      return await { ...data, sourceTotal, destinationOldTotal, destinationNewTotal, destinationTotal, duplicateTotal, errorTotal, unknowTotal };
    } catch (error) {
      throw new HttpException(`[postgres: summary condition migration log failed] => ${error.message}`, HttpStatus.BAD_REQUEST);
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
