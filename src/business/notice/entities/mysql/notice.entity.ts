import { HelperService } from "src/shared/helpers/helper.service";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MySQLNoticeSends } from "./notice-send.entity";

@Entity({ name: "pnotice" })
export class MySQLNotices extends HelperService {
  constructor() {
    super();
  }
  @PrimaryGeneratedColumn({ name: "notice_running", comment: "เลขที่หมาย Running" }) noticeRunning: number;
  @PrimaryColumn({ name: "court_running", comment: "รหัสศาลเจ้าของระบบ" }) courtRunning: number;
  @Column({ name: "notice_court_running", nullable: true, comment: "หมายของศาล" }) noticeCourtRunning: number;
  @Column({ name: "notice_type_id", nullable: true, comment: "ประเภทหมาย" }) noticeTypeId: number;
  @Column({ name: "notice_type_name", comment: "ประเภทหมาย" }) noticeTypeName: string;
  @Column({ name: "notice_no", nullable: true, comment: "เลขที่หมาย" }) noticeNo: number;
  @Column({ name: "notice_yy", nullable: true, comment: "พ.ศ.เลขที่หมาย" }) noticeYy: number;
  @Column({ name: "data_type", comment: "ประเภทข้อมูล 1 หมาย, 2 สำเนาคำร้อง" }) dataType: number;
  @Column({ name: "notice_group", nullable: true, comment: "ชุดที่" }) noticeGroup: number;
  @Column({ name: "notice_group_yy", nullable: true, comment: "4ปีรหัสกลุ่มหมาย" }) noticeGroupYy: number;
  @Column({ name: "notice_barcode", nullable: true, comment: "barcode หมาย" }) noticeBarcode: string;
  @Column({ name: "appeal_running", comment: "running เลขที่อุทธรณ์" }) appealRunning: number;
  @Column({ name: "form_running", nullable: true, comment: "รหัสแบบหมาย fk.pword_form.form_running" }) formRunning: number;
  @Column({ name: "form_id", nullable: true, comment: "แบบหมาย pnotice_form.form_id" }) formId: number;
  @Column({ name: "appeal_type", comment: "1 อุทธรณ์ 2 ฎีกา" }) appealType: number;
  @Column({ name: "form_xml", nullable: true, comment: "แบบword pnotice_doc_setup.form_id" }) formXml: string;
  @Column({ name: "run_id", comment: "คดีหมายเลขดำที่" }) runId: number;
  @Column({ name: "dep_code", nullable: true, comment: "หน่วยงาน" }) depCode: number;
  @Column({ name: "pros_type", nullable: true, comment: "ประเภทโจทก์" }) prosType: string;
  @Column({ name: "pros_name", nullable: true, comment: "ชื่อโจทก์" }) prosName: string;
  @Column({ name: "accu_type", nullable: true, comment: "ประเภทจำเลย" }) accuType: string;
  @Column({ name: "accu_name", nullable: true, comment: "ชื่อจำเลย (กับพวกรวม)" }) accuName: string;
  @Column({ name: "litigant_type", nullable: true, comment: "ประเภทคู่ความอื่น" }) litigantType: string;
  @Column({ name: "litigant_name", nullable: true, comment: "ชื่อคู่ความอื่น" }) litigantName: string;
  @Column({ name: "lit_type", nullable: true, comment: "ประเภทคู่ความที่ส่งหมายถึง" }) litType: number;
  @Column({ name: "noticeto_name", nullable: true, comment: "หมายถึง" }) noticetoName: string;
  @Column({ name: "pre_noticeto_name", nullable: true, comment: "หมายถึง (กรณีส่งถึงตำรวจ)" }) preNoticetoName: string;
  @Column({ name: "lit_type_inform", nullable: true, comment: "ประเภทคู่ความในแบบหมายขาว" }) litTypeInform: number;
  @Column({ name: "item_inform", nullable: true, comment: "ลำดับที่คู่ความในแบบหมายขาว" }) itemInform: string;
  @Column({ name: "lit_name_inform", nullable: true, comment: "ชื่อคู่ความในแบบหมายขาว" }) litNameInform: string;
  @Column({ name: "item", nullable: true, comment: "ที่" }) item: string;
  @Column({ name: "person_1", nullable: true, comment: "ชื่อคู่ความหมายอายัด1" }) person1: string;
  @Column({ name: "person_2", nullable: true, comment: "ชื่อคู่ความหมายอายัด2" }) person2: string;
  @Column({ name: "person_3", nullable: true, comment: "ชื่อคู่ความหมายอายัด3" }) person3: string;
  @Column({ name: "person_4", nullable: true, comment: "ชื่อคู่ความหมายอายัด4" }) person4: string;
  @Column({ name: "person_5", nullable: true, comment: "ชื่อคู่ความหมายอายัด5" }) person5: string;
  @Column({ name: "something", nullable: true, comment: "ส่งมอบในหมายอายัด" }) something: string;
  @Column({ name: "contact", nullable: true, comment: "สัญญา" }) contact: string;
  @Column({ name: "contact_date", type: "date", nullable: true, comment: "วันที่ในสัญญา" }) contactDate: Date;
  @Column({ name: "pay_amt", type: "double", nullable: true, comment: "จำนวนเงิน" }) payAmt: number;
  @Column({ name: "jorder_date", type: "date", nullable: true, comment: "วันที่มีคำสั่ง" }) jorderDate: Date;
  @Column({ name: "days", nullable: true, comment: "ชำระเงินภายในกี่วัน" }) days: number;
  @Column({ name: "id_card", comment: "เลขประจำตัวบัตรประชาชน" }) idCard: string;
  @Column({ name: "appoint_date", type: "date", nullable: true, comment: "วันนัด" }) appointDate: Date;
  @Column({ name: "appoint_time", nullable: true, comment: "เวลานัด" }) appointTime: string;
  @Column({ name: "app_all_day", nullable: true, comment: "นัดทั้งวัน" }) appAllDay: number;
  @Column({ name: "app_id", nullable: true, comment: "รหัสเหตุที่นัด pappoint_list" }) appId: number;
  @Column({ name: "app_name", type: "text", comment: "เหตุที่นัด" }) appName: string;
  @Column({ name: "app_court", nullable: true, comment: "นัดไปที่ศาล" }) appCourt: string;
  @Column({ name: "notice_type", nullable: true, comment: "1 หมายทั่วไป 2 หมายจับ" }) noticeType: number;
  @Column({ name: "notice_reason_id", nullable: true, comment: "fk:pnotice_reason.notice_reason_id" }) noticeReasonId: number;
  @Column({ name: "alle_desc", nullable: true, comment: "กระทำผิดฐาน1" }) alleDesc: string;
  @Column({ name: "nation_id", nullable: true, comment: "เชื้อชาติ" }) nationId: number;
  @Column({ name: "inter_id", nullable: true, comment: "สัญชาติ" }) interId: number;
  @Column({ name: "occ_id", nullable: true, comment: "อาชีพ" }) occId: number;
  @Column({ name: "addr", nullable: true, comment: "ที่ตั้ง" }) addr: string;
  @Column({ name: "addr_no", nullable: true, comment: "บ้านเลขที่" }) addrNo: string;
  @Column({ name: "moo", nullable: true, comment: "หมู่ที่" }) moo: string;
  @Column({ name: "road", nullable: true, comment: "ถนน" }) road: string;
  @Column({ name: "soi", nullable: true, comment: "ตรอก/ซอย" }) soi: string;
  @Column({ name: "near_to", nullable: true, comment: "ใกล้เคียง" }) nearTo: string;
  @Column({ name: "prov_id", type: "char", comment: "จังหวัด" }) provId: number;
  @Column({ name: "amphur_id", nullable: true, comment: "อำเภอ" }) amphurId: string;
  @Column({ name: "tambon_id", nullable: true, comment: "ตำบล" }) tambonId: string;
  @Column({ name: "tel", nullable: true, comment: "เบอร์โทรศัพท์" }) tel: string;
  @Column({ name: "comp_address", nullable: true, type: "text", comment: "บริษัทที่ทำงาน" }) compAddress: string;
  @Column({ name: "comp_tel_no", nullable: true, comment: "เบอร์โทรที่ทำงาน" }) compTelNo: string;
  @Column({ name: "post_code", nullable: true, comment: "รหัสไปรษณีย์" }) postCode: number;
  @Column({ name: "casedue", nullable: true, comment: "อายุความ" }) casedue: string;
  @Column({ name: "start_date", type: "date", nullable: true, comment: "นับตั้งแต่วันที่" }) startDate: Date;
  @Column({ name: "guar_running", nullable: true, comment: "running เลขที่ประกัน" }) guarRunning: number;
  @Column({ name: "guar_man", nullable: true, comment: "ชื่อนายประกัน" }) guarMan: string;
  @Column({ name: "guar_no", nullable: true, comment: "เลขที่ประกัน" }) guarNo: number;
  @Column({ name: "guar_yy", nullable: true, comment: "พ.ศ.เลขที่ประกัน" }) guarYy: number;
  @Column({ name: "guarman_item", nullable: true, comment: "นายประกันลำดับที่" }) guarmanItem: number;
  @Column({ name: "guarcash", nullable: true, type: "double", comment: "เป็นเงิน (บาท)" }) guarcash: number;
  @Column({ name: "guar_due", nullable: true, comment: "ภายใน__วัน" }) guarDue: string;
  @Column({ name: "req_user", nullable: true, comment: "ผู้ร้องขอ" }) reqUser: string;
  @Column({ name: "incase", nullable: true, comment: "ในการนี้" }) incase: string;
  @Column({ name: "lead_officer", nullable: true, comment: "จะเป็นผู้นำเจ้าพนักงาน" }) leadOfficer: string;
  @Column({ name: "judge_order", nullable: true, type: "text", comment: "คำสั่งศาลให้" }) judgeOrder: string;
  @Column({ name: "answer", nullable: true, type: "text", comment: "ใบตอบรับ" }) answer: string;
  @Column({ name: "prison_type", nullable: true, comment: "ประเภทหมายขัง" }) prisonType: string;
  @Column({ name: "ocourt_running", nullable: true, comment: "รหัสศาลอื่น" }) ocourtRunning: number;
  @Column({ name: "remark1", nullable: true, type: "text", comment: "หมายเหตุ 1" }) remark1: string;
  @Column({ name: "remark2", nullable: true, type: "text", comment: "หมายเหตุ 2" }) remark2: string;
  @Column({ name: "remark3", nullable: true, type: "text", comment: "หมายเหตุ 3" }) remark3: string;
  @Column({ name: "remark4", nullable: true, type: "text", comment: "หมายเหตุ 4" }) remark4: string;
  @Column({ name: "notice_date", type: "date", nullable: true, comment: "วันที่ออกหมาย" }) noticeDate: Date;
  @Column({ name: "print_label_date", type: "date", nullable: true, comment: "วันทีพิมพ์ label" }) printLabelDate: Date;
  @Column({ name: "print_label_time", nullable: true, comment: "เวลาที่พิมพ์ label" }) printLabelTime: string;
  @Column({ name: "bremark", nullable: true, type: "text", comment: "หมายเหตุ " }) bremark: string;
  @Column({ name: "prison_name", nullable: true, comment: "โทษ" }) prisonName: string;
  @Column({ name: "s_officer_id", nullable: true, comment: "รหัสผู้เดินหมาย" }) sOfficerId: string;
  @Column({ name: "kate_flag", nullable: true, comment: "กทม/ตจว" }) kateFlag: string;
  @Column({ name: "send_by", nullable: true, comment: "ส่งโดยวิธี 1 ไปรษณีย์ 2 จนท" }) sendBy: number;
  @Column({ name: "post_type", nullable: true, comment: "1 EMS, 2 ลงทะเบียนตอบรับ" }) postType: number;
  @Column({ name: "send_by_id", nullable: true, comment: "คำสั่งหมายfk.pnotice_send_type.send_by_id" }) sendById: number;
  @Column({ name: "send_dep_code", nullable: true, comment: "ส่งผลหมายไปแผนก" }) sendDepCode: number;
  @Column({ name: "order_send", nullable: true, comment: "ศาลสั่งให้ส่งโดย" }) orderSend: string;
  @Column({ name: "send_amt", type: "double", nullable: true, comment: "ค่าส่งหมาย" }) sendAmt: number;
  @Column({ name: "send_amt_text", nullable: true, comment: "ข้อความจำนวนเงินค่านำหมาย" }) sendAmtText: string;
  @Column({ name: "pay_date", type: "date", nullable: true, comment: "วันที่การเงินจ่ายเงิน" }) payDate: Date;
  @Column({ name: "check_book_no", nullable: true, comment: "เช็คเล่มที่" }) checkBookNo: string;
  @Column({ name: "check_no", nullable: true, comment: "เลขที่เช็ค" }) checkNo: string;
  @Column({ name: "check_bank", nullable: true, comment: "ธนาคาร" }) checkBank: number;
  @Column({ name: "check_date", type: "date", nullable: true, comment: "เช็คลงวันที่" }) checkDate: Date;
  @Column({ name: "r_officer_id", nullable: true, comment: "รหัสเจ้าหน้าที่ผู้รับหมาย" }) rOfficerId: string;
  @Column({ name: "r_officer_name", nullable: true, comment: "ชื่อเจ้าหน้าที่ผู้รับหมาย" }) rOfficerName: string;
  @Column({ name: "no_money", nullable: true, comment: "1-ไม่มีเงิน 0-มีเงิน" }) noMoney: number;
  @Column({ name: "lead_notice", nullable: true, comment: "ประเภทผู้นำหมาย" }) leadNotice: number;
  @Column({ name: "lead_notice_item", nullable: true, comment: "ชื่อผู้นำหมาย" }) leadNoticeItem: string;
  @Column({ name: "lead_notice_name", nullable: true, comment: "ชื่อผู้นำหมาย" }) leadNoticeName: string;
  @Column({ name: "inout_flag", nullable: true, comment: "1-หมายในเขต   2-ข้ามเขต" }) inoutFlag: number;
  @Column({ name: "backcourt_date", type: "date", nullable: true, comment: "วันที่ส่งคืนศาลเดิม" }) backcourtDate: Date;
  @Column({ name: "red_title", nullable: true, type: "char", comment: "คำนำหน้าหมายเลขคดีแดง" }) redTitle: number;
  @Column({ name: "red_id", nullable: true, comment: "หมายเลขคดีแดง" }) redId: number;
  @Column({ name: "red_yy", nullable: true, comment: "พ.ศ.หมายเลขคดีแดง" }) redYy: number;
  @Column({ name: "doc_bill_no", nullable: true, comment: "เลขที่ใบสำคัญจ่าย" }) docBillNo: string;
  @Column({ name: "judge_id", nullable: true, comment: "รหัสผู้พิพากษาที่สั่งหมาย" }) judgeId: string;
  @Column({ name: "judge_name", nullable: true, comment: "ผู้พิพากษา" }) judgeName: string;
  @Column({ name: "d_check_running", nullable: true, comment: "รหัสเช็คที่จ่ายเงิน" }) dCheckRunning: number;
  @Column({ name: "cover_big", nullable: true, comment: "1= ซองใหญ่  2 = ซองเล็ก" }) coverBig: number;
  @Column({ name: "dep_tel_no", nullable: true, comment: "เบอร์โทรหน่วยงานที่บันทึกข้อมูล" }) depTelNo: string;
  @Column({ name: "cancel_reason", nullable: true, comment: "หมายเหตุยกเลิกหมาย" }) cancelReason: string;
  @Column({ name: "type_by", nullable: true, comment: "ผู้พิมพ์" }) typeBy: string;
  @Column({ name: "type_date", type: "date", nullable: true, comment: "วันที่พิมพ์" }) typeDate: Date;
  @Column({ name: "release_date", type: "date", nullable: true, comment: "วันที่ปลดหมาย" }) releaseDate: Date;
  @Column({ name: "input_release_date", type: "date", nullable: true, comment: "วันที่บันทึกปลดหมาย" }) inputReleaseDate: Date;
  @Column({ name: "input_release_user_id", nullable: true, comment: "รหัสผู้บันทึกปลดหมาย" }) inputReleaseUserId: string;
  @Column({ name: "input_release_user", nullable: true, comment: "ชื่อผู้บันทึกปลดหมาย" }) inputReleaseUser: string;
  @Column({ name: "input_release_dep_code", nullable: true, comment: "หน่วยงานที่บันทึกปลดหมาย" }) inputReleaseDepCode: number;
  @Column({ name: "payment_flag", nullable: true, comment: "ตัดเงินจาก (1 เงินวางประกัน 2 เงินค่านำหมาย)" }) paymentFlag: number;
  @Column({ name: "to_court", nullable: true, comment: "ชื่อศาล(กรณีหมายนอกเขต)" }) toCourt: number;
  @Column({ name: "cost_month", nullable: true, comment: "ค่าใช้จ่ายสำหรับเดือน" }) costMonth: number;
  @Column({ name: "cost_year", nullable: true, comment: "ค่าใช้จ่ายสำหรับปี" }) costYear: number;
  @Column({ name: "copy_type", nullable: true, comment: "ประเภทหมายอุทธรณ์" }) copyType: number;
  @Column({ name: "revise_date", type: "date", nullable: true, comment: "วันส่งสำเนาฟ้อง" }) reviseDate: Date;
  @Column({ name: "revise_send_date", type: "date", nullable: true, comment: "วันครบแก้" }) reviseSendDate: Date;
  @Column({ name: "doc_repair_date", type: "date", nullable: true, comment: "วันที่ยื่นคำแก้" }) docRepairDate: Date;
  @Column({ name: "cond_flag", nullable: true, comment: "1 ทำรายงาน 2 คู่ความยื่นคำแก้" }) condFlag: number;
  @Column({ name: "report_date", type: "date", nullable: true, comment: "วันที่ทำรายงาน" }) reportDate: Date;
  @Column({ name: "repair_date", type: "date", nullable: true, comment: "วันที่" }) repairDate: Date;
  @Column({ name: "order_date", type: "date", nullable: true, comment: "วันที่ออกคำสั่ง" }) orderDate: Date;
  @Column({ name: "appeal_order", nullable: true, type: "text", comment: "คำสั่งอุทธรณ์/ฎีกา" }) appealOrder: string;
  @Column({ name: "case_group_desc", nullable: true, comment: "สำนวนพ่วง" }) caseGroupDesc: string;
  @Column({ name: "litigant_flag", nullable: true, comment: "ส่งหมายให้แก่ 1 โจทก์ 2 จำเลย 3 อื่นๆ" }) litigantFlag: number;
  @Column({ name: "litigant_flag_desc", nullable: true, comment: "รายละเอียดข้อมูลส่งให้แก่" }) litigantFlagDesc: string;
  @Column({ name: "noticeto_name2", nullable: true, comment: "หมายถึง รายงานเจ้าหน้าที" }) noticetoName2: string;
  @Column({ name: "item2", nullable: true, comment: "ที่ รายงานเจ้าหน้าที่" }) item2: string;
  @Column({ name: "doc_run_seq", nullable: true, comment: "running เลขหนังสือส่ง" }) docRunSeq: number;
  @Column({ name: "app_type", nullable: true, comment: "1 กำหนดอายุความ 2 กำหนดนัด" }) appType: number;
  @Column({ name: "app_type_desc", nullable: true, comment: "กำหนด" }) appTypeDesc: string;
  @Column({ name: "app_num_y", nullable: true, comment: "จำนวนกำหนด(ปี)" }) appNumY: number;
  @Column({ name: "app_num_m", nullable: true, comment: "อายุความ เดือน" }) appNumM: number;
  @Column({ name: "app_date", type: "date", nullable: true, comment: "วันที่กำหนด" }) appDate: Date;
  @Column({ name: "app_date_desc", nullable: true, comment: "รายละเอียดวันที่กำหนด" }) appDateDesc: string;
  @Column({ name: "expire_date", type: "date", nullable: true, comment: "ครบอายุความหมายจับ" }) expireDate: Date;
  @Column({ name: "app_time1", nullable: true, comment: "เวลาค้นเริ่ม" }) appTime1: string;
  @Column({ name: "app_time2", nullable: true, comment: "เวลาค้นถึง" }) appTime2: string;
  @Column({ name: "catch_reason_id", nullable: true, comment: "หมยเหตุ(หมายจับ)" }) catchReasonId: number;
  @Column({ name: "catch_reason_desc", nullable: true, comment: "หมยเหตุ(หมายจับ)" }) catchReasonDesc: string;
  @Column({ name: "catch_judge_id", nullable: true, comment: "ผู้พิพากษา(หมายจับ)" }) catchJudgeId: string;
  @Column({ name: "catch_judge_name", nullable: true, comment: "ผู้พิพากษา(หมายจับ)" }) catchJudgeName: string;
  @Column({ name: "judge_tel_no", nullable: true, comment: "หมายเลขโทรศัพท์ผู้พิพากษา(หมายจับ)" }) judgeTelNo: string;
  @Column({ name: "catch_report_date", type: "date", nullable: true, comment: "วันที่รายงานผลหมายจับ" }) catchReportDate: Date;
  @Column({ name: "catch_result", nullable: true, comment: "ผลการจับ 1 จับได้ 2 จับไม่ได้" }) catchResult: number;
  @Column({ name: "catch_date", type: "date", nullable: true, comment: "วันที่จับ" }) catchDate: Date;
  @Column({ name: "catch_remark", nullable: true, type: "text", comment: "อื่นๆ" }) catchRemark: string;
  @Column({ name: "catch_chk1", nullable: true, comment: "ข้อ1 แบบหมายจับใหม่" }) catchChk1: number;
  @Column({ name: "catch_chk2", nullable: true, comment: "ข้อ2แบบหมายจับใหม่" }) catchChk2: number;
  @Column({ name: "catch_chk2_1", nullable: true, comment: "ข้อ2.1แบบหมายจับใหม่" }) catchChk21: number;
  @Column({ name: "catch_chk2_2", nullable: true, comment: "ข้อ2.2 แบบหมายจับใหม่" }) catchChk22: number;
  @Column({ name: "catch_chk2_3", nullable: true, comment: "ข้อ2.3 แบบหมายจับใหม่" }) catchChk23: number;
  @Column({ name: "catch_chk3", nullable: true, comment: "ข้อ3 แบบหมายจับใหม่" }) catchChk3: number;
  @Column({ name: "catch_chk3_remark", nullable: true, comment: "หมายเหตุข้อ 3 หมายจับใหม่" }) catchChk3Remark: string;
  @Column({ name: "notice_remark", nullable: true, type: "text", comment: "หมายเหตุหมายขาว" }) noticeRemark: string;
  @Column({ name: "action_in", nullable: true, comment: "ปฏิบัติตามคำพิพากษาภายใน....วัน" }) actionIn: number;
  @Column({ name: "remark_tr", nullable: true, type: "text", comment: "tr remark" }) remarkTr: string;
  @Column({ name: "ref_id", nullable: true, comment: "" }) refId: string;
  @Column({ name: "ref_notice_no", nullable: true, comment: "ref notice no" }) refNoticeNo: string;
  @Column({ name: "withdraw_date", type: "date", nullable: true, comment: "วันที่เบิก" }) withdrawDate: Date;
  @Column({ name: "payuser_id", nullable: true, comment: "ผู้จ่ายเงิน" }) payuserId: string;
  @Column({ name: "create_dep_code", nullable: true, comment: "รหัสหน่วยงานที่สร้าง record" }) createDepCode: number;
  @Column({ name: "create_user_id", nullable: true, comment: "รหัส user ที่สร้าง record" }) createUserId: string;
  @Column({ name: "create_user", nullable: true, comment: "user ที่สร้าง record" }) createUser: string;
  @Column({ name: "update_dep_code", nullable: true, comment: "รหัสหน่วยงานที่ update" }) updateDepCode: number;
  @Column({ name: "update_user_id", nullable: true, comment: "รหัส user ที่ update record" }) updateUserId: string;
  @Column({ name: "update_user", nullable: true, comment: "user ที่ update record" }) updateUser: string;
  @Column({ name: "old_notice_no", nullable: true, comment: "เลขหมายเดิมก่อน update" }) oldNoticeNo: number;
  @Column({ name: "old_notice_yy", nullable: true, comment: "เลขหมายเดิมก่อน update" }) oldNoticeYy: number;
  @Column({ name: "ref_id1", nullable: true, comment: "ref สำหรับ data convert" }) refId1: string;
  @Column({ name: "ref_id2", nullable: true, comment: "ref สำหรับ data convert" }) refId2: string;
  @Column({ name: "ref_recgen", nullable: true, comment: "reference BlackRecGen" }) refRecgen: string;
  @Column({ name: "ref_no", nullable: true, comment: "reference DocNo" }) refNo: string;
  @Column({ name: "ref_outRecGen", nullable: true, comment: "ref หมายข้ามเขต(ศาลอื่น)" }) refOutRecGen: string;
  @CreateDateColumn({ name: "create_date", type: "datetime", comment: "วันที่เวลาสร้าง record" }) createDate: Date;
  @UpdateDateColumn({ name: "update_date", type: "datetime", comment: "วันที่ เวลา update record" }) updateDate: Date;

