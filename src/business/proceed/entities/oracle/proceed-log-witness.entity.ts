import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_LOG_WITNESS" })
export class OracleProceedLogWitness {
  @PrimaryGeneratedColumn({ name: "LOG_WITNESS_ID", comment: "รหัสข้อมูลพยาน(AUTO INCREMENT)" }) logWitnessId: number;
  @Column({ name: "ORDER_NO", type: "float", comment: "ลำดับของข้อมูล" }) ordeNo: number;
  @Column({ name: "ADDRESS_DISTRICT", nullable: true, comment: "รหัสอำเภอ เชื่อมโยง PC_LOOKUP_DISTRICT" }) addressDistrict: number;
  @Column({ name: "ADDRESS_MOO", nullable: true, comment: "หมู่ที่" }) addressMoo: string;
  @Column({ name: "ADDRESS_NO", nullable: true, comment: "ที่อยู่เลขที่" }) addressNo: string;
  @Column({ name: "ADDRESS_POST_CODE", nullable: true, comment: "รหัสไปรษณีย์(maxlength = 5)" }) addressPostCode: string;
  @Column({ name: "ADDRESS_PROVINCE", nullable: true, comment: "รหัสจังหวัด เชื่อมโยง PC_LOOKUP_PROVINCE" }) addressProvince: number;
  @Column({ name: "ADDRESS_ROAD", nullable: true, comment: "ถนน" }) addressRoad: string;
  @Column({ name: "ADDRESS_SOI", nullable: true, comment: "ซอย" }) addressSoi: string;
  @Column({ name: "ADDRESS_SUB_DISTRICT", nullable: true, comment: "รหัสตำบล เชื่อมโยง PC_LOOKUP_SUBDISTRICT" }) addressSubDistrict: number;
  @Column({ name: "CASE_ID", comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "WITNESS_NAME", comment: "ชื่อพยาน" }) witnessName: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", nullable: true, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { logWitnessId, ordeNo, addressDistrict, addressMoo, addressNo, addressPostCode, addressProvince, addressRoad, addressSoi, addressSubDistrict, caseId, witnessName, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { logWitnessId, ordeNo, addressDistrict, addressMoo, addressNo, addressPostCode, addressProvince, addressRoad, addressSoi, addressSubDistrict, caseId, witnessName, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}