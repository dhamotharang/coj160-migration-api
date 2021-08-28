import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "FIN_RECEIPT_DEFENDANT_FINES" })
export class OracleFinReceiptDefendantFines {
  @PrimaryGeneratedColumn({ name: "RECEIPT_DEFENDANT_FINES_ID", comment: "รหัสข้อมูลการสั่งปรับจำเลย(AUTO INCREMENT)" }) receiptDefendantFinesId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "RECEIPT_ID", comment: "รหัสข้อมูลใบเสร็จรับเงิน เชื่อมโยงตาราง PC_FIN_RECEIPT" }) receiptId: number;
  @Column({ name: "DEFENDANT_FIRST", nullable: true, comment: "จำเลยที่ 1" }) defendantFirst: number;
  @Column({ name: "DEFENDANT_FIRST_AMOUNT", nullable: true, type: "float", comment: "เป็นเงินคนละ(จำเลยที่ 1)" }) defendantFirstAmount: number;
  @Column({ name: "DEFENDANT_FIRST_CATCH", nullable: true, comment: "จำเลยที่ 1 ถูกควบคุมมาแล้ว" }) defendantFirstCatch: number;
  @Column({ name: "DEFENDANT_FIRST_CATCH_DATE", nullable: true, comment: "จำเลยที่ 1 ถูกควบคุมมาแล้วจำนวนกี่วัน" }) defendantFirstCatchDate: number;
  @Column({ name: "DEFENDANT_SECOND", nullable: true, comment: "จำเลยที่ 2" }) defendantSecond: number;
  @Column({ name: "DEFENDANT_SECOND_AMOUNT", nullable: true, type: "float", comment: "เป็นเงินคนละ(จำเลยที่ 2)" }) defendantSecondAmount: number;
  @Column({ name: "DEFENDANT_SECOND_CATCH", nullable: true, comment: "จำเลยที่ 2 ถูกควบคุมมาแล้ว" }) defendantSecondCatch: number;
  @Column({ name: "DEFENDANT_SECOND_CATCH_DATE", nullable: true, comment: "จำเลยที่ 2 ถูกควบคุมมาแล้วจำนวนกี่วัน" }) defendantSecondCatchDate: number;
  @Column({ name: "FINE_ACCEPT", nullable: true, type: "float", comment: "คงรับเงินค่าปรับจากจำเลย" }) fineAccept: number;
  @Column({ name: "FINE_ACT", nullable: true, type: "float", comment: "ค่าปรับ พ.ร.บ.จราจรทางบก" }) fineAct: number;
  @Column({ name: "FINE_LOCAL_GOVERNMENT", nullable: true, type: "float", comment: "เงินรายได้ค่าปรับเทศบาล" }) fineLocalGoverment: number;
  @Column({ name: "FINE_TOTAL", nullable: true, type: "float", comment: "รวมหักค่าปรับ" }) fineTotal: number;
  @Column({ name: "OTHER_DEFENDANT", nullable: true, type: "float", comment: "จำเลยนอกนั้นปรับคนละกี่บาท" }) otherDefendant: number;
  @Column({ name: "OTHER_DEFENDANT_CATCH_DATE", nullable: true, comment: "จำเลยนอกนั้น ถูกควบคุมมาแล้วจำนวนกี่วัน" }) otherDefendantCatchDate: number;
  @Column({ name: "RECEIPT_DETAIL_ID", nullable: true, comment: "รหัสรายละเอียดใบเสร็จ เชื่อมโยง PC_FIN_RECEIPT_DETAIL" }) receiptDetailId: number;
  @Column({ name: "OTHER_DEFENDANT_CATCH_DATE_NUMBER", nullable: true, comment: "จำเลยนอกนั้นถูกปรับมีกี่คน" }) otherDefendantCatchDateNumber: number;
  @Column({ name: "OTHER_DEFENDANT_NUMBER", nullable: true, comment: "จำเลยนอกนั้นถูกควบคุมมีกี่คน" }) otherDefendantNumber: number;
  @Column({ name: "DEFENDANT_AMOUNT_TOTAL", nullable: true, type: "float", comment: "รวมเป็นเงิน" }) defendantAmountTotal: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { receiptDefendantFinesId, orderNo, receiptId, defendantFirst, defendantFirstAmount, defendantFirstCatch, defendantFirstCatchDate, defendantSecond, defendantSecondAmount, defendantSecondCatch, defendantSecondCatchDate, fineAccept, fineAct, fineLocalGoverment, fineTotal, otherDefendant, otherDefendantCatchDate, receiptDetailId, otherDefendantCatchDateNumber, otherDefendantNumber, defendantAmountTotal, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { receiptDefendantFinesId, orderNo, receiptId, defendantFirst, defendantFirstAmount, defendantFirstCatch, defendantFirstCatchDate, defendantSecond, defendantSecondAmount, defendantSecondCatch, defendantSecondCatchDate, fineAccept, fineAct, fineLocalGoverment, fineTotal, otherDefendant, otherDefendantCatchDate, receiptDetailId, otherDefendantCatchDateNumber, otherDefendantNumber, defendantAmountTotal, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}
