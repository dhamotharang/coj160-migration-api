import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MigrationLogService } from 'src/common/migrate/migration-log/migration-log.service';
import { DepartmentService } from 'src/common/organization/department/department.service';
import { MySQLDepartments } from 'src/common/organization/entities/mysql/department.entity';
import { OfficerService } from 'src/common/person/officer/officer.service';
import { UserProfileService } from 'src/common/person/user-profile/user-profile.service';
import { RequestTypeService } from 'src/common/request/request-type/request-type.service';
import { ParamService } from 'src/common/setting/param/param.service';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { CaseService } from '../case/case.service';
import { OracleLitigantDTO } from './dto/litigant.dto';
import { MySQLCaseLitigants } from './entities/mysql/case-litigant.entity';
import { MySQLRequests } from './entities/mysql/request.entity';
import { OracleLitigants } from './entities/oracle/litigant.entity';

@Injectable()
export class LitigantService extends HelperService {
  constructor(
    @InjectRepository(OracleLitigants) private readonly oracleLitigantRepositories: Repository<OracleLitigants>,
    @InjectRepository(MySQLCaseLitigants, "mysql") private readonly mysqlLitigantRepositories: Repository<MySQLCaseLitigants>,
    @InjectRepository(MySQLRequests, "mysql") private readonly mysqlRequestRepositories: Repository<MySQLRequests>,
    private readonly migrateLogService: MigrationLogService,
    private readonly paramService: ParamService,
    private readonly caseService: CaseService,
    private readonly requestTypeService: RequestTypeService,
    private readonly officerService: OfficerService,
    private readonly departmentService: DepartmentService,
    private readonly userProfileService: UserProfileService,
  ) {
    super();
  }

  // GET Method
  async findORACLEData(filters: any = null, pages: any = null, orders: any = null) {
    try {
      const { text, orderNo, dateFlag, activeFlag, courtId, selectCode } = filters;
      const conditions = await this.oracleLitigantRepositories.createQueryBuilder("A")
        .where("A.removedBy = 0");

      if (typeof text !== "undefined") {
        await conditions.andWhere(`(A.requestSubjectCode LIKE '%${text}%' OR A.requestSubjectName LIKE '%${text}%' OR A.selectCode LIKE '%${text}%')`)
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
          .orderBy("A.requestSubjectId", "DESC");
      }

      const getItems = await conditions.getMany();
      const items = await getItems.map(element => element.toResponseObject());

      return { items, total };
    } catch (error) {
      throw new HttpException(`[find oracle data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(filters: any = null) {
    try {
      const { text, orderNo, dateFlag, requestSubjectName, activeFlag, courtId, selectCode } = filters;
      const conditions = await this.oracleLitigantRepositories.createQueryBuilder("A")
        .where("A.requestSubjectId <> 0");

      if (typeof text !== "undefined") {
        await conditions.andWhere(`(A.requestSubjectCode LIKE '%${text}%' OR A.requestSubjectName LIKE '%${text}%' OR A.selectCode LIKE '%${text}%')`)
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

      if (typeof requestSubjectName !== "undefined") {
        await conditions.andWhere("A.requestSubjectName = :requestSubjectName", { requestSubjectName });
      }

      const total = 1;

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

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
      throw new HttpException(`[find mysql data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
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
      throw new HttpException(`[find mysql one data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
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
      throw new HttpException(`[create data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
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
          const orJudges = await (await this.userProfileService.findORACLEOneData(null, { userProfileFullName: myJudges.offName })).items; // ค้นหา พนักงาน (MySql)

          let department: any = {};
          if (orDepartments) {
            department = orDepartments;
          } else {
            department = await this.prepareCreateDepartment(myDepartments, parseInt(params.paramValue));
          }

          if (cases) {
            // เตรียมข้อมูลสำหรับทำการเพิ่ม คำคู่ความ
            const createData = {
              courtId: parseInt(params.paramValue),
              caseId: parseInt(`${cases.caseId}`),
              reqNo: parseInt(`${reqNo}`),
              reqNoYear: `${reqYY}`,
              refNo: parseInt(sequence),
              refNoYear: `${reqYY}`,
              litigantTypeId: parseInt(`${requestTypes ? requestTypes.requestTypeId : 1}`),
              litigantSubTypeCode: `${requestTypes ? requestTypes.requestTypeId : null}`,
              reqDescription: `${reqDesc ? reqDesc : "-"}`,
              reqDate: new Date(returnDate),
              reqReceivedBy: parseInt(`${orJudges ? orJudges.userProfileId : null}`),
              reqName: `${reqName ? reqName : "-"}`,
              submitReqBy: 0,
              submitDate: new Date(submitDate ? submitDate : null),
              courtOrderDetail: `${reqOrder ? reqOrder : "-"}`,
              courtOrderDate: new Date(orderDate ? orderDate : null),
              judgeId: parseInt(judgeId),
              sendOrderDate: new Date(sendDate ? sendDate : null),
              sendOrderDept: 0,
              sendOrderDescription: `${sendFor ? sendFor : "-"}`,
              notes: `${remark ? remark : "-"}`,
              acceptRequestDate: new Date(dateRcv),
              acceptRequestName: officers ? officers.offName : "-",
              acceptRequestDepartment: parseInt(department.departmentId),
              courtOrderRecordDate: new Date(userTypeDate),
              courtOrderRecordName: userTypeOrderName,
              courtOrderRecordDepartment: department.departmentId,
              litigantSubTypeName: subjectName ? subjectName : "-",
            };

            const created = await this.createData(payloadId, createData);

            const logData = {
              name: "เรื่องในคำคู่ความ",
              serverType: `${process.env.SERVER_TYPE}`,
              status: (created ? "SUCCESS" : "ERROR"),
              datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
              sourceDBType: "MYSQL",
              sourceTableName: "prequest_subject",
              sourceId: runId,
              sourceData: JSON.stringify(createData),
              destinationDBType: "ORACLE",
              destinationTableName: "PC_LOOKUP_REQUEST_SUBJECT",
              destinationId: created.litigantId,
              destinationData: JSON.stringify(created)
            };
            migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logData));
          }
        }
      }

      return migrateLogs;
    } catch (error) {
      throw new HttpException(`[Migrate data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
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
      throw new HttpException(`[prepare department data failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
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
