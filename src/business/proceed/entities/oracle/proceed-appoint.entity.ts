import { HttpException, HttpStatus } from "@nestjs/common";
import { HelperService } from "src/shared/helpers/helper.service";
import { BeforeInsert, Column, CreateDateColumn, Entity, getManager, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OracleProceedAppointCaseJudges } from "./proceed-appoint-case-judge.entity";
import { OracleProceedAppointContinues } from "./proceed-appoint-continue.entity";
import { OracleProceedAppointResults } from "./proceed-appoint-result.entity";

@Entity({ name: "PC_PROCEED_APPOINT" })
export class OracleProceedAppoints extends HelperService {
  constructor() {
    super();
  }
  @PrimaryGeneratedColumn({ name: "APPOINT_ID", comment: "รหัสข้อมูลนัดความ(AUTO INCREMENT)" }) appointId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "OFFENSE_DETAIL", nullable: true, type: "clob", comment: "ฐานความผิด" }) offenseDetail: string;
  @Column({ name: "APPOINT_BY_ID", comment: "รหัสคดีนัดแบบใด เชื่อมโยง PC_LOOKUP_APPOINT_CASE" }) appointById: number;
  @Column({ name: "APPOINT_DEPARTMENT_ID", nullable: true, comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) appointDepartment: number;
  @Column({ name: "ARREST", nullable: true, comment: "ตัวเลือกขัง" }) arrest: number;
  @Column({ name: "ARREST_DATE", nullable: true, type: "timestamp", comment: "วันที่ขัง" }) arrestDate: Date;
  @Column({ name: "CASE_ID", comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "INVESTIGATE_ACCUSER", nullable: true, comment: "จำนวนปากของสืบพยานโจทก์" }) investigateAccuser: number;
  @Column({ name: "INVESTIGATE_ACCUSER_DATE", nullable: true, comment: "จำนวนวันของการสืบพยานโจทก์" }) investigateAccuserDate: Date;
  @Column({ name: "INVESTIGATE_DEFENDANT", nullable: true, comment: "จำนวนปากของสืบพยานจำเลย" }) investigateDefendent: number;
  @Column({ name: "INVESTIGATE_DEFENDANT_DATE", nullable: true, comment: "จำนวนวันของการสืบพยานจำเลย" }) investigateDefendentDate: Date;
  @Column({ name: "INVESTIGATE_OTHER", nullable: true, comment: "จำนวนปากของสืบอื่น ๆ" }) investigateOther: number;
  @Column({ name: "INVESTIGATE_OTHER_DATE", nullable: true, comment: "จำนวนวันของการสืบอื่น ๆ" }) investigateOtherDate: Date;
  @Column({ name: "INVESTIGATE_OTHER_DETAIL", nullable: true, comment: "รายละเอียดของสืบอื่น ๆ" }) investigateOtherDetail: string;
  @Column({ name: "LAWYER_CLAIMANT_ID", nullable: true, comment: "รหัสทนายฝ่ายจำเลย" }) lawyerClaimId: number;
  @Column({ name: "LAWYER_DEFENDANT_ID", nullable: true, comment: "รหัสทนายฝ่ายโจทก์" }) lawyerDefendantId: number;
  @Column({ name: "NO_ARREST", nullable: true, comment: "ตัวเลือกไม่ขัง" }) noArrest: number;
  @Column({ name: "ONE_JUDGE", nullable: true, comment: "ตัวเลือกผู้พิพากษานายเดียว(ศาลแขวง)" }) noJudge: number;
  @Column({ name: "OWNER_DATE", type: "timestamp", nullable: true, comment: "วันที่เป็นเจ้าของ" }) ownerDate: Date;
  @Column({ name: "PLAINTIFF_ID", nullable: true, comment: "รหัสสถานะการนัด เชื่อมโยง PC_LOOKUP_APPOINT_STATUS" }) plaintiffId: number;
  @Column({ name: "PLAINTIFF_TYPE", nullable: true, comment: "ตัวเลือกผู้ใดเป็นโจทก์ 1 = อัยการเป็นโจทก์, 2 = ราษฎร์เป็นโจทก์" }) plaintiffType: number;
  @Column({ name: "REASON_APPOINT_ID", nullable: true, comment: "รหัสสาเหตุที่นัด" }) reasonAppointId: number;
  @Column({ name: "RELEASE", nullable: true, comment: "ตัวเลือกปล่อยตัวชั่วคราว" }) release: number;
  @Column({ name: "ROOM_ID", nullable: true, comment: "ห้องพิจารณาคดี เชื่อมโยง PC_LOOKUP_LEVEL_ROOM" }) roomId: number;
  @Column({ name: "TWO_JUDGE", nullable: true, comment: "ตัวเลือกผู้พิพากษาสองนาย(ศาลจังหวัด)" }) twoJudge: number;
  @Column({ name: "IS_ELECTRONIC_FILING", comment: "เป็นนัดความจากระบบ E-Filing หรือไม่ ?" }) isElectronicFiling: number;
  @Column({ name: "CREATED_BY", default: 0, comment: "	รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", default: 0, nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", default: 0, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @CreateDateColumn({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @UpdateDateColumn({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  @OneToMany(type => OracleProceedAppointContinues, conti => conti.proceedAppoints)
  @JoinColumn({ name: "APPOINT_ID" }) proceedAppointContinues: OracleProceedAppointContinues[];

  @OneToMany(type => OracleProceedAppointCaseJudges, caseJudge => caseJudge.proceedAppoints)
  @JoinColumn({ name: "APPOINT_ID" }) proceedAppointCaseJudges: OracleProceedAppointCaseJudges[];

  @OneToMany(type => OracleProceedAppointResults, results => results.proceedAppoints)
  @JoinColumn({ name: "APPOINT_ID" }) proceedAppointResults: OracleProceedAppointResults[];

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_PROCEED_APPOINT_SEQ".nextval ID FROM DUAL`);
      this.appointId = res[0].ID;
      this.orderNo = res[0].ID;
    } catch (error) {
      throw new HttpException(`[oracle: before insert failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  toResponseObject() {
    const {
      appointId, createdBy, createdDate, orderNo, removedBy, removedDate, updatedBy, updatedDate, offenseDetail, appointById, appointDepartment, arrest, arrestDate, caseId, investigateAccuser, investigateAccuserDate, investigateDefendent, investigateDefendentDate, investigateOther, investigateOtherDate, investigateOtherDetail, lawyerClaimId, lawyerDefendantId, noArrest, noJudge, ownerDate, plaintiffId, plaintiffType, reasonAppointId, release, roomId, twoJudge, isElectronicFiling,
      proceedAppointContinues, proceedAppointCaseJudges, proceedAppointResults
    } = this;
    const responseObject = { appointId, orderNo, offenseDetail, appointById, appointDepartment, arrest, arrestDate, caseId, investigateAccuser, investigateAccuserDate, investigateDefendent, investigateDefendentDate, investigateOther, investigateOtherDate, investigateOtherDetail, lawyerClaimId, lawyerDefendantId, noArrest, noJudge, ownerDate, plaintiffId, plaintiffType, reasonAppointId, release, roomId, twoJudge, isElectronicFiling };

    Object.assign(responseObject, {
      createdBy, updatedBy, removedBy,
      createdDate: createdDate ? this.dateFormat("YYYY-MM-DD H:i:s", createdDate) : null,
      removedDate: removedDate ? this.dateFormat("YYYY-MM-DD H:i:s", removedDate) : null,
      updatedDate: updatedDate ? this.dateFormat("YYYY-MM-DD H:i:s", updatedDate) : null,
      proceedAppointContinues: proceedAppointContinues ? proceedAppointContinues.map(element => element.toResponseObject()) : null,
      proceedAppointCaseJudges: proceedAppointCaseJudges ? proceedAppointCaseJudges.map(element => element.toResponseObject()) : null,
      proceedAppointResults: proceedAppointResults ? proceedAppointResults.map(element => element.toResponseObject()) : null,
    })
    return responseObject;
  }
}