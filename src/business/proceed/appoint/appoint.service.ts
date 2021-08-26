import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentService } from 'src/business/appoint/appointment/appointment.service';
import { CaseService } from 'src/business/case/case.service';
import { AppointDelayService } from 'src/common/appoint/appoint-delay/appoint-delay.service';
import { AppointListService } from 'src/common/appoint/appoint-list/appoint-list.service';
import { AppointTableService } from 'src/common/appoint/appoint-table/appoint-table.service';
import { LookupJudgeService } from 'src/common/judge/lookup-judge/lookup-judge.service';
import { MigrationLogService } from 'src/common/migrate/migration-log/migration-log.service';
import { ParamService } from 'src/common/setting/param/param.service';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { AppointCaseJudgeService } from '../appoint-case-judge/appoint-case-judge.service';
import { AppointContinueService } from '../appoint-continue/appoint-continue.service';
import { AppointResultService } from '../appoint-result/appoint-result.service';
import { OracleProceedAppointDTO } from '../dto/proceed-appoint.dto';
import { OracleProceedAppoints } from '../entities/oracle/proceed-appoint.entity';
import { HoldReasonService } from '../hold-reason/hold-reason.service';

@Injectable()
export class AppointService extends HelperService {
  constructor(
    @InjectRepository(OracleProceedAppoints)
    private oracleAppointRepositories: Repository<OracleProceedAppoints>,
    private paramService: ParamService,
    private migrateLogService: MigrationLogService,
    private appointmentService: AppointmentService,
    private caseService: CaseService,
    private appointTableService: AppointTableService,
    private appointListService: AppointListService,
    private appointContinueSevice: AppointContinueService,
    private appointCaseJudgeService: AppointCaseJudgeService,
    private lookupJudgeService: LookupJudgeService,
    private appointResultService: AppointResultService,
    private appointDelayService: AppointDelayService,
    private holdReasonService: HoldReasonService
  ) {
    super();
  }


