import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_FIN_CALC_INTEREST_DETAIL" })
export class OracleFinCalcInterestDetails {
  @PrimaryGeneratedColumn({ name: "DETAIL_ID", comment: "รหัสข้อมูลรายละเอียดการคำนวนดอกเบี้ย(AUTO INCREMENT)" }) detailId: number;
  @Column({ name: "INTEREST_ID", comment: "รหัสการคำนวนดอกเบี้ย เชื่อมโยงตาราง PC_FIN_CALC_INTEREST" }) interestId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "CALC_TYPE", comment: "ประเภทของเงินที่จะนำไปคำนวนดอกเบี้ย" }) calcType: number;
  @Column({ name: "AMOUNT", type: "float", comment: "จำนวนเงินที่จะไปคำนวนดอกเบี้ย" }) amount: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "REMOVED_BY", nullable: true, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { detailId, interestId, orderNo, calcType, amount, courtId, createdBy, removedBy, updatedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { detailId, interestId, orderNo, calcType, amount, courtId, createdBy, removedBy, updatedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}