import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CaseService } from 'src/business/case/case/case.service';
import { MySQLDepartments } from 'src/common/lookup/entities/mysql/department.entity';
import { LookupDepartmentService } from 'src/common/lookup/lookup-department/lookup-department.service';
import { LookupRequestTypeService } from 'src/common/lookup/lookup-request-type/lookup-request-type.service';
import { MigrationLogService } from 'src/common/migrate/migration-log/migration-log.service';
import { OfficerService } from 'src/common/person/officer/officer.service';
import { UserProfileService } from 'src/common/person/user-profile/user-profile.service';
import { ParamService } from 'src/common/setting/param/param.service';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleLitigantDTO } from '../dto/litigant.dto';
import { MySQLCaseLitigants } from '../entities/mysql/case-litigant.entity';
import { MySQLRequests } from '../entities/mysql/request.entity';
import { OracleLitigants } from '../entities/oracle/litigant.entity';

@Injectable()
export class LitigantService extends HelperService {
  constructor(
    @InjectRepository(OracleLitigants) private readonly oracleLitigantRepositories: Repository<OracleLitigants>,
    @InjectRepository(MySQLCaseLitigants, "mysql") private readonly mysqlLitigantRepositories: Repository<MySQLCaseLitigants>,
    @InjectRepository(MySQLRequests, "mysql") private readonly mysqlRequestRepositories: Repository<MySQLRequests>,
    private readonly migrateLogService: MigrationLogService,
    private readonly paramService: ParamService,
    private readonly caseService: CaseService,
    private readonly requestTypeService: LookupRequestTypeService,
    private readonly officerService: OfficerService,
    private readonly departmentService: LookupDepartmentService,
    private readonly userProfileService: UserProfileService,
  ) {
    super();
  }

  // Filter zone
  async oracleFilter(conditions, filters, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.where("A.litigantId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.removedBy = 0");
      }

      if (filters) {
        const { text, dateFlag, activeFlag, orderNo, courtId, selectCode, reqNo, reqNoYear, litigantTypeId, litigantSubTypeCode } = filters;
        if (typeof text !== "undefined" && text !== "") {
          await conditions.andWhere(`(A.requestSubjectCode LIKE '%${text}%' OR A.requestSubjectName LIKE '%${text}%' OR A.selectCode LIKE '%${text}%' OR A.courtOrderDetail LIKE '%${text}%')`)
        }

        if (typeof dateFlag !== "undefined") {
          await conditions.andWhere("A.dateFlag = :dateFlag", { dateFlag });
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

        if (typeof selectCode !== "undefined") {
          await conditions.andWhere("A.selectCode = :selectCode", { selectCode });
        }

        if (typeof reqNo !== "undefined") {
          await conditions.andWhere("A.reqNo = :reqNo", { reqNo });
        }

        if (typeof reqNoYear !== "undefined") {
          await conditions.andWhere("A.reqNoYear = :reqNoYear", { reqNoYear });
        }

        if (typeof litigantTypeId !== "undefined") {
          await conditions.andWhere("A.litigantTypeId = :litigantTypeId", { litigantTypeId });
        }

        if (typeof litigantSubTypeCode !== "undefined") {
          await conditions.andWhere("A.litigantSubTypeCode = :litigantSubTypeCode", { litigantSubTypeCode });
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
        await conditions.where("A.litRunning = :moduleId", { moduleId });
      } else {
        await conditions.where("A.litRunning <> 0");
      }

      if (filters) {
        const { text, runId, courtRunning, subjectName, udFlag, dateFlag, createDepCode, userSubmitOrder } = filters;

        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.subjectName LIKE '%${text}%'`)
        }

        if (typeof runId !== "undefined") {
          await conditions.andWhere("A.runId = :runId", { runId });
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof subjectName !== "undefined") {
          await conditions.andWhere("A.subjectName = :subjectName", { subjectName });
        }

        if (typeof udFlag !== "undefined") {
          await conditions.andWhere("A.udFlag = :udFlag", { udFlag });
        }

        if (typeof dateFlag !== "undefined") {
          await conditions.andWhere("A.dateFlag = :dateFlag", { dateFlag });
        }

        if (typeof createDepCode !== "undefined") {
          await conditions.andWhere("A.createDepCode = :createDepCode", { createDepCode });
        }

        if (typeof userSubmitOrder !== "undefined") {
          await conditions.andWhere("A.userSubmitOrder = :userSubmitOrder", { userSubmitOrder });
        }
      }

      return await conditions;
    } catch (error) {
      throw new HttpException(`[mysql: filter failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async mysqlRequestFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId !== 0) {
        await conditions.where("A.reqRunning = :moduleId", { moduleId });
      } else {
        await conditions.where("A.reqRunning <> 0");
      }

      if (filters) {
        const { text, runId, courtRunning, subjectName, udFlag, dateFlag, createDepCode } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.subjectName LIKE '%${text}%'`)
        }

        if (typeof runId !== "undefined") {
          await conditions.andWhere("A.runId = :runId", { runId });
        }

        if (typeof courtRunning !== "undefined") {
          await conditions.andWhere("A.courtRunning = :courtRunning", { courtRunning });
        }

        if (typeof subjectName !== "undefined") {
          await conditions.andWhere("A.subjectName = :subjectName", { subjectName });
        }

        if (typeof udFlag !== "undefined") {
          await conditions.andWhere("A.udFlag = :udFlag", { udFlag });
        }

        if (typeof dateFlag !== "undefined") {
          await conditions.andWhere("A.dateFlag = :dateFlag", { dateFlag });
        }

        if (typeof createDepCode !== "undefined") {
          await conditions.andWhere("A.createDepCode = :createDepCode", { createDepCode });
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
      const conditions = await this.oracleLitigantRepositories.createQueryBuilder("A")
        .leftJoinAndSelect("A.cases", "B")
        .leftJoinAndSelect("A.courts", "C");

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
          .orderBy("A.litigantId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject(true));

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find litigant data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.oracleLitigantRepositories.createQueryBuilder("A")
        .leftJoinAndSelect("A.cases", "B")
        .leftJoinAndSelect("A.courts", "C");

      await this.oracleFilter(conditions, filters, moduleId);

      const total = 1;

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject(true) : null);

      return { items, total };
    } catch (error) {
      throw new HttpException(`[find oracle one data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const conditions = await this.mysqlLitigantRepositories.createQueryBuilder("A");

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
        await conditions.orderBy("A.litRunning", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[find mysql data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLRequestData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const conditions = await this.mysqlRequestRepositories.createQueryBuilder("A");

      await this.mysqlRequestFilter(conditions, filters);

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
        await conditions.orderBy("A.subjectId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[mysql: find request failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLRequestOneData(filters: any = null) {
    try {
      const conditions = await this.mysqlRequestRepositories.createQueryBuilder("A")

      await this.mysqlRequestFilter(conditions, filters);

      const getItems = await conditions.getOne();
      const items = await getItems.toResponseObject();

      return { items, total: 1 };
    } catch (error) {
      throw new HttpException(`[find mysql one litigant failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  async createData(payloadId: number, data: OracleLitigantDTO) {
    try {
      const createdDate = new Date(this.dateFormat("YYYY-MM-DD H:i:s"));
      const created = await this.oracleLitigantRepositories.create({
        ...data,
        createdBy: payloadId,
        updatedBy: payloadId,
        removedBy: 0, createdDate,
        updatedDate: createdDate,
        removedDate: createdDate
      });
      await this.oracleLitigantRepositories.save(created);
      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: create litigant data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async createMigrationData(payloadId: number, filters: any = null) {
    try {
      let migrateLogs = [];
      const params = await (await this.paramService.findORACLEOneData({ paramName: "COURT_ID" })).items; // ?????????????????????????????????????????????
      const source = await this.findMYSQLRequestData(); // ????????????????????????????????????????????????????????? MySQL
      const sourceTotal = await source.total;

      if (await sourceTotal > 0) {
        for (let index = 0; index < source.items.length; index++) {
          const {
            reqRunning, runId, reqNo, reqYY, sequence, reqDesc, subjectName, userSubmitOrder, dateRcv, depCodeSubmit, reqOrder, orderDate, userTypeDate,
            userTypeDepCode, userTypeOrderName, judgeId, returnDate, userReturnOrder, reqName, sendFor, sendDate, submitDate, remark
          } = source.items[index];

          const migresLogs1 = await (await this.migrateLogService.findPOSTGRESData({
            serverType: `${process.env.SERVER_TYPE}`,
            status: "SUCCESS",
            sourceDBType: "MYSQL",
            sourceTableName: "prequest",
            sourceId: reqRunning,
          })).items; // ????????????????????? Log ????????? Migrate ??????????????????

          if (migresLogs1.length > 0) {
            const logDup = {
              name: "???????????????????????????",
              serverType: `${process.env.SERVER_TYPE}`,
              status: "DUPLICATE",
              datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
              sourceDBType: "MYSQL",
              sourceTableName: "prequest",
              sourceId: reqRunning,
              sourceData: JSON.stringify(source.items[index]),
              destinationDBType: "ORACLE",
              destinationTableName: "PC_LITIGANT",
            };

            await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logDup)); // ??????????????? Log ????????? Migrate ??????????????????
          } else {

            const cases = await (await this.caseService.findORACLEOneData({ convertStringCase: runId })).items; // ???????????????????????? (Oracle)
            const requestTypes = await (await this.requestTypeService.findORACLEOneData({ requestTypeName: reqDesc })).items; // ??????????????? ????????????????????????????????????????????? (Oracle)
            const officers = await (await this.officerService.findMYSQLOneData(parseInt(userSubmitOrder))).items; // ??????????????? ????????????????????? (MySql)
            const myDepartments: any = await (await this.departmentService.findMYSQLOneData(depCodeSubmit)).items;// ??????????????? ???????????????????????? (MySql)
            const orDepartments = await (await this.departmentService.findORACLEOneData(null, { departmentName: myDepartments.depName })).items;// ??????????????? ???????????????????????? (MySql)
            const myJudges = await (await this.officerService.findMYSQLOneData(parseInt(userReturnOrder))).items; // ??????????????? ????????????????????? (MySql)
            const orJudges = await (await this.userProfileService.findORACLEOneData(null, { userProfileFullName: `${myJudges.offName}`.trim() })).items; // ??????????????? ????????????????????? (MySql)

            let department: any = {};
            if (orDepartments) {
              department = orDepartments;
            } else {
              department = await this.prepareCreateDepartment(myDepartments, parseInt(params.paramValue));
            }

            if (cases) {
              // ???????????????????????????????????????????????????????????????????????????????????? ???????????????????????????
              const createData = {
                courtId: parseInt(params.paramValue),
                caseId: parseInt(`${cases.caseId}`),
                reqNo: parseInt(`${reqNo}`),
                reqNoYear: `${reqYY}`,
                refNo: sequence ? parseInt(sequence) : null,
                refNoYear: `${reqYY}`,
                litigantTypeId: requestTypes ? parseInt(`${requestTypes.requestTypeId}`) : 1,
                litigantSubTypeCode: `${requestTypes ? requestTypes.requestTypeId : null}`,
                reqDescription: `${reqDesc ? reqDesc : "-"}`,
                reqDate: this.dateFormat("YYYY-MM-DD H:i:s", returnDate),
                reqReceivedBy: orJudges ? parseInt(`${orJudges.userProfileId}`) : null,
                reqName: `${reqName ? reqName : "-"}`,
                submitReqBy: 0,
                submitDate: submitDate ? this.dateFormat("YYYY-MM-DD H:i:s", submitDate) : null,
                courtOrderDetail: `${reqOrder ? reqOrder : "-"}`,
                courtOrderDate: orderDate ? this.dateFormat("YYYY-MM-DD H:i:s", orderDate) : null,
                judgeId: orJudges ? parseInt(`${orJudges.userProfileId}`) : null,
                sendOrderDate: sendDate ? this.dateFormat("YYYY-MM-DD H:i:s", sendDate) : null,
                sendOrderDept: 0,
                sendOrderDescription: `${sendFor ? sendFor : "-"}`,
                notes: `${remark ? remark : "-"}`,
                acceptRequestDate: dateRcv ? this.dateFormat("YYYY-MM-DD H:i:s", dateRcv) : null,
                acceptRequestName: officers ? officers.offName : "-",
                acceptRequestDepartment: parseInt(department.departmentId),
                courtOrderRecordDate: userTypeDate ? this.dateFormat("YYYY-MM-DD H:i:s", userTypeDate) : null,
                courtOrderRecordName: userTypeOrderName,
                courtOrderRecordDepartment: department.departmentId,
                litigantSubTypeName: subjectName ? subjectName : "-",
              };

              const created = await this.createData(payloadId, createData);

              const logData = {
                name: "???????????????????????????",
                serverType: `${process.env.SERVER_TYPE}`,
                status: (created ? "SUCCESS" : "ERROR"),
                datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                sourceDBType: "MYSQL",
                sourceTableName: "prequest",
                sourceId: reqRunning,
                sourceData: JSON.stringify(createData),
                destinationDBType: "ORACLE",
                destinationTableName: "PC_LITIGANT",
                destinationId: created.litigantId,
                destinationData: JSON.stringify(created)
              };

              migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logData));
            } else {
              const unknowLog = {
                name: "???????????????????????????",
                serverType: `${process.env.SERVER_TYPE}`,
                status: "UNKNOW",
                datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                sourceDBType: "MYSQL",
                sourceTableName: "prequest",
                sourceId: reqRunning,
                sourceData: JSON.stringify(source.items[index]),
                destinationDBType: "ORACLE",
                destinationTableName: "PC_LITIGANT",
              };

              await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(unknowLog)); // ??????????????? Log ????????? Migrate ??????????????????
            }
          }
        }
      }

      const filterCountLogs = {
        serverType: `${process.env.SERVER_TYPE}`,
        destinationDBType: "ORACLE",
        destinationTableName: "PC_LITIGANT",
      };

      const cntDestination = await this.oracleLitigantRepositories.createQueryBuilder("A")
      const errorTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "ERROR" });
      const duplicateTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "DUPLICATE" });
      const unknowTotal = await this.migrateLogService.countData({ ...filterCountLogs, status: "UNKNOW" });
      const destinationOldTotal = await (await this.oracleFilter(cntDestination, filters)).andWhere("A.createdBy <> 999").getCount();
      const destinationNewTotal = await (await this.oracleFilter(cntDestination, filters)).andWhere("A.createdBy = 999").getCount();
      const destinationTotal = await (await this.oracleFilter(cntDestination, filters)).getCount();

      return { migrateLogs, sourceTotal, destinationOldTotal, destinationNewTotal, duplicateTotal, unknowTotal, errorTotal, destinationTotal };
    } catch (error) {
      throw new HttpException(`[oracle: litigant migrate data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async prepareCreateDepartment(items: MySQLDepartments, courtId: number) {
    try {
      const { depName, depTelNo, bookAccount, bankId } = items;
      const createObject = {
        bankId,
        bookAccount,
        courtId,
        departmentName: depName,
        tel: depTelNo
      };

      return await this.departmentService.createData(999, createObject);
    } catch (error) {
      throw new HttpException(`[oracle: prepare for create department data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  /*
  async createMigrationData(payloadId: number, filters: any = null) {
     try {
       const source = await this.findMYSQLData();
       let migrateLogs = {};
       if (await source.total > 0) {
         for (let index = 0; index < source.items.length; index++) {
           const element = source.items[index];
           const destination: any = await (await this.caseService.findORACLEOneData({ convertStringCase: `${element.subjectName}`.trim() })).items;

           if (!destination) {
             const params = await (await this.paramService.findORACLEOneData({ paramName: "COURT_ID" })).items;
             const created = await this.createData(payloadId, {
               requestSubjectName: `${element.subjectName}`.trim(),
               courtId: parseInt(params.paramValue),
               activeFlag: 1,
             });

             const logData = {
               name: "???????????????????????????????????????????????????",
               serverType: `${process.env.SERVER_TYPE}`,
               status: (created ? "SUCCESS" : "ERROR"),
               datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
               sourceDBType: "MYSQL",
               sourceTableName: "prequest_subject",
               sourceId: element.subjectId,
               sourceData: JSON.stringify(element),
               destinationDBType: "ORACLE",
               destinationTableName: "PC_LOOKUP_REQUEST_SUBJECT",
               destinationId: created.requestSubjectId,
               destinationData: JSON.stringify(created)
             };
             migrateLogs = await this.migrateLogService.createPOSTGRESData(logData);
           }
         }
       }

       return migrateLogs;
     } catch (error) {
       throw new HttpException(`[Migrate data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST)
     }
   } */
}
