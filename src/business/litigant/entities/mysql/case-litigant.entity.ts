import { MySQLCases } from "src/business/case/entities/mysql/case.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: "pcase_litigant" })

export class MySQLCaseLitigants {
  @PrimaryColumn({ name: "lit_running", comment: "PRI	running คู่ความ" }) litRunning: number;
  @Column({ name: "court_running", comment: "ศาลเจ้าของข้อมูล" }) courtRunning: number;
  @Column({ name: "run_id", comment: "รหัสแทนหมายเลขคดีดำ" }) runId: number;
  @Column({ name: "lit_type", comment: "ประเภทคู่ความ" }) litType: number;
  @Column({ name: "lit_sub_type", comment: "ประเภทคู่ความย่อย fk: plit_sub_type.sub_type_id" }) litSubtype: number;
  @Column({ name: "seq", comment: "คู่ความที่" }) seq: number;
  @Column({ name: "pers_type", comment: "ประเภทบุคคล" }) persType: number;
  @Column({ name: "lit_type2", comment: "ประเภททนาย(โจทก์/จำเลย)" }) litType2: number;
  @Column({ name: "lit_type_seq", comment: "ลำดับที่" }) litTypeSeq: string;
  @Column({ name: "title", comment: "คำนำหน้าชื่อ" }) title: string;
  @Column({ name: "name", comment: "ชื่อ ชื่อสกุลคู่ความ" }) name: string;
  @Column({ name: "attorney_name", comment: "ชื่อพนักงานอัยการ" }) attorneyName: string;
  @Column({ name: "title_eng", comment: "คำนำหน้าชื่อภาษาอังกฤษ" }) titleENG: string;
  @Column({ name: "name_eng", comment: "ชื่อภาษาอังกฤษ" }) nameENG: string;
  @Column({ name: "addition", comment: "รายละเอียดเพิ่มเติม" }) addition: string;
  @Column({ name: "sex", comment: "เพศ  1 = ชาย, 2 = หญิง" }) sex: number;
  @Column({ name: "status", comment: "สถานะคู่ความ" }) status: number;
  @Column({ name: "old_status", comment: "สถานะก่อนหน้าปัจจุบัน" }) oldStatus: number;
  @Column({ name: "card_type", comment: "ประเภทบัตร fk.pcard_type" }) cardType: number;
  @Column({ name: "id_card", comment: "เลขประจำตัวบัตรประชาชน" }) idCard: string;
  @Column({ name: "license_no", comment: "ทะเบียน / ใบอนุญาติ fk: plawyer.license_no" }) licenseNo: string;
  @Column({ name: "assign_date", comment: "วันที่ได้รับการแต่งตั้ง" }) assignDate: Date;
  @Column({ name: "birth_date", comment: "วันเกิด" }) birthDate: Date;
  @Column({ name: "age", comment: "อายุ" }) age: number;
  @Column({ name: "age_tr", comment: "transfer age" }) ageTr: string;
  @Column({ name: "inter_id", comment: "รหัสสัญชาติ" }) interId: number;
  @Column({ name: "nation_id", comment: "เชื้อชาติ fk.pinter" }) nationId: number;
  @Column({ name: "occ_id", comment: "รหัสอาชีพ" }) occId: number;
  @Column({ name: "addr_no", comment: "ที่อยู่" }) addrNo: string;
  @Column({ name: "addr_no_eng", comment: "ที่อยู่ภาษาอังกฤษ" }) addrNoENG: string;
  @Column({ name: "address", comment: "ที่ตั้ง" }) address: string;
  @Column({ name: "address_eng", comment: "ที่ตั้งภาษาอังกฤษ" }) addressENG: string;
  @Column({ name: "moo", comment: "หมู่ที่" }) moo: string;
  @Column({ name: "moo_eng", comment: "หมู่ที่ภาษาอังกฤษ" }) mooENG: string;
  @Column({ name: "soi", comment: "ซอย" }) soi: string;
  @Column({ name: "soi_eng", comment: "ซอยภาษาอังกฤษ" }) soiENG: string;
  @Column({ name: "near_to", comment: "ใกล้เคียง" }) nearTo: string;
  @Column({ name: "near_to_eng", comment: "ไกล้เคียงภาษาอังกฤษ" }) nearToENG: string;
  @Column({ name: "road", comment: "ถนน" }) road: string;
  @Column({ name: "road_eng", comment: "ถนนภาษาอังกฤษ" }) roadENG: string;
  @Column({ name: "tambon_id", comment: "รหัสตำบล" }) tambonId: string;
  @Column({ name: "amphur_id", comment: "รหัสอำเภอ" }) amphurId: string;
  @Column({ name: "prov_id", comment: "รหัสจังหวัด" }) provId: string;
  @Column({ name: "send_amt", comment: "ค่านำหมาย" }) sendAmt: number;
  @Column({ name: "notice_amt_remark", comment: "หมายเหตุอัตราค่านำหมาย" }) noticeAmtRemark: string;
  @Column({ name: "country_id", comment: "ประเทศ fk.pinter" }) countryId: number;
  @Column({ name: "post_no", comment: "รหัสไปรษณีย์" }) postNo: string;
  @Column({ name: "tel_no", comment: "หมายเลยโทรศัพท์" }) telNo: string;
  @Column({ name: "fax_no", comment: "fax" }) faxNo: string;
  @Column({ name: "email", comment: "email" }) email: string;
  @Column({ name: "comp_address", comment: "ที่อยู่ที่ทำงาน" }) compAddress: string;
  @Column({ name: "comp_tel_no", comment: "เบอร์โทรศัพท์ที่ทำงาน" }) compTelNo: string;
  @Column({ name: "lawyer_cancel_date", comment: "วันที่ถอนทนายออกจากคดีนี้" }) lawyerCancelDate: Date;
  @Column({ name: "penalty_id", comment: "รหัสโทษจำเลย" }) penaltyId: number;
  @Column({ name: "can_not_out", comment: "ห้ามเดินทางออกนอกประเทศ  1 = ห้ามเดินทางออกนอกประเทศ" }) canNotOut: number;
  @Column({ name: "order_id", comment: "คำสั่ง / คำพิพากษา" }) orderId: number;
  @Column({ name: "order_desc", comment: "รายละเอียดคำพิพากษา" }) orderDesc: string;
  @Column({ name: "notice_no_not_use", comment: "เลขที่หมาย" }) noticeNoNotUse: number;
  @Column({ name: "notice_yy_not_use", comment: "ปีเลขที่หมาย" }) noticeYYNotUse: number;
  @Column({ name: "notice_to", comment: "หมายถึง" }) noticeTo: number;
  @Column({ name: "noticeto_name", comment: "หมายถึง" }) noticetoName: string;
  @Column({ name: "old_notice_to", comment: "หมายถึง(เดิม)" }) oldNoticeTo: number;
  @Column({ name: "remark1", comment: "หมายเหตุท้ายหมาย" }) remark1: string;
  @Column({ name: "remark", comment: "หมายเหตุ" }) remark: string;
  @Column({ name: "remark2", comment: "หมายเหตุ(กรณีคู่ความเป็นคู่ความในคดีอื่น)" }) remark2: string;
  @Column({ name: "remark3", comment: "เพิ่มเติม เหตุฝากขังสิ้นสุด" }) remark3: string;
  @Column({ name: "depostition_desc", comment: "คำให้การจำเลย" }) depostitionDesc: string;
  @Column({ name: "hospital_id", comment: "โรงพยาบาล" }) hospitalId: number;
  @Column({ name: "post_ending_date", comment: "วันที่สิ้นสุด" }) postEndingDate: Date;
  @Column({ name: "post_ending", comment: "เหตุฝากขังสิ้นสุด" }) postEnding: number;
  @Column({ name: "old_order_id", comment: "คำสั่ง / คำพิพากษา(เดิม)" }) oldOrderId: number;
  @Column({ name: "old_order_desc", comment: "รายละเอียดคำพิพากษา(เดิม)" }) oldOrderDesc: string;
  @Column({ name: "req_lawyer_flag", comment: "ทนายขอแรง" }) reqLawyerFlag: number;
  @Column({ name: "from_lit_running", comment: "กรณี copy ข้อมูลมาจากฝากขัง" }) fromLitRunning: number;
  @Column({ name: "id_running", comment: "fk: pfingerprint.id_running" }) idRunning: number;
  @Column({ name: "remark_tr", comment: "หมายเหตุสำนวนพ่วง transfer" }) remarkTr: string;
  @Column({ name: "jail_year", comment: "จำคุก(ปี)" }) jailYear: number;
  @Column({ name: "jail_month", comment: "จำคุก(เดือน)" }) jailMonth: number;
  @Column({ name: "jail_day", comment: "จำคุก(วัน)" }) jailDay: number;
  @Column({ name: "fine", comment: "ค่าปรับ" }) fine: number;
  @Column({ name: "punish_wait_mm", comment: "รอไว้(เดือน)" }) punishWaitMM: number;
  @Column({ name: "punish_wait", comment: "รอไว้(ปี)" }) punishWait: number;
  @Column({ name: "ctrl_year", comment: "คุมความประพฤติ(ปี)" }) ctrlYear: number;
  @Column({ name: "ctrl_month", comment: "คุมความประพฤติ(เดือน)" }) ctrlMonth: number;
  @Column({ name: "ctrl_day", comment: "คุมความประพฤติ(วัน)" }) ctrlDay: number;
  @Column({ name: "ctrl_hour", comment: "คุมความประพฤติ(ชั่วโมง)" }) ctrlHour: number;
  @Column({ name: "report_per_month", comment: "รายงานตัว(เดือน / ครั้ง)" }) reportPerMonth: number;
  @Column({ name: "report_total", comment: "รายงานตัว(รวม)" }) reportTotal: number;
  @Column({ name: "social_year", comment: "ทำงานบริการสังคม(ปี)" }) socialYear: number;
  @Column({ name: "social_month", comment: "ทำงานบริการสังคม(เดือน)" }) socialMonth: number;
  @Column({ name: "social_day", comment: "ทำงานบริการสังคม(วัน)" }) socialDay: number;
  @Column({ name: "social_hour", comment: "ทำงานบริการสังคม(ชั่วโมง)" }) socialHour: number;
  @Column({ name: "judge_remark", comment: "หมายเหตุ ผลการตัดสิน" }) judgeRemark: string;
  @Column({ name: "lawyer_lit_type", comment: "ทนายของ(ประเภทคู่ความ)" }) lawyerLitType: number;
  @Column({ name: "lawyer_seq", comment: "ทนายของ คู่ความที่" }) lawyerSeq: number;
  @Column({ name: "imprison_day", comment: "ขังมาแล้ว...วัน" }) imprisonDay: number;
  @Column({ name: "imprison_flag", comment: "ขังที่ 1 เรื่อนจำ 2 สน." }) imprisonFlag: number;
  @Column({ name: "report_flag", comment: "ยื่นคำให้การแล้ว" }) reportFlag: number;
  @Column({ name: "old_run_id", comment: "มาจากเลขฝากขัง fk: pcase.run_id" }) oldRunId: number;
  @Column({ name: "old_lit_type", comment: "ประเภทคู่ความ fk: plit_type.lit_type" }) oldLitType: number;
  @Column({ name: "old_seq", comment: "ลำดับที่ fk: pcase_litigant.seq" }) oldSeq: number;
  @Column({ name: "from_run_id", comment: "มาจากเลขคดี" }) fromRunId: number;
  @Column({ name: "create_dep_code", comment: "รหัสหน่วยงานที่สร้าง record" }) createDepCode: number;
  @Column({ name: "create_user_id", comment: "รหัส user ที่สร้าง record" }) createUserId: string;
  @Column({ name: "create_user", comment: "	user ที่สร้าง record" }) createUser: string;
  @Column({ name: "create_date", comment: "วันที่เวลาสร้าง record" }) createDate: Date;
  @Column({ name: "update_dep_code", comment: "รหัสหน่วยงานที่ update" }) updateDepCode: number;
  @Column({ name: "update_user_id", comment: "รหัส user ที่ update record" }) updateUserId: string;
  @Column({ name: "update_user", comment: "	user ที่ update record" }) updateUser: string;
  @Column({ name: "update_date", comment: "วันที่ เวลา update record" }) updateDate: Date;
  @Column({ name: "new_seq", comment: "new seq" }) newSeq: number;
  @Column({ name: "ref_id", comment: "transfer blackrecgen" }) refId: string;
  @Column({ name: "ref_litigantcode", comment: "transfer litigantcode" }) refLitigantcode: string;
  @Column({ name: "ref_Order_no", comment: "transfer Order_no" }) refOrderNo: string;
  @Column({ name: "ref_addr", comment: "transfer ref_addr" }) refAddr: string;
  @Column({ name: "ref_black_title", comment: "transfer" }) refBlackTitle: string;
  @Column({ name: "ref_black_id", comment: "transfer" }) refBlackId: number;
  @Column({ name: "ref_black_yy", comment: "transfer" }) refBlackYY: number;
  @Column({ name: "ref_case_type", comment: "transfer" }) refCaseType: number;
  @Column({ name: "ref_blackno", comment: "transfer" }) refBlackno: string;

