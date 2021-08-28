import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "PC_FIN_CALC_INTEREST" })
export class OracleFinCalcInterests {
  @PrimaryGeneratedColumn({ name: "INTEREST_ID", comment: "รหัสข้อมูลการคำนวนดอกเบี้ย(AUTO INCREMENT)" }) interestId: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "ORDER_NO", type: "float", nullable: true, comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "INITIAL_AMOUNT", nullable: true, comment: "จำนวนเงินตั้งต้น" }) initialAmount: number;
  @Column({ name: "CALC_START_DATE", type: "timestamp", comment: "วันที่เริ่มคำนวนดอกเบี้ย" }) calcStartDate: Date;
  @Column({ name: "CALC_END_DATE", type: "timestamp", comment: "วันที่สิ้นสุดการคำนวนดอกเบี้น" }) calcEndDate: Date;
  @Column({ name: "INTEREST_VALUE", nullable: true, comment: "อัตราดอกเบี้ยเป็นเปอร์เซ็น" }) interestValue: number;
  @Column({ name: "TOTAL_AMOUNT", type: "float", comment: "จำนวนเงินทั้งหมด" }) totalAmount: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", nullable: true, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @CreateDateColumn({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @UpdateDateColumn({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { interestId, courtId, orderNo, initialAmount, calcStartDate, calcEndDate, interestValue, totalAmount, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { interestId, courtId, orderNo, initialAmount, calcStartDate, calcEndDate, interestValue, totalAmount, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}