import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaseAlleService } from 'src/business/case/case-alle/case-alle.service';
import { CaseService } from 'src/business/case/case/case.service';
import { LookupAllegationService } from 'src/common/lookup/lookup-allegation/lookup-allegation.service';
import { LookupNoticeTypeService } from 'src/common/lookup/lookup-notice-type/lookup-notice-type.service';
import { MigrationLogService } from 'src/common/migrate/migration-log/migration-log.service';
import { ParamService } from 'src/common/setting/param/param.service';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleNoticeDTO } from '../dto/notice.dto';
import { MySQLNotices } from '../entities/mysql/notice.entity';
import { OracleNotices } from '../entities/oracle/notice.entity';
import { NoticeSendService } from '../notice-send/notice-send.service';

@Injectable()
export class NoticeService extends HelperService {
  constructor(
    @InjectRepository(OracleNotices)
    private oracleNoticeRepositories: Repository<OracleNotices>,
    @InjectRepository(MySQLNotices, "mysql")
    private mysqlNoticeRepositories: Repository<MySQLNotices>,

    private caseService: CaseService,
    private noticeTypeService: LookupNoticeTypeService,
    private caseAlleService: CaseAlleService,
    private lookupAllegationService: LookupAllegationService,
    private noticeSendService: NoticeSendService,

    private paramService: ParamService,
    private migrateLogService: MigrationLogService
  ) {
    super();
  }


