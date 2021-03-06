import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaseAlleService } from 'src/business/case/case-alle/case-alle.service';
import { CaseService } from 'src/business/case/case/case.service';
import { OracleCaseLits } from 'src/business/case/entities/oracle/case-lit.entity';
import { LookupAllegationService } from 'src/common/lookup/lookup-allegation/lookup-allegation.service';
import { LookupNoticeSendTypeResultService } from 'src/common/lookup/lookup-notice-send-type-result/lookup-notice-send-type-result.service';
import { LookupNoticeTypeService } from 'src/common/lookup/lookup-notice-type/lookup-notice-type.service';
import { MigrationLogService } from 'src/common/migrate/migration-log/migration-log.service';
import { ParamService } from 'src/common/setting/param/param.service';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleNoticeDTO } from '../dto/notice.dto';
import { MySQLNoticeSends } from '../entities/mysql/notice-send.entity';
import { MySQLNotices } from '../entities/mysql/notice.entity';
import { OracleNotices } from '../entities/oracle/notice.entity';
import { NoticeIssuedService } from '../notice-issued/notice-issued.service';
import { NoticeSendResultService } from '../notice-send-result/notice-send-result.service';

@Injectable()
export class NoticeService extends HelperService {
  constructor(
    @InjectRepository(OracleNotices)
    private oracleNoticeRepositories: Repository<OracleNotices>,
    @InjectRepository(MySQLNotices, "mysql")
    private mysqlNoticeRepositories: Repository<MySQLNotices>,
    @InjectRepository(MySQLNoticeSends, "mysql")
    private mysqlNoticeSendRepositories: Repository<MySQLNoticeSends>,
    @InjectRepository(OracleCaseLits)
    private oracleCaseLitRepositories: Repository<OracleCaseLits>,

    private caseService: CaseService,
    private noticeTypeService: LookupNoticeTypeService,
    private caseAlleService: CaseAlleService,
    private lookupAllegationService: LookupAllegationService,
    private noticeSendResultService: NoticeSendResultService,

    private paramService: ParamService,
    private migrateLogService: MigrationLogService,
    private noticeIssuedService: NoticeIssuedService,
    private lookupNoticeSendTypeResultService: LookupNoticeSendTypeResultService
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
      const conditions = await this.mysqlNoticeRepositories.createQueryBuilder("A");

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
      const items = await Promise.all(await getItems.map(async element => {
        const noticeSends = await this.mysqlNoticeSendRepositories.findOne({ noticeRunning: element.noticeRunning });
        return {
          ...element.toResponseObject(),
          noticeSends: noticeSends ? noticeSends.toResponseObject() : null
        }
      }));

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
      throw new HttpException(`[oracle: create notice failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


  async createMigrationData(payloadId: number, filters: any = null, pages: any = null) {
    try {
      const params = await (await this.paramService.findORACLEOneData({ paramName: "COURT_ID" })).items; // ?????????????????????????????????????????????
      const source = await this.findMYSQLData({ inoutFlag: 1 }, pages); // ?????????????????? MySQL

      let migrateLogs = []; // ????????????
      const sourceTotal = await source.total;  // ????????????

      if (await sourceTotal > 0) {
        for (let index = 0; index < source.items.length; index++) {
          const {
            noticeRunning, runId, noticeNo, noticeYy, noticeTypeName, noticeDate, alleDesc, addrNo, addr, road, postCode, tambonId,
            amphurId, provId, noticeType, releaseDate, typeDate, sendAmt, sOfficerId, toCourt, noticeSends, sendBy, noticetoName, item,
            inoutFlag
          } = source.items[index];

          const migrateLog1 = await this.migrateLogService.findPOSTGRESData({
            serverType: `${process.env.SERVER_TYPE}`,
            status: "SUCCESS",
            sourceDBType: "MYSQL",
            sourceTableName: "pnotice",
            sourceId: noticeRunning,
            destinationDBType: "ORACLE",
            destinationTableName: "PC_NOTICE",
          }); // ????????????????????? Log ????????? Migrate ??????????????????

          if (migrateLog1.total > 0) { // ?????????????????? Migrate ??????????????????????????????????????????????????????????????????????????????
            const logData = {
              name: "????????????????????????/??????????????????",
              serverType: `${process.env.SERVER_TYPE}`,
              status: "DUPLICATE",
              datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
              sourceDBType: "MYSQL",
              sourceTableName: "pnotice",
              sourceId: noticeRunning,
              sourceData: JSON.stringify({
                noticeRunning, runId, noticeNo, noticeYy, noticeTypeName, alleDesc, addrNo, addr, road, postCode, tambonId,
                amphurId, provId, noticeType, sendAmt, sOfficerId, toCourt, noticeSends, sendBy, noticetoName, item,
                inoutFlag
              }),
              destinationDBType: "ORACLE",
              destinationTableName: "PC_NOTICE",
            };
            await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logData)); // ??????????????? Log ????????? Migrate ??????????????????
          } else {

            const orCase = await (await this.caseService.findORACLEOneData({ convertStringCase: runId })).items; // ??????????????? ???????????????????????????????????????????????? (Oracle)

            if (orCase) { // ????????????????????????????????????????????????
              const orCaseLits = await this.oracleCaseLitRepositories.findOne({ caseId: runId, litigantName: `${noticetoName}`.trim() }); // ???????????????
              const orNoticeTypes = await (await this.noticeTypeService.findORACLEOneData({ noticeTypeName: noticeTypeName })).items; // ??????????????? ???????????????????????????????????????????????? (Oracle)
              const orCaseAlles = await (await this.caseAlleService.findORACLEOneData({ caseId: orCase.caseId })).items; // ??????????????? ???????????????????????????????????????????????? (Oracle)
              let orAllegantion: any = null;
              if (orCaseAlles) {
                orAllegantion = await (await this.lookupAllegationService.findORACLEOneData({ allegationId: orCaseAlles.allegationId })).items; // ??????????????? ???????????????????????????????????????????????? (Oracle)
              }
              // const orLitigants = await (await this.LitigantService.findMYSQLOneData({ allegationId: orCaseAlles.allegationId })).items; // ??????????????? ???????????????????????????????????????????????? (Oracle)

              const createData: any = {
                caseId: orCase ? orCase.caseId : 0,
                noticeCodeNo: noticeNo ? noticeNo : 0,
                noticeCodeYear: noticeYy ? noticeYy : 0,
                noticeTypeId: orNoticeTypes ? orNoticeTypes.noticeTypeId : 0,
                noticeTypeName: orNoticeTypes ? orNoticeTypes.noticeTypeName : null,
                noticeTypeCode: orNoticeTypes ? orNoticeTypes.noticeTypeCode : null,
                noticeDate: noticeDate ? this.dateFormat('YYYY-MM-DD H:i:s', noticeDate) : null,
                allegationId: orCaseAlles ? (orCaseAlles.allegationId ? orCaseAlles.allegationId : 0) : 0,
                alleDesc: alleDesc ? `${alleDesc}`.trim() : `${orCase.alleDesc}`.trim(),
                allegationDetail: orAllegantion ? `${orAllegantion.allegationName}`.trim() : null,
                address: addrNo,
                addressPlace: addr,
                courtId: parseInt(params.paramValue),
                road,
                currentPostCode: `${postCode}`,
                currentSubdistrictId: tambonId ? parseInt(tambonId) : 0,
                currentDistrictId: amphurId ? parseInt(amphurId) : 0,
                currentProvinceId: provId ? provId : 0,
                isCancel: 1,
                noticeColor: `${noticeType}`,
                noticeSendStatus: 1,
                noticePrint: `${noticeType}`,
                releaseDate: releaseDate ? this.dateFormat('YYYY-MM-DD H:i:s', releaseDate) : null,
                printDate: typeDate ? this.dateFormat('YYYY-MM-DD H:i:s', typeDate) : null,
                sendDate: noticeSends ? this.dateFormat('YYYY-MM-DD H:i:s', noticeSends.sendDate) : null,
                sendFee: sendAmt ? parseFloat(this.stringToFloat(sendAmt, 2)) : 0,
                sendBy: noticeSends ? (isNaN(parseInt(noticeSends.sOfficerId)) ? 0 : parseInt(noticeSends.sOfficerId)) : 0,
                sendMethod: sendBy ? sendBy : 0,
                sendToCourt: toCourt ? toCourt : 0,
                isCountryArea: toCourt ? 1 : 0,
                isCourtArea: toCourt ? 1 : 0,
                litigantId: orCaseLits ? orCaseLits.caseId : 0,
                litigantName: orCaseLits ? `${orCaseLits.litigantName}`.trim() : null,
              }; // ??????????????????????????????????????????????????????????????????

              const created = await this.createData(payloadId, createData); // ??????????????????????????????????????????????????????????????????????????????????????????

              const migrateLog2 = {
                name: "????????????????????????/??????????????????",
                serverType: `${process.env.SERVER_TYPE}`,
                status: (created ? "SUCCESS" : "ERROR"),
                datetime: new Date(this.dateFormat("YYYY-MM-DD H:i:s")),
                sourceDBType: "MYSQL",
                sourceTableName: "pnotice",
                sourceId: noticeRunning,
                sourceData: JSON.stringify(createData),
                destinationDBType: "ORACLE",
                destinationTableName: "PC_NOTICE",
                destinationId: created.noticeId,
                destinationData: JSON.stringify(created)
              }; // ???????????????????????????????????? log ???????????????????????????????????????????????????

              await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(migrateLog2)); // ??????????????? Log ????????? Migrate ??????????????????

              if (created) {
                try {
                  if (noticeSends && noticeSends.rcvnoticeDate) {
                    const issuedData = {
                      noticeId: created.noticeId,
                      hasMoney: 0,
                      isCourtArea: toCourt ? parseInt(`${toCourt}`) : 0,
                      pnType: parseInt(`${inoutFlag}`),
                      receivedNoticeDate: noticeSends.rcvnoticeDate,
                      sendNoticeDate: noticeSends.rcvnoticeDate,
                    };

                    const createIssued = await this.noticeIssuedService.createData(payloadId, issuedData);

                    const migrateLog3 = {
                      name: "????????????????????????/??????????????????: ???????????????????????????????????????????????????",
                      serverType: `${process.env.SERVER_TYPE}`,
                      status: (createIssued ? "SUCCESS" : "ERROR"),
                      datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                      sourceDBType: "MYSQL",
                      sourceTableName: "pnotice",
                      sourceId: noticeRunning,
                      sourceData: JSON.stringify(createData),
                      destinationDBType: "ORACLE",
                      destinationTableName: "PC_NOTICE_ISSUED",
                      destinationId: createIssued.issuedId,
                      destinationData: JSON.stringify(createIssued)
                    }; // ???????????????????????????????????? log ???????????????????????????????????????????????????

                    await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(migrateLog3)); // ??????????????? Log ????????? Migrate ??????????????????
                  }

                } catch (error) {
                  throw new HttpException(`[Create Notice Issued] => ${error.message}`, HttpStatus.BAD_REQUEST);
                }


                try {
                  if (noticeSends && noticeSends.judgeOrderDesc) {
                    const sendResultOne = await (await this.lookupNoticeSendTypeResultService.findORACLEOneData({ noticeSendTypeResultName: `${noticeSends.judgeOrderDesc}`.trim() })).items;
                    let resultType = 0;
                    if (noticeSends.noticeResult === 1) {
                      switch (noticeSends.noticeResultBy) {
                        case 1: case 3:
                          resultType = 2;
                          break;
                        case 2:
                          resultType = 1;
                          break;
                        case 4:
                          resultType = 3;
                          break;
                      }
                    } else if (noticeSends.noticeResult === 2) {
                      resultType = 8;
                    }

                    let notes = "-";

                    if (noticeSends.noticeResult === 2) {
                      switch (noticeSends.noticeResultBy) {
                        case 1: case 3:
                          notes = "?????????????????????";
                          break;
                        case 2:
                          notes = "?????????????????????";
                          break;
                        case 3:
                          notes = "??????????????????";
                          break;
                        case 4:
                          notes = "???????????????????????????";
                          break;
                      }
                    }

                    const sendResultData = {
                      noticeId: created.noticeId,
                      evidenceForOrder: sendResultOne ? sendResultOne.noticeSendTypeResultId : 0,
                      resultType,
                      notes,
                      litigantReceivedDate: noticeSends ? this.dateFormat('YYYY-MM-DD H:i:s', noticeSends.rcvnoticeDate) : null,
                      logWarrantDate: noticeSends ? this.dateFormat('YYYY-MM-DD H:i:s', noticeSends.inputResultDate) : null,
                      pnType: parseInt(`${inoutFlag}`),
                      postSendTransDate: noticeSends ? this.dateFormat('YYYY-MM-DD H:i:s', noticeSends.inputResultDate) : null,
                      sendNoticeDate: noticeSends ? this.dateFormat('YYYY-MM-DD H:i:s', noticeSends.sendDate) : null,
                    };

                    const sendResultCreated = await this.noticeSendResultService.createData(payloadId, sendResultData);

                    const migrateLog4 = {
                      name: "????????????????????????/??????????????????: ????????????????????????????????????",
                      serverType: `${process.env.SERVER_TYPE}`,
                      status: (sendResultCreated ? "SUCCESS" : "ERROR"),
                      datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                      sourceDBType: "MYSQL",
                      sourceTableName: "pnotice_send",
                      sourceId: noticeRunning,
                      sourceData: JSON.stringify(createData),
                      destinationDBType: "ORACLE",
                      destinationTableName: "PC_NOTICE_SEND_RESULT",
                      destinationId: sendResultCreated.resultId,
                      destinationData: JSON.stringify(sendResultCreated)
                    }; // ???????????????????????????????????? log ???????????????????????????????????????????????????

                    await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(migrateLog4)); // ??????????????? Log ????????? Migrate ??????????????????
                  }
                } catch (error) {
                  throw new HttpException(`[Create Notice Send Result] => ${error.message}`, HttpStatus.BAD_REQUEST);
                }
              }
            } else {
              const migrateLog2 = {
                name: "????????????????????????/??????????????????",
                serverType: `${process.env.SERVER_TYPE}`,
                status: "UNKNOW",
                datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                sourceDBType: "MYSQL",
                sourceTableName: "pnotice",
                sourceId: noticeRunning,
                sourceData: JSON.stringify(source.items[index]),
                destinationDBType: "ORACLE",
                destinationTableName: "PC_NOTICE",
              }; // ???????????????????????????????????? log ???????????????????????????????????????????????????
            }
          }
        }
      }

      const filterCountLogs = {
        serverType: `${process.env.SERVER_TYPE}`,
        destinationDBType: "ORACLE",
        destinationTableName: "PC_NOTICE",
      };

      const cntDestination = await this.oracleNoticeRepositories.createQueryBuilder("A")
      const errorTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "ERROR" });
      const duplicateTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "DUPLICATE" }); // ????????????
      const unknowTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "UNKNOW" }); // ????????????
      const destinationOldTotal = await (await this.oracleFilter(cntDestination, filters)).andWhere("A.createdBy <> 999").getCount(); // ????????????
      const destinationNewTotal = await (await this.oracleFilter(cntDestination, filters)).andWhere("A.createdBy = 999").getCount(); // ????????????
      const destinationTotal = await (await this.oracleFilter(cntDestination, filters)).getCount(); // ????????????

      return { migrateLogs, sourceTotal, destinationOldTotal, destinationNewTotal, duplicateTotal, errorTotal, unknowTotal, destinationTotal }; // ????????????
    } catch (error) {
      throw new HttpException(`[oracle: migrate notice failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
