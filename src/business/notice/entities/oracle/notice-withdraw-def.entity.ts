import { HttpException, HttpStatus } from "@nestjs/common";
import { HelperService } from "src/shared/helpers/helper.service";
import { BeforeInsert, Column, Entity, getManager, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_NOTICE_WITHDRAW_DEF" })
export class OracleNoticeWithdrawDefs extends HelperService {
  constructor() {
    super();
  }
  @PrimaryGeneratedColumn({ name: "WITHDRAW_ID", comment: "รหัสข้อมูลเบิกตัวผู้ต้องขัง(AUTO INCREMENT)" }) withdrawId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "ANSWER_NOTICE", nullable: true, comment: "สอบคำให้การ" }) answerNotice: number;
  @Column({ name: "CASE_ID", comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "CASE_RESULT_ID", nullable: true, comment: "รหัสจำเลย เชื่อมโยง PC_CASE_LIT(หากมีจำเลยมากกว่า 1 คน ให้ส่ง ':' มาขั้นกลางเลขไอดี 1:2:3: N" }) caseResultId: string;
  @Column({ name: "COURT_ID", nullable: true, comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "DAY_OF_APPOINTMENT", nullable: true, comment: "ตามวันนัด" }) dayOfAppointment: number;
  @Column({ name: "DAY_OF_DEADLINE", nullable: true, comment: "ตามวันที่ครบกำหนด" }) dayOfDealine: number;
  @Column({ name: "DETAINEE_NAME", nullable: true, comment: "ผู้คุมขัง" }) detaineeName: string;
  @Column({ name: "END_NOTICE_ID", nullable: true, comment: "รหัสหมายเหตุสำหรับผู้ต้องขัง" }) endNoticeId: number;
  @Column({ name: "JUDGE_ID", nullable: true, comment: "รหัสผู้พิพากษาออกหมาย เชื่อมโยง PC_LOOKUP_JUDGE" }) judgeId: number;
  @Column({ name: "NOTICE_ID", comment: "รหัสหมายเหตุสำหรับผู้ต้องขัง" }) noticeId: number;
  @Column({ name: "PRISON_ID", nullable: true, comment: "รหัสเรือนจำ" }) prisonId: number;
  @Column({ name: "SELECT_DOCUMENT", nullable: true, comment: "เลือกเอกสารที่ต้องการ (1 : คำสั่งเบิกตัวผู้ต้องขัง, 2 : คำสั่งยกเลิก, 3 : ครบกำหนดฝากขัง" }) selectDocument: number;
  @Column({ name: "TO_COURT_DATE", type: "timestamp", nullable: true, comment: "วันที่และเวลาที่ต้องไปศาล" }) toCourtDate: Date;
  @Column({ name: "WITHDRAW_FROM_DATE", type: "timestamp", nullable: true, comment: "วันที่และเวลาที่เริ่มเบิกตัวผู้ต้องขัง" }) withdrawFromDate: Date;
  @Column({ name: "WITHDRAW_NOTE", nullable: true, comment: "หมายเหตุ" }) withdrawNote: string;
  @Column({ name: "WITHDRAW_PRINT_DATE", type: "timestamp", nullable: true, comment: "วันที่พิมพ์" }) withdrawPrintDate: Date;
  @Column({ name: "WITHDRAW_SEX", nullable: true, comment: "ชั้นศาล" }) withdrawSex: number;
  @Column({ name: "WITHDRAW_TO_DATE", type: "timestamp", nullable: true, comment: "วันที่และเวลาที่สิ้นสุดเบิกตัวผู้ต้องขัง" }) withdrawToDate: Date;
  @Column({ name: "WITHDRAW_TOTAL", nullable: true, comment: "จำนวนที่เบิก" }) withdrawTotal: number;
  @Column({ name: "APPOINT_LIST_ID", nullable: true, comment: "รหัสสาเหตุที่นัด เชื่อมโยงตาราง PC_LOOKUP_APPOINT_LIST" }) appointListId: number;
  @Column({ name: "WITHDRAW_NAME", nullable: true, comment: "ชื่อรูปแบบการเบิกตัว" }) withdrawName: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) removedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_NOTICE_WITHDRAW_DEF_SEQ".nextval ID FROM DUAL`);
      this.noticeId = res[0].ID;
      this.orderNo = res[0].ID;
    } catch (error) {
      throw new HttpException(`[oracle: notice withdraw def before insert failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  toResponseObject() {
    const { withdrawId, orderNo, answerNotice, caseId, caseResultId, courtId, dayOfAppointment, dayOfDealine, detaineeName, endNoticeId, judgeId, noticeId, prisonId, selectDocument, toCourtDate, withdrawFromDate, withdrawNote, withdrawPrintDate, withdrawSex, withdrawToDate, withdrawTotal, appointListId, withdrawName, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = {
      withdrawId, orderNo, answerNotice, caseId, caseResultId, courtId, dayOfAppointment, dayOfDealine,
      detaineeName, endNoticeId, judgeId, noticeId, prisonId, selectDocument, toCourtDate, withdrawFromDate,
      withdrawNote, withdrawPrintDate, withdrawSex, withdrawToDate, withdrawTotal, appointListId, withdrawName,
      createdBy, updatedBy, removedBy,
      createdDate: createdDate ? this.dateFormat("YYYY-MM-DD H:i:s", createdDate) : null,
      removedDate: removedDate ? this.dateFormat("YYYY-MM-DD H:i:s", removedDate) : null,
      updatedDate: updatedDate ? this.dateFormat("YYYY-MM-DD H:i:s", updatedDate) : null,
    };
    return responseObject;
  }
}