import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaseAlleService } from 'src/business/case/case-alle/case-alle.service';
import { CaseService } from 'src/business/case/case/case.service';
import { OracleCaseLits } from 'src/business/case/entities/oracle/case-lit.entity';
import { LookupAllegationService } from 'src/common/lookup/lookup-allegation/lookup-allegation.service';
import { LookupNoticeTypeService } from 'src/common/lookup/lookup-notice-type/lookup-notice-type.service';
import { LookupTitleCaseService } from 'src/common/lookup/lookup-title-case/lookup-title-case.service';
import { MigrationLogService } from 'src/common/migrate/migration-log/migration-log.service';
import { ParamService } from 'src/common/setting/param/param.service';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleNoticeProvincialDTO } from '../dto/notice-provincial.dto';
import { MySQLNoticeSends } from '../entities/mysql/notice-send.entity';
import { OracleNoticeProvincials } from '../entities/oracle/notice-provincial.entity';
import { NoticeService } from '../notice/notice.service';

@Injectable()
export class NoticeProvincialService extends HelperService {
  constructor(
    @InjectRepository(OracleNoticeProvincials)
    private oracleNoticeProvincialRepositories: Repository<OracleNoticeProvincials>,
    @InjectRepository(OracleCaseLits)
    private oracleCaseLitRepositories: Repository<OracleCaseLits>,

    private lookupTitleCaseService: LookupTitleCaseService,
    private caseService: CaseService,
    private noticeService: NoticeService,
    private paramService: ParamService,
    private migrateLogService: MigrationLogService,
    private noticeTypeService: LookupNoticeTypeService,
    private caseAlleService: CaseAlleService,
    private lookupAllegationService: LookupAllegationService
  ) {
    super();
  }


  // Filter zone
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.where("A.noticeProvincialId = :moduleId", { moduleId });
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

