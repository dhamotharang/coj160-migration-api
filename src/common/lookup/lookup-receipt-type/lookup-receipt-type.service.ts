import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MigrationLogService } from 'src/common/migrate/migration-log/migration-log.service';
import { ParamService } from 'src/common/setting/param/param.service';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleLookupReceiptTypeDTO } from '../dto/lookup-receipt-type.dto';
import { MySQLReceiptTypes } from '../entities/mysql/receipt-type.entity';
import { OracleLookupReceiptTypes } from '../entities/oracle/lookup-receipt-type.entity';

@Injectable()
export class LookupReceiptTypeService extends HelperService {
  constructor(
    @InjectRepository(OracleLookupReceiptTypes)
    private readonly oracleLookupReceiptTypeRepositories: Repository<OracleLookupReceiptTypes>,
    @InjectRepository(MySQLReceiptTypes, "mysql")
    private readonly mysqlReceiptTypeRepositories: Repository<MySQLReceiptTypes>,
    private readonly migrateLogService: MigrationLogService,
    private readonly paramService: ParamService
  ) {
    super();
  }

  // Filter
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId !== 0) {
        await conditions.where("A.receiptTypeId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.removedBy = 0");
      }

      if (filters) {
        const { text, orderNo, activeFlag, costFlag, courtId, receiptTypeCode, receiptTypeName } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.receiptTypeCode LIKE '%${text}%' OR A.receiptTypeName LIKE '%${text}%')`)
        }

        if (typeof activeFlag !== "undefined") {
          await conditions.andWhere("A.activeFlag = :activeFlag", { activeFlag });
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof courtId !== "undefined") {
          await conditions.andWhere("A.courtId = :courtId", { courtId });
        }

        if (typeof costFlag !== "undefined") {
          await conditions.andWhere("A.costFlag = :costFlag", { costFlag });
        }

        if (typeof receiptTypeCode !== "undefined") {
          await conditions.andWhere("A.receiptTypeCode = :receiptTypeCode", { receiptTypeCode });
        }

        if (typeof receiptTypeName !== "undefined") {
          await conditions.andWhere("A.receiptTypeName = :receiptTypeName", { receiptTypeName });
        }
      }

      return await conditions;
    } catch (error) {
      throw new HttpException(`[oracle: filter failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


  async mysqlFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId !== 0) {
        await conditions.where("A.receiptTypeId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.receiptTypeId <> 0");
      }

      if (filters) {
        const { text, courtRunning, receiptTypeDesc, costFlag } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.receiptTypeDesc LIKE '%${text}%' OR A.receiptTypeName LIKE '%${text}%')`)
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof receiptTypeDesc !== "undefined") {
          await conditions.andWhere("A.receiptTypeDesc = :receiptTypeDesc", { receiptTypeDesc });
        }

        if (typeof costFlag !== "undefined") {
          await conditions.andWhere("A.costFlag = :costFlag", { costFlag });
        }
      }

      return await conditions;
    } catch (error) {
      throw new HttpException(`[mysql: filter failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }




  // GET Method
  async findORACLEData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const conditions = await this.oracleLookupReceiptTypeRepositories.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters);

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
          .orderBy("A.receiptTypeId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find lookup receipt type failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.oracleLookupReceiptTypeRepositories.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters, moduleId);

      const getItems = await conditions.getOne();
      const items = await getItems ? getItems.toResponseObject() : null;

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[oracle: find one lookup receipt type failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const conditions = await this.mysqlReceiptTypeRepositories.createQueryBuilder("A");

      await this.mysqlFilter(conditions, filters);

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
        await conditions.orderBy("A.receiptTypeId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[mysql: find lookup receipt type failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.mysqlReceiptTypeRepositories.createQueryBuilder("A");

      await this.mysqlFilter(conditions, filters, moduleId);

      const getItems = await conditions.getOne();
      const items = await getItems.toResponseObject();

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[mysql: find one lookup receipt type failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  async createData(payloadId: number, data: OracleLookupReceiptTypeDTO) {
    try {
      const createdDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const created = await this.oracleLookupReceiptTypeRepositories.create({
        ...data,
        activeFlag: 1,
        createdBy: payloadId,
        removedBy: 0,
        createdDate,
        updatedDate: createdDate,
        removedDate: createdDate
      });
      await this.oracleLookupReceiptTypeRepositories.save(created);
      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: create lookup receipt type failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async createMigrationData(payloadId: number, filters: any = null) {
    try {
      const params = await (await this.paramService.findORACLEOneData({ paramName: "COURT_ID" })).items; // ค้นหารหัสของศาล
      const source = await this.findMYSQLData();

      let migrateLogs = []; // เติม
      const sourceTotal = await source.total;  // เติม

      if (await sourceTotal > 0) {
        for (let index = 0; index < source.items.length; index++) {
          const { receiptTypeId, receiptTypeDesc } = source.items[index];

          const migresLogs = await (await this.migrateLogService.findPOSTGRESData({
            serverType: `${process.env.SERVER_TYPE}`,
            status: "SUCCESS",
            sourceDBType: "MYSQL",
            sourceTableName: "preceipt_type",
            sourceId: receiptTypeId,
            destinationDBType: "ORACLE",
            destinationTableName: "PC_LOOKUP_RECEIPT_TYPE",
          })).items; // ตรวจสอบ Log การ Migrate ข้อมูล

          if (migresLogs.length > 0) { // หากเคย Migrate ไปแล้วระบบจะบันทึกการทำซ้ำ
            const logDup = {
              name: "ระบบการเงิน: ประเภทใบเสร็จ",
              serverType: `${process.env.SERVER_TYPE}`,
              status: "DUPLICATE",
              datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
              sourceDBType: "MYSQL",
              sourceTableName: "preceipt_type",
              sourceId: receiptTypeId,
              sourceData: JSON.stringify(source.items[index]),
              destinationDBType: "ORACLE",
              destinationTableName: "PC_LOOKUP_RECEIPT_TYPE",
            };

            await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logDup)); // เพิ่ม Log การ Migrate ข้อมูล
          } else {
            const receiptTypes = await (await this.findORACLEOneData({ receiptTypeName: `${receiptTypeDesc}`.trim() })).items; // ค้นหา การเลื่อนพิจารณา (Oracle)

            if (!receiptTypes) { // ถ้าไม่มีให้ทำงาน
              const createData = {
                courtId: parseInt(params.paramValue),
                receiptTypeName: `${receiptTypeDesc}`.trim()
              }; // เตรียมข้อมูลในการเพิ่ม

              const created = await this.createData(payloadId, createData); // เพิ่มข้อมูลการเลื่อนพิจารณาคดี

              const migrateLog1 = {
                name: "ระบบการเงิน: ประเภทใบเสร็จ",
                serverType: `${process.env.SERVER_TYPE}`,
                status: (created ? "SUCCESS" : "ERROR"),
                datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                sourceDBType: "MYSQL",
                sourceTableName: "preceipt_type",
                sourceId: receiptTypeId,
                sourceData: JSON.stringify(createData),
                destinationDBType: "ORACLE",
                destinationTableName: "PC_LOOKUP_RECEIPT_TYPE",
                destinationId: created.receiptTypeId,
                destinationData: JSON.stringify(created)
              }; // เตรียมข้อมูล log ในการบันทึกข้อมูล

              await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(migrateLog1)); // เพิ่ม Log การ Migrate ข้อมูล
            } else {
              const logUnkow = {
                name: "ระบบการเงิน: ประเภทใบเสร็จ",
                serverType: `${process.env.SERVER_TYPE}`,
                status: "UNKNOW",
                datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                sourceDBType: "MYSQL",
                sourceTableName: "preceipt_type",
                sourceId: receiptTypeId,
                sourceData: JSON.stringify(source.items[index]),
                destinationDBType: "ORACLE",
                destinationTableName: "PC_LOOKUP_RECEIPT_TYPE",
              }; // เตรียมข้อมูล log ในการบันทึกข้อมูล
              await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logUnkow)); // เพิ่ม Log การ Migrate ข้อมูล
            }
          }
        }
      }

      const filterCountLogs = {
        serverType: `${process.env.SERVER_TYPE}`,
        destinationDBType: "ORACLE",
        destinationTableName: "PC_LOOKUP_RECEIPT_TYPE",
      };

      const cntDestination = await this.oracleLookupReceiptTypeRepositories.createQueryBuilder("A")
      const errorTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "ERROR" });
      const duplicateTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "DUPLICATE" }); // เติม
      const unknowTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "UNKNOW" }); // เติม
      const destinationOldTotal = await (await this.oracleFilter(cntDestination, filters)).andWhere("A.createdBy <> 999").getCount(); // เติม
      const destinationNewTotal = await (await this.oracleFilter(cntDestination, filters)).andWhere("A.createdBy = 999").getCount(); // เติม
      const destinationTotal = await (await this.oracleFilter(cntDestination, filters)).getCount(); // เติม

      return { migrateLogs, sourceTotal, destinationOldTotal, destinationNewTotal, duplicateTotal, errorTotal, unknowTotal, destinationTotal }; // เติม
    } catch (error) {
      throw new HttpException(`[Migrate lookup receipt type failed.] => ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  }
}
