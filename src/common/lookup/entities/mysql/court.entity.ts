import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "pcourt" })
export class MySQLCourts {
  @PrimaryColumn({ name: "court_running", comment: "รหัสศาล Running" }) courtRunning: number;
  @Column({ name: "std_id", comment: "รหัสมาตราฐาน fk std_pcourt.std_id" }) stdId: number;
  @Column({ name: "court_id", comment: "รหัสศาล (รูปแบบมาตรฐาน)" }) courtId: string;
  @Column({ name: "court_type_id", comment: "ประเภทศาล" }) courtTypeId: number;
  @Column({ name: "court_case_type", comment: "1 พิจารณาคดีอาญา, 2 พิจารณาคดีแพ่ง, 3 พิจารณาคดีล้มละลาย" }) courtCaseType: number;
  @Column({ name: "std_court_running", comment: "รหัสมาตราฐาน สนง ศาล" }) stdCourtRunning: number;
  @Column({ name: "court_name", comment: "ชื่อศาล" }) courtName: string;
  @Column({ name: "org_flag", comment: "1 หน่วยงานภายนอกศาล" }) orgFlag: number;
  @Column({ name: "no_edit_flag", comment: "ห้ามแก้ไข" }) noEditFlag: number;
  @Column({ name: "court_mapping", comment: "รหัส mapping ศาล" }) courtMapping: string;
  @Column({ name: "court_eng", comment: "ชื่อศาลภาษาอังกฤษ" }) courtEng: string;
  @Column({ name: "short_court_name", comment: "ชื่อศาลย่อ" }) shortCourtName: string;
  @Column({ name: "court_type", comment: "ประเภทศาล fk:pcourt_type.court_type_id" }) courtType: number;
  @Column({ name: "court_doc", comment: "เลขศ.ย." }) courtDoc: string;
  @Column({ name: "court_address", comment: "ที่อยู่ศาล" }) courtAddress: string;
  @Column({ name: "addr_no", comment: "อยู่บ้านเลขที่" }) addrNo: string;
  @Column({ name: "moo", comment: "หมู่" }) moo: string;
  @Column({ name: "soi", comment: "ซอบ" }) soi: string;
  @Column({ name: "road", comment: "ถนน" }) road: string;
  @Column({ name: "court_province", type: "char", comment: "จังหวัด" }) courtProvince: string;
  @Column({ name: "court_ampheur", comment: "อำเภอ" }) courtAmpheur: string;
  @Column({ name: "court_tambon", comment: "ตำบล" }) courtTambon: string;
  @Column({ name: "post_no", comment: "รหัสไปรษณีย์" }) postNo: string;
  @Column({ name: "from_bkk", comment: "ระยะทางจากกรุงเทพ" }) fromBkk: number;
  @Column({ name: "doc_id", comment: "เลขที่หนังสือ" }) docId: string;
  @Column({ name: "tel_no", comment: "เบอร์โทรศัพท์" }) telNo: string;
  @Column({ name: "tel_no1", comment: "เบอร์โทรศัพท์1" }) telNo1: string;
  @Column({ name: "fax_no", comment: "เบอร์โทรสาร" }) faxNo: string;
  @Column({ name: "e_mail", comment: "e_mail ศาล" }) eMail: string;
  @Column({ name: "court_addr1", comment: "ที่อยู่ศาลในหนังสือ" }) courtAddr1: string;
  @Column({ name: "court_addr2", comment: "ที่อยู่ศาลในหนังสือ" }) courtAddr2: string;
  @Column({ name: "court_addr3", comment: "ที่อยู่ศาลในหนังสือ" }) courtAddr3: string;
  @Column({ name: "court_addr4", comment: "ที่อยู่ศาล4" }) courtAddr4: string;
  @Column({ name: "court_addr5", comment: "ที่อยู่ศาล5" }) courtAddr5: string;
  @Column({ name: "court_addr6", comment: "ที่อยู่ศาล6" }) courtAddr6: string;
  @Column({ name: "data_exchange_url", comment: "url ระบบบันทึกคำฟ้องออนไลน์" }) dataExchangeUrl: string;
  @Column({ name: "website_url", comment: "ที่อยู่เว็บไซต์" }) websiteUrl: string;
  @Column({ name: "qrcode_link", comment: "url สำหรับ qrcode" }) qrcodeLink: string;
  @Column({ name: "c_lan", comment: "Flag แสดงศาลที่ใช้โปรแกรม" }) cLan: number;
  @Column({ name: "system_start_date", comment: "วันที่เริ่มใช้ระบบ" }) systemStartDate: Date;
  @Column({ name: "over_run_id", comment: "ช่วงเลขคดีดำที่ป้อนเองต้องไม่เกิน" }) overRunId: number;
  @Column({ name: "post_name", comment: "ชื่อไปรษณีย์" }) postName: string;
  @Column({ name: "post_licence", comment: "ใบอนุญาติเลขที่" }) postLicence: string;
  @Column({ name: "first_appoint_day_bk", comment: "นัดแรก 1จันทร์ 2อังคาร 3พุธ 4พฤหัส 5ศุกร์" }) firstAppointDayBk: number;
  @Column({ name: "app_morning_time", type: "char", comment: "นัดเช้าเวลา" }) appMorningTime: string;
  @Column({ name: "app_afternoon_time", type: "char", comment: "นัดบ่ายเวลา" }) appAfternoonTime: string;
  @Column({ name: "app_night_time", comment: "เวลานัดค่ำ" }) appNightTime: string;
  @Column({ name: "num_witness", comment: "จำนวนพยานที่สืบต่อคดีต่อวัน" }) numWitness: number;
  @Column({ name: "num_con_app", comment: "จำนวนวันนัดต่อเนื่องต้องไม่เกิน...วัน" }) numConApp: number;
  @Column({ name: "fine_per_day", type: "double", comment: "จำนวนเงินขังแทนค่าปรับต่อวัน" }) finePerDay: number;
  @Column({ name: "to_court", comment: "ยื่นอุทธรณ์ไปยังศาล" }) toCourt: number;
  @Column({ name: "send_notice_flag", comment: "ประเภทการจ่ายหมาย 1:ต่อคน 2:ต่อกลุ่ม" }) sendNoticeFlag: number;
  @Column({ name: "court_part", comment: "ภาค" }) courtPart: number;
  @Column({ name: "alert_type", comment: "1 แจ้งเตือนเฉพาะพยาน 2 แจ้งคู่ความทุกคน" }) alertType: number;
  @Column({ name: "gen_notice_no", comment: "รหัสหมายขังระหว่างสอบสวน 1 ใช้รหัสเดิม 2  run รหัสใหม่" }) genNoticeNo: number;
  @Column({ name: "notice_amt_remark", comment: "หมายเหตุอัตราค่านำหมาย" }) noticeAmtRemark: string;
  @Column({ name: "director", comment: "ตำแหน่งผู้บริหาร" }) director: string;
  @Column({ name: "director_post", comment: "ตำแหน่งผอ." }) directorPost: string;
  @Column({ name: "ref_court", comment: "รหัสศาลเดิมที่ใช้ converst" }) refCourt: string;
  @Column({ name: "ad_judge_flag", comment: "ผู้พิพากษาสมทบ 1=มี null=ไม่มี" }) adJudgeFlag: number;
  @Column({ name: "sc_flag", comment: "สร้างเลขที่หมายค้น หมายจับกรณียกเลิก" }) scFlag: number;
  @Column({ name: "touch_flag", comment: "1เมาส์,2ทัชสกรีน" }) touchFlag: number;
  @Column({ name: "scan_login_flag", comment: "scan ลายนิ้วมือเพื่อ login" }) scanLoginFlag: number;
  @Column({ name: "print_cover_flag", comment: "1ปรั้นบาร์โค๊ด,2ปริ้นคิวอาร์โค๊ด" }) printCoverFlag: number;
  @Column({ name: "notice_date_flag", comment: "วันที่สำหรับคำบังคับ 1 วันที่ปัจจุบัน 2 วันที่ออกแดง" }) noticeDateFlag: number;
  @Column({ name: "approve_print_flag", comment: "1 หมายสีพิมพ์คำว่าผู้ตรวจ" }) approvePrintFlag: number;
  @Column({ name: "print_year_flag", comment: "พิมพ์พ.ศ.เลขหนังสือที่หน้าซองจดหมาย" }) printYearFlag: number;
  @Column({ name: "skip_appoint_date", comment: "นัดต่อเนื่องให้นัดกระโดดได้" }) skipAppointDate: number;
  @Column({ name: "print_privilege_flag", comment: "1 เช็คสิทธิ์ในการพิมพ์" }) printPrivilegeFlag: number;
  @Column({ name: "create_dep_code", comment: "รหัสหน่วยงานที่สร้าง record" }) createDepCode: number;
  @Column({ name: "create_user_id", comment: "รหัส user ที่สร้าง record" }) createUserId: string;
  @Column({ name: "create_user", comment: "user ที่สร้าง record" }) createUser: string;
  @Column({ name: "create_date", type: "datetime", comment: "วันที่เวลาสร้าง record" }) createDate: Date;
  @Column({ name: "update_dep_code", comment: "รหัสหน่วยงานที่ update" }) updateDepCode: number;
  @Column({ name: "update_user_id", comment: "รหัส user ที่ update record" }) updateUserId: string;
  @Column({ name: "update_user", comment: "user ที่ update record" }) updateUser: string;
  @Column({ name: "update_date", type: "datetime", comment: "วันที่ เวลา update record" }) updateDate: Date;
  @Column({ name: "ref_id", comment: "transfer " }) refId: string;

  toResponseObject() {
    const {
      courtRunning, stdId, courtId, courtTypeId, courtCaseType, stdCourtRunning, courtName, orgFlag, noEditFlag, courtMapping, courtEng,
      shortCourtName, courtType, courtDoc, courtAddress, addrNo, moo, soi, road, courtProvince, courtAmpheur, courtTambon, postNo, fromBkk,
      docId, telNo, telNo1, faxNo, eMail, courtAddr1, courtAddr2, courtAddr3, courtAddr4, courtAddr5, courtAddr6, dataExchangeUrl, websiteUrl,
      qrcodeLink, cLan, systemStartDate, overRunId, postName, postLicence, firstAppointDayBk, appMorningTime, appAfternoonTime, appNightTime,
      numWitness, numConApp, finePerDay, toCourt, sendNoticeFlag, courtPart, alertType, genNoticeNo, noticeAmtRemark, director, directorPost,
      refCourt, adJudgeFlag, scFlag, touchFlag, scanLoginFlag, printCoverFlag, noticeDateFlag, approvePrintFlag, printYearFlag, skipAppointDate,
      printPrivilegeFlag, createDepCode, createUserId, createUser, createDate, updateDepCode, updateUserId, updateUser, updateDate, refId
    } = this;

    const responseObject = {
      courtRunning, stdId, courtId, courtTypeId, courtCaseType, stdCourtRunning, courtName, orgFlag, noEditFlag, courtMapping, courtEng,
      shortCourtName, courtType, courtDoc, courtAddress, addrNo, moo, soi, road, courtProvince, courtAmpheur, courtTambon, postNo, fromBkk,
      docId, telNo, telNo1, faxNo, eMail, courtAddr1, courtAddr2, courtAddr3, courtAddr4, courtAddr5, courtAddr6, dataExchangeUrl, websiteUrl,
      qrcodeLink, cLan, systemStartDate, overRunId, postName, postLicence, firstAppointDayBk, appMorningTime, appAfternoonTime, appNightTime,
      numWitness, numConApp, finePerDay, toCourt, sendNoticeFlag, courtPart, alertType, genNoticeNo, noticeAmtRemark, director, directorPost,
      refCourt, adJudgeFlag, scFlag, touchFlag, scanLoginFlag, printCoverFlag, noticeDateFlag, approvePrintFlag, printYearFlag, skipAppointDate,
      printPrivilegeFlag, createDepCode, createUserId, createUser, createDate, updateDepCode, updateUserId, updateUser, updateDate, refId
    };

    return responseObject;
  }
}
