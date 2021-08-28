import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_BAIL_BAILSMAN" })
export class OracleBailBailsmans {
  @PrimaryGeneratedColumn({ name: "BAILSMAN_ID", comment: "4" }) bailsmanId: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "ORDER_NO", type: "float", nullable: true, comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "BAILSMAN_CODE_NO", comment: "หมายเลขนายประกัน" }) bailsmanCodeNo: number;
  @Column({ name: "NAME_TITLE_ID", comment: "รหัสคำนำหน้าชื่อ เชื่อมโยง PC_LOOKUP_TITLE" }) nameLitleId: number;
  @Column({ name: "NAME", nullable: true, comment: "ชื่อของนายประกัน" }) name: string;
  @Column({ name: "LASTNAME", nullable: true, comment: "นามสกุลของนายประกัน" }) lastname: string;
  @Column({ name: "AGE", comment: "อายุของนายประกัน" }) age: number;
  @Column({ name: "NATIONAL_ID", comment: "เลขประจำตัวประชาชนหรือเลข PASSPORT ของนายประกัน" }) nationalId: string;
  @Column({ name: "ADDRESS", comment: "เลขที่อยู่ปัจจุบันของนายประกัน" }) address: string;
  @Column({ name: "MOO", comment: "หมู่ที่อยู่ปัจจุบันของนายประกัน" }) moo: string;
  @Column({ name: "ALLEY", comment: "ซอยที่อยู่ปัจจุบันของนายประกัน" }) alley: string;
  @Column({ name: "ROAD", comment: "ถนนที่อยู่ปัจจุบันของนายประกัน" }) road: string;
  @Column({ name: "SUBDISTRICT_ID", comment: "รหัสตำบล เชื่อมโยง PC_LOOKUP_SUBDISTRICT" }) subdistrictId: number;
  @Column({ name: "DISTRICT_ID", comment: "รหัสอำเภอ เชื่อมโยง PC_LOOKUP_DISTRICT" }) districtId: number;
  @Column({ name: "PROVINCE_ID", comment: "รหัสจังหวัด เชื่อมโยง PC_LOOKUP_PROVINCE" }) provinceId: number;
  @Column({ name: "POST_CODE", comment: "รหัสไปรษณีย์ของนายประกัน" }) postCode: string;
  @Column({ name: "PHONE_NO", comment: "หมายเลขโทรศัพท์ของนายประกัน" }) phoneNo: string;
  @Column({ name: "FAX_NO", nullable: true, comment: "หมายเลขโทรสารของนายประกัน" }) faxNo: string;
  @Column({ name: "EMAIL", nullable: true, comment: "อีเมล์ของนายประกัน" }) email: string;
  @Column({ name: "RACE_ID", comment: "รหัสเชื้อชาติ เชื่อมโยง PC_LOOKUP_RACE" }) raceId: number;
  @Column({ name: "NATIONALITY_ID", comment: "รหัสสัญชาติ เชื่อมโยง PC_LOOKUP_NATION" }) nationalityId: number;
  @Column({ name: "OCCUPATION_ID", comment: "รหัสอาชีพ เชื่อมโยง PC_LOOKUP_OCCUPATION" }) occupationId: number;
  @Column({ name: "BIRTHDAY", type: "timestamp", comment: "วันเดือนปีเกิดของนายประกัน" }) birthday: Date;
  @Column({ name: "IS_BREACH", nullable: true, comment: "ตัวเลือกนายประกันผิดสัญญา" }) isBreach: number;
  @Column({ name: "FULLNAME", nullable: true, comment: "ชื่อ-นามสกุล แบบเต็ม" }) fullname: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { bailsmanId, courtId, orderNo, bailsmanCodeNo, nameLitleId, name, lastname, age, nationalId, address, moo, alley, road, subdistrictId, districtId, provinceId, postCode, phoneNo, faxNo, email, raceId, nationalityId, occupationId, birthday, isBreach, fullname, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { bailsmanId, courtId, orderNo, bailsmanCodeNo, nameLitleId, name, lastname, age, nationalId, address, moo, alley, road, subdistrictId, districtId, provinceId, postCode, phoneNo, faxNo, email, raceId, nationalityId, occupationId, birthday, isBreach, fullname, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}