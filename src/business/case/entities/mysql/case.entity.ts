import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "pcase" })
export class MySQLCases {
  @PrimaryGeneratedColumn({ name: "run_id" }) runId: number;
  @Column({ name: "court_running", comment: "รหัสศาลเจ้าของระบบ" }) courtRunning: number;
  @Column({ name: "title", comment: "คำนำหน้าเลขคดี" }) title: string;
  @Column({ name: "id", comment: "เลขคดี" }) id: number;
  @Column({ name: "yy", comment: "ปีพ.ศ.เลขคดี" }) yy: number;
  @Column({ name: "case_date", comment: "วันที่ยื่นคำฟ้อง", type: "date" }) caseDate: Date;
  @Column({ name: "case_type", comment: "ความ 1 = อาญา, 2 = แพ่ง" }) caseType: number;
  @Column({ name: "case_cate_id", comment: "รหัสประเภทคดี" }) caseCateId: number;
  @Column({ name: "case_status", comment: "ชั้นพิจารณาคดี" }) caseStatus: number;
  @Column({ name: "case_court_type", comment: "คดีของศาล fk: pcourt_type.court_type_id" }) caseCourtType: number;
  @Column({ name: "index_id", comment: "รหัสประเภทสารบาญคดี" }) indexId: number;
  @Column({ name: "con_court_level", comment: "ไกล่เกลี่ยชั้น1-ต้น 2อุทธรณ์ 3 - ฎีกา" }) conCourtLevel: number;
  @Column({ name: "con_status", comment: "ขั้นตอน 1 ก่อนฟ้องคดี, 2 ก่อนวันนัดสืบพยาน, 3 ระหว่างสืบพยาน, 4 หลังวันนัดสืบพยาน, 5 ก่อนอ่านคำพิพากษา" }) conStatus: number;
  @Column({ name: "imprison_id", comment: "โทษเกิน 10 ปี" }) imprisonId: number;
  @Column({ name: "dispute", comment: "1 มีข้อพิพาท 2 ไม่มีข้อพิพาท" }) dispute: number;
  @Column({ name: "case_or_req", comment: "1 คำฟ้อง 2 คำร้อง" }) caseOrReq: number;
  @Column({ name: "case_level", comment: "สถานภาพการฟ้อง 1 ปกติ 2 ยกเว้น" }) caseLevel: number;
  @Column({ name: "not_gen_post_date", comment: "ไม่สร้างรายการกำหนดฝากขัง" }) notGenPostDate: number;
  @Column({ name: "not_gen_notice", comment: "ไม่สร้างหมาย" }) notGenNotice: number;
  @Column({ name: "alle_desc", comment: "ฐานความผิดขึ้นปก" }) alleDesc: string;
  @Column({ name: "alle_short_desc", comment: "ฐานความผิด(ย่อ)" }) alleShortDesc: string;
  @Column({ name: "deposit", comment: "จำนวนทุนทรัพย์", type: "double" }) deposit: number;
  @Column({ name: "deposit_unit", comment: "สกุลเงิน" }) depositUnit: string;
  @Column({ name: "fee_flag", comment: "มีค่าขึ้นศาลอนาคต" }) feeFlag: number;
  @Column({ name: "fee_id", comment: "อัตราค่าธรรมเนียม" }) feeId: number;
  @Column({ name: "court_fee", comment: "ค่าธรรมเนียม", type: "double" }) courtFee: number;
  @Column({ name: "case_result", comment: "ผลการรับฟ้อง" }) caseResult: number;
  @Column({ name: "indict_id", comment: "รหัสใจความฟ้อง" }) indictId: number;
  @Column({ name: "indict_desc", comment: "ใจความฟ้อง" }) indictDesc: string;
  @Column({ name: "indict_long", comment: "รายละเอียดใจความฟ้อง" }) indictLong: string;
  @Column({ name: "indict_form_id", comment: "รหัสใจความฟ้อง" }) indictFormId: number;
  @Column({ name: "indict_form_name", comment: "ชื่อใจความฟ้อง" }) indictFormName: string;
  @Column({ name: "indict_form_desc", comment: "รายละเอียดใจความฟ้อง" }) indictFormDesc: string;
  @Column({ name: "pinalty_desc", comment: "ขอให้ลงโทษตาม" }) pinaltyDesc: string;
  @Column({ name: "case_order_id", comment: "รหัสตรายาง" }) caseOrderId: number;
  @Column({ name: "case_order_desc", comment: "ตรายางคำสั่ง" }) caseOrderDesc: string;
  @Column({ name: "zone_nation_id", comment: "ประเทศที่เกิดเหตุ" }) zoneNationId: number;
  @Column({ name: "zone_prov_id", comment: "เหตุเกิดที่จังหวัด fk: pprovince.prov_id" }) zoneProvId: string;
  @Column({ name: "zone_amphur_id", comment: "เหตุเกิดที่อำเภอ fk: pamphur.amphur_id" }) zoneAmphurId: string;
  @Column({ name: "order_judge_id", comment: "รหัสผู้พิพากษาเวรสั่ง" }) orderJudgeId: string;
  @Column({ name: "order_judge_date", comment: "วันที่สั่ง", type: "date" }) orderJudgeDate: Date;
  @Column({ name: "case_judge_id", comment: "รหัสผู้พิพากษาเจ้าของสำนวน" }) caseJudgeId: string;
  @Column({ name: "judge_post_id", comment: "ตำแหน่งเจ้าของสำนวน" }) judgePostId: number;
  @Column({ name: "judge_post_name", comment: "ชื่อตำแหน่งผู้พิพากษา" }) judgePostName: string;
  @Column({ name: "case_judge_gid", comment: "รหัสองค์คณะเจ้าของสำนวน" }) caseJudgeGid: string;
  @Column({ name: "case_judge_gid2", comment: "องค์คณะคนที่ 2" }) caseJudgeGid2: string;
  @Column({ name: "case_judge_aid", comment: "ผู้พิพากษาสมทบ" }) caseJudgeAid: number;
  @Column({ name: "case_judge_aid2", comment: "ผู้พิพากษาสมทบ" }) caseJudgeAid2: number;
  @Column({ name: "case_judge_date", comment: "วันที่เป็นเจ้าของสำนวน", type: "date" }) caseJudgeDate: Date;
  @Column({ name: "case_judge_end_date", comment: "วันที่สิ้นสุดการเป็นเจ้าของ", type: "date" }) caseJudgeEndDate: Date;
  @Column({ name: "case_judge_adate", comment: "วันที่จ่ายผู้พิพากษาสมทบ", type: "date" }) caseJudgeAdate: Date;
  @Column({ name: "case_judge_end_adate", comment: "วันที่สิ้นสุด", type: "date" }) caseJudgeEndAdate: Date
  @Column({ name: "case_judge_adate2", comment: "วันที่จ่ายผู้พิพากษาสมทบคนที่ 2", type: "date" }) caseJudgeAdate2: Date;
  @Column({ name: "case_judge_end_adate2", comment: "วันที่สิ้นสุดจ่ายผู้พิพากษาสมทบคนที่ 2", type: "date" }) caseJudgeEndAdate2: Date;
  @Column({ name: "old_judge_id", comment: "รหัสเจ้าของสำนวนเดิม" }) oldJudgeId: string;
  @Column({ name: "assign_judge_id", comment: "ผู้พิพากษาที่จ่ายสำนวน" }) assignJudgeId: string;
  @Column({ name: "con_judge_id", comment: "รหัสผู้พิพากษาที่ไกล่เกลี่ย / สมานฉันท์" }) conJudgeId: string;
  @Column({ name: "condition_id", comment: "ประเภทการจ่ายสำนวน fk: passign_stat_condition.condition_id" }) conditionId: number;
  @Column({ name: "create_case_judge_dep_code", comment: "หน่วยงานที่จ่ายสำนวน" }) createCaseJudgeDepCode: number;
  @Column({ name: "create_case_judge_user_id", comment: "รหัสผู้บันทึกเจ้าของสำนวน" }) createCaseJudgeUserId: string;
  @Column({ name: "create_case_judge_user_name", comment: "ผู้บันทึกเจ้าของสำนวน" }) createCaseJudgeUserName: string;
  @Column({ name: "create_case_judge_date", comment: "วันที่บันทึกเจ้าของสำนวน", type: "datetime" }) createCaseJudgeDate: Date;
  @Column({ name: "update_case_judge_dep_code", comment: "หน่วยงานที่แก้ไขการจ่ายสำนวน" }) updateCaseJudgeDepCode: number;
  @Column({ name: "update_case_judge_user_id", comment: "รหัสผู้แก้ไขเจ้าของสำนวนล่าสุด" }) updateCaseJudgeUserId: string;
  @Column({ name: "update_case_judge_user_name", comment: "ผู้แก้ไขเจ้าของสำนวนล่าสุด" }) updateCaseJudgeUserName: string;
  @Column({ name: "update_case_judge_date", comment: "วันที่แก้ไขเจ้าของสำนวนล่าสุด", type: "datetime" }) updateCaseJudgeDate: Date;
  @Column({ name: "order_judge_gid", comment: "องค์คณ์ผู้สั่ง" }) orderJudgeGid: string;
  @Column({ name: "order_judge_aid", comment: "ผู้พิพากษาสมทบ" }) orderJudgeAid: number;
  @Column({ name: "sjudge_id", comment: "ผู้แต่งตั้ง" }) sjudgeId: string;
  @Column({ name: "spost_id", comment: "ตำแหน่งผู้แต่งตั้ง" }) spostId: number;
  @Column({ name: "hold_id", comment: "สาเหตุที่คดีค้าง" }) holdId: string;
  @Column({ name: "case_penalty", comment: "อัตราโทษ" }) casePenalty: number;
  @Column({ name: "case_req", comment: "คำฟ้อง / คำร้อง", type: "char" }) caseReq: string;
  @Column({ name: "pros_desc", comment: "ชื่อโจทก์กับพวกรวม" }) prosDesc: string;
  @Column({ name: "pros_type", comment: "ผู้ยื่นฟ้อง" }) prosType: string;
  @Column({ name: "accu_desc", comment: "ชื่อจำเลยกับพวกรวม" }) accuDesc: string;
  @Column({ name: "accu_type", comment: "ผู้ถูกฟ้อง" }) accuType: string;
  @Column({ name: "rpt_pros_desc", comment: "โจทก์ ใช้ในรายงาน" }) rptProsDesc: string;
  @Column({ name: "rpt_pros_type", comment: "ประเภทโจทก์ ใช้ในรายงาน" }) rptProsType: string;
  @Column({ name: "rpt_accu_desc", comment: "จำเลย ใช้ในรายงาน" }) rptAccuDesc: string;
  @Column({ name: "rpt_accu_type", comment: "ประเภทจำเลย ใช้ในรายงาน" }) rptAccuType: string;
  @Column({ name: "rpt_litigant_desc1", comment: "รายละเอียดคู่ความ 1" }) rptLitigantDesc1: string;
  @Column({ name: "rpt_litigant_type1", comment: "ประเภทรายละเอียดคู่ความ 1" }) rptLitigantType1: string;
  @Column({ name: "rpt_litigant_desc2", comment: "รายละเอียดคู่ความ 2" }) rptLitigantDesc2: string;
  @Column({ name: "rpt_litigant_type2", comment: "ประเภทรายละเอียดคู่ความ 2" }) rptLitigantType2: string;
  @Column({ name: "rpt_litigant_desc3", comment: "รายละเอียดคู่ความ 3" }) rptLitigantDesc3: string;
  @Column({ name: "rpt_litigant_type3", comment: "ประเภทรายละเอียดคู่ความ 3" }) rptLitigantType3: string;
  @Column({ name: "litigant_desc1", comment: "ผู้ร้อง" }) litigantDesc1: string;
  @Column({ name: "litigant_desc2", comment: "ผู้คัดค้าน" }) litigantDesc2: string
  @Column({ name: "barcode", comment: "บาร์โค้ด" }) barcode: string;
  @Column({ name: "asset_no", comment: "เลขที่เอกสารแยกเก็บศาลเดิม" }) assetNo: number;
  @Column({ name: "asset_yy", comment: "ปีพ.ศ.เลขที่เอกสารแยกเก็บศาลเดิม" }) assetYY: number;
  @Column({ name: "remark", comment: "หมายเหตุ" }) remark: string;
  @Column({ name: "pfinish", comment: "ประเด็นเสร็จ" }) pfinish: string;
  @Column({ name: "psend_date", comment: "วันที่ส่งไป" }) psendDate: Date;
  @Column({ name: "prcv_date", comment: "วันที่รับคืน" }) prcvDate: Date;
  @Column({ name: "psendcourt_running", comment: "ศาลที่ส่งไป" }) psendcourtRunning: number;
  @Column({ name: "owncourt_running", comment: "ศาลเจ้าของคดี" }) owncourtRunning: number;
  @Column({ name: "org_id", comment: "รหัสหน่วยงานภายนอก porg" }) orgId: number;
  @Column({ name: "transfer_court_running", comment: "รับโอนคดีจากศาล" }) transferCourtRunning: number;
  @Column({ name: "transfer_date", comment: "วันที่โอน" }) transferDate: Date;
  @Column({ name: "old_court_running", comment: "ศาลเจ้าของคดีเดิม" }) oldCourtRunning: number;
  @Column({ name: "old_title", comment: "คำนำหน้าคดีศาลเดิม" }) oldTitle: string;
  @Column({ name: "old_id", comment: "เลขคดีศาลเดิม" }) oldId: string;
  @Column({ name: "old_yy", comment: "ปีคดีศาลเดิม" }) oldYY: string;
  @Column({ name: "old_red_title", comment: "คำนำหน้าคดีแดงศาลเดิม" }) oldRedTitle: string;
  @Column({ name: "old_red_id", comment: "เลขคดีแดงศาลเดิม" }) oldRedId: string;
  @Column({ name: "old_red_yy", comment: "ปีคดีแดงศาลเดิม" }) oldRedYY: string;
  @Column({ name: "old_case_no", comment: "หมายเลขคดีดำศาลเดิม" }) oldCaseNo: string;
  @Column({ name: "old_red_no", comment: "หมายเลขคดีแดงศาลเดิม" }) oldRedNo: string;
  @Column({ name: "recieve_by", comment: "รับโดย" }) recieveBy: number;
  @Column({ name: "issue_attach", comment: "สิ่งที่ส่งมาด้วย(ประเด็น)" }) issueAttach: string;
  @Column({ name: "ref_idred", comment: "อ้างอิงเลขคดีแดงจากโอนข้อมูล" }) refIdred: string;
  @Column({ name: "alle_add", comment: "ฐานความผิดเพิ่มเติม" }) alleAdd: string;
  @Column({ name: "issue_type", comment: "1 ส่งสำนวน 2 ส่งสำเนา" }) issueType: number;
  @Column({ name: "pros_total", comment: "สืบพยานโจทก์รวม" }) prosTotal: number;
  @Column({ name: "accu_total", comment: "สืบพยานโจทก์รวม" }) accuTotal: number;
  @Column({ name: "witness_total", comment: "จำนวนนัดสืบพยานทั้งหมด" }) witnessTotal: number;
  @Column({ name: "pros_appoint_day", comment: "จำนวนวันสืบโจทก์" }) prosAppointDay: number;
  @Column({ name: "accu_appoint_day", comment: "จำนวนวันสืบจำเลย" }) accuAppointDay: number;
  @Column({ name: "other_total", comment: "สืบพยานอื่นๆรวม" }) otherTotal: number;
  @Column({ name: "other_appoint_day", comment: "จำนวนวันสืบอื่นๆ" }) otherAppointDay: number;
  @Column({ name: "notover_month", comment: "นัดไม่เกิน ต่อเดือน" }) notoverMonth: string;
  @Column({ name: "head_judge_id", comment: "ผู้แต่งตั้งไกล่เกลี่ย" }) headJudgeId: string;
  @Column({ name: "head_judge_post_id", comment: "ตำแหน่งผู้แต่งตั้งไกล่เกลี่ย" }) headJudgePostId: number;
  @Column({ name: "total_case_group", comment: "คดีรวมพิจารณา" }) totalCaseGroup: string;
  @Column({ name: "num_case_group", comment: "จำนวนสำนวนพ่วง" }) numCaseGroup: number;
  @Column({ name: "total_red_group", comment: "คดีแดงรวมพิจารณา" }) totalRedGroup: string;
  @Column({ name: "conciliate_date", comment: "วันที่จ่ายผู้ประนอม" }) conciliateDate: Date;
  @Column({ name: "conciliate_type1", comment: "conciliate_post_id3" }) conciliateType1: number;
  @Column({ name: "conciliate_id1", comment: "รหัสผู้ประนอม" }) conciliateId1: string;
  @Column({ name: "conciliate_name1", comment: "ชื่อผู้ประนอม" }) conciliateName1: string;
  @Column({ name: "conciliate_post_id1", comment: "ตำแหน่ง" }) conciliatePostId1: number;
  @Column({ name: "conciliate_type2", comment: "conciliate_post_id3" }) conciliateType2: number;
  @Column({ name: "conciliate_id2", comment: "รหัสผู้ประนอม" }) conciliateId2: string;
  @Column({ name: "conciliate_name2", comment: "ชื่อผู้ประนอม" }) conciliateName2: string;
  @Column({ name: "conciliate_post_id2", comment: "ตำแหน่ง" }) conciliatePostId2: number;
  @Column({ name: "conciliate_type3", comment: "conciliate_post_id3" }) conciliateType3: number;
  @Column({ name: "conciliate_id3", comment: "รหัสผู้ประนอม" }) conciliateId3: string;
  @Column({ name: "conciliate_name3", comment: "ชื่อผู้ประนอม" }) conciliateName3: string;
  @Column({ name: "conciliate_post_id3", comment: "ตำแหน่ง" }) conciliatePostId3: number;
  @Column({ name: "old_conciliate_type1", comment: "ประเภทผู้ประนอมเดิม" }) oldConciliateType1: number;
  @Column({ name: "old_conciliate_id1", comment: "รหัสผู้ประนอมเดิม" }) oldConciliateId1: string;
  @Column({ name: "old_conciliate_name1", comment: "ชื่อผู้ประนอมเดิม" }) oldConciliateName1: string;
  @Column({ name: "old_conciliate_post_id1", comment: "ตำแหน่งผู้ประนอมเดิม" }) oldConciliatePostId1: number;
  @Column({ name: "old_conciliate_type2", comment: "ประเภทผู้ประนอมเดิม" }) oldConciliateType2: number;
  @Column({ name: "old_conciliate_id2", comment: "รหัสผู้ประนอมเดิม" }) oldConciliateId2: string;
  @Column({ name: "old_conciliate_name2", comment: "ชื่อผู้ประนอมเดิม" }) oldConciliateName2: string;
  @Column({ name: "old_conciliate_post_id2", comment: "หน่งผู้ประนอมเดิม" }) oldConciliatePostId2: number;
  @Column({ name: "create_conciliate_dep_code", comment: "หน่วยงานที่บันทึกผู้ไกล่เกลี่ย" }) createConciliateDepCode: string;
  @Column({ name: "create_conciliate_user_id", comment: "ผู้บันทึกการจ่ายผู้ประนอม" }) createConciliateUserId: string;
  @Column({ name: "create_conciliate_user_name", comment: "ชื่อผู้บันทึกการจ่ายผู้ประนอม" }) createConciliateUserName: string;
  @Column({ name: "create_conciliate_date", comment: "วันที่การจ่ายผู้ประนอม" }) createConciliateDate: Date;
  @Column({ name: "update_conciliate_dep_code", comment: "หน่วยงานที่แก้ไขการจ่ายผู้ประนีประนอม" }) updateConciliateDepCode: string;
  @Column({ name: "update_conciliate_user_id", comment: "ผู้แก้ไขการจ่ายผู้ประนอม" }) updateConciliateUserId: string;
  @Column({ name: "update_conciliate_user_name", comment: "ชื่อผู้แก้ไขการจ่ายผู้ประนอม" }) updateConciliateUserName: string;
  @Column({ name: "update_conciliate_user_date", comment: "วันที่แก้ไขการจ่ายผู้ประนอม" }) updateConciliateUserDate: Date;
  @Column({ name: "guar_pros", comment: "1คำฟ้อง 2 คำร้องขอ" }) guarPros: number;
  @Column({ name: "fr_run_id", comment: "มาจากหมายเลขคดีดำที่" }) frRunId: number;
  @Column({ name: "draft_run_id", comment: "running เลขสำนวนจำลอง" }) draftRunId: number;
  @Column({ name: "split_run_id", comment: "หมายเลขคดีที่แยกสำนวน" }) splitRunId: number;
  @Column({ name: "party", comment: "1 ฝ่ายเดียว 2 สองฝ่าย" }) party: number;
  @Column({ name: "own_new_flag", comment: "เจ้าของทำเอง / จ่ายใหม" }) ownNewFlag: number;
  @Column({ name: "ad_new_flag", comment: "จ่ายชั่วคราวผู้พิพากษาสมทบ" }) adNewFlag: number;
  @Column({ name: "con_app", comment: "นัดต่อเนื่อง" }) conApp: number;
  @Column({ name: "suggestion", comment: "ความเห็น" }) suggestion: string;
  @Column({ name: "case_yes_no", comment: "1 = สำนวน 2 = ไม่ใช่สำนวน" }) caseYesNo: number;
  @Column({ name: "skip_assign_auto", comment: "ไม่จ่ายอัตโนมัติ" }) skipAssignAuto: number;
  @Column({ name: "print_case", comment: "1 - พิมพ์คำฟ้อง ผบ" }) printCase: number;
  @Column({ name: "check_flag", comment: "1 ตรวจสอบข้อมูลแล้ว" }) checkFlag: number;
  @Column({ name: "end_case", comment: "คดีจบ กรณีคดีเก่าๆที่ไม่มีแดง" }) endCase: number;
  @Column({ name: "e_court_flag", comment: "เข้าระบบ E - Court" }) eCourtElag: number;
  @Column({ name: "eng_flag", comment: "ข้อมูลภาษาอังกฤษ" }) engFlag: number;
  @Column({ name: "customer_flag", comment: "1 โจทก์เป็นผู้บริโภค 2 จำเลยเป็นผู้บริโภค" }) customerFlag: number;
  @Column({ name: "admit_flag", comment: "จำเลย 1 รับสารภาพ 2 ปฏิเสธ" }) admitFlag: number;
  @Column({ name: "post_ending_date", comment: "วันที่สิ้นสุดฝากขัง" }) postEndingDate: Date;
  @Column({ name: "police_rank", comment: "ยศตำรวจเจ้าของสำนวน" }) policeRank: string;
  @Column({ name: "police_id", comment: "รหัสสถานีตำรวจที่ฟ้อง" }) policeId: number;
  @Column({ name: "police_name", comment: "ชื่อสกุลตำรวจเจ้าของสำนวน" }) policeName: string;
  @Column({ name: "req_type", comment: "ประเภทผู้ร้อง, 1 - พนักงานอัยการ 2 - พนักงานสอบสวน 3 - ผู้กำกับ" }) reqType: number;
  @Column({ name: "req_id", comment: "รหัสผู้ร้อง(ตาม req_type)" }) reqId: string;
  @Column({ name: "req_name", comment: "ชื่อผู้ร้อง" }) reqName: string;
  @Column({ name: "req_name2", comment: "ชื่อผู้ร้อง" }) reqName2: string;
  @Column({ name: "post_day", comment: "ฝากขังได้กี่วัน" }) postDay: number;
  @Column({ name: "post_day_other", comment: "ฝากขังมาจากที่อื่นกี่วัน" }) postDayOther: number;
  @Column({ name: "post_flag_burn", comment: "ปลดเผา(ฝากขัง)" }) postFlagBurn: number;
  @Column({ name: "post_burn_date", comment: "วันที่ปลดเผา(ฝากขัง)" }) postBurnDate: Date;
  @Column({ name: "post_message", comment: "หมายเหตุปลดเผาฝากขัง" }) postMessage: string;
  @Column({ name: "stat_flag", comment: "ไม่เก็บสถิติ" }) statFlag: string;
  @Column({ name: "special_id", comment: "คดีพิเศษ" }) specialId: number;
  @Column({ name: "skip_appoint", comment: "1: นัดต่อเนื่องให้นัดกระโดดได้" }) skipAppoint: number;
  @Column({ name: "case_form_id", comment: "แบบคำร้อง fk: pword_form.form_id" }) caseFormId: number;
  @Column({ name: "case_form_name", comment: "ชื่อแบบคำฟ้อง" }) caseFormName: string;
  @Column({ name: "witness_form_id", comment: "แบบรายงานพยาน" }) witnessFormId: number;
  @Column({ name: "witness_form_name", comment: "ชื่อแบบรายงานพยาน" }) witnessFormName: string;
  @Column({ name: "issue_subject", comment: "เรื่องที่ดำเนินการ" }) issueSubject: string;
  @Column({ name: "issue_rcv_time", comment: "เวลารับเรื่อง" }) issueRcvTime: string;
  @Column({ name: "issue_time", comment: "เวลาเริ่มจัดทำ" }) issueTime: string;
  @Column({ name: "issue_finish_time", comment: "เวลาแล้วเสร็จ" }) issueFinishTime: string;
  @Column({ name: "web_id", comment: "ข้อมูลจากว็บ run_id" }) webId: number;
  @Column({ name: "web_run_no", comment: "run_no ข้อมูลจากว็บ" }) webRunNo: number;
  @Column({ name: "web_run_yy", comment: "ข้อมูลจากว็บ run_yy" }) webRunYY: number;
  @Column({ name: "create_dep_code", comment: "รหัสหน่วยงานที่สร้าง record" }) createDepCode: number;
  @Column({ name: "create_user_id", comment: "รหัส user ที่สร้าง record" }) createUserId: string;
  @Column({ name: "create_user", comment: "user ที่สร้าง record" }) createUser: string;
  @Column({ name: "create_date", comment: "วันที่เวลาสร้าง record" }) createDate: Date;
  @Column({ name: "update_dep_code", comment: "รหัสหน่วยงานที่ update" }) updateDepCode: number;
  @Column({ name: "update_user_id", comment: "รหัส user ที่ update record" }) updateUserId: string;
  @Column({ name: "update_user", comment: "user ที่ update record" }) updateUser: string;
  @Column({ name: "update_date", comment: "วันที่ เวลา update record" }) updateDate: Date;
  @Column({ name: "remark_tr", comment: "หมายเหตุสำนวนพ่วง transfer" }) remarkTr: string;
  @Column({ name: "pros_desc_bk", comment: "โจทก์กับพวกรวม(โอนมา)" }) prosDescBk: string;
  @Column({ name: "accu_desc_bk", comment: "จำเลยกับพวกรวม(โอนมา)" }) accuDescBk: string;
  @Column({ name: "ref_blackrecgen", comment: "transfer" }) refBlackrecgen: string;
  @Column({ name: "ref_idblk", comment: "อ้างอิงเลขคดีจาก converst data" }) refIdblk: string;
  @Column({ name: "ref_seekRecGEn", comment: "ref notice - seek" }) refSeekRecGEn: string;
  @Column({ name: "ref_catchRecGen", comment: "ref notice -catch" }) refCatchRecGen: string;
  @Column({ name: "ref_doc_rec_gen", comment: "ref เลขหนังสือรับสำหรับคดีต่างจังหวัด" }) refDocRecGen: string;
  @Column({ name: "ref_doc_recgen", comment: "reference DocRecGen สำหรับเลข ต" }) refDocRecgen: string;
  @Column({ name: "ref_old_black", comment: "" }) refOldBlack: string;
  @Column({ name: "ref_old_red", comment: "" }) refOldRed: string;
  @Column({ name: "notice_exists", comment: "มีหมาย ต" }) noticeExists: number;
  @Column({ name: "ref_black_title", comment: "transfer" }) refBlackTitle: string;
  @Column({ name: "ref_black_id", comment: "transfer" }) refBlackId: number;
  @Column({ name: "ref_black_yy", comment: "transfer" }) refBlackYY: number;
  @Column({ name: "ref_case_type", comment: "transfer" }) refCaseType: number;
  @Column({ name: "ref_blackno", comment: "transfer" }) refBlackno: string;
  @Column({ name: "tr_court_appoint", comment: "รหัสศาลที่ต้องไปตามนัด sandai" }) trCourtAppoint: number;

