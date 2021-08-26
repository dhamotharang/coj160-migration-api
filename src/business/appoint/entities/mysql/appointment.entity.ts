import { HelperService } from "src/shared/helpers/helper.service";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "pappointment" })
export class MySQLAppointments extends HelperService {
  constructor() {
    super();
  }

  @PrimaryGeneratedColumn({ name: "court_running", comment: "รหัสศาลเจ้าของระบบ" }) courtRunning: number;
  @PrimaryColumn({ name: "app_running", comment: "" }) appRunning: number;
  @Column({ name: "run_id", comment: "รหัสแทนหมายเลขคดีดำ" }) runId: number;
  @Column({ name: "app_seq", comment: "นัดที่" }) appSeq: number;
  @Column({ name: "date_appoint", type: "date", nullable: true, comment: "วันที่นัด" }) dateAppoint: Date;
  @Column({ name: "time_appoint", nullable: true, comment: "เวลาที่นัด" }) timeAppoint: string;
  @Column({ name: "room_id", nullable: true, comment: "รหัสห้อง" }) roomId: string;
  @Column({ name: "room_desc", nullable: true, comment: "ห้องพิจรณาคดี" }) roomDesc: string;
  @Column({ name: "judge_court_running", nullable: true, comment: "ศาลที่ัดสิน" }) judgeCourtRunning: number;
  @Column({ name: "app_id", nullable: true, comment: "รหัสเหตุที่นัด pappoint_list" }) appId: number;
  @Column({ name: "app_name", comment: "เหตุที่นัด" }) appName: string;
  @Column({ name: "app_sub_id", nullable: true, comment: "รหัสเหตุที่นัดย่อย pappoint_sub_list" }) appSubId: number;
  @Column({ name: "app_by", nullable: true, comment: "นัดโดย" }) appBy: number;
  @Column({ name: "judge_id", nullable: true, comment: "ผู้พิพากษาที่ขึ้นบัลลังก์" }) judgeId: string;
  @Column({ name: "judge_gid", nullable: true, comment: "องค์คณะ" }) judgeGid: string;
  @Column({ name: "judge_gid2", nullable: true, comment: "องค์คณะ 2" }) judgeGid2: string;
  @Column({ name: "judge_aid", nullable: true, comment: "ผู้พากษาสมทบ" }) judgeAid: string;
  @Column({ name: "judge_aid2", nullable: true, comment: "ผู้พิพากษาฝั่งลูกจ้าง" }) judgeAid2: number;
  @Column({ name: "replace_judge_flag", nullable: true, comment: "ผู้พิพากษาขึ้นบัลลังก์แทน" }) replaceJudgeFlag: number;
  @Column({ name: "replace_judge_id", nullable: true, comment: "แทนผู้พิพากษา" }) replaceJudgeId: string;
  @Column({ name: "replace_judge_aflag", nullable: true, comment: "ผู้พิพากษาสมทบฝั่งนายจ้าง(เวร/แทน)" }) replaceJudgeAflag: number;
  @Column({ name: "replace_judge_aflag2", nullable: true, comment: "ผู้พิพากษาสมทบฝั่งลูกจ้าง(เวร / แทน)" }) replaceJudgeAflag2: number;
  @Column({ name: "ad_assign_flag", nullable: true, comment: "1 เวร, 2 แทน สำหรับผู้พิพากษาสมทบฝั่งนายจ้าง" }) adAssignFlag: number;
  @Column({ name: "ad_assign_flag2", nullable: true, comment: "1 เวร, 2 แทน สำหรับผู้พิพากษาสมทบฝั่งลูกจ้าง" }) adAssignFlag2: number;
  @Column({ name: "jpt_wit", nullable: true, comment: "จำนวนปาก จ.พ.ท." }) jptWit: number;
  @Column({ name: "pros_wit", nullable: true, comment: "สืบโจทก์" }) prosWit: number;
  @Column({ name: "accu_wit", nullable: true, comment: "สืบจำเลย" }) accuWit: number;
  @Column({ name: "other_wit", nullable: true, comment: "สืบอื่นๆ" }) otherWit: number;
  @Column({ name: "page_qty", nullable: true, comment: "จำนวนหน้า" }) pageQty: number;
  @Column({ name: "page_qty2", nullable: true, comment: "จำนวนหน้าพยานจล." }) pageQty2: number;
  @Column({ name: "page_qty3", nullable: true, comment: "จำนวนหน้าพยานอื่นๆ" }) pageQty3: number;
  @Column({ name: "appoint_other", nullable: true, comment: "บันทึก   1 - ใช้เทป 2 - จดเอง" }) appointOther: number;
  @Column({ name: "cancel_flag", nullable: true, comment: "ยกเลิกนัดไม่แสดงในใบลอย" }) cancelFlag: number;
  @Column({ name: "delay_id", nullable: true, comment: "รหัสเหตุที่เลื่อน" }) delayId: number;
  @Column({ name: "delay_name", nullable: true, type: "text", comment: "เหตุที่เลื่อน" }) delayName: number;
  @Column({ name: "cancel_user_id", nullable: true, comment: "ผู้บันทึกการยกเลิกนัด" }) cancelUserId: string;
  @Column({ name: "cancel_user_name", nullable: true, comment: "ชื่อผู้บันทึกการยกเลิกนัด" }) cancelUserName: string;
  @Column({ name: "cancel_date", type: "date", nullable: true, comment: "วันที่ยกเลิกการนัด" }) cancelDate: Date;
  @Column({ name: "cancel_reason", nullable: true, type: "text", comment: "เหตุผลที่ยกเลิกนัด" }) cancelReason: number;
  @Column({ name: "result_id", nullable: true, comment: "รหัสผลการพิจารณา" }) resultId: number;
  @Column({ name: "result_name", nullable: true, comment: "ผลการพิจารณา" }) resultName: string;
  @Column({ name: "appoint_result", nullable: true, type: "text", comment: "รายงานกระบวน" }) appointResult: number;
  @Column({ name: "tran_req", nullable: true, comment: "ขอล่ามภาษา  1 = ขอ 2 = ไม่ขอ" }) tranReq: number;
  @Column({ name: "tran_lang", nullable: true, comment: "ล่ามภาษา" }) tranLang: string;
  @Column({ name: "tran_name", nullable: true, comment: "ชื่อล่าม" }) tranName: string;
  @Column({ name: "tran_from", nullable: true, comment: "เวลาเริ่มต้น" }) tranFrom: string;
  @Column({ name: "tran_to", nullable: true, comment: "เวลาสิ้นสุด" }) tranTo: string;
  @Column({ name: "tran_amt", nullable: true, type: "double", comment: "ค่าล่าม" }) tranAmt: number;
  @Column({ name: "tran_amt_text", nullable: true, comment: "ค่าล่าม เป็นตัวหนังสือ" }) tranAmtText: string;
  @Column({ name: "phyco_req", nullable: true, comment: "ขอนักจิตวิทยา  1 = ขอ 2 = ไม่ขอ" }) phycoReq: number;
  @Column({ name: "phyco_name", nullable: true, comment: "ชื่อนักจิตวิทยา" }) phycoName: string;
  @Column({ name: "phyco_amt", nullable: true, type: "double", comment: "ค่านักจิตวิทยา" }) phycoAmt: number;
  @Column({ name: "phyco_amt_text", nullable: true, comment: "ค่านักจิตวิทยา เป็นตัวหนังสือ" }) phycoAmtText: string;
  @Column({ name: "child_reserve_mor", nullable: true, comment: "จองห้องสืบพยานเด็กเช้า  1 = จอง 2 = ไม่จอง" }) childReserveMor: number;
  @Column({ name: "child_reserve_eve", nullable: true, comment: "จองห้องสืบพยานเด็กบ่าย  1 = จอง 2 = ไม่จอง" }) childReserveEve: number;
  @Column({ name: "judge_by", nullable: true, comment: "พิจารณาคดีโดย" }) judgeBy: number;
  @Column({ name: "to_court_running", nullable: true, comment: "ไปยังศาล" }) toCourtRunning: number;
  @Column({ name: "withdraw_doc", nullable: true, type: "text", comment: "ซองคำพิพากษา" }) withdrawDoc: number;
  @Column({ name: "appeal_running", nullable: true, comment: "running pappeal" }) appealRunning: string;
  @Column({ name: "translater_flag", nullable: true, comment: "ต้องการล่าม" }) translaterFlag: number;
  @Column({ name: "pw_appoint", nullable: true, comment: "รหัสผ่านสำหรับจำนวนนัด" }) pwAppoint: string;
  @Column({ name: "table_id", nullable: true, comment: "ประเภทราง" }) tableId: number;
  @Column({ name: "row_display", nullable: true, comment: "แสดงข้อมูลที่แถวใด" }) rowDisplay: number;
  @Column({ name: "attach_1", nullable: true, comment: "รายงานกระบวนพิจารณา" }) attach1: string;
  @Column({ name: "attach_2", nullable: true, comment: "คำให้การพยาน" }) attach2: string;
  @Column({ name: "print_witness_1", nullable: true, comment: "พิมพ์ใบแจ้งเตือนพยานครั้งที่ 1" }) printWitness1: number;
  @Column({ name: "print_witness_2", nullable: true, comment: "พิมพ์ใบแจ้งเตือนพยานครั้งที่ 2" }) printWitness2: number;
  @Column({ name: "status_id", nullable: true, comment: "สถานะนัดความ" }) statusId: number;
  @Column({ name: "remark", nullable: true, comment: "หมายเหต" }) remark: string;
  @Column({ name: "create_dep_code", nullable: true, comment: "รหัสหน่วยงานที่สร้าง record" }) createDepCode: number;
  @Column({ name: "create_user_id", nullable: true, comment: "รหัส user ที่สร้าง record" }) createUserId: string;
  @Column({ name: "create_user", nullable: true, comment: "user ที่สร้าง record" }) createUser: string;
  @Column({ name: "create_date", nullable: true, type: "datetime", comment: "วันที่เวลาสร้าง record" }) createDate: Date;
  @Column({ name: "update_dep_code", nullable: true, comment: "รหัสหน่วยงานที่ update" }) updateDepCode: number;
  @Column({ name: "update_user_id", nullable: true, comment: "รหัส user ที่ update record" }) updateUserId: string;
  @Column({ name: "update_user", nullable: true, comment: "user ที่ update record" }) updateUser: string;
  @Column({ name: "update_date", nullable: true, type: "datetime", comment: "วันที่ เวลา update record" }) updateDate: Date;
  @Column({ name: "ref_id", nullable: true, comment: "transfer blackrecgen" }) refId: string;
  @Column({ name: "ref_room_id", nullable: true, comment: "ref room_if" }) refRoomId: string;
  @Column({ name: "remark_copy", nullable: true, comment: "หมายเหต" }) remarkCopy: string;
  @Column({ name: "new_seq", nullable: true, comment: "ลัดับที่นัด(ใหม่)" }) newSeq: number;
  @Column({ name: "old_seq", nullable: true, comment: "old seq" }) oldSeq: number;
  @Column({ name: "ref_time", nullable: true, type: "time", comment: "" }) refTime: string;
  @Column({ name: "ref_black_title", nullable: true, comment: "transfer" }) refBlackTitle: string;
  @Column({ name: "ref_black_id", nullable: true, comment: "transfer" }) refBlackId: number;
  @Column({ name: "ref_black_yy", nullable: true, comment: "transfer" }) refBlackYy: number;
  @Column({ name: "ref_case_type", nullable: true, comment: "transfer" }) refCaseType: number;
  @Column({ name: "ref_blackno", nullable: true, comment: "transfer" }) refBlackno: string;

