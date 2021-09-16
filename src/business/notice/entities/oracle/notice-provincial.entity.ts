import { HttpException, HttpStatus } from "@nestjs/common";
import { HelperService } from "src/shared/helpers/helper.service";
import { BeforeInsert, Column, Entity, getManager, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_NOTICE_PROVINCIAL" })
export class OracleNoticeProvincials extends HelperService {
  constructor() {
    super();
  }
  @PrimaryGeneratedColumn({ name: "NOTICE_PROVINCIAL_ID", comment: "รหัสข้อมูลหมายต่างจังหวัด(AUTO INCREMENT)" }) noticeProvincialId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "ACCU_DESC", nullable: true, comment: "ชื่อโจทย์" }) accuDesc: string;
  @Column({ name: "ADDRESS", comment: "บ้านเลขที่" }) address: string;
  @Column({ name: "ADDRESS_NEAR_LOCATION", nullable: true, comment: "สถานที่ี่ใกล้เคียงกับ" }) addressNearLocation: string;
  @Column({ name: "ADDRESS_PLACE", nullable: true, comment: "สถานที่ที่ตั้ง" }) addressPlace: string;
  @Column({ name: "ALLEGATION_DETAIL", nullable: true, comment: "ฐานความผิด" }) allegationDetail: string;
  @Column({ name: "ALLEY", nullable: true, comment: "ซอย" }) alley: string;
  @Column({ name: "BLACK_IDNUM", comment: "เลขคดีดำ" }) blackIdnum: number;
  @Column({ name: "BLACK_TITLE_ID", comment: "รหัสคำนำหน้าคดีดำ" }) blackTitleId: number;
  @Column({ name: "BLACK_YEAR", comment: "ปีเลขคดีดำ" }) blackYear: number;
  @Column({ name: "CANCEL_REASON", nullable: true, comment: "หมายเหตุที่ยกเลิก" }) cancelReason: string;
  @Column({ name: "CASE_CATE_ID", nullable: true, comment: "รหัสคู่ความ เชื่อมโยง PC_CASE_LIT" }) caseCateId: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "CURRENT_DISTRICT_ID", comment: "รหัสอำเภอ เชื่อมโยง PC_LOOKUP_DISTRICT" }) currentDistrictId: number;
  @Column({ name: "CURRENT_POST_CODE", nullable: true, comment: "รหัสไปรษณีย์" }) currentPostCode: string;
  @Column({ name: "CURRENT_PROVINCE_ID", comment: "รหัสจังหวัด เชื่อมโยง PC_LOOKUP_PROVINCE" }) currentProvinceId: number;
  @Column({ name: "CURRENT_SUBDISTRICT_ID", comment: "รหัสตำบล เชื่อมโยง PC_LOOKUP_SUBDISTRICT" }) currentSubdistrictId: number;
  @Column({ name: "IS_CANCEL", nullable: true, comment: "ยกเลิกหมาย" }) isCancel: number;
  @Column({ name: "IS_COURT_AREA", nullable: true, comment: "ตัวเลือกเป็นหมายในเขตหรือหมายนอกเขต" }) isCourtArea: number;
  @Column({ name: "LITIGANT_RECEIVED_DATE", type: "timestamp", nullable: true, comment: "วันที่คู่ความรับหมาย" }) litigantReceivedDate: Date;
  @Column({ name: "MOO", comment: "หมู่" }) moo: string;
  @Column({ name: "NOTICE_CODE_NO", nullable: true, comment: "เลขที่หมาย" }) noticeCodeNo: number;
  @Column({ name: "NOTICE_CODE_YEAR", comment: "ปีที่ออกหมาย" }) noticeCodeYear: number;
  @Column({ name: "NOTICE_PRINT", nullable: true, comment: "ตัวเลือกประเภทหมาย(01 : หมายขาว, 02 : หมายสี, 03 : หมายประกาศ" }) noticePrint: string;
  @Column({ name: "NOTICE_SEND_STATUS", nullable: true, comment: "สถานะลงผลการส่งหมาย" }) noticeSendStatus: number;
  @Column({ name: "NOTICE_TYPE_ID", comment: "รหัสประเภทของหมาย เชื่อมโยงตาราง PC_LOOKUP_NOTICE_TYPE" }) noticeTypeId: number;
  @Column({ name: "OFFICER_RECEIVED_BY", nullable: true, comment: "รหัสเจ้าหน้าที่รับหมาย เชื่อมโยง PC_USER_PROFILE" }) officerReceivedBy: number;
  @Column({ name: "ORDER_SEND_METHOD", nullable: true, comment: "ทดสอบศาลสั่งให้ส่งหมายโดย" }) orderSendMethod: string;
  @Column({ name: "POST_DEBT_DATE", type: "timestamp", nullable: true, comment: "วันที่เริ่มใช้อัตราค่าส่งหมาย" }) postDebtDate: Date;
  @Column({ name: "POST_DEBT_NO", nullable: true, comment: "เลขที่ใบแจ้งหนี้ไปรษณีย์" }) postDebtNo: string;
  @Column({ name: "POST_INVOICE_DATE", type: "timestamp", nullable: true, comment: "วันที่ไปรษณีย์ขอเบิกเงินค่าส่ง" }) postInvoiceDate: Date;
  @Column({ name: "POST_SEND_RESULT", nullable: true, comment: "ผลการส่งหมาย" }) postSendResult: number;
  @Column({ name: "POST_SEND_TRANS_DATE", type: "timestamp", nullable: true, comment: "วันที่รับผลหมายจากไปรษณีย์" }) postSendTransDate: Date;
  @Column({ name: "PRINT_BY", nullable: true, comment: "รหัสผู้พิมพ์หมาย เชื่อมโยง PC_USER_PROFILE" }) printBy: number;
  @Column({ name: "PRINT_DATE", type: "timestamp", nullable: true, comment: "วันที่พิมพ์หมาย" }) printDate: Date;
  @Column({ name: "PROS_DESC", nullable: true, comment: "ชื่อโจทก์" }) prosDesc: string;
  @Column({ name: "RECEIVED_BY", nullable: true, comment: "ผู้รับหมาย" }) receivedBy: number;
  @Column({ name: "REFER_DOC", nullable: true, comment: "อ้างถึงหนังสือที่ส่งมา" }) referDoc: string;
  @Column({ name: "RELEASE_DATE", type: "timestamp", nullable: true, comment: "วันที่ปลดหมาย" }) releaseDate: Date;
  @Column({ name: "ROAD", nullable: true, comment: "ถนน" }) road: string;
  @Column({ name: "SEND_BY", nullable: true, comment: "รหัสผู้เดินหมาย เชื่อมโยง PC_USER_PROFILE" }) sendBy: number;
  @Column({ name: "SEND_DATE", type: "timestamp", nullable: true, comment: "วันที่ส่งหมาย" }) sendDate: Date;
  @Column({ name: "SEND_FEE", nullable: true, type: "float", comment: "ค่าส่งหมาย" }) sendFee: number;
  @Column({ name: "SEND_METHOD", nullable: true, comment: "วิธีการส่งหมาย 1 = ไปรษณีย์ 2 = เจ้าหน้าที่" }) sendMethod: number;
  @Column({ name: "TEL", nullable: true, comment: "เบอร์ติดต่อ" }) tel: string;
  @Column({ name: "UNSEND_DETAIL", nullable: true, type: "clob", comment: "เหตุที่ส่งไม่ได้" }) unsendDetail: string;
  @Column({ name: "LIT_TYPE_ID", nullable: true, comment: "รหัสประเภทคู่ความ เชื่อมโยง PC_LOOKUP_LIT_TYPE" }) litTypeId: number;
  @Column({ name: "LITIGANT_NAME", nullable: true, comment: "ชื่อคู่ความ" }) litigantName: string;
  @Column({ name: "NOTICE_SEND_RESULT_STATUS", nullable: true, comment: "สถานะลงผลการส่งหมาย" }) noticeSendResultStatus: number;
  @Column({ name: "CREATED_BY", nullable: true, comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) removedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_NOTICE_PROVINCIAL_SEQ".nextval ID FROM DUAL`);
      this.noticeProvincialId = res[0].ID;
      this.orderNo = res[0].ID;
    } catch (error) {
      throw new HttpException(`[oracle: notice province before insert failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  toResponseObject() {
    const { noticeProvincialId, orderNo, accuDesc, address, addressNearLocation, addressPlace, allegationDetail, alley, blackIdnum, blackTitleId, blackYear, cancelReason, caseCateId, courtId, currentDistrictId, currentPostCode, currentProvinceId, currentSubdistrictId, isCancel, isCourtArea, litigantReceivedDate, moo, noticeCodeNo, noticeCodeYear, noticePrint, noticeSendStatus, noticeTypeId, officerReceivedBy, orderSendMethod, postDebtDate, postDebtNo, postInvoiceDate, postSendResult, postSendTransDate, printBy, printDate, prosDesc, receivedBy, referDoc, releaseDate, road, sendBy, sendDate, sendFee, sendMethod, tel, unsendDetail, litTypeId, litigantName, noticeSendResultStatus, createdBy, updatedBy, removedBy, removedDate, createdDate, updatedDate } = this;
    const responseObject = {
      noticeProvincialId, orderNo, accuDesc, address, addressNearLocation, addressPlace, allegationDetail, alley,
      blackIdnum, blackTitleId, blackYear, cancelReason, caseCateId, courtId, currentDistrictId, currentPostCode,
      currentProvinceId, currentSubdistrictId, isCancel, isCourtArea, litigantReceivedDate, moo, noticeCodeNo,
      noticeCodeYear, noticePrint, noticeSendStatus, noticeTypeId, officerReceivedBy, orderSendMethod, postDebtDate,
      postDebtNo, postInvoiceDate, postSendResult, postSendTransDate, printBy, printDate, prosDesc, receivedBy,
      referDoc, releaseDate, road, sendBy, sendDate, sendFee, sendMethod, tel, unsendDetail, litTypeId, litigantName,
      noticeSendResultStatus, createdBy, updatedBy, removedBy,
      createdDate: createdDate ? this.dateFormat("YYYY-MM-DD H:i:s", createdDate) : null,
      removedDate: removedDate ? this.dateFormat("YYYY-MM-DD H:i:s", removedDate) : null,
      updatedDate: updatedDate ? this.dateFormat("YYYY-MM-DD H:i:s", updatedDate) : null,
    };
    return responseObject;
  }
}