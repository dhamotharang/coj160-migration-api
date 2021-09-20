import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleLookupTitleCases } from '../entities/oracle/lookup-title-case.entity';

@Injectable()
export class LookupTitleCaseService extends HelperService {
  constructor(
    @InjectRepository(OracleLookupTitleCases)
    private oracleLookupRequestTypeRepositories: Repository<OracleLookupTitleCases>,
  ) {
    super()
  }

  // Filter
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId !== 0) {
        await conditions.where("A.requestTypeId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.removedBy = 0");
      }

      if (filters) {
        const { text, activeFlag, caseTypeStat, courtId, defaultFlag, defaultValue, imprisonAmount, imprisonDays, selectCode, titleCaseBarcode, titleCaseCode, titleCaseDesc, titleCaseGroup, titleCaseName, caseCateId } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.titleCaseBarcode LIKE '%${text}%' OR A.titleCaseDesc LIKE '%${text}%' OR A.titleCaseName LIKE '%${text}%')`)
        }

        if (typeof caseTypeStat !== "undefined") {
          await conditions.andWhere("A.caseTypeStat = :caseTypeStat", { caseTypeStat });
        }

        if (typeof activeFlag !== "undefined") {
          await conditions.andWhere("A.activeFlag = :activeFlag", { activeFlag });
        }

        if (typeof courtId !== "undefined") {
          await conditions.andWhere("A.courtId = :courtId", { courtId });
        }

        if (typeof defaultFlag !== "undefined") {
          await conditions.andWhere("A.defaultFlag = :defaultFlag", { defaultFlag });
        }

        if (typeof defaultValue !== "undefined") {
          await conditions.andWhere("A.defaultValue = :defaultValue", { defaultValue });
        }

        if (typeof imprisonAmount !== "undefined") {
          await conditions.andWhere("A.imprisonAmount = :imprisonAmount", { imprisonAmount });
        }

        if (typeof imprisonDays !== "undefined") {
          await conditions.andWhere("A.imprisonDays = :imprisonDays", { imprisonDays });
        }

        if (typeof selectCode !== "undefined") {
          await conditions.andWhere("A.selectCode = :selectCode", { selectCode });
        }

        if (typeof titleCaseBarcode !== "undefined") {
          await conditions.andWhere("A.titleCaseBarcode = :titleCaseBarcode", { titleCaseBarcode });
        }

        if (typeof titleCaseCode !== "undefined") {
          await conditions.andWhere("A.titleCaseCode = :titleCaseCode", { titleCaseCode });
        }

        if (typeof titleCaseDesc !== "undefined") {
          await conditions.andWhere("A.titleCaseDesc = :titleCaseDesc", { titleCaseDesc });
        }

        if (typeof titleCaseGroup !== "undefined") {
          await conditions.andWhere("A.titleCaseGroup = :titleCaseGroup", { titleCaseGroup });
        }

        if (typeof titleCaseName !== "undefined") {
          await conditions.andWhere("A.titleCaseName = :titleCaseName", { titleCaseName });
        }

        if (typeof caseCateId !== "undefined") {
          await conditions.andWhere("A.caseCateId = :caseCateId", { caseCateId });
        }
      }

      return await conditions;
    } catch (error) {
      throw new HttpException(`[oracle: filter failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


  async findORACLEData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const conditions = await this.oracleLookupRequestTypeRepositories.createQueryBuilder("A");

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
          .orderBy("A.titleCaseId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find lookup title case failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.oracleLookupRequestTypeRepositories.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters, moduleId);

      const getItems = await conditions.getOne();
      const items = await getItems ? getItems.toResponseObject() : null;

      return { items, total: items ? 1 : 0 };
    } catch (error) {
      throw new HttpException(`[oracle: find one lookup title case failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  /* async createData(payloadId: number, data: LookupRequestTypeDTO) {
    try {
      const createdDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const created = await this.oracleLookupRequestTypeRepositories.create({ ...data, createdBy: payloadId, createdDate });
      await this.oracleLookupRequestTypeRepositories.save(created);
      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[create data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async createMigrationData(payloadId: number, filters: any = null) {
    try {
      const params = await (await this.paramService.findORACLEOneData({ paramName: "COURT_ID" })).items;
      const source = await this.findMYSQLData();

      let migrateLogs = [];
      const sourceTotal = await source.total;  // เติม

      if (await sourceTotal > 0) {
        for (let index = 0; index < source.items.length; index++) {
          const { reqTypeId, reqTypeDesc } = source.items[index];

          const migresLogs1 = await (await this.migrateLogService.findPOSTGRESData({
            serverType: `${process.env.SERVER_TYPE}`,
            status: "SUCCESS",
            sourceDBType: "MYSQL",
            sourceTableName: "prequest_type",
            sourceId: reqTypeId,
            destinationDBType: "ORACLE",
            destinationTableName: "PC_LOOKUP_REQUEST_TYPE",
          })); // ตรวจสอบ Log การ Migrate ข้อมูล

          if (migresLogs1.total === 0) {
            const destination: any = await (await this.findORACLEOneData({ requestTypeName: `${reqTypeDesc}`.trim() })).items;

            if (!destination) {
              const created = await this.createData(payloadId, {
                activeFlag: 1,
                courtId: parseInt(params.paramValue),
                requestTypeName: `${reqTypeDesc}`.trim(),
              });

              const logData = {
                name: "ประเภทคำร้อง",
                serverType: `${process.env.SERVER_TYPE}`,
                status: (created ? "SUCCESS" : "ERROR"),
                datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                sourceDBType: "MYSQL",
                sourceTableName: "prequest_type",
                sourceId: reqTypeId,
                sourceData: JSON.stringify({ reqTypeId, reqTypeDesc }),
                destinationDBType: "ORACLE",
                destinationTableName: "PC_LOOKUP_REQUEST_TYPE",
                destinationId: created.requestTypeId,
                destinationData: JSON.stringify(created)
              };

              migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logData));
            }
          } else {
            const logData2 = {
              name: "หน่วยงาน",
              serverType: `${process.env.SERVER_TYPE}`,
              status: "DUPLICATE",
              datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
              sourceDBType: "MYSQL",
              sourceTableName: "prequest_type",
              sourceId: reqTypeId,
              sourceData: JSON.stringify({ reqTypeId, reqTypeDesc }),
              destinationDBType: "ORACLE",
              destinationTableName: "PC_LOOKUP_REQUEST_TYPE",
            };
            await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logData2)); // เพิ่ม Log การ Migrate ข้อมูล
          }
        }

      }

      const filterCountLogs = {
        serverType: `${process.env.SERVER_TYPE}`,
        destinationDBType: "ORACLE",
        destinationTableName: "PC_LOOKUP_REQUEST_TYPE",
      };

      const errorTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "ERROR" });
      const duplicateTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "DUPLICATE" }); // เติม
      const cntDestination = await this.oracleLookupRequestTypeRepositories.createQueryBuilder("A") // เติม
      const destinationOldTotal = await (await this.oracleFilter(cntDestination, filters)).andWhere("A.createdBy <> 999").getCount(); // เติม
      const destinationNewTotal = await (await this.oracleFilter(cntDestination, filters)).andWhere("A.createdBy = 999").getCount(); // เติม
      const destinationTotal = await (await this.oracleFilter(cntDestination, filters)).getCount(); // เติม

      return { migrateLogs, sourceTotal, destinationOldTotal, destinationNewTotal, duplicateTotal, errorTotal, destinationTotal }; // เติม
    } catch (error) {
      throw new HttpException(`[Migrate data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST)
    }
  } */
}