  toResponseObject() {
    const {
      courtRunning, appRunning, runId, appSeq, dateAppoint, timeAppoint, roomId, roomDesc, judgeCourtRunning, appId,
      appName, appSubId, appBy, judgeId, judgeGid, judgeGid2, judgeAid, judgeAid2, replaceJudgeFlag, replaceJudgeId,
      replaceJudgeAflag, replaceJudgeAflag2, adAssignFlag, adAssignFlag2, jptWit, prosWit, accuWit, otherWit, pageQty,
      pageQty2, pageQty3, appointOther, cancelFlag, delayId, delayName, cancelUserId, cancelUserName, cancelDate,
      cancelReason, resultId, resultName, appointResult, tranReq, tranLang, tranName, tranFrom, tranTo, tranAmt,
      tranAmtText, phycoReq, phycoName, phycoAmt, phycoAmtText, childReserveMor, childReserveEve, judgeBy, toCourtRunning,
      withdrawDoc, appealRunning, translaterFlag, pwAppoint, tableId, rowDisplay, attach1, attach2, printWitness1,
      printWitness2, statusId, remark, createDepCode, createUserId, createUser, createDate, updateDepCode, updateUserId,
      updateUser, updateDate, refId, refRoomId, remarkCopy, newSeq, oldSeq, refTime, refBlackTitle, refBlackId,
      refBlackYy, refCaseType, refBlackno
    } = this;

    const responseObject = {
      appRunning, courtRunning, runId, appSeq,
      dateAppoint: dateAppoint ? this.dateFormat("YYYY-MM-DD", dateAppoint) : null,
      timeAppoint,
      roomId, roomDesc, judgeCourtRunning, appId, appName,
      appSubId, appBy, judgeId, judgeGid, judgeGid2, judgeAid, judgeAid2, replaceJudgeFlag, replaceJudgeId, replaceJudgeAflag,
      replaceJudgeAflag2, adAssignFlag, adAssignFlag2, jptWit, prosWit, accuWit, otherWit, pageQty, pageQty2, pageQty3, appointOther,
      cancelFlag, delayId, delayName, cancelUserId, cancelUserName,
      cancelDate: cancelDate ? this.dateFormat("YYYY-MM-DD", cancelDate) : null,
      cancelReason, resultId, resultName, appointResult,
      tranReq, tranLang, tranName, tranFrom, tranTo, tranAmt, tranAmtText, phycoReq, phycoName, phycoAmt, phycoAmtText, childReserveMor,
      childReserveEve, judgeBy, toCourtRunning, withdrawDoc, appealRunning, translaterFlag, pwAppoint, tableId, rowDisplay, attach1,
      attach2, printWitness1, printWitness2, statusId, remark, createDepCode, createUserId, createUser, updateDepCode,
      updateUserId, updateUser, refId, refRoomId, remarkCopy, newSeq, oldSeq, refTime, refBlackTitle, refBlackId,
      refBlackYy, refCaseType, refBlackno,
      createDate: createDate ? this.dateFormat("YYYY-MM-DD H:i:s", createDate) : null,
      updateDate: updateDate ? this.dateFormat("YYYY-MM-DD H:i:s", updateDate) : null,
    };
    return responseObject;
  }
}