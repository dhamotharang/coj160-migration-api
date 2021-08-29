import { HelperService } from "src/shared/helpers/helper.service";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MySQLNotices } from "./notice.entity";

@Entity({ name: "pnotice_send" })
export class MySQLNoticeSends extends HelperService {
  constructor() {
    super();
  }

  @PrimaryGeneratedColumn({ name: "notice_running", comment: "running หมาย fk:pnotice.notice_running" }) noticeRunning: number;
  @PrimaryColumn({ name: "court_running", comment: "รหัสศาลเจ้าของระบบ" }) courtRunning: number;
  @PrimaryColumn({ name: "send_item", comment: "ครั้งที่จ่าย" }) sendItem: number;
  @Column({ name: "send_by", nullable: true, comment: "ส่งโดยวิธี 1 ไปรษณีย์ 2 จนท" }) sendBy: number;
  @Column({ name: "remark", nullable: true, comment: "หมายเหตุ" }) remark: string;
  @Column({ name: "receive_off_id", nullable: true, comment: "ผู้รับหมาย" }) receiveOffId: string;
  @Column({ name: "receive_date", nullable: true, type: "date", comment: "วันที่หน.กลุ่มรับหมาย" }) receiveDate: Date;
  @Column({ name: "s_officer_id", nullable: true, comment: "รหัสผู้เดินหมาย" }) sOfficerId: string;
  @Column({ name: "send_date", nullable: true, type: "date", comment: "วันที่จ่ายหมาย" }) sendDate: Date;
  @Column({ name: "cancel_flag", nullable: true, comment: "ยกเลิกหมาย 1 - ยกเลิก" }) cancelFlag: number;
  @Column({ name: "devoid_flag", nullable: true, comment: "เงินขาด/เกิน" }) devoidFlag: number;
  @Column({ name: "devoid_amt", nullable: true, comment: "จำนวนเงินที่ขาด" }) devoidAmt: number;
  @Column({ name: "devoid_date", nullable: true, type: "date", comment: "วันที่รับเงินเพิ่ม(กรณีเงินขาด)" }) devoidDate: number;
  @Column({ name: "cover_barcode", nullable: true, comment: "barcode ซอง" }) coverBarcode: string;
  @Column({ name: "ems_barcode", nullable: true, comment: "บาร์โค้ดส่ง EMS" }) emsBarcode: string;
  @Column({ name: "assign_off_id", nullable: true, comment: "ผู้จ่ายหมาย" }) assignOffId: string;
  @Column({ name: "assign_dep_code", nullable: true, comment: "หน่วยงานผู้จ่ายหมาย" }) assignDepCode: number;
  @Column({ name: "assign_off_date", nullable: true, comment: "วันที่บันทึกการจ่ายหมาย" }) assignOffDate: Date;
  @Column({ name: "rcvnotice_date", nullable: true, type: "date", comment: "วันที่คู่ความรับหมาย" }) rcvnoticeDate: number;
  @Column({ name: "rcvnotice_time", nullable: true, comment: "เวลาที่ส่งหมาย" }) rcvnoticeTime: string;
  @Column({ name: "rcv_name", nullable: true, comment: "ผู้รับหมายแทน" }) rcvName: string;
  @Column({ name: "notice_result_desc", nullable: true, type: "text", comment: "ส่งไม่ได้เพราะ" }) noticeResultDesc: number;
  @Column({ name: "unsend", nullable: true, type: "text", comment: "เหตุที่ส่งไม่ได้" }) unsend: number;
  @Column({ name: "book_account", nullable: true, comment: "หมายเลขบัญชีธนาคาร" }) bookAccount: string;
  @Column({ name: "bank_id", nullable: true, comment: "รหัสธนาคาร" }) bankId: number;
  @Column({ name: "update_assign_off_id", nullable: true, comment: "ผู้แก้ไขการจ่ายหมาย" }) updateAssignOffId: string;
  @Column({ name: "update_assign_dep_code", nullable: true, comment: "หน่วยงานผู้แก้ไขการจ่ายหมาย" }) updateAssignDepCode: number;
  @Column({ name: "update_assign_off_date", nullable: true, comment: "วันที่บันทึกการแก้ไขจ่ายหมาย" }) updateAssignOffDate: Date;
  @Column({ name: "notice_result", nullable: true, comment: "ผลหมาย 1 ส่งได้ 2 ส่งไม่ได้" }) noticeResult: number;
  @Column({ name: "notice_result_by", nullable: true, comment: "ผลการส่งหมายโดย 1 รับหมาย 2 ปิดหมาย 3 ไปรษณีย์ 4 ปิดประกาศ" }) noticeResultBy: number;
  @Column({ name: "address_style", nullable: true, comment: "สภาพภูมิลำเนา" }) addressStyle: string;
  @Column({ name: "img_attach", nullable: true, comment: "แผนที่ที่ส่งหมาย" }) imgAttach: string;
  @Column({ name: "issue_to", nullable: true, comment: "เรียน ใช้ในรายงานผลการเดินหมาย" }) issueTo: string;
  @Column({ name: "approve_user", nullable: true, comment: "ผู้อนุมัติ" }) approveUser: string;
  @Column({ name: "input_result_user_id", nullable: true, comment: "รหัสผู้บันทึกผลหมาย" }) inputResultUserId: string;
  @Column({ name: "input_result_date", nullable: true, type: "date", comment: "วันที่บันทึกผลหมาย" }) inputResultDate: number;
  @Column({ name: "input_result_time", nullable: true, type: "time", comment: "เวลาที่บันทึก" }) inputResultTime: number;
  @Column({ name: "order_desc", nullable: true, type: "text", comment: "คำสั่งศาล" }) orderDesc: number;
  @Column({ name: "judge_order_desc", nullable: true, type: "text", comment: "คำสั่ง" }) judgeOrderDesc: number;
  @Column({ name: "judge_order_result", nullable: true, comment: "ผู้พิพากษาผู้สั่งผลการส่งหมาย" }) judgeOrderResult: string;
  @Column({ name: "judge_order_id", nullable: true, comment: "ผู้พิพากษาที่ออกคำสั่ง" }) judgeOrderId: string;
  @Column({ name: "judge_order_date", nullable: true, type: "date", comment: "วันที่ศาลสั่งคำแก้" }) judgeOrderDate: number;
  @Column({ name: "sign_user_id", nullable: true, comment: "รหัสผู้เซ็นต์ผลหมาย" }) signUserId: string;
  @Column({ name: "post_rcv_date", nullable: true, type: "date", comment: "วันที่รับผลหมายจากไปรษณีย์" }) postRcvDate: number;
  @Column({ name: "rcv_type", nullable: true, comment: "ส่งได้โดย" }) rcvType: number;
  @Column({ name: "send_result_id", nullable: true, comment: "ผลการส่งหมาย pnotice_send_result" }) sendResultId: number;
  @Column({ name: "input_result_user", nullable: true, comment: "ผู้บันทึกผลหมาย" }) inputResultUser: string;
  @Column({ name: "input_result_dep_code", nullable: true, comment: "หน่วยงานผู้บันทึกผลหมาย" }) inputResultDepCode: number;
  @Column({ name: "input_due_date", nullable: true, type: "date", comment: "วันที่กำหนดให้ลงผลหมาย" }) inputDueDate: number;
  @Column({ name: "sign_user_name", comment: "ผู้เซ็นต์ผลหมาย" }) signUserName: string;
  @Column({ name: "post_req_date", nullable: true, type: "date", comment: "วันที่ไปรษณีย์ขอเบิกเงินส่งคำคู่ความ" }) postReqDate: number;
  @Column({ name: "post_debt", nullable: true, comment: "เลขที่ใบแจ้งหนี้ไปรษณีย์" }) postDebt: string;
  @Column({ name: "post_debt_date", nullable: true, type: "date", comment: "วันที่การเงินทำเบิก" }) postDebtDate: number;
  @Column({ name: "post_debt_user_id", nullable: true, comment: "รหัสผู้บันทึกผู้เดินหมาย" }) postDebtUserId: string;
  @Column({ name: "post_debt_time", nullable: true, type: "time", comment: "เวลาที่บันทึกผู้เดินหมาย" }) postDebtTime: number;
  @Column({ name: "post_unsend", nullable: true, comment: "ไปรษณีย์ส่งไม่ได้เพราะ" }) postUnsend: number;
  @Column({ name: "check_running", nullable: true, comment: "รหัสเช็คที่จ่ายเงิน" }) checkRunning: number;
  @Column({ name: "court_doc_id", nullable: true, comment: "รหัสศาล" }) courtDocId: string;
  @Column({ name: "court_doc_name", nullable: true, comment: "หนังสือของศาล" }) courtDocName: string;
  @Column({ name: "court_doc_no", nullable: true, comment: "เลขที่หนังสือของศาล" }) courtDocNo: string;
  @Column({ name: "court_doc_date", nullable: true, type: "date", comment: "ลงวันที่" }) courtDocDate: number;
  @Column({ name: "court_doc_title", nullable: true, comment: "เลขที่หนังสือ(ต้นสังกัด)" }) courtDocTitle: string;
  @Column({ name: "court_out_date", nullable: true, type: "date", comment: "วันที่ออกจากต้นสังกัด" }) courtOutDate: number;
  @Column({ name: "create_dep_code", nullable: true, comment: "รหัสหน่วยงานที่สร้าง record" }) createDepCode: number;
  @Column({ name: "create_user_id", nullable: true, comment: "รหัส user ที่สร้าง record" }) createUserId: string;
  @Column({ name: "create_user", nullable: true, comment: "user ที่สร้าง record" }) createUser: string;
  @Column({ name: "update_dep_code", nullable: true, comment: "รหัสหน่วยงานที่ update" }) updateDepCode: number;
  @Column({ name: "update_user_id", nullable: true, comment: "รหัส user ที่ update record" }) updateUserId: string;
  @Column({ name: "update_user", nullable: true, comment: "user ที่ update record" }) updateUser: string;
  @Column({ name: "ref_recgen", nullable: true, comment: "reference BlackRecGen" }) refRecgen: string;
  @Column({ name: "ref_no", nullable: true, comment: "reference DocNo" }) refNo: string;
  @Column({ name: "ref_outRecGen", nullable: true, comment: "reference OutRecGen" }) refOutRecGen: string;
  @CreateDateColumn({ name: "create_date", nullable: true, comment: "วันที่เวลาสร้าง record" }) createDate: Date;
  @UpdateDateColumn({ name: "update_date", nullable: true, comment: "วันที่ เวลา update record" }) updateDate: Date;