      return await conditions;
    } catch (error) {
      throw new HttpException(`[mysql: filter] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


  // GET Method
  async findORACLEData(filters: any = null, pages: any = null) {
    try {
      const conditions = await this.oracleNoticeProvincialRepositories.createQueryBuilder("A");

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
            .orderBy("A.noticeProvincialId", "DESC");
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
      const conditions = await this.oracleNoticeProvincialRepositories.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters, moduleId);

      const total = 1;

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find one lookup notice failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  async createData(payloadId: number, data: OracleNoticeProvincialDTO) {
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

      const created = await this.oracleNoticeProvincialRepositories.create(createData);
      await this.oracleNoticeProvincialRepositories.save(created);

      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: create province notice failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


  async createMigrationData(payloadId: number, filters: any = null) {
    try {
      let migrateLogs = [];
      const params = await (await this.paramService.findORACLEOneData({ paramName: "COURT_ID" })).items; // ค้นหารหัสของศาล
      const source = await this.noticeService.findMYSQLData({ inoutFlag: 2 }); // ดึงค่า MySQL
      const sourceTotal: number = await source.total;

      if (params && await sourceTotal > 0) {
        for (let index = 0; index < source.items.length; index++) {
          const {
            noticeRunning, runId, noticeNo, noticeYy, noticeTypeName, noticeDate, alleDesc, addr, moo, road, soi, addrNo, postCode, tambonId,
            amphurId, provId, noticeType, releaseDate, typeDate, sendAmt, sOfficerId, toCourt, noticeSends, sendBy, noticetoName, item,
          } = source.items[index];

          const migrateLog1 = await this.migrateLogService.findPOSTGRESData({
            serverType: `${process.env.SERVER_TYPE}`,
            status: "SUCCESS",
            sourceDBType: "MYSQL",
            sourceTableName: "pnotice",
            sourceId: noticeRunning,
            destinationDBType: "ORACLE",
            destinationTableName: "PC_NOTICE_PROVINCIAL",
          }); // ตรวจสอบ Log การ Migrate ข้อมูล

          if (migrateLog1.total > 0) { // หากเคย Migrate ไปแล้วระบบจะบันทึกการทำซ้ำ
            const logData = {
              name: "ระบบหมาย/ประกาศ: หมายต่างจังหวัด",
              serverType: `${process.env.SERVER_TYPE}`,
              status: "DUPLICATE",
              datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
              sourceDBType: "MYSQL",
              sourceTableName: "pnotice",
              sourceId: noticeRunning,
              sourceData: JSON.stringify(source.items[index]),
              destinationDBType: "ORACLE",
              destinationTableName: "PC_NOTICE_PROVINCIAL",
            };
            await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logData)); // เพิ่ม Log การ Migrate ข้อมูล
          } else {

            const myCase = await (await this.caseService.findMYSQLOneData(null, runId)).items; // ค้นหา การเลื่อนพิจารณา (Oracle)
            const orCaseTitle = await (await this.lookupTitleCaseService.findORACLEOneData({ titleCaseName: `${myCase.title}`.trim() })).items; // ค้นหา
            const orCaseLits = await this.oracleCaseLitRepositories.findOne({ caseId: runId, litigantName: `${noticetoName}`.trim() }); // ค้นหา
            const orCase = await (await this.caseService.findORACLEOneData({ convertStringCase: runId })).items; // ค้นหา การเลื่อนพิจารณา (Oracle)
            const orNoticeTypes = await (await this.noticeTypeService.findORACLEOneData({ noticeTypeName: noticeTypeName })).items; // ค้นหา การเลื่อนพิจารณา (Oracle)

            if (orCase) { // ถ้าไม่มีให้ทำงาน
              const orCaseAlles = await (await this.caseAlleService.findORACLEOneData({ caseId: orCase.caseId })).items; // ค้นหา การเลื่อนพิจารณา (Oracle)
              // const orAllegantion = await (await this.lookupAllegationService.findORACLEOneData({ allegationId: orCaseAlles.allegationId })).items; // ค้นหา การเลื่อนพิจารณา (Oracle)
              // const orLitigants = await (await this.LitigantService.findMYSQLOneData({ allegationId: orCaseAlles.allegationId })).items; // ค้นหา การเลื่อนพิจารณา (Oracle)

              const createData: any = {
                courtId: parseInt(params.paramValue),
                address: `${addrNo}${(moo ? ` ${moo}` : '')}${(addr ? ` ${addr}` : '')}${(road ? ` ${road}` : '')}${(soi ? ` ${soi}` : '')}`,
                noticeTypeId: orNoticeTypes ? orNoticeTypes.noticeTypeId : 0,
                noticeCodeNo: noticeNo ? parseInt(`${noticeNo}`) : 0,
                noticeCodeYear: noticeYy,
                blackTitleId: orCaseTitle.titleCaseId,
                blackIdnum: orCaseTitle ? parseInt(`${orCaseTitle.titleCaseId}${myCase.id}`) : null,
                blackYear: orCaseTitle ? parseInt(`${orCaseTitle.titleCaseId}${myCase.yy}`) : null,
                moo: moo ? moo : "-",
                currentSubdistrictId: tambonId ? parseInt(`${tambonId}`) : null,
                currentProvinceId: provId ? parseInt(`${provId}`) : null,
                currentDistrictId: amphurId ? parseInt(`${amphurId}`) : null,
                accuDesc: myCase.accuDesc,
                litTypeId: orCaseLits ? orCaseLits.caseId : null,
                litigantName: orCaseLits ? orCaseLits.litigantName : null,
                prosDesc: myCase.prosDesc,
                road,
                sendDate: noticeSends ? this.dateFormat('YYYY-MM-DD', noticeSends.sendDate) : null,
                sendFee: sendAmt,
                sendMethod: sendBy,
                sendBy: noticeSends ? (noticeSends.sOfficerId ? parseInt(noticeSends.sOfficerId) : 0) : 0,
                noticeSendStatus: 1
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
                destinationTableName: "PC_NOTICE_PROVINCIAL",
                destinationId: created.noticeProvincialId,
                destinationData: JSON.stringify(created)
              }; // เตรียมข้อมูล log ในการบันทึกข้อมูล

              await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(migrateLog2)); // เพิ่ม Log การ Migrate ข้อมูล

            } else {
              const logUnkow = {
                name: "ระบบหมาย/ประกาศ: หมายต่างจังหวัด",
                serverType: `${process.env.SERVER_TYPE}`,
                status: "UNKNOW",
                datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                sourceDBType: "MYSQL",
                sourceTableName: "pnotice",
                sourceId: noticeRunning,
                sourceData: JSON.stringify(source.items[index]),
                destinationDBType: "ORACLE",
                destinationTableName: "PC_NOTICE_PROVINCIAL",
              }; // เตรียมข้อมูล log ในการบันทึกข้อมูล
              await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logUnkow)); // เพิ่ม Log การ Migrate ข้อมูล
            }
          }
        }
      }

      const filterCountLogs = {
        serverType: `${process.env.SERVER_TYPE}`,
        destinationDBType: "ORACLE",
        destinationTableName: "PC_NOTICE_PROVINCIAL",
      };

      const cntDestination = await this.oracleNoticeProvincialRepositories.createQueryBuilder("A")
      const errorTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "ERROR" });
      const duplicateTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "DUPLICATE" }); // เติม
      const unknowTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "UNKNOW" }); // เติม
      const destinationOldTotal = await (await this.oracleFilter(cntDestination, filters)).andWhere("A.createdBy <> 999").getCount(); // เติม
      const destinationNewTotal = await (await this.oracleFilter(cntDestination, filters)).andWhere("A.createdBy = 999").getCount(); // เติม
      const destinationTotal = await (await this.oracleFilter(cntDestination, filters)).getCount(); // เติม

      return { migrateLogs, sourceTotal, destinationOldTotal, destinationNewTotal, duplicateTotal, errorTotal, unknowTotal, destinationTotal }; // เติม
    } catch (error) {
      throw new HttpException(`[oracle: migrate notice province failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