  // Filter zone
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.where("A.appointId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.removedBy = 0");
      }

      if (filters) {
        const { text, orderNo, activeFlag, appointTableCode, appointTableName, courtId } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.appointTableName LIKE '%${text}'% OR A.appointTableCode LIKE '%${text}'%)`);
        }

        if (typeof orderNo !== "undefined") {
          await conditions.andWhere("A.orderNo = :orderNo", { orderNo });
        }

        if (typeof activeFlag !== "undefined") {
          await conditions.andWhere("A.activeFlag = :activeFlag", { activeFlag });
        }

        if (typeof appointTableCode !== "undefined") {
          await conditions.andWhere("A.appointTableCode = :appointTableCode", { appointTableCode });
        }

        if (typeof appointTableName !== "undefined") {
          await conditions.andWhere("A.appointTableName = :appointTableName", { appointTableName });
        }

        if (typeof courtId !== "undefined") {
          await conditions.andWhere("A.courtId = :courtId", { courtId });
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
        await conditions.where("A.tableId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.tableId <> 0");
      }

      if (filters) {
        const { text, courtRunning, tableName, caseCateId, caseStatus, tableType, } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.tableName LIKE '%${text}%'`)
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof tableName !== "undefined") {
          await conditions.andWhere("A.tableName = :tableName", { tableName });
        }

        if (typeof caseCateId !== "undefined") {
          await conditions.andWhere("A.caseCateId = :caseCateId", { caseCateId });
        }

        if (typeof caseStatus !== "undefined") {
          await conditions.andWhere("A.caseStatus = :caseStatus", { caseStatus });
        }

        if (typeof tableType !== "undefined") {
          await conditions.andWhere("A.tableType = :tableType", { tableType });
        }
      }

      return await conditions;
    } catch (error) {
      throw new HttpException(`[mysql: filter failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


  // GET Method
  async findORACLEData(filters: any = null, pages: any = null) {
    try {
      const conditions = await this.oracleAppointRepositories.createQueryBuilder("A")
        .leftJoinAndSelect("A.proceedAppointContinues", "B")
        .leftJoinAndSelect("A.proceedAppointCaseJudges", "C")
        .leftJoinAndSelect("A.proceedAppointResults", "D");

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
          .orderBy("A.appointId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find appoint failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.oracleAppointRepositories.createQueryBuilder("A")
        .leftJoinAndSelect("A.proceedAppointContinues", "B")
        .leftJoinAndSelect("A.proceedAppointCaseJudges", "C")
        .leftJoinAndSelect("A.proceedAppointResults", "D");

      await this.oracleFilter(conditions, filters, moduleId);

      const total = 1;

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find one appoint failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  async createData(payloadId: number, data: OracleProceedAppointDTO) {
    try {
      const createdDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const created = await this.oracleAppointRepositories.create({
        ...data,
        appointById: payloadId,
        createdBy: payloadId,
        updatedBy: payloadId,
        removedBy: 0,
        createdDate,
        updatedDate: createdDate
      });
      await this.oracleAppointRepositories.save(created);

      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: create proceed appoint failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async createMigrationData(payloadId: number, filters: any = null) {
    try {
      let migrateLogs = [];
      const params = await (await this.paramService.findORACLEOneData({ paramName: "COURT_ID" })).items; // ค้นหารหัสของศาล
      const source = await this.appointmentService.findMYSQLData(); // ดึงค่าคำคู่ความฝั่ง MySQL

      if (params && await source.total > 0) {
        for (let index = 0; index < source.items.length; index++) {
          const {
            appRunning, runId, appId, tableId, timeAppoint, appName, roomId, dateAppoint, tranReq, judgeId, resultName, delayName,
            prosWit, pageQty, accuWit, pageQty2, otherWit, pageQty3, resultId
          } = source.items[index];
          const appoints = await (await this.appointmentService.findMYSQLOneData({ sort: "dateAppoint-ASC", appId })).items; // ดึงค่าคำคู่ความฝั่ง MySQL

          const migresLogs = await (await this.migrateLogService.findPOSTGRESData({
            serverType: `${process.env.SERVER_TYPE}`,
            status: "SUCCESS",
            sourceDBType: "MYSQL",
            sourceTableName: "pappointment",
            sourceId: appRunning,
          })).items; // ตรวจสอบ Log การ Migrate ข้อมูล

          if (migresLogs.length > 0) { // หากเคย Migrate ไปแล้วระบบจะบันทึกการทำซ้ำ
            await migrateLogs.push(await this.migrateLogService.createPOSTGRESData({
              name: "ระบบการพิจารณาคดี: ตารางนัด",
              serverType: `${process.env.SERVER_TYPE}`,
              status: "DUPLICATE",
              datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
              sourceDBType: "MYSQL",
              sourceTableName: "pappointment",
              sourceId: appRunning,
              sourceData: JSON.stringify(source.items[index]),
            })); // เพิ่ม Log การ Migrate ข้อมูล
          } else {
            /* #########################
                PC_PROCEED_APPOINT
            ######################### */
            const orCases = await (await this.caseService.findORACLEOneData({ convertStringCase: runId })).items; // ค้นหา การเลื่อนพิจารณา (Oracle)
            const orAppTables = await (await this.appointTableService.findORACLEOneData({ tempId: tableId })).items;

            if (!orCases && orAppTables) { // ถ้าไม่มีให้ทำงาน

              const createData = {
                caseId: runId,
                reasonAppointId: 0,
                appointTableId: orAppTables.appointTableId,
                isElectronicFiling: 0,
              }; // เตรียมข้อมูลในการเพิ่ม

              const created = await this.createData(payloadId, createData); // เพิ่มข้อมูลการเลื่อนพิจารณาคดี

              if (created) {
                const migrateLog1 = {
                  name: "ระบบการพิจารณาคดี: ตารางนัด",
                  serverType: `${process.env.SERVER_TYPE}`,
                  status: "DUPLICATE",
                  datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                  sourceDBType: "MYSQL",
                  sourceTableName: "pappointment",
                  sourceId: appRunning,
                  sourceData: JSON.stringify(createData),
                  destinationDBType: "ORACLE",
                  destinationTableName: "PC_LOOKUP_APPOINT_TABLE",
                  destinationId: created.appointId,
                  destinationData: JSON.stringify(created)
                };
                await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(migrateLog1)); // เพิ่ม Log การ Migrate ข้อมูล
                /* ############################################################ */


                /* #########################
                PC_PROCEED_APPOINT_CONTINUE
                ######################### */
                const _timeAppoint: number = parseInt(this.stringToNumber(`${timeAppoint}`));
                let choice = 0;
                if (_timeAppoint <= 1200) {
                  choice = 1;
                } else if (_timeAppoint <= 1630) {
                  choice = 2;
                } else if (_timeAppoint > 1631) {
                  choice = 3;
                }

                const appLists = await (await this.appointListService.findORACLEOneData({ appointListName: appName })).items;

                const createContinues = await this.appointContinueSevice.createData(payloadId, {
                  appointTableId: orAppTables ? orAppTables.appointTableId : null,
                  appointId: created.appointId,
                  choice,
                  choiceTime: timeAppoint,
                  reasonAppointId: appLists ? appLists.appointListId : 0,
                  roomId: parseInt(roomId),
                  translate: tranReq,
                  startDate: this.dateFormat('YYYY-MM-DD', dateAppoint)
                });

                const migrateLog2 = {
                  name: "ระบบการพิจารณาคดี: นัดครั้งต่อไป",
                  serverType: `${process.env.SERVER_TYPE}`,
                  status: createContinues ? "SUCCESS" : "ERROR",
                  datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                  sourceDBType: "MYSQL",
                  sourceTableName: "pappointment",
                  sourceId: appRunning,
                  sourceData: JSON.stringify(source.items[index]),
                  destinationDBType: "ORACLE",
                  destinationTableName: "PC_PROCEED_APPOINT_CONTINUE",
                  destinationId: created.appointId,
                  destinationData: JSON.stringify(created)
                }; // เตรียมข้อมูล log ในการบันทึกข้อมูล

                await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(migrateLog2)); // เพิ่ม Log การ Migrate ข้อมูล
                /* ############################################################ */



                /* #########################
                PC_PROCEED_APPOINT_CASE_JUDGE (1 รายการต่อ 1 คดี run_id ต่อ 1 ผู้พิพากษา judge_id)
                ######################### */
                const myJudegs = await (await this.lookupJudgeService.findMYSQLOneData(null, parseInt(judgeId))).items;
                const orJudges = await (await this.lookupJudgeService.findORACLEOneData({ judgeName: myJudegs.judgeName })).items;

                const createCaseJudegeData = {
                  appointId: created.appointId,
                  courtId: parseInt(params.paramValue),
                  judgeEndDate: null,
                  judgeId: orJudges.judgeId,
                  judgeStartDate: dateAppoint === appoints.dateAppoint ? dateAppoint : null,
                  judgeTypeId: 1,
                  temporaryJudgeFlage: 1,
                };
                const createCaseJudeges = await this.appointCaseJudgeService.createData(payloadId, createCaseJudegeData);

                const migrateLog3 = {
                  name: "ระบบการพิจารณาคดี: ผู้พิพากษา",
                  serverType: `${process.env.SERVER_TYPE}`,
                  status: createCaseJudeges ? "SUCCESS" : "ERROR",
                  datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                  sourceDBType: "MYSQL",
                  sourceTableName: "pappointment",
                  sourceId: appRunning,
                  sourceData: JSON.stringify(source.items[index]),
                  destinationDBType: "ORACLE",
                  destinationTableName: "PC_PROCEED_APPOINT_CASE_JUDGE",
                  destinationId: createCaseJudeges.appointCaseJudgeId,
                  destinationData: JSON.stringify(createCaseJudeges)
                }; // เตรียมข้อมูล log ในการบันทึกข้อมูล

                await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(migrateLog3)); // เพิ่ม Log การ Migrate ข้อมูล
                /* ############################################################ */



                /* #########################
                PC_PROCEED_APPOINT_RESULT
                ######################### */
                let appointDelays: any;
                const findappointDelays = await (await this.appointDelayService.findORACLEOneData({ appointDelayName: resultName })).items;

                if (!findappointDelays) {
                  const createAppDelayData = {
                    activeFlag: 1,
                    appointDelayName: resultName,
                    courtId: parseInt(params.paramValue),
                  }
                  appointDelays = await this.appointDelayService.createData(payloadId, createAppDelayData);
                } else {
                  appointDelays = findappointDelays
                }

                const holdReasons = await (await this.holdReasonService.findORACLEOneData({ holdDescription: delayName })).items;

                const createAppResultData = {
                  offenseDetail: `${runId}`,
                  appointDate: dateAppoint,
                  appointDelayId: appointDelays ? appointDelays.appointDelayId : null,
                  appointId: created.appointId,
                  appointConId: createContinues.appointConId,
                  apointTime: timeAppoint,
                  holdReasonId: holdReasons ? holdReasons.holdReasonId : null,
                  caseId: orCases.caseId,
                  investigateAccuser: prosWit,
                  investigateAccuserDate: pageQty,
                  investigateDefendant: accuWit,
                  investigateDefendantDate: pageQty2,
                  investigateOther: otherWit,
                  investigateOtherDate: pageQty3,
                  status: resultId,
                };
                const createAppResults = await this.appointResultService.createData(payloadId, createAppResultData);

                const migrateLog4 = {
                  name: "ระบบการพิจารณาคดี: ผลการพิจารณาคดี",
                  serverType: `${process.env.SERVER_TYPE}`,
                  status: createCaseJudeges ? "SUCCESS" : "ERROR",
                  datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                  sourceDBType: "MYSQL",
                  sourceTableName: "pappointment",
                  sourceId: appRunning,
                  sourceData: JSON.stringify(source.items[index]),
                  destinationDBType: "ORACLE",
                  destinationTableName: "PC_PROCEED_APPOINT_RESULT",
                  destinationId: createAppResults.appointResultId,
                  destinationData: JSON.stringify(createAppResults)
                }; // เตรียมข้อมูล log ในการบันทึกข้อมูล

                // await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(migrateLog4)); // เพิ่ม Log การ Migrate ข้อมูล
                /* ############################################################ */
              }
            }
          }
        }
      }

      return migrateLogs;
    } catch (error) {
      throw new HttpException(`[oracle: migrate appoint failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
