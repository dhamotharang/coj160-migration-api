import { type } from "os";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_CONFIRM_DATE " })
export class OracleProceedConfirmDates {
  @PrimaryGeneratedColumn({ name: "CONFIRM_DATE_ID", comment: "รหัสข้อมูลยืนยันวันนัดโจทย์และจำเลย(AUTO INCREMENT)" }) confirmDateId: number;
  @Column({ name: "ORDER_NO		FLOAT		Y", nullable: true, comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "ACCUSER_DATE", type: "timestamp", nullable: true, comment: "วันที่นัดสืบพยานโจทก์" }) accuserDate: Date;
  @Column({ name: "ACCUSER_NAME", comment: "ชื่อโจทก์" }) accuserName: string;
  @Column({ name: "ACCUSER_TIME", length: 20, comment: "เวลาที่นัดสืบพยานโจทก์" }) accuserTime: string;
  @Column({ name: "ADDRESS_DISTRICT", comment: "รหัสอำเภอ เชื่อมโยง PC_LOOKUP_DISTRICT" }) addressDistrict: number;
  @Column({ name: "ADDRESS_MOO", length: 100, nullable: true, comment: "หมู่ที่" }) addressMoo: string;
  @Column({ name: "ADDRESS_NO", comment: "ที่อยู่เลขที่" }) addressNo: string;
  @Column({ name: "ADDRESS_POST_CODE", type: "varchar", nullable: true, comment: "รหัสไปรษณีย์(maxlength = 5)" }) addressPostCode: string;
  @Column({ name: "ADDRESS_PROVINCE", comment: "รหัสจังหวัด เชื่อมโยง PC_LOOKUP_PROVINCE" }) addressProvince: number;
  @Column({ name: "ADDRESS_ROAD", length: 100, nullable: true, comment: "ถนน" }) addressRoad: string;
  @Column({ name: "ADDRESS_SOI", length: 100, nullable: true, comment: "ซอย" }) addressSoi: string;
  @Column({ name: "ADDRESS_SUB_DISTRICT", comment: "รหัสตำบล เชื่อมโยง PC_LOOKUP_SUBDISTRICT" }) addressSubDistrict: number;
  @Column({ name: "OFFENSE_DETAIL", type: "clob", nullable: true, comment: "ฐานความผิด" }) offenseDetail: string;
  @Column({ name: "CASE_ID", comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "CONFIRM_DATE_NO", comment: "เลขที่ยืนยันวันนัดโจทย์และจำเลย" }) confirmDateNo: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "DEFENDANT_DATE", type: "timestamp", nullable: true, comment: "วันที่นัดสืบพยานจำเลย" }) denfendantDate: Date;
  @Column({ name: "DEFENDANT_NAME", comment: "ชื่อจำเลย" }) defendentTime: string;
  @Column({ name: "ADEFENDANT_TIME", length: 20, comment: "เวลาที่นัดสืบพยานจำเลย" }) addefendantTime: string;
  @Column({ name: "FULL_P_CASE		VARCHAR2	50 CHAR	N", comment: "เลขที่คดีดำ" }) fullPCase: string;
  @Column({ name: "OFFICER_ID", comment: "รหัสเจ้าหน้าที่" }) officerId: number;
  @Column({ name: "POSITION_ID", comment: "รหัสตำแหน่ง" }) positionId: number;
  @Column({ name: "RUNNING_NUMBER_ID", nullable: true, comment: "ชื่อเลขที่ต่อเนื่อง" }) runningNumberId: number;
  @Column({ name: "TEXT", type: "clob", nullable: true, comment: "ข้อมูลให้ท่านมาเป็นพยานฝ่ายใด(Long Text)" }) text: string;
  @Column({ name: "TO_WHO", comment: "เรียนถึงผู้ใด" }) toWho: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", nullable: true, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { confirmDateId, orderNo, accuserDate, accuserName, accuserTime, addressDistrict, addressMoo, addressNo, addressPostCode, addressProvince, addressRoad, addressSoi, addressSubDistrict, offenseDetail, caseId, confirmDateNo, courtId, denfendantDate, defendentTime, addefendantTime, fullPCase, officerId, positionId, runningNumberId, text, toWho, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { confirmDateId, orderNo, accuserDate, accuserName, accuserTime, addressDistrict, addressMoo, addressNo, addressPostCode, addressProvince, addressRoad, addressSoi, addressSubDistrict, offenseDetail, caseId, confirmDateNo, courtId, denfendantDate, defendentTime, addefendantTime, fullPCase, officerId, positionId, runningNumberId, text, toWho, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}