  @ManyToOne(type => MySQLCases, cases => cases.runId, { cascade: true })
  @JoinColumn({ name: "run_id" }) cases: MySQLCases;

  toResponseObject() {
    const {
      litRunning, courtRunning, runId, litType, litSubtype, seq, persType, litType2, litTypeSeq, title, name, attorneyName, titleENG,
      nameENG, addition, sex, status, oldStatus, cardType, idCard, licenseNo, assignDate, birthDate, age, ageTr, interId, nationId,
      occId, addrNo, addrNoENG, address, addressENG, moo, mooENG, soi, soiENG, nearTo, nearToENG, road, roadENG, tambonId, amphurId,
      provId, sendAmt, noticeAmtRemark, countryId, postNo, telNo, faxNo, email, compAddress, compTelNo, lawyerCancelDate, penaltyId,
      canNotOut, orderId, orderDesc, noticeNoNotUse, noticeYYNotUse, noticeTo, noticetoName, oldNoticeTo, remark1, remark, remark2,
      remark3, depostitionDesc, hospitalId, postEndingDate, postEnding, oldOrderId, oldOrderDesc, reqLawyerFlag, fromLitRunning,
      idRunning, remarkTr, jailYear, jailMonth, jailDay, fine, punishWaitMM, punishWait, ctrlYear, ctrlMonth, ctrlDay, ctrlHour,
      reportPerMonth, reportTotal, socialYear, socialMonth, socialDay, socialHour, judgeRemark, lawyerLitType, lawyerSeq, imprisonDay,
      imprisonFlag, reportFlag, oldRunId, oldLitType, oldSeq, fromRunId, createDepCode, createUserId, createUser, createDate, updateDepCode,
      updateUserId, updateUser, updateDate, newSeq, refId, refLitigantcode, refOrderNo, refAddr, refBlackTitle, refBlackId, refBlackYY,
      refCaseType, refBlackno, cases
    } = this;

    const responseObject = {
      litRunning, courtRunning, runId, litType, litSubtype, seq, persType, litType2, litTypeSeq, title, name, attorneyName, titleENG,
      nameENG, addition, sex, status, oldStatus, cardType, idCard, licenseNo, assignDate, birthDate, age, ageTr, interId, nationId,
      occId, addrNo, addrNoENG, address, addressENG, moo, mooENG, soi, soiENG, nearTo, nearToENG, road, roadENG, tambonId, amphurId,
      provId, sendAmt, noticeAmtRemark, countryId, postNo, telNo, faxNo, email, compAddress, compTelNo, lawyerCancelDate, penaltyId,
      canNotOut, orderId, orderDesc, noticeNoNotUse, noticeYYNotUse, noticeTo, noticetoName, oldNoticeTo, remark1, remark, remark2,
      remark3, depostitionDesc, hospitalId, postEndingDate, postEnding, oldOrderId, oldOrderDesc, reqLawyerFlag, fromLitRunning,
      idRunning, remarkTr, jailYear, jailMonth, jailDay, fine, punishWaitMM, punishWait, ctrlYear, ctrlMonth, ctrlDay, ctrlHour,
      reportPerMonth, reportTotal, socialYear, socialMonth, socialDay, socialHour, judgeRemark, lawyerLitType, lawyerSeq, imprisonDay,
      imprisonFlag, reportFlag, oldRunId, oldLitType, oldSeq, fromRunId, createDepCode, createUserId, createUser, createDate, updateDepCode,
      updateUserId, updateUser, updateDate, newSeq, refId, refLitigantcode, refOrderNo, refAddr, refBlackTitle, refBlackId, refBlackYY,
      refCaseType, refBlackno
    };

    Object.assign(responseObject, {
      cases: cases.toResponseObject()
    })

    return responseObject;
  }
}