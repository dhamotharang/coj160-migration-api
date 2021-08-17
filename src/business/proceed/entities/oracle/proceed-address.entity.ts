import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_ADDRESS" })
export class OracleOroceedAddress {
  @PrimaryGeneratedColumn({ name: "ADDRESS_ID", comment: "รหัสข้อมูลที่อยู่นัดความ(AUTO INCREMENT)" }) addressId: number;
  @Column({ name: "ORDER_NO", comment: "ลำดับของข้อมูล", nullable: true, type: "float" }) orderNo: number;
  @Column({ name: "ADDRESS", comment: "เลขที่อยู่", default: true }) address: string;
  @Column({ name: "ALLEY", comment: "ซอยที่อยู่", default: true }) alley: string;
  @Column({ name: "CASE_ID", comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseid: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "DISTRICT_ID", comment: "รหัสอำเภอ เชื่อมโยง PC_LOOKUP_DISTRICT" }) districtId: number;
  @Column({ name: "EMAIL", comment: "อีเมล์", default: true }) email: string;
  @Column({ name: "IS_REMOVED", comment: "ตัวเลือกที่ลบข้อมูล", default: true }) isRemoved: number;
  @Column({ name: "MOO", comment: "หมู่ที่อยู่", default: true }) moo: string;
  @Column({ name: "PHONE_NO", comment: "หมายเลขโทรศัพท์", default: true }) phoneNo: string;
  @Column({ name: "PLACE_TYPE_ID", comment: "รหัสประเภทสถานที่ เชื่อมโยง PC_LOOKUP_PLACE_TYPE" }) placeTypeId: number;
  @Column({ name: "POST_CODE", comment: "รหัสไปรษณีย์", default: true }) postCode: string;
  @Column({ name: "PROCEED_TYPE", comment: "ชนิดประเภท คป 3 หรือ 4", default: true }) proceedType: string;
  @Column({ name: "PROCEED_TYPE_ID", comment: "รหัสของ คป3 หรือ 4 NIGHT_PLACE_ID หรือ INFORM_ID", default: true }) proceedTypeId: number;
  @Column({ name: "PROVINCE_ID", comment: "รหัสจังหวัด เชื่อมโยง PC_LOOKUP_PROVINCE" }) provinceId: number;
  @Column({ name: "ROAD", comment: "ถนนที่อยู่", default: true }) road: string;
  @Column({ name: "SUBDISTRICT_ID", comment: "รหัสตำบล เชื่อมโยง PC_LOOKUP_SUBDISTRICT" }) subDistrictId: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE", default: true }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @CreateDateColumn({ name: "CREATED_DATE", comment: "วันเวลาที่สร้างข้อมูล", type: "timestamp" }) createdDate: Date;
  @UpdateDateColumn({ name: "UPDATED_DATE", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด", type: "timestamp", default: true }) updateDate: Date;
  @UpdateDateColumn({ name: "REMOVED_DATE", comment: "วันเวลาที่ลบข้อมูล", default: true, type: "timestamp" }) removedDate: Date;

  toResponseObject() {
    const { addressId, orderNo, address, alley, caseid, courtId, districtId, email, isRemoved, moo, phoneNo, placeTypeId, postCode, proceedType, proceedTypeId, provinceId, road, subDistrictId, createdBy, updatedBy, removedBy, createdDate, updateDate, removedDate } = this;
    const responseObject = { addressId, orderNo, address, alley, caseid, courtId, districtId, email, isRemoved, moo, phoneNo, placeTypeId, postCode, proceedType, proceedTypeId, provinceId, road, subDistrictId, createdBy, updatedBy, removedBy, createdDate, updateDate, removedDate };
    return responseObject;
  }
}