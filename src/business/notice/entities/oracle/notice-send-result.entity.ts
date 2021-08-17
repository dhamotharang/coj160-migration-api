import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_NOTICE_SEND_RESULT" })
export class OracleNoticeSendResults {
  @PrimaryGeneratedColumn({ name: "RESULT_ID", comment: "รหัสข้อมูลผลการจ่ายหมาย(AUTO INCREMENT)" }) resultId: number;
  @Column({ name: "ORDER_NO		FLOAT		Y", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "COURT_ORDER		VARCHAR2	400 CHAR	Y", comment: "คำสั่งศาล" }) courtOrder: string;
  @Column({ name: "EVIDENCE_FOR_ORDER		NUMBER	10, 0	Y", comment: "รวมหลักฐานไว้ในสำนวนเสนอศาลเพื่อมีคำสั่ง" }) evidenceForOrder: number;
  @Column({ name: "JUDGE_ID		NUMBER	10, 0	Y", comment: "ผู้พิพากษา" }) judgeId: number;
  @Column({ name: "LITIGANT_RECEIVED_DATE		TIMESTAMP	6	Y", comment: "วันที่คู่ความรับหมาย" }) litigantReceivedDate: Date;
  @Column({ name: "MAP_ATTACH_URL		VARCHAR2	250 CHAR	Y", comment: "ที่อยู่ไฟล์แนบของแผนที่" }) mapAttachURL: string;
  @Column({ name: "NOTES		CLOB		Y", comment: "หมายเหตุ" }) notes: string;
  @Column({ name: "NOTICE_CHECKER		NUMBER	10, 0	Y", comment: "รหัสผู้ตรวจ" }) noticeChecker: number;
  @Column({ name: "NOTICE_ID	FK	NUMBER	10, 0	N", comment: "รหัสหมายประกาศ เชื่อมโยงตาราง PC_NOTICE" }) noticeId: number;
  @Column({ name: "PAID_DATE		TIMESTAMP	6	Y", comment: "วันจ่ายเงิน" }) paidDate: Date;
  @Column({ name: "PAYMENT_DETAIL_ID		NUMBER	38, 0	Y", comment: "รหัสรายละเอียดการจ่ายเงิน เชื่อมโยง PC_FIN_PAYMENT_DETAIL" }) paymentDetailId: number;
  @Column({ name: "PLACE_TYPE_ID		NUMBER	10, 0	Y", comment: "รหัสภูมิลำเนา เชื่อมโยง PC_LOOKUP_PLACE_TYPE" }) placeTypeId: number;
  @Column({ name: "POST_SEND_RESULT		NUMBER	10, 0	Y", comment: "ผลการส่งหมาย" }) postSendResult: number;
  @Column({ name: "POST_SEND_TRANS_DATE		TIMESTAMP	6	Y", comment: "วันที่รับผลหมายจากไปรษณีย์" }) postSendTransDate: Date;
  @Column({ name: "REPORT_DATE		TIMESTAMP	6	Y", comment: "วันที่รายงาน" }) reportDate: Date;
  @Column({ name: "RESULT_DETAIL		VARCHAR2	255 CHAR	N", comment: "วันที่และเวลาส่งหมาย" }) resultDetail: string;
  @Column({ name: "RESULT_TYPE		NUMBER	10, 0	N", comment: "ผลการส่งหมาย(หน้าผลการส่งหมาย)" }) resultType: number;
  @Column({ name: "SEND_FEE_PAYEE		NUMBER	10, 0	Y", comment: "รหัสผู้รับเงินค่าเดินหมาย" }) sendFeePayee: number;
  @Column({ name: "SEND_FEE_PAYER		NUMBER	10, 0	Y", comment: "รหัสผู้จ่ายเงิน" }) sendFeePayer: number;
  @Column({ name: "SEND_NOTICE_DATE		TIMESTAMP	6	Y", comment: "วันที่จ่ายหมาย" }) sendNoticeDate: Date;
  @Column({ name: "UNSEND_DETAIL		VARCHAR2	250 CHAR	Y", comment: "สาเหตุที่ส่งไม่ได้" }) unsendDetail: string;
  @Column({ name: "LOG_WARRANT_DATE		TIMESTAMP	6	Y", comment: "วันลงผลการส่งหมาย" }) logWarrantDate: Date;
  @Column({ name: "PN_TYPE		NUMBER	10, 0	Y", comment: "รหัสจำแนกประเภทหมาย" }) pnType: number;
  @Column({ name: "CHECK_NO		VARCHAR2	250 CHAR	Y", comment: "เลขที่เช็ค" }) checkNo: string;
  @Column({ name: "CREATED_BY		NUMBER	38, 0	N", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY		NUMBER	38, 0	Y", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY		NUMBER	38, 0	N", comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE		TIMESTAMP	6	N", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE		TIMESTAMP	6	Y", comment: "วันเวลาที่ลบข้อมูล" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE		TIMESTAMP	6	Y", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) removedDate: Date;

  toResponseObject() {
    const { resultId, orderNo, courtOrder, evidenceForOrder, judgeId, litigantReceivedDate, mapAttachURL, notes, noticeChecker, noticeId, paidDate, paymentDetailId, placeTypeId, postSendResult, postSendTransDate, reportDate, resultDetail, resultType, sendFeePayee, sendFeePayer, sendNoticeDate, unsendDetail, logWarrantDate, pnType, checkNo, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { resultId, orderNo, courtOrder, evidenceForOrder, judgeId, litigantReceivedDate, mapAttachURL, notes, noticeChecker, noticeId, paidDate, paymentDetailId, placeTypeId, postSendResult, postSendTransDate, reportDate, resultDetail, resultType, sendFeePayee, sendFeePayer, sendNoticeDate, unsendDetail, logWarrantDate, pnType, checkNo, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}