  toResponseObject() {
    const {
      runId, courtRunning, title, id, yy, caseDate, caseType, caseCateId, caseStatus, caseCourtType, indexId, conCourtLevel, conStatus,
      imprisonId, dispute, caseOrReq, caseLevel, notGenPostDate, notGenNotice, alleDesc, alleShortDesc, deposit, depositUnit, feeFlag,
      feeId, courtFee, caseResult, indictId, indictDesc, indictLong, indictFormId, indictFormName, indictFormDesc, pinaltyDesc, caseOrderId,
      caseOrderDesc, zoneNationId, zoneProvId, zoneAmphurId, orderJudgeId, orderJudgeDate, caseJudgeId, judgePostId, judgePostName,
      caseJudgeGid, caseJudgeGid2, caseJudgeAid, caseJudgeAid2, caseJudgeDate, caseJudgeEndDate, caseJudgeAdate, caseJudgeEndAdate,
      caseJudgeAdate2, caseJudgeEndAdate2, oldJudgeId, assignJudgeId, conJudgeId, conditionId, createCaseJudgeDepCode, createCaseJudgeUserId,
      createCaseJudgeUserName, createCaseJudgeDate, updateCaseJudgeDepCode, updateCaseJudgeUserId, updateCaseJudgeUserName,
      updateCaseJudgeDate, orderJudgeGid, orderJudgeAid, sjudgeId, spostId, holdId, casePenalty, caseReq, prosDesc, prosType,
      accuDesc, accuType, rptProsDesc, rptProsType, rptAccuDesc, rptAccuType, rptLitigantDesc1, rptLitigantType1, rptLitigantDesc2,
      rptLitigantType2, rptLitigantDesc3, rptLitigantType3, litigantDesc1, litigantDesc2, barcode, assetNo, assetYY, remark, pfinish,
      psendDate, prcvDate, psendcourtRunning, owncourtRunning, orgId, transferCourtRunning, transferDate, oldCourtRunning, oldTitle,
      oldId, oldYY, oldRedTitle, oldRedId, oldRedYY, oldCaseNo, oldRedNo, recieveBy, issueAttach, refIdred, alleAdd, issueType, prosTotal,
      accuTotal, witnessTotal, prosAppointDay, accuAppointDay, otherTotal, otherAppointDay, notoverMonth, headJudgeId, headJudgePostId,
      totalCaseGroup, numCaseGroup, totalRedGroup, conciliateDate, conciliateType1, conciliateId1, conciliateName1, conciliatePostId1,
      conciliateType2, conciliateId2, conciliateName2, conciliatePostId2, conciliateType3, conciliateId3, conciliateName3, conciliatePostId3,
      oldConciliateType1, oldConciliateId1, oldConciliateName1, oldConciliatePostId1, oldConciliateType2, oldConciliateId2, oldConciliateName2,
      oldConciliatePostId2, createConciliateDepCode, createConciliateUserId, createConciliateUserName, createConciliateDate,
      updateConciliateDepCode, updateConciliateUserId, updateConciliateUserName, updateConciliateUserDate, guarPros, frRunId, draftRunId,
      splitRunId, party, ownNewFlag, adNewFlag, conApp, suggestion, caseYesNo, skipAssignAuto, printCase, checkFlag,
      endCase, eCourtElag, engFlag, customerFlag, admitFlag, postEndingDate, policeRank, policeId, policeName, reqType, reqId, reqName,
      reqName2, postDay, postDayOther, postFlagBurn, postBurnDate, postMessage, statFlag, specialId, skipAppoint, caseFormId, caseFormName,
      witnessFormId, witnessFormName, issueSubject, issueRcvTime, issueTime, issueFinishTime, webId, webRunNo, webRunYY, createDepCode,
      createUserId, createUser, createDate, updateDepCode, updateUserId, updateUser, updateDate, remarkTr, prosDescBk, accuDescBk,
      refBlackrecgen, refIdblk, refSeekRecGEn, refCatchRecGen, refDocRecGen, refDocRecgen, refOldBlack, refOldRed, noticeExists, refBlackTitle,
      refBlackId, refBlackYY, refCaseType, refBlackno, trCourtAppoint
    } = this;

    const responseObject = {
      runId, courtRunning, title, id, yy, caseDate, caseType, caseCateId, caseStatus, caseCourtType, indexId, conCourtLevel, conStatus,
      imprisonId, dispute, caseOrReq, caseLevel, notGenPostDate, notGenNotice, alleDesc, alleShortDesc, deposit, depositUnit, feeFlag,
      feeId, courtFee, caseResult, indictId, indictDesc, indictLong, indictFormId, indictFormName, indictFormDesc, pinaltyDesc, caseOrderId,
      caseOrderDesc, zoneNationId, zoneProvId, zoneAmphurId, orderJudgeId, orderJudgeDate, caseJudgeId, judgePostId, judgePostName,
      caseJudgeGid, caseJudgeGid2, caseJudgeAid, caseJudgeAid2, caseJudgeDate, caseJudgeEndDate, caseJudgeAdate, caseJudgeEndAdate,
      caseJudgeAdate2, caseJudgeEndAdate2, oldJudgeId, assignJudgeId, conJudgeId, conditionId, createCaseJudgeDepCode, createCaseJudgeUserId,
      createCaseJudgeUserName, createCaseJudgeDate, updateCaseJudgeDepCode, updateCaseJudgeUserId, updateCaseJudgeUserName,
      updateCaseJudgeDate, orderJudgeGid, orderJudgeAid, sjudgeId, spostId, holdId, casePenalty, caseReq, prosDesc, prosType,
      accuDesc, accuType, rptProsDesc, rptProsType, rptAccuDesc, rptAccuType, rptLitigantDesc1, rptLitigantType1, rptLitigantDesc2,
      rptLitigantType2, rptLitigantDesc3, rptLitigantType3, litigantDesc1, litigantDesc2, barcode, assetNo, assetYY, remark, pfinish,
      psendDate, prcvDate, psendcourtRunning, owncourtRunning, orgId, transferCourtRunning, transferDate, oldCourtRunning, oldTitle,
      oldId, oldYY, oldRedTitle, oldRedId, oldRedYY, oldCaseNo, oldRedNo, recieveBy, issueAttach, refIdred, alleAdd, issueType, prosTotal,
      accuTotal, witnessTotal, prosAppointDay, accuAppointDay, otherTotal, otherAppointDay, notoverMonth, headJudgeId, headJudgePostId,
      totalCaseGroup, numCaseGroup, totalRedGroup, conciliateDate, conciliateType1, conciliateId1, conciliateName1, conciliatePostId1,
      conciliateType2, conciliateId2, conciliateName2, conciliatePostId2, conciliateType3, conciliateId3, conciliateName3, conciliatePostId3,
      oldConciliateType1, oldConciliateId1, oldConciliateName1, oldConciliatePostId1, oldConciliateType2, oldConciliateId2, oldConciliateName2,
      oldConciliatePostId2, createConciliateDepCode, createConciliateUserId, createConciliateUserName, createConciliateDate,
      updateConciliateDepCode, updateConciliateUserId, updateConciliateUserName, updateConciliateUserDate, guarPros, frRunId, draftRunId,
      splitRunId, party, ownNewFlag, adNewFlag, conApp, suggestion, caseYesNo, skipAssignAuto, printCase, checkFlag,
      endCase, eCourtElag, engFlag, customerFlag, admitFlag, postEndingDate, policeRank, policeId, policeName, reqType, reqId, reqName,
      reqName2, postDay, postDayOther, postFlagBurn, postBurnDate, postMessage, statFlag, specialId, skipAppoint, caseFormId, caseFormName,
      witnessFormId, witnessFormName, issueSubject, issueRcvTime, issueTime, issueFinishTime, webId, webRunNo, webRunYY, createDepCode,
      createUserId, createUser, createDate, updateDepCode, updateUserId, updateUser, updateDate, remarkTr, prosDescBk, accuDescBk,
      refBlackrecgen, refIdblk, refSeekRecGEn, refCatchRecGen, refDocRecGen, refDocRecgen, refOldBlack, refOldRed, noticeExists, refBlackTitle,
      refBlackId, refBlackYY, refCaseType, refBlackno, trCourtAppoint
    };

    return responseObject;
  }
}