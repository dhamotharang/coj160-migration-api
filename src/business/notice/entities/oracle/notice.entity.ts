import { HttpException, HttpStatus } from "@nestjs/common";
import { HelperService } from "src/shared/helpers/helper.service";
import { BeforeInsert, Column, Entity, getManager, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_NOTICE" })
export class OracleNotices extends HelperService {
  constructor() {
    super();
  }
  @PrimaryGeneratedColumn({ name: "NOTICE_ID", comment: "รหัสข้อมูลหมายประกาศ(AUTO INCREMENT)" }) noticeId: number;
  @Column({ name: "ORDER_NO", type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "ADDRESS", nullable: true, comment: "เลขที่อยู่" }) address: string;
  @Column({ name: "ADDRESS_NEAR_LOCATION", nullable: true, comment: "สถานที่ใกล้เคียงกับ" }) addressNearLocation: string;
  @Column({ name: "ADDRESS_PLACE", nullable: true, comment: "สถานที่ที่ตั้ง" }) addressPlace: string;
  @Column({ name: "ALLEGATION_DETAIL", nullable: true, comment: "รายละเอียดฐานความผิด" }) allegationDetail: string;
  @Column({ name: "ALLEGATION_ID", nullable: true, comment: "รหัสฐานความผิด เชื่อมโยง PC_LOOKUP_ALLEGATION" }) allegationId: number;
  @Column({ name: "ALLEY", nullable: true, comment: "ซอยที่อยู่" }) alley: string;
  @Column({ name: "APPOINT_LIST_CODE", nullable: true, comment: "รหัสนัด" }) appointListCode: string;
  @Column({ name: "APPOINT_LIST_NAME", nullable: true, comment: "รายละเอียดนัด" }) appointListName: string;
  @Column({ name: "CANCEL_REASON", nullable: true, comment: "สาเหตุการยกเลิกหมาย" }) cancelReason: string;
  @Column({ name: "CANCEL_STATUS", nullable: true, comment: "สถานะยกเลิกหมาย" }) cancelStatus: number;
  @Column({ name: "CASE_ID", comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "COURT_ID", nullable: true, comment: "รหัสศาลเจ้าของระบบ เชื่อมโยงตาราง PC_LOOK_COURT" }) courtId: number;
  @Column({ name: "COURT_TYPE", nullable: true, comment: "ชั้นศาล" }) courtType: string;
  @Column({ name: "CURRENT_DISTRICT_ID", nullable: true, comment: "รหัสอำเภอ เชื่อมโยง PC_LOOKUP_DISTRICT" }) currentDistrictId: number;
  @Column({ name: "CURRENT_POST_CODE", nullable: true, comment: "รหัสไปรษณีย์" }) currentPostCode: string;
  @Column({ name: "CURRENT_PROVINCE_ID", nullable: true, comment: "รหัสจังหวัด เชื่อมโยง PC_LOOKUP_PROVINCE" }) currentProvinceId: number;
  @Column({ name: "CURRENT_SUBDISTRICT_ID", nullable: true, comment: "รหัสตำบล เชื่อมโยง PC_LOOKUP_SUBDISTRICT" }) currentSubdistrictId: number;
  @Column({ name: "DECREE_NO", nullable: true, comment: "คำบังคับครั้งที่" }) decreeNo: number;
  @Column({ name: "DEPARTMENT_ID", nullable: true, comment: "รหัสหน่วยงาน เชื่อมโยง PC_LOOKUP_DEPARTMENT" }) departmentId: number;
  @Column({ name: "IMPRISON_DAY", nullable: true, comment: "ให้จำคุกกี่วัน" }) imprisonDay: string;
  @Column({ name: "IMPRISON_NOTE", nullable: true, comment: "รายละเอียดเพิ่มเติม" }) imprisonNote: string;
  @Column({ name: "IMPRISONED_DAYS", nullable: true, comment: "จำคุกมาแล้ว" }) imprisonedDays: number;
  @Column({ name: "IS_CANCEL", nullable: true, comment: "ยกเลิกหมาย" }) isCancel: number;
  @Column({ name: "IS_COUNTRY_AREA", nullable: true, comment: "อยู่ในเขตพื้นที่" }) isCountryArea: number;
  @Column({ name: "IS_COURT_AREA", nullable: true, comment: "หมายในเขต" }) isCourtArea: number;
  @Column({ name: "JUDGE_ID", nullable: true, comment: "ผู้พิพากษาเชื่อมโยง PC_LOOKUP_JUDGE" }) judgeId: number;
  @Column({ name: "LAW_NUMBER", nullable: true, comment: "ต้องตามกฎหมาย" }) lawNumber: string;
  @Column({ name: "LITIGANT_ID", nullable: true, comment: "รหัสจำเลย เชื่อมโยง PC_CASELIT" }) litigantId: number;
  @Column({ name: "LITIGANT_RANK", nullable: true, comment: "ลำดับที่คู่ความ" }) litigantRank: number;
  @Column({ name: "LITIGANT_RECEIVED_DATE", type: "timestamp", comment: "วันที่คู่ความรับหมาย" }) litigantReceivedDate: Date;
  @Column({ name: "MOO", nullable: true, comment: "หมู่" }) moo: string;
  @Column({ name: "NOTICE_ALLDAY", nullable: true, comment: "นัดทั้งวัน" }) noticeAllday: number;
  @Column({ name: "NOTICE_CODE_NO", nullable: true, comment: "เลขที่หมาย" }) noticeCodeNo: number;
  @Column({ name: "NOTICE_CODE_YEAR", nullable: true, comment: "ปีที่ออกหมาย" }) noticeCodeYear: number;
  @Column({ name: "NOTICE_COLOR", nullable: true, comment: "สีหมาย" }) noticeColor: string;
  @Column({ name: "NOTICE_DATE", type: "timestamp", comment: "วันที่่นัด" }) noticeDate: Date;
  @Column({ name: "NOTICE_IS_AGENT", nullable: true, comment: "ส่งให้ตัวแทน" }) noticeIsAgent: number;
  @Column({ name: "NOTICE_PRINT", nullable: true, comment: "จำแนกประเภทหมายสี หมายขาว และประกาศศาล" }) noticePrint: string;
  @Column({ name: "NOTICE_REASON", nullable: true, comment: "หมายเหตุ" }) noticeReason: string;
  @Column({ name: "NOTICE_SEND_STATUS", nullable: true, comment: "สถานะการจ่ายหมาย 0 = ยังไม่จ่าย , 1 = จ่ายล้ว," }) noticeSendStatus: number;
  @Column({ name: "NOTICE_TYPE_CODE", nullable: true, comment: "รหัสแทนประเภทหมาย" }) noticeTypeCode: string;
  @Column({ name: "NOTICE_TYPE_ID", comment: "รหัสประเภทหมาย เชื่อมโยง PC_LOOKUP_NOTICETYPE" }) noticeTypeId: number;
  @Column({ name: "NOTICE_TYPE_NAME", nullable: true, comment: "ชั้ื่อประเภทหมาย" }) noticeTypeName: string;
  @Column({ name: "OFFICER_RECEIVED_BY", nullable: true, comment: "รหัสเจ้าหน้าที่รับหมาย เชื่อมโยง PC_USER_PROFILE" }) officerReceivedBy: number;
  @Column({ name: "ORDER_SEND_METHOD", nullable: true, comment: "ศาลสั่งให้ส่งหมายโดย" }) orderSendMethod: string;
  @Column({ name: "PHONE_NUMBER", nullable: true, comment: "หมายเลขโทรศัพท์" }) phoneNumber: string;
  @Column({ name: "POST_DEBT_DATE", type: "timestamp", comment: "วันที่เริ่มใช้อัตราค่าส่งหมาย" }) postDebtDate: Date;
  @Column({ name: "POST_DEBT_NO", nullable: true, comment: "เลขที่ใบแจ้งหนี้ไปรษณีย์" }) postDebtNo: string;
  @Column({ name: "POST_INVOICE_DATE", type: "timestamp", comment: "วันที่ไปรษณีย์ขอเบิกเงินค่าส่ง" }) postInvoiceDate: Date;
  @Column({ name: "POST_SEND_RESULT", nullable: true, comment: "ผลการส่งหมาย" }) postSendResult: number;
  @Column({ name: "POST_SEND_TRANS_DATE", type: "timestamp", comment: "วันที่รับผลหมายจากไปรษณีย์" }) postSendTransDate: Date;
  @Column({ name: "PRINT_BY", nullable: true, comment: "รหัสผู้พิมพ์หมาย เชื่อมโยง PC_USER_PROFILE" }) printBy: number;
  @Column({ name: "PRINT_DATE", type: "timestamp", comment: "วันที่พิมพ์หมาย" }) printDate: Date;
  @Column({ name: "PRISON_ID", nullable: true, comment: "รหัสเรือนจำ เชื่อมโยง PC_LOOKUP_PRISON" }) prisonId: number;
  @Column({ name: "RECEIVED_BY", nullable: true, comment: "รหัสผู้รับหมาย เชื่อมโยง PC_USER_PROFILE" }) receivedBy: number;
  @Column({ name: "RELEASE_DATE", type: "timestamp", comment: "วันที่ปลดหมาย" }) releaseDate: Date;
  @Column({ name: "ROAD", nullable: true, comment: "ถนน" }) road: string;
  @Column({ name: "SECTION", nullable: true, comment: "มาตรา" }) section: string;
  @Column({ name: "SEND_BY", nullable: true, comment: "รหัสผู้เดินหมาย เชื่อมโยง PC_USER_PROFILE" }) sendBy: number;
  @Column({ name: "SEND_DATE", type: "timestamp", comment: "วันที่ส่งหมาย" }) sendDate: Date;
  @Column({ name: "SEND_FEE", type: "float", comment: "ค่าส่งหมาย/ค่าส่งคำคู่ความ" }) sendFee: number;
  @Column({ name: "SEND_METHOD", nullable: true, comment: "วิธีการส่งหมาย 1 = ไปรษณีย์ 2 = เจ้าหน้าที่  เชื่อมโยง PC_LOOKUP_SEND_METHOD" }) sendMethod: number;
  @Column({ name: "SEND_TO_COURT", nullable: true, comment: "ส่งหมายไปยังศาล" }) sendToCourt: number;
  @Column({ name: "SINE_THE_DATE", type: "timestamp", comment: "ต้องขังเริ่มวันที่" }) sineTheDate: Date;
  @Column({ name: "TELEPHONE_AGENCY", nullable: true, comment: "เบอร์โทรศัพท์ศาล" }) telephoneAgency: string;
  @Column({ name: "TYPE_OF_SUBPOENA", nullable: true, comment: "หมายนำศาล" }) typeOfSubpoena: number;
  @Column({ name: "UNSEND_DETAIL", nullable: true, comment: "เหตุที่ส่งไม่ได้" }) unsendDetail: string;
  @Column({ name: "LITIGANT_NAME", nullable: true, comment: "ชื่อคู่ความ กรณีไม่ได้เลือกจาก CaseLit" }) litigantName: string;
  @Column({ name: "ALLE_DESC", nullable: true, comment: "ชื่อฐานความผิด" }) alleDesc: string;
  @Column({ name: "END_NOTICE_ID", nullable: true, comment: "รหัสท้ายหมาย เชื่อมโยง PC_LOOKUP_ENDNOTICE" }) endNoticeId: number;
  @Column({ name: "NOTICE_TYPE_CODE_REF", nullable: true, comment: "รหัสแทนประเภทหมายอ้างอิง" }) noticeTypeCodeRef: string;
  @Column({ name: "NOTICE_TYPE_ID_REF", nullable: true, comment: "รหัสประเภทหมายอ้างอิง เชื่อมโยง PC_LOOKUP_NOTICETYPE" }) noticeTypeIdRef: number;
  @Column({ name: "NOTICE_RELEASE_NOTE", nullable: true, comment: "เหตุที่ปล่อยตัว" }) noticeReleaseNotice: string;
  @Column({ name: "NOTICE_SEND_RESULT_STATUS", nullable: true, comment: "สถานะการลงผลการส่งหมาย" }) noticeSendResultStatus: number;
  @Column({ name: "BACKPAGE", nullable: true, comment: "ด้านหลัง" }) backpage: string;
  @Column({ name: "IMPRISON", nullable: true, comment: "กักขัง" }) impirson: string;
  @Column({ name: "IMPRISONMENT", nullable: true, comment: "จำคุกระหว่าง" }) imprisonment: string;
  @Column({ name: "NOTICE_NOW_RESON", nullable: true, comment: "บัดนี้" }) noticeNowReson: string;
  @Column({ name: "RUBBER_STAMP", nullable: true, comment: "ตรายางความผิด" }) rubberStamp: string;
  @Column({ name: "CARE_TAKER", nullable: true, comment: "ผู้คุมขัง" }) careTaker: string;
  @Column({ name: "COURT_APPOINT_DATE", nullable: true, comment: "ศาลนัดวันที่" }) courtAppointDate: Date;
  @Column({ name: "COURT_COMMAND", nullable: true, comment: "คำสั่งศาล" }) courtCommand: string;
  @Column({ name: "CURRENT_STATUS", nullable: true, comment: "สถานะ" }) currentStatus: string;
  @Column({ name: "PRISONER", nullable: true, comment: "ผู้ต้องขัง" }) prisoner: string;
  @Column({ name: "END_NOTICE_NAME", nullable: true, comment: "หมายเหตุท้ายหมาย" }) endNoticeName: string;
  @Column({ name: "NOTICE_RED_DATE", type: "timestamp", comment: "วันที่หมายแดง" }) noticeRedDate: Date;
  @Column({ name: "BOOK_ACCOUNT_ID", nullable: true, comment: "รหัสบัญชีธนาคาร เชื่อมโยง pc_lookup_bookAccounts" }) bookAccoutId: number;
  @Column({ name: "LITIGANT_TYPE_ID", nullable: true, comment: "รหัสประเภทคู่ความเชื่อมโยง pc_lookup_littype" }) litigantTypeId: number;
  @Column({ name: "IMPRISON_DETAIL", nullable: true, comment: "รายละเอียดจำนวนวัน จำคุก กักขัง และรายละเอียด" }) imprisonDetail: string;
  @Column({ name: "CREATED_BY", nullable: true, comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) removedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_NOTICE_SEQ".nextval ID FROM DUAL`);
      this.noticeId = res[0].ID;
      this.orderNo = res[0].ID;
    } catch (error) {
      throw new HttpException(`[oracle: notice before insert failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  toResponseObject() {
    const {
      noticeId, orderNo, address, addressNearLocation, addressPlace, allegationDetail, allegationId, alley, appointListCode,
      appointListName, cancelReason, cancelStatus, caseId, courtId, courtType, currentDistrictId, currentPostCode,
      currentProvinceId, currentSubdistrictId, decreeNo, departmentId, imprisonDay, imprisonNote, imprisonedDays,
      isCancel, isCountryArea, isCourtArea, judgeId, lawNumber, litigantId, litigantRank, litigantReceivedDate,
      moo, noticeAllday, noticeCodeNo, noticeCodeYear, noticeColor, noticeDate, noticeIsAgent, noticePrint,
      noticeReason, noticeSendStatus, noticeTypeCode, noticeTypeId, noticeTypeName, officerReceivedBy, orderSendMethod,
      phoneNumber, postDebtDate, postDebtNo, postInvoiceDate, postSendResult, postSendTransDate, printBy, printDate,
      prisonId, receivedBy, releaseDate, road, section, sendBy, sendDate, sendFee, sendMethod, sendToCourt, sineTheDate,
      telephoneAgency, typeOfSubpoena, unsendDetail, litigantName, alleDesc, endNoticeId, noticeTypeCodeRef, noticeTypeIdRef,
      noticeReleaseNotice, noticeSendResultStatus, backpage, impirson, imprisonment, noticeNowReson, rubberStamp, careTaker,
      courtAppointDate, courtCommand, currentStatus, prisoner, endNoticeName, noticeRedDate, bookAccoutId, litigantTypeId,
      imprisonDetail, createdBy, updatedBy, removedBy, createdDate, removedDate, updatedDate
    } = this;
    const responseObject = {
      noticeId, orderNo, address, addressNearLocation, addressPlace, allegationDetail, allegationId, alley, appointListCode,
      appointListName, cancelReason, cancelStatus, caseId, courtId, courtType, currentDistrictId, currentPostCode,
      currentProvinceId, currentSubdistrictId, decreeNo, departmentId, imprisonDay, imprisonNote, imprisonedDays,
      isCancel, isCountryArea, isCourtArea, judgeId, lawNumber, litigantId, litigantRank, litigantReceivedDate,
      moo, noticeAllday, noticeCodeNo, noticeCodeYear, noticeColor, noticeDate, noticeIsAgent, noticePrint,
      noticeReason, noticeSendStatus, noticeTypeCode, noticeTypeId, noticeTypeName, officerReceivedBy, orderSendMethod,
      phoneNumber, postDebtDate, postDebtNo, postInvoiceDate, postSendResult, postSendTransDate, printBy, printDate,
      prisonId, receivedBy, releaseDate, road, section, sendBy, sendDate, sendFee, sendMethod, sendToCourt, sineTheDate,
      telephoneAgency, typeOfSubpoena, unsendDetail, litigantName, alleDesc, endNoticeId, noticeTypeCodeRef, noticeTypeIdRef,
      noticeReleaseNotice, noticeSendResultStatus, backpage, impirson, imprisonment, noticeNowReson, rubberStamp, careTaker,
      courtAppointDate, courtCommand, currentStatus, prisoner, endNoticeName, noticeRedDate, bookAccoutId, litigantTypeId,
      imprisonDetail, createdBy, updatedBy, removedBy,
      createdDate: createdDate ? this.dateFormat("YYYY-MM-DD H:i:s", createdDate) : null,
      removedDate: removedDate ? this.dateFormat("YYYY-MM-DD H:i:s", removedDate) : null,
      updatedDate: updatedDate ? this.dateFormat("YYYY-MM-DD H:i:s", updatedDate) : null,
    };
    return responseObject;
  }
}