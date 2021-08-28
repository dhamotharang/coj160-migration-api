import { HttpException, HttpStatus } from "@nestjs/common";
import { HelperService } from "src/shared/helpers/helper.service";
import { BeforeInsert, Column, Entity, getManager, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_NOTICE_SEND_RESULT" })
export class OracleNoticeSendResults extends HelperService {
  constructor() {
    super();
  }

  @PrimaryGeneratedColumn({ name: "RESULT_ID", comment: "รหัสข้อมูลผลการจ่ายหมาย(AUTO INCREMENT)" }) resultId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "COURT_ORDER", nullable: true, comment: "คำสั่งศาล" }) courtOrder: string;
  @Column({ name: "EVIDENCE_FOR_ORDER", nullable: true, comment: "รวมหลักฐานไว้ในสำนวนเสนอศาลเพื่อมีคำสั่ง" }) evidenceForOrder: number;
  @Column({ name: "JUDGE_ID", nullable: true, comment: "ผู้พิพากษา" }) judgeId: number;
  @Column({ name: "LITIGANT_RECEIVED_DATE", nullable: true, type: "timestamp", comment: "วันที่คู่ความรับหมาย" }) litigantReceivedDate: Date;
  @Column({ name: "MAP_ATTACH_URL", nullable: true, comment: "ที่อยู่ไฟล์แนบของแผนที่" }) mapAttachURL: string;
  @Column({ name: "NOTES", nullable: true, type: "clob", comment: "หมายเหตุ" }) notes: string;
  @Column({ name: "NOTICE_CHECKER", nullable: true, comment: "รหัสผู้ตรวจ" }) noticeChecker: number;
  @Column({ name: "NOTICE_ID", comment: "รหัสหมายประกาศ เชื่อมโยงตาราง PC_NOTICE" }) noticeId: number;
  @Column({ name: "PAID_DATE", nullable: true, type: "timestamp", comment: "วันจ่ายเงิน" }) paidDate: Date;
  @Column({ name: "PAYMENT_DETAIL_ID", nullable: true, comment: "รหัสรายละเอียดการจ่ายเงิน เชื่อมโยง PC_FIN_PAYMENT_DETAIL" }) paymentDetailId: number;
  @Column({ name: "PLACE_TYPE_ID", nullable: true, comment: "รหัสภูมิลำเนา เชื่อมโยง PC_LOOKUP_PLACE_TYPE" }) placeTypeId: number;
  @Column({ name: "POST_SEND_RESULT", nullable: true, comment: "ผลการส่งหมาย" }) postSendResult: number;
  @Column({ name: "POST_SEND_TRANS_DATE", nullable: true, type: "timestamp", comment: "วันที่รับผลหมายจากไปรษณีย์" }) postSendTransDate: Date;
  @Column({ name: "REPORT_DATE", nullable: true, type: "timestamp", comment: "วันที่รายงาน" }) reportDate: Date;
  @Column({ name: "RESULT_DETAIL", comment: "วันที่และเวลาส่งหมาย" }) resultDetail: string;
  @Column({ name: "RESULT_TYPE", comment: "ผลการส่งหมาย(หน้าผลการส่งหมาย)" }) resultType: number;
  @Column({ name: "SEND_FEE_PAYEE", nullable: true, comment: "รหัสผู้รับเงินค่าเดินหมาย" }) sendFeePayee: number;
  @Column({ name: "SEND_FEE_PAYER", nullable: true, comment: "รหัสผู้จ่ายเงิน" }) sendFeePayer: number;
  @Column({ name: "SEND_NOTICE_DATE", nullable: true, type: "timestamp", comment: "วันที่จ่ายหมาย" }) sendNoticeDate: Date;
  @Column({ name: "UNSEND_DETAIL", nullable: true, comment: "สาเหตุที่ส่งไม่ได้" }) unsendDetail: string;
  @Column({ name: "LOG_WARRANT_DATE", nullable: true, type: "timestamp", comment: "วันลงผลการส่งหมาย" }) logWarrantDate: Date;
  @Column({ name: "PN_TYPE", nullable: true, comment: "รหัสจำแนกประเภทหมาย" }) pnType: number;
  @Column({ name: "CHECK_NO", nullable: true, comment: "เลขที่เช็ค" }) checkNo: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) removedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_NOTICE_SEND_RESULT_SEQ".nextval ID FROM DUAL`);
      this.resultId = res[0].ID;
      this.orderNo = res[0].ID;
    } catch (error) {
      throw new HttpException(`[oracle: notice send result before insert failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  toResponseObject() {
    const { resultId, orderNo, courtOrder, evidenceForOrder, judgeId, litigantReceivedDate, mapAttachURL, notes, noticeChecker, noticeId, paidDate, paymentDetailId, placeTypeId, postSendResult, postSendTransDate, reportDate, resultDetail, resultType, sendFeePayee, sendFeePayer, sendNoticeDate, unsendDetail, logWarrantDate, pnType, checkNo, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = {
      resultId, orderNo, courtOrder, evidenceForOrder, judgeId, litigantReceivedDate, mapAttachURL, notes, noticeChecker,
      noticeId, paidDate, paymentDetailId, placeTypeId, postSendResult, postSendTransDate, reportDate, resultDetail, resultType,
      sendFeePayee, sendFeePayer, sendNoticeDate, unsendDetail, logWarrantDate, pnType, checkNo, createdBy, updatedBy, removedBy,
      createdDate: createdDate ? this.dateFormat("YYYY-MM-DD H:i:s", createdDate) : null,
      removedDate: removedDate ? this.dateFormat("YYYY-MM-DD H:i:s", removedDate) : null,
      updatedDate: updatedDate ? this.dateFormat("YYYY-MM-DD H:i:s", updatedDate) : null,
    };
    return responseObject;
  }
}