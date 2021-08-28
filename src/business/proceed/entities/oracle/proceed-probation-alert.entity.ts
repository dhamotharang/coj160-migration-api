import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_PROBATION_ALERT" })
export class OracleProceedProbationAlerts {
  @PrimaryGeneratedColumn({ name: "PROBATION_ALERT_ID", comment: "รหัสข้อมูลแจ้งคุมประพฤติ(AUTO INCREMENT)" }) probationAlertId: number;
  @Column({ name: "ORDER_NO", type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "ALCOHOL_STATUS", nullable: true, comment: "ตัวเลือกขับรถขณะเมาสุรา True/False" }) alcoholStatus: number;
  @Column({ name: "ALCOHOL_VOLUME", nullable: true, comment: "รายละเอียดขับรถขณะเมาสุรา" }) alcoholVolume: number;
  @Column({ name: "APPOINT_LONG", nullable: true, comment: "กำหนดรายงานตัว ปี" }) appointLong: number;
  @Column({ name: "APPOINT_NO", nullable: true, comment: "รายงานตัว ครั้ง" }) appointNo: number;
  @Column({ name: "APPOINT_STATUS", nullable: true, comment: "สถานะคุมประพฤติ 0 = เลือก, 1 = ไม่เลือก" }) appointStatus: number;
  @Column({ name: "ASSAULT_STATUS", nullable: true, comment: "ตัวเลือกทำร้ายร่างกาย True / False" }) assaultStatus: number;
  @Column({ name: "CASE_ID", comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "CASE_LIT_ID", nullable: true, comment: "รหัสข้อมูลคู่ความ(จำเลย) เชื่อมโยง PC_CASE_LIT" }) caseLitId: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "DRIVE_RISK_STATUS", nullable: true, comment: "ตัวเลือกขับรถประมาท True / False" }) driveRiskStatus: number;
  @Column({ name: "DRIVERS_LICENSE_SUS", nullable: true, comment: "สถานะพักใบขับขี่ 0 = เลือก, 1 = ไม่เลือก" }) driversLicenseSus: number;
  @Column({ name: "EM_DAYS", nullable: true, comment: "กักบริเวณ วัน" }) emDays: number;
  @Column({ name: "EM_END_TIME", nullable: true, comment: "กักบริเวณถึงเวลา(HH: mm: ss)" }) emEndTime: string;
  @Column({ name: "EM_START_TIME", nullable: true, comment: "กักบริเวณตั้งแต่เวลา(HH: mm: ss)" }) emStartTime: string;
  @Column({ name: "EM_STATUS", nullable: true, comment: "สถานะกักบริเวณ 0 = เลือก, 1 = ไม่เลือก" }) emStatus: number;
  @Column({ name: "FINE", nullable: true, comment: "ปรับ บาท" }) fine: string;
  @Column({ name: "FINE_SOCIAL_SERVICE", nullable: true, comment: "สถานะบำเพ็ญประโยชน์แทนค่าปรับ 0 = เลือก, 1 = ไม่เลือก" }) fineSocialService: number;
  @Column({ name: "FINE_SOCIAL_SERVICE_AMOUNT", nullable: true, comment: "บำเพ็ญประโยชน์แทนค่าปรับ บาท" }) fineSocialServiceAmount: string;
  @Column({ name: "FINE_SOCIAL_SERVICE_DAYS", nullable: true, comment: "บำเพ็ญประโยชน์แทนค่าปรับ วัน" }) fineSocialServiceDays: number;
  @Column({ name: "FINE_SOCIAL_SERVICE_HR", nullable: true, comment: "บำเพ็ญประโยชน์แทนค่าปรับ ชั่วโมง" }) fineSocialServiceHR: number;
  @Column({ name: "FRAUDULENT_STATUS", nullable: true, comment: "ตัวเลือกฉ้อโกง True / False" }) fraudulentStatus: number;
  @Column({ name: "IMPRISONMENT_MONTH", nullable: true, comment: "จำคุก เดือน" }) imprisonmentMonth: number;
  @Column({ name: "IMPRISONMENT_YEAR", nullable: true, comment: "จำคุก ปี" }) imprisonmentYear: number;
  @Column({ name: "JUDGEMENT_DATE", nullable: true, type: "timestamp", comment: "วันที่มีคำสั่ง" }) judgementDate: Date;
  @Column({ name: "OTHER_CHECK", nullable: true, comment: "ตัวเลือกมีสิ่งอื่น ๆ หรือไม่ True / False" }) otherCheck: number;
  @Column({ name: "OTHER_DETAIL", nullable: true, comment: "รายละเอียดสิ่งอื่น ๆ" }) otherDetail: string;
  @Column({ name: "OTHER_OFFENSE_DETAIL", nullable: true, comment: "รายละเอียดอื่น ๆ" }) otherOffenseDetail: string;
  @Column({ name: "OTHER_STATUS", nullable: true, comment: "ตัวเลือกอื่นๆ True / False" }) otherStatus: number;
  @Column({ name: "PAROLE", nullable: true, comment: "รอลงอาญา ปี" }) parole: number;
  @Column({ name: "REFUSE_ALCOHOL_TEST_STATUS", nullable: true, comment: "ตัวเลือกฝ่าฝืนไม่ยอมทดสอบปริมาณแอลกอฮอล์ True / False" }) refuseAlcoholTestStatus: number;
  @Column({ name: "SOCIAL_SERVICE", nullable: true, comment: "บำเพ็ญประโยชน์ ชั่วโมง" }) socialService: number;
  @Column({ name: "SOCIAL_SERVICE_STATUS", nullable: true, comment: "สถานะบำเพ็ญประโยชน์ 0 = เลือก, 1 = ไม่เลือก" }) socialServiceStatus: number;
  @Column({ name: "STEAL_STATUS", nullable: true, comment: "ตัวเลือกลักทรัพย์ True / False" }) stealStatus: number;
  @Column({ name: "TRAINNING_COURSE", nullable: true, comment: "การอบรม" }) trainningCourse: string;
  @Column({ name: "TRAINNING_NO", nullable: true, comment: "จำนวนครั้งเข้าอบรม" }) trainningNo: number;
  @Column({ name: "TRAINNING_STATUS", nullable: true, comment: "สถานะอบรม 0 = เลือก, 1 = ไม่เลือก" }) trainningStatus: number;
  @Column({ name: "APPOINT_LONG_LAST", nullable: true, comment: "ตัวเลือกสถานะคุมประพฤติ 0 = เลือก, 1 = ไม่เลือก" }) appintLongLast: number;
  @Column({ name: "APPOINT_NO_LAST", nullable: true, comment: "รายงานตัวกี่เดือน" }) appointNoLast: number;
  @Column({ name: "APPOINT_STATUS_LAST", nullable: true, comment: "กำหนดรายงานตัวกี่ปี" }) appointStatusLast: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", nullable: true, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @CreateDateColumn({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @UpdateDateColumn({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @UpdateDateColumn({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { probationAlertId, orderNo, alcoholStatus, alcoholVolume, appointLong, appointNo, appointStatus, assaultStatus, caseId, caseLitId, courtId, driveRiskStatus, driversLicenseSus, emDays, emEndTime, emStartTime, emStatus, fine, fineSocialService, fineSocialServiceAmount, fineSocialServiceDays, fineSocialServiceHR, fraudulentStatus, imprisonmentMonth, imprisonmentYear, judgementDate, otherCheck, otherDetail, otherOffenseDetail, otherStatus, parole, refuseAlcoholTestStatus, socialService, socialServiceStatus, stealStatus, trainningCourse, trainningNo, trainningStatus, appintLongLast, appointNoLast, appointStatusLast, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { probationAlertId, orderNo, alcoholStatus, alcoholVolume, appointLong, appointNo, appointStatus, assaultStatus, caseId, caseLitId, courtId, driveRiskStatus, driversLicenseSus, emDays, emEndTime, emStartTime, emStatus, fine, fineSocialService, fineSocialServiceAmount, fineSocialServiceDays, fineSocialServiceHR, fraudulentStatus, imprisonmentMonth, imprisonmentYear, judgementDate, otherCheck, otherDetail, otherOffenseDetail, otherStatus, parole, refuseAlcoholTestStatus, socialService, socialServiceStatus, stealStatus, trainningCourse, trainningNo, trainningStatus, appintLongLast, appointNoLast, appointStatusLast, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}