  @OneToMany(type => MySQLNoticeSends, send => send.noticeRunning)
  @JoinColumn({ name: "notice_running" }) noticeSends: MySQLNoticeSends;

  toResponseObject() {
    const {
      noticeRunning, courtRunning, noticeCourtRunning, noticeTypeId, noticeTypeName, noticeNo, noticeYy, dataType, noticeGroup, noticeGroupYy, noticeBarcode,
      appealRunning, formRunning, formId, appealType, formXml, runId, depCode, prosType, prosName, accuType, accuName,
      litigantType, litigantName, litType, noticetoName, preNoticetoName, litTypeInform, itemInform, litNameInform, item,
      person1, person2, person3, person4, person5, something, contact, contactDate, payAmt, jorderDate, days, idCard,
      appointDate, appointTime, appAllDay, appId, appName, appCourt, noticeType, noticeReasonId, alleDesc, nationId, interId,
      occId, addr, addrNo, moo, road, soi, nearTo, provId, amphurId, tambonId, tel, compAddress, compTelNo, postCode, casedue,
      startDate, guarRunning, guarMan, guarNo, guarYy, guarmanItem, guarcash, guarDue, reqUser, incase, leadOfficer, judgeOrder,
      answer, prisonType, ocourtRunning, remark1, remark2, remark3, remark4, noticeDate, printLabelDate, printLabelTime, bremark,
      prisonName, sOfficerId, kateFlag, sendBy, postType, sendById, sendDepCode, orderSend, sendAmt, sendAmtText, payDate,
      checkBookNo, checkNo, checkBank, checkDate, rOfficerId, rOfficerName, noMoney, leadNotice, leadNoticeItem, leadNoticeName,
      inoutFlag, backcourtDate, redTitle, redId, redYy, docBillNo, judgeId, judgeName, dCheckRunning, coverBig, depTelNo,
      cancelReason, typeBy, typeDate, releaseDate, inputReleaseDate, inputReleaseUserId, inputReleaseUser, inputReleaseDepCode,
      paymentFlag, toCourt, costMonth, costYear, copyType, reviseDate, reviseSendDate, docRepairDate, condFlag, reportDate,
      repairDate, orderDate, appealOrder, caseGroupDesc, litigantFlag, litigantFlagDesc, noticetoName2, item2, docRunSeq, appType,
      appTypeDesc, appNumY, appNumM, appDate, appDateDesc, expireDate, appTime1, appTime2, catchReasonId, catchReasonDesc,
      catchJudgeId, catchJudgeName, judgeTelNo, catchReportDate, catchResult, catchDate, catchRemark, catchChk1, catchChk2,
      catchChk21, catchChk22, catchChk23, catchChk3, catchChk3Remark, noticeRemark, actionIn, remarkTr, refId, refNoticeNo,
      withdrawDate, payuserId, createDepCode, createUserId, createUser, createDate, updateDepCode, updateUserId, updateUser,
      updateDate, oldNoticeNo, oldNoticeYy, refId1, refId2, refRecgen, refNo, refOutRecGen, noticeSends
    } = this;

    const responseObject = {
      noticeRunning, courtRunning, noticeCourtRunning, noticeTypeId, noticeTypeName, noticeNo, noticeYy, dataType, noticeGroup, noticeGroupYy, noticeBarcode,
      appealRunning, formRunning, formId, appealType, formXml, runId, depCode, prosType, prosName, accuType, accuName,
      litigantType, litigantName, litType, noticetoName, preNoticetoName, litTypeInform, itemInform, litNameInform, item,
      person1, person2, person3, person4, person5, something, contact, contactDate, payAmt, jorderDate, days, idCard,
      appointDate, appointTime, appAllDay, appId, appName, appCourt, noticeType, noticeReasonId, alleDesc, nationId, interId,
      occId, addr, addrNo, moo, road, soi, nearTo, provId, amphurId, tambonId, tel, compAddress, compTelNo, postCode, casedue,
      startDate, guarRunning, guarMan, guarNo, guarYy, guarmanItem, guarcash, guarDue, reqUser, incase, leadOfficer, judgeOrder,
      answer, prisonType, ocourtRunning, remark1, remark2, remark3, remark4, noticeDate, printLabelDate, printLabelTime, bremark,
      prisonName, sOfficerId, kateFlag, sendBy, postType, sendById, sendDepCode, orderSend, sendAmt, sendAmtText, payDate,
      checkBookNo, checkNo, checkBank, checkDate, rOfficerId, rOfficerName, noMoney, leadNotice, leadNoticeItem, leadNoticeName,
      inoutFlag, backcourtDate, redTitle, redId, redYy, docBillNo, judgeId, judgeName, dCheckRunning, coverBig, depTelNo,
      cancelReason, typeBy, typeDate, releaseDate, inputReleaseDate, inputReleaseUserId, inputReleaseUser, inputReleaseDepCode,
      paymentFlag, toCourt, costMonth, costYear, copyType, reviseDate, reviseSendDate, docRepairDate, condFlag, reportDate,
      repairDate, orderDate, appealOrder, caseGroupDesc, litigantFlag, litigantFlagDesc, noticetoName2, item2, docRunSeq, appType,
      appTypeDesc, appNumY, appNumM, appDate, appDateDesc, expireDate, appTime1, appTime2, catchReasonId, catchReasonDesc,
      catchJudgeId, catchJudgeName, judgeTelNo, catchReportDate, catchResult, catchDate, catchRemark, catchChk1, catchChk2,
      catchChk21, catchChk22, catchChk23, catchChk3, catchChk3Remark, noticeRemark, actionIn, remarkTr, refId, refNoticeNo,
      withdrawDate, payuserId, createDepCode, createUserId, createUser, updateDepCode, updateUserId, updateUser,
      oldNoticeNo, oldNoticeYy, refId1, refId2, refRecgen, refNo, refOutRecGen,
      noticeSends: noticeSends ? noticeSends.toResponseObject() : null,
      createDate: createDate ? this.dateFormat("YYYY-MM-DD", createDate) : null,
      updateDate: updateDate ? this.dateFormat("YYYY-MM-DD", updateDate) : null,
    };

    return responseObject;
  }
}