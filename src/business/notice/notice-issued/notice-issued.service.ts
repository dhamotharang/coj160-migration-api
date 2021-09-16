import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperService } from 'src/shared/helpers/helper.service';
import { Repository } from 'typeorm';
import { OracleNoticeIssuedDTO } from '../dto/notice-issued.dto';
import { OracleNoticeProvincialDTO } from '../dto/notice-provincial.dto';
import { OracleNoticeIssueds } from '../entities/oracle/notice-issued.entity';

@Injectable()
export class NoticeIssuedService extends HelperService {
  constructor(
    @InjectRepository(OracleNoticeIssueds)
    private oracleNoticeIssuedRepositories: Repository<OracleNoticeIssueds>,
  ) {
    super();
  }


  // Filter zone
  async oracleFilter(conditions, filters: any = null, moduleId: number = 0) {
    try {
      if (moduleId > 0) {
        await conditions.where("A.issuedId = :moduleId", { moduleId });
      } else {
        await conditions.where("A.removedBy = 0");
      }

      if (filters) {
        const { text, orderNo, emsCode, hasMoney, isCancelIssued, isCourtArea, notes, noticeId, receiptId, receivedNoticeDate, sendNoticeDate, pnType, subdistrictName, chequeNo, payDate } = filters;
        if (typeof text !== "undefined") {
          await conditions.andWhere(`(A.subdistrictName LIKE '%${text}%' OR A.chequeNo LIKE '%${text}%')`)
        }

        if (typeof emsCode !== "undefined") {
          await conditions.andWhere("A.emsCode = :emsCode", { emsCode });
        }

        if (typeof hasMoney !== "undefined") {
          await conditions.andWhere("A.hasMoney = :hasMoney", { hasMoney });
        }

        if (typeof isCancelIssued !== "undefined") {
          await conditions.andWhere("A.isCancelIssued = :isCancelIssued", { isCancelIssued });
        }

        if (typeof isCourtArea !== "undefined") {
          await conditions.andWhere("A.isCourtArea = :isCourtArea", { isCourtArea });
        }

        if (typeof notes !== "undefined") {
          await conditions.andWhere("A.notes = :notes", { notes });
        }

        if (typeof noticeId !== "undefined") {
          await conditions.andWhere("A.noticeId = :noticeId", { noticeId });
        }

        if (typeof receiptId !== "undefined") {
          await conditions.andWhere("A.receiptId = :receiptId", { receiptId });
        }

        if (typeof receivedNoticeDate !== "undefined") {
          await conditions.andWhere("TO_CHAR(A.receivedNoticeDate, 'YYYY-MM-DD') = :receivedNoticeDate", { receivedNoticeDate });
        }

        if (typeof sendNoticeDate !== "undefined") {
          await conditions.andWhere("TO_CHAR(A.sendNoticeDate, 'YYYY-MM-DD') = :sendNoticeDate", { sendNoticeDate });
        }

        if (typeof pnType !== "undefined") {
          await conditions.andWhere("A.pnType = :pnType", { pnType });
        }

        if (typeof subdistrictName !== "undefined") {
          await conditions.andWhere("A.subdistrictName = :subdistrictName", { subdistrictName });
        }

        if (typeof chequeNo !== "undefined") {
          await conditions.andWhere("A.chequeNo = :chequeNo", { chequeNo });
        }

        if (typeof payDate !== "undefined") {
          await conditions.andWhere("TO_CHAR(A.payDate, 'YYYY-MM-DD')= :payDate", { payDate });
        }
      }

      return conditions;
    } catch (error) {
      throw new HttpException(`[oracle: filter] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


  // GET Method
  async findORACLEData(filters: any = null, pages: any = null) {
    try {
      const conditions = await this.oracleNoticeIssuedRepositories.createQueryBuilder("A");

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
      throw new HttpException(`[oracle: find notice issued failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findORACLEOneData(filters: any = null, moduleId: number = 0) {
    try {
      const conditions = await this.oracleNoticeIssuedRepositories.createQueryBuilder("A");

      await this.oracleFilter(conditions, filters, moduleId);

      const total = 1;

      const getItems = await conditions.getOne();
      const items = await (getItems ? getItems.toResponseObject() : null);

      return { items, total };
    } catch (error) {
      throw new HttpException(`[oracle: find one notice issued failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }



  // POST Method
  async createData(payloadId: number, data: OracleNoticeIssuedDTO) {
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

      const created = await this.oracleNoticeIssuedRepositories.create(createData);
      await this.oracleNoticeIssuedRepositories.save(created);

      return await created.toResponseObject();
    } catch (error) {
      throw new HttpException(`[oracle: create notice issued failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


  /* async createMigrationData(payloadId: number, filters: any = null) {
    try {
      let migrateLogs = [];
      let dupTotal: number = 0;
      let newTotal: number = 0;
      let errorTotal: number = 0;
      const params = await (await this.paramService.findORACLEOneData({ paramName: "COURT_ID" })).items; // ค้นหารหัสของศาล
      const source = await this.noticeService.findMYSQLData({ inoutFlag: 1 }); // ดึงค่า MySQL
      const total: number = source.total;

      if (params && await total > 0) {
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
            destinationDBType: "ORACLE",
            destinationTableName: "PC_NOTICE_ISSUED",
          }); // ตรวจสอบ Log การ Migrate ข้อมูล

          if (migrateLog1.total > 0) { // หากเคย Migrate ไปแล้วระบบจะบันทึกการทำซ้ำ
            dupTotal = dupTotal + 1;
            const logData = {
              name: "ระบบหมาย/ประกาศ: ข้อมูลการจ่ายหมาย",
              serverType: `${process.env.SERVER_TYPE}`,
              status: "DUPLICATE",
              datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
              sourceDBType: "MYSQL",
              sourceTableName: "pnotice",
              sourceId: noticeRunning,
              sourceData: JSON.stringify(source.items[index]),
              destinationDBType: "ORACLE",
              destinationTableName: "PC_NOTICE_ISSUED",
            };
            await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(logData)); // เพิ่ม Log การ Migrate ข้อมูล
          } else {

            const myCase = await (await this.caseService.findMYSQLOneData(null, runId)).items; // ค้นหา การเลื่อนพิจารณา (Oracle)
            const orCaseTitle = await this.oracleLookupTitleCaseRepositories.findOne({ titleCaseName: `${myCase.title}`.trim() }); // ค้นหา
            const orCaseLits = await this.oracleCaseLitRepositories.findOne({ caseId: runId, litigantName: `${noticetoName}`.trim() }); // ค้นหา
            const orCase = await (await this.caseService.findORACLEOneData({ convertStringCase: runId })).items; // ค้นหา การเลื่อนพิจารณา (Oracle)

            if (orCase) { // ถ้าไม่มีให้ทำงาน
              const orNoticeTypes = await (await this.noticeTypeService.findORACLEOneData({ noticeTypeName: noticeTypeName })).items; // ค้นหา การเลื่อนพิจารณา (Oracle)
              const orCaseAlles = await (await this.caseAlleService.findORACLEOneData({ caseId: orCase.caseId })).items; // ค้นหา การเลื่อนพิจารณา (Oracle)
              const orAllegantion = await (await this.lookupAllegationService.findORACLEOneData({ allegationId: orCaseAlles.allegationId })).items; // ค้นหา การเลื่อนพิจารณา (Oracle)
              // const orLitigants = await (await this.LitigantService.findMYSQLOneData({ allegationId: orCaseAlles.allegationId })).items; // ค้นหา การเลื่อนพิจารณา (Oracle)

              const createData = {
                address: `${addrNo} ${moo} ${addr} ${road} ${soi}`,
                noticeTypeId: orNoticeTypes.noticeTypeId,
                noticeCodeNo: noticeNo,
                noticeCodeYear: noticeYy,
                blackTitleId: orCaseTitle.titleCaseId,
                blackIdnum: parseInt(`${orCaseTitle.titleCaseId}${myCase.id}`),
                blackYear: parseInt(`${orCaseTitle.titleCaseId}${myCase.yy}`),
                moo,
                currentSubdistrictId: parseInt(tambonId),
                currentProvinceId: provId,
                currentDistrictId: parseInt(amphurId),
                accuDesc: myCase.accuDesc,
                litTypeId: orCaseLits.caseId,
                litigantName: orCaseLits.litigantName,
                prosDesc: myCase.prosDesc,
                road,
                sendDate: noticeSends ? noticeSends.sendDate : null,
                sendFee: sendAmt,
                sendMethod: sendBy,
                sendBy: noticeSends ? parseInt(noticeSends.sOfficerId) : null,
                noticeSendStatus: 1
              }; // เตรียมข้อมูลในการเพิ่ม

              const created = await this.createData(payloadId, createData); // เพิ่มข้อมูลการเลื่อนพิจารณาคดี
              if (created) {
                newTotal = newTotal + 1;
              } else {
                errorTotal = errorTotal + 1;
              }
              const migrateLog2 = {
                name: "ระบบหมาย/ประกาศ: ข้อมูลการจ่ายหมาย",
                serverType: `${process.env.SERVER_TYPE}`,
                status: (created ? "SUCCESS" : "ERROR"),
                datetime: this.dateFormat("YYYY-MM-DD H:i:s"),
                sourceDBType: "MYSQL",
                sourceTableName: "pnotice",
                sourceId: noticeRunning,
                sourceData: JSON.stringify(createData),
                destinationDBType: "ORACLE",
                destinationTableName: "PC_NOTICE_ISSUED",
                destinationId: created.noticeProvincialId,
                destinationData: JSON.stringify(created)
              }; // เตรียมข้อมูล log ในการบันทึกข้อมูล

              await migrateLogs.push(await this.migrateLogService.createPOSTGRESData(migrateLog2)); // เพิ่ม Log การ Migrate ข้อมูล

            }
          }
        }
      }

      return { migrateLogs, total, dupTotal, newTotal, errorTotal };
    } catch (error) {
      throw new HttpException(`[oracle: migrate notice failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  } */
}