  // Filter zone
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.where("A.noticeId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.removedBy = 0");
      }

      if (filters) {
        const { text, orderNo, allegationId, alley, appointListCode, appointListName, cancelReason, cancelStatus, caseId, courtId, courtType } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.address LIKE '%${text}%' OR A.addressNearLocation LIKE '%${text}%' OR A.addressPlace LIKE '%${text}%')`)
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof allegationId !== "undefined") {
          await conditions.andWhere("A.allegationId = :allegationId", { allegationId });
        }

        if (typeof alley !== "undefined") {
          await conditions.andWhere("A.alley = :alley", { alley });
        }

        if (typeof appointListCode !== "undefined") {
          await conditions.andWhere("A.appointListCode = :appointListCode", { appointListCode });
        }

        if (typeof appointListName !== "undefined") {
          await conditions.andWhere("A.appointListName = :appointListName", { appointListName });
        }

        if (typeof cancelReason !== "undefined") {
          await conditions.andWhere("A.cancelReason = :cancelReason", { cancelReason });
        }

        if (typeof cancelStatus !== "undefined") {
          await conditions.andWhere("A.cancelStatus = :cancelStatus", { cancelStatus });
        }

        if (typeof caseId !== "undefined") {
          await conditions.andWhere("A.caseId = :caseId", { caseId });
        }

        if (typeof courtId !== "undefined") {
          await conditions.andWhere("A.courtId = :courtId", { courtId });
        }

        if (typeof courtType !== "undefined") {
          await conditions.andWhere("A.courtType = :courtType", { courtType });
        }
      }

      return conditions;
    } catch (error) {
      throw new HttpException(`[oracle: filter] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async mysqlFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.where("A.noticeRunning = :moduleId", { moduleId });
      } else {
        await conditions.where("A.noticeRunning <> 0");
      }

      if (filters) {
        const {
          text, noticeCourtRunning, noticeTypeId, noticeTypeName, noticeNo, noticeYy, dataType, noticeGroup, noticeGroupYy, noticeBarcode,
          appealRunning, formRunning, formId, appealType, formXml, runId, depCode, inoutFlag
        } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.noticeTypeName LIKE '%${text}%' OR A.noticeNo LIKE '%${text}%' OR A.accuName LIKE '%${text}%' OR A.noticeTypeName LIKE '%${text}%')`)
        }

        if (typeof inoutFlag !== "undefined") {
          await conditions.andWhere("A.inoutFlag = :inoutFlag", { inoutFlag });
        }

        if (typeof noticeCourtRunning !== "undefined") {
          await conditions.andWhere("A.noticeCourtRunning = :noticeCourtRunning", { noticeCourtRunning });
        }

        if (typeof noticeTypeId !== "undefined") {
          await conditions.andWhere("A.noticeTypeId = :noticeTypeId", { noticeTypeId });
        }

        if (typeof noticeTypeName !== "undefined") {
          await conditions.andWhere("A.noticeTypeName = :noticeTypeName", { noticeTypeName });
        }

        if (typeof noticeNo !== "undefined") {
          await conditions.andWhere("A.noticeNo = :noticeNo", { noticeNo });
        }

        if (typeof noticeYy !== "undefined") {
          await conditions.andWhere("A.noticeYy = :noticeYy", { noticeYy });
        }

        if (typeof dataType !== "undefined") {
          await conditions.andWhere("A.dataType = :dataType", { dataType });
        }

        if (typeof noticeGroup !== "undefined") {
          await conditions.andWhere("A.noticeGroup = :noticeGroup", { noticeGroup });
        }

        if (typeof noticeGroupYy !== "undefined") {
          await conditions.andWhere("A.noticeGroupYy = :noticeGroupYy", { noticeGroupYy });
        }

        if (typeof noticeBarcode !== "undefined") {
          await conditions.andWhere("A.noticeBarcode = :noticeBarcode", { noticeBarcode });
        }

        if (typeof appealRunning !== "undefined") {
          await conditions.andWhere("A.appealRunning = :appealRunning", { appealRunning });
        }

        if (typeof formRunning !== "undefined") {
          await conditions.andWhere("A.formRunning = :formRunning", { formRunning });
        }

        if (typeof formId !== "undefined") {
          await conditions.andWhere("A.formId = :formId", { formId });
        }

        if (typeof appealType !== "undefined") {
          await conditions.andWhere("A.appealType = :appealType", { appealType });
        }

        if (typeof formXml !== "undefined") {
          await conditions.andWhere("A.formXml = :formXml", { formXml });
        }

        if (typeof runId !== "undefined") {
          await conditions.andWhere("A.runId = :runId", { runId });
        }

        if (typeof depCode !== "undefined") {
          await conditions.andWhere("A.depCode = :depCode", { depCode });
        }
      }

      return conditions;
    } catch (error) {
      throw new HttpException(`[mysql: filter] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


  // GET Method
  async findORACLEData(filters: any = null, pages: any = null) {
    try {
      const conditions = await this.oracleNoticeRepositories.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters);

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
        } else {
          await conditions
            .orderBy("A.noticeId", "DESC");
        }
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find lookup notice failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.oracleNoticeRepositories.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters, moduleId);

      const total = 1;

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find one lookup notice failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLData(filters: any = null, pages: any = null) {
    try {
      const conditions = await this.mysqlNoticeRepositories.createQueryBuilder("A")
        .leftJoinAndSelect("A.noticeSends", "B");

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
        } else {
          await conditions
            .orderBy("A.noticeRunning", "DESC");
        }
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[mysql: find notice failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.mysqlNoticeRepositories.createQueryBuilder("A")
        .leftJoinAndSelect("A.noticeSends", "B");

      await this.mysqlFilter(conditions, filters, moduleId);

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[mysql: find one notice failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  async createData(payloadId: number, data: OracleNoticeDTO) {
    try {
      const createdDate = this.dateFormat("YYYY-MM-DD H:i:s");
      const createData = {
        ...data,
        activeFlag: 1,
        costFlag: 1,
        createdBy: payloadId,
        updatedBy: payloadId,
        removedBy: 0,
        createdDate,
        updatedDate: createdDate
      };

      const created = await this.oracleNoticeRepositories.create(createData);
      await this.oracleNoticeRepositories.save(created);

      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: create lookup notice failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


  /* async createMigrationData(payloadId: number, filters: any = null) {
    try {
      let migrateLogs = [];
      const params = await (await this.paramService.findORACLEOneData({ paramName: "COURT_ID" })).items; // ค้นหารหัสของศาล
      const source = await this.findMYSQLData({ inoutFlag: 1 }); // ดึงค่า MySQL

      if (params && await source.total > 0) {
        for (let index = 0; index < source.items.length; index++) {
          const {
            noticeRunning, runId, noticeNo, noticeYy, noticeTypeName, noticeDate, alleDesc, addrNo, addr, road, postCode, tambonId,
            amphurId, provId, noticeType, releaseDate, typeDate, sendAmt, sOfficerId, toCourt, noticeSends, sendBy, noticetoName, item
          } = source.items[index];

          const migrateLog1 = await this.migrateLogService.findPOSTGRESData({
            serverType: `${process.env.SERVER_TYPE}`,
            status: "SUCCESS",
            sourceDBType: "MYSQL",
            sourceTableName: "pnotice",
            sourceId: noticeRunning,
          }); // ตรวจสอบ Log การ Migrate ข้อมูล

          if (migrateLog1.total > 0) { // หากเคย Migrate ไปแล้วระบบจะบันทึกการทำซ้ำ
            await migrateLogs.push(await this.migrateLogService.createPOSTGRESData({
              name: "ระบบหมาย/ประกาศ: วิธีการส่ง",
              serverType: `${process.env.SERVER_TYPE}`,
              status: "DUPLICATE",
              datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
              sourceDBType: "MYSQL",
              sourceTableName: "pnotice",
              sourceId: noticeRunning,
              sourceData: JSON.stringify(source.items[index]),
            })); // เพิ่ม Log การ Migrate ข้อมูล
          } else {

            const orCase = await (await this.caseService.findORACLEOneData({ convertStringCase: runId })).items; // ค้นหา การเลื่อนพิจารณา (Oracle)

            if (orCase) { // ถ้าไม่มีให้ทำงาน
              const orNoticeTypes = await (await this.noticeTypeService.findORACLEOneData({ noticeTypeName: noticeTypeName })).items; // ค้นหา การเลื่อนพิจารณา (Oracle)
              const orCaseAlles = await (await this.caseAlleService.findORACLEOneData({ caseId: orCase.caseId })).items; // ค้นหา การเลื่อนพิจารณา (Oracle)
              const orAllegantion = await (await this.lookupAllegationService.findORACLEOneData({ allegationId: orCaseAlles.allegationId })).items; // ค้นหา การเลื่อนพิจารณา (Oracle)
              // const myNoticeSend = await (await this.noticeSendService.findMYSQLOneData({ allegationId: orCaseAlles.allegationId })).items; // ค้นหา การเลื่อนพิจารณา (Oracle)

              const createData = {
                caseId: orCase.caseId,
                noticeCodeNo: noticeNo,
                noticeCodeYear: noticeYy,
                noticeTypeId: orNoticeTypes.noticeTypeId,
                noticeTypeName: orNoticeTypes.noticeTypeName,
                noticeTypeCode: orNoticeTypes.noticeTypeCode,
                noticeDate,
                allegationId: orCaseAlles.allegationId,
                alleDesc: alleDesc ? alleDesc : orCase.alleDesc,
                allegationDetail: orAllegantion.allegationName,
                address: addrNo,
                addressPlace: addr,
                road,
                currentPostCode: postCode,
                currentSubdistrictId: tambonId,
                currentDistrictId: amphurId,
                currentProvinceId: provId,
                isCancel: 1,
                noticeColor: noticeType,
                noticeSendStatus: 1,
                noticePrint: noticeType,
                releaseDate,
                printDate: typeDate,
                sendDate: noticeSends ? noticeSends.sendDate : null,
                sendFee: sendAmt,
                sendBy: noticeSends ? noticeSends.sOfficerId : null,
                sendMethod: sendBy,
                sendToCourt: toCourt,
                isCountryArea: toCourt,
                isCourtArea: toCourt,
                litigantId: noticetoName,
              }; // เตรียมข้อมูลในการเพิ่ม

              const created = await this.createData(payloadId, createData); // เพิ่มข้อมูลการเลื่อนพิจารณาคดี

              const migrateLog2 = {
                name: "ระบบหมาย/ประกาศ: วิธีการส่ง",
                serverType: `${process.env.SERVER_TYPE}`,
                status: (created ? "SUCCESS" : "ERROR"),
                datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                sourceDBType: "MYSQL",
                sourceTableName: "pnotice",
                sourceId: noticeRunning,
                sourceData: JSON.stringify(createData),
                destinationDBType: "ORACLE",
                destinationTableName: "PC_NOTICE",
                destinationId: created.noticeRunning,
                destinationData: JSON.stringify(created)
              }; // เตรียมข้อมูล log ในการบันทึกข้อมูล

              await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(migrateLog2)); // เพิ่ม Log การ Migrate ข้อมูล

            }
          }
        }
      }

      return migrateLogs;
    } catch (error) {
      throw new HttpException(`[oracle: migrate notice failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  } */
}
