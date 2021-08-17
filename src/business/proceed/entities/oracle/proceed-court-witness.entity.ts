import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_COURT_WITNESS" })
export class OracleProceedCourtWitness {
  @PrimaryGeneratedColumn({ name: "COURT_WITNESS_ID", comment: "รหัสข้อมูลแจ้งเตือนพยานศาล(ตำรวจ) (AUTO INCREMENT)" }) courtWitnessId: number;
  @Column({ name: "ORDER_NO", type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "ACCUSER_NAME", comment: "ชื่อโจทก์" }) accuserName: string;
  @Column({ name: "ADDRESS_DISTRICT", comment: "รหัสอำเภอ เชื่อมโยง PC_LOOKUP_DISTRICT" }) addressDistrict: number;
  @Column({ name: "ADDRESS_MOO", nullable: true, comment: "หมู่ที่" }) addressMoo: number;
  @Column({ name: "ADDRESS_NO", comment: "ที่อยู่เลขที่" }) addressNo: string;
  @Column({ name: "ADDRESS_POST_CODE", nullable: true, comment: "รหัสไปรษณีย์(maxlength = 5)" }) addressPostCode: string;
  @Column({ name: "ADDRESS_PROVINCE", comment: "รหัสจังหวัด เชื่อมโยง PC_LOOKUP_PROVINCE" }) addressProvince: number;
  @Column({ name: "ADDRESS_ROAD", nullable: true, comment: "ถนน" }) addressRoad: string;
  @Column({ name: "ADDRESS_SOI", nullable: true, comment: "ซอย" }) addressSoi: string;
  @Column({ name: "ADDRESS_SUB_DISTRICT", comment: "รหัสตำบล เชื่อมโยง PC_LOOKUP_SUBDISTRICT" }) addressSubDistrict: number;
  @Column({ name: "OFFENSE_DETAIL", type: "clob", nullable: true, comment: "ฐานความผิด" }) offenseDetail: string;
  @Column({ name: "CASE_ID", comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "COURT_WITNESS_DATE", nullable: true, type: "timestamp", comment: "วันที่แจ้งเตือนพยานศาล(ตำรวจ)" }) courtWitnessDate: Date;
  @Column({ name: "COURT_WITNESS_NO", comment: "เลขที่แจ้งเตือนพยานศาล(ตำรวจ)" }) courtWitnessNo: number;
  @Column({ name: "COURT_WITNESS_TIME", type: "char", comment: "เวลาแจ้งเตือนพยานศาล(ตำรวจ)" }) courtWitnessTime: string;
  @Column({ name: "DEFENDANT_NAME", comment: "ชื่อจำเลย" }) defendantName: string;
  @Column({ name: "FULL_P_CASE", comment: "เลขที่คดีดำ" }) fullPCase: string;
  @Column({ name: "OFFICER_ID", comment: "รหัสเจ้าหน้าที่" }) officerId: number;
  @Column({ name: "POSITION_ID", comment: "รหัสตำแหน่ง" }) positionId: number;
  @Column({ name: "RUNNING_NUMBER_ID", nullable: true, comment: "ชื่อเลขที่ต่อเนื่อง" }) runningNumberId: number;
  @Column({ name: "TO_WHO", comment: "เรียนถึงผู้ใด" }) toWho: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { courtWitnessId, orderNo, accuserName, addressDistrict, addressMoo, addressNo, addressPostCode, addressProvince, addressRoad, addressSoi, addressSubDistrict, offenseDetail, caseId, courtId, courtWitnessDate, courtWitnessNo, courtWitnessTime, defendantName, fullPCase, officerId, positionId, runningNumberId, toWho, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { courtWitnessId, orderNo, accuserName, addressDistrict, addressMoo, addressNo, addressPostCode, addressProvince, addressRoad, addressSoi, addressSubDistrict, offenseDetail, caseId, courtId, courtWitnessDate, courtWitnessNo, courtWitnessTime, defendantName, fullPCase, officerId, positionId, runningNumberId, toWho, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}