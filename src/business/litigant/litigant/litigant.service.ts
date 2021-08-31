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
  async oracleFilter(conditions, filters, moduleId: number = null) {
    try {
      Logger.log(filters, "filters");
      if (moduleId) {
        await conditions.andWhere("A.litigantId = :moduleId", { moduleId });
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



  // GET Method
  async findORACLEData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const { text, orderNo, dateFlag, activeFlag, courtId, selectCode } = filters;
      const conditions = await this.oracleLitigantRepositories.createQueryBuilder("A")
        .leftJoinAndSelect("A.cases", "B")
        .leftJoinAndSelect("A.courts", "C")
        .where("A.removedBy = 0");

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

  async findORACLEOneData(filters: any = null) {
    try {
      const conditions = await this.oracleLitigantRepositories.createQueryBuilder("A")
        .where("A.litigantId <> 0");

      await this.oracleFilter(conditions, filters, (typeof filters.litigantId !== "undefined" ? filters.litigantId : null));

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
      const conditions = await this.mysqlLitigantRepositories.createQueryBuilder("A")
        .where("A.subjectId <> 0");

      if (filters) {
        const { text, courtRunning, subjectName, udFlag, dateFlag, createDepCode } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`A.subjectName LIKE '%${text}%'`)
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
      throw new HttpException(`[find mysql data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findMYSQLRequestData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const conditions = await this.mysqlRequestRepositories.createQueryBuilder("A")
        .where("A.reqRunning <> 0");

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
        .where("A.reqRunning <> 0");

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
      const created = await this.oracleLitigantRepositories.create({ ...data, createdBy: payloadId, updatedBy: payloadId, removedBy: 0, createdDate, updatedDate: createdDate });
      await this.oracleLitigantRepositories.save(created);
      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: create litigant data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async createMigrationData(payloadId: number, filters: any = null) {
    try {
      let migrateLogs = [];
      const params = await (await this.paramService.findORACLEOneData({ paramName: "COURT_ID" })).items; // ค้นหารหัสของศาล
      const source = await this.findMYSQLRequestData(); // ดึงค่าคำคู่ความฝั่ง MySQL

      if (params && await source.total > 0) {
        for (let index = 0; index < source.items.length; index++) {
          const {
            runId, reqNo, reqYY, sequence, reqDesc, subjectName, userSubmitOrder, dateRcv, depCodeSubmit, reqOrder, orderDate, userTypeDate,
            userTypeDepCode, userTypeOrderName, judgeId, returnDate, userReturnOrder, reqName, sendFor, sendDate, submitDate, remark
          } = source.items[index];

          const cases = await (await this.caseService.findORACLEOneData({ convertStringCase: runId })).items; // ค้นหาคดี (Oracle)
          const requestTypes = await (await this.requestTypeService.findORACLEOneData({ requestTypeName: reqDesc })).items; // ค้นหา ประเภทคำคู่ความ (Oracle)
          const officers = await (await this.officerService.findMYSQLOneData(parseInt(userSubmitOrder))).items; // ค้นหา พนักงาน (MySql)
          const myDepartments: any = await (await this.departmentService.findMYSQLOneData(depCodeSubmit)).items;// ค้นหา หน่วยงาน (MySql)
          const orDepartments = await (await this.departmentService.findORACLEOneData(null, { departmentName: myDepartments.depName })).items;// ค้นหา หน่วยงาน (MySql)
          const myJudges = await (await this.officerService.findMYSQLOneData(parseInt(userReturnOrder))).items; // ค้นหา พนักงาน (MySql)
          const orJudges = await (await this.userProfileService.findORACLEOneData(null, { userProfileFullName: `${myJudges.offName}`.trim() })).items; // ค้นหา พนักงาน (MySql)

          let department: any = {};
          if (orDepartments) {
            department = orDepartments;
          } else {
            department = await this.prepareCreateDepartment(myDepartments, parseInt(params.paramValue));
          }

          if (!cases) {
            Logger.log("########################################################################", "NULL_DATA");
            Logger.log(cases, "cases");
          }
          if (!requestTypes) {
            Logger.log("########################################################################", "NULL_DATA");
            Logger.log(requestTypes, "requestTypes");
          }
          if (!officers) {
            Logger.log("########################################################################", "NULL_DATA");
            Logger.log(officers, "officers");
          }
          if (!myDepartments) {
            Logger.log("########################################################################", "NULL_DATA");
            Logger.log(myDepartments, "myDepartments");
          }
          if (!orDepartments) {
            Logger.log("########################################################################", "NULL_DATA");
            Logger.log(orDepartments, "orDepartments");
          }
          if (!myJudges) {
            Logger.log("########################################################################", "NULL_DATA");
            Logger.log(myJudges, "myJudges");
          }
          if (!orJudges) {
            Logger.log("########################################################################", "NULL_DATA");
            Logger.log(orJudges, "orJudges");
          }

          if (cases) {
            // เตรียมข้อมูลสำหรับทำการเพิ่ม คำคู่ความ
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
              name: "คำคู่ความ",
              serverType: `${process.env.SERVER_TYPE}`,
              status: (created ? "SUCCESS" : "ERROR"),
              datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
              sourceDBType: "MYSQL",
              sourceTableName: "pcase_litigant",
              sourceId: runId,
              sourceData: JSON.stringify(createData),
              destinationDBType: "ORACLE",
              destinationTableName: "PC_LITIGANT",
              destinationId: created.litigantId,
              destinationData: JSON.stringify(created)
            };
            migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logData));
          }
        }
      }

      return migrateLogs;
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
               name: "เรื่องในคำคู่ความ",
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