  @ManyToOne(type => MySQLNotices, send => send.noticeRunning)
  @JoinColumn({ name: "notice_running" }) notices: MySQLNotices;

  toResponseObject() {
    const {
      courtRunning, noticeRunning, sendItem, sendBy, remark, receiveOffId, receiveDate, sOfficerId, sendDate, cancelFlag, devoidFlag,
      devoidAmt, devoidDate, coverBarcode, emsBarcode, assignOffId, assignDepCode, assignOffDate, rcvnoticeDate, rcvnoticeTime,
      rcvName, noticeResultDesc, unsend, bookAccount, bankId, updateAssignOffId, updateAssignDepCode, updateAssignOffDate, noticeResult,
      noticeResultBy, addressStyle, imgAttach, issueTo, approveUser, inputResultUserId, inputResultDate, inputResultTime, orderDesc,
      judgeOrderDesc, judgeOrderResult, judgeOrderId, judgeOrderDate, signUserId, postRcvDate, rcvType, sendResultId, inputResultUser,
      inputResultDepCode, inputDueDate, signUserName, postReqDate, postDebt, postDebtDate, postDebtUserId, postDebtTime, postUnsend,
      checkRunning, courtDocId, courtDocName, courtDocNo, courtDocDate, courtDocTitle, courtOutDate, createDepCode, createUserId,
      createUser, createDate, updateDepCode, updateUserId, updateUser, updateDate, refRecgen, refNo, refOutRecGen
    } = this;

    const responseObject = {
      courtRunning, noticeRunning, sendItem, sendBy, remark, receiveOffId,
      receiveDate: receiveDate ? this.dateFormat("YYYY-MM-DD", receiveDate) : null,
      sOfficerId,
      sendDate: sendDate ? this.dateFormat("YYYY-MM-DD", sendDate) : null,
      cancelFlag, devoidFlag,
      devoidAmt, devoidDate, coverBarcode, emsBarcode, assignOffId, assignDepCode, assignOffDate, rcvnoticeDate, rcvnoticeTime,
      rcvName, noticeResultDesc, unsend, bookAccount, bankId, updateAssignOffId, updateAssignDepCode, updateAssignOffDate, noticeResult,
      noticeResultBy, addressStyle, imgAttach, issueTo, approveUser, inputResultUserId, inputResultDate, inputResultTime, orderDesc,
      judgeOrderDesc, judgeOrderResult, judgeOrderId, judgeOrderDate, signUserId, postRcvDate, rcvType, sendResultId, inputResultUser,
      inputResultDepCode, inputDueDate, signUserName, postReqDate, postDebt, postDebtDate, postDebtUserId, postDebtTime, postUnsend,
      checkRunning, courtDocId, courtDocName, courtDocNo, courtDocDate, courtDocTitle, courtOutDate, createDepCode, createUserId,
      createUser, updateDepCode, updateUserId, updateUser, refRecgen, refNo, refOutRecGen,
      createDate: createDate ? this.dateFormat("YYYY-MM-DD H:i:s", createDate) : null,
      updateDate: updateDate ? this.dateFormat("YYYY-MM-DD H:i:s", updateDate) : null,
    };

    return responseObject;
  }
}
