import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "preceipt_detail" })
export class MySQLReceiptDetails {
  @PrimaryColumn({ name: "court_running", comment: "รหัสศาลเจ้าของระบบ" }) courtRunning: number;
  @PrimaryColumn({ name: "receipt_running", comment: "fk:preceipt.receipt_running" }) receiptRunning: number;
  @Column({ name: "item", comment: "ลำดับที่" }) item: number;
  @Column({ name: "receipt_type_id", comment: "ประเภทเงิน fk:preceipt_type.receipt_type_id" }) receiptTypeId: number;
  @Column({ name: "sub_type_id", comment: "ประเภทเงิน" }) subTypeId: number;
  @Column({ name: "sub_type_name", comment: "รายละเอียดประเภทเงิน" }) subTypeName: string;
  @Column({ name: "cash_amt", nullable: true, type: "double", comment: "ยอดจากเงินสด" }) cashAmt: number;
  @Column({ name: "cheque_amt", nullable: true, type: "double", comment: "ยอดจากเช็ค" }) chequeAmt: number;
  @Column({ name: "credit_amt", nullable: true, type: "double", comment: "ยอดจากบัตรเคดิต" }) creditAmt: number;
  @Column({ name: "rcv_amt", nullable: true, type: "double", comment: "จำนวนเงิน" }) rcvAmt: number;
  @Column({ name: "def_item", nullable: true, comment: "จำเลยที่" }) defItem: number;
  @Column({ name: "def_name", comment: "ชื่อจำเลย" }) defName: string;
  @Column({ name: "forfeit_amt", nullable: true, type: "double", comment: "ศาลสั่งปรับ" }) forfeitAmt: number;
  @Column({ name: "jail_day", nullable: true, comment: "วันต้องขัง" }) jailDay: number;
  @Column({ name: "jail_day_amt", nullable: true, type: "double", comment: "วันละ...บาท" }) jailDayAmt: number;
  @Column({ name: "total_amt", nullable: true, type: "double", comment: "รวมเงินหัก" }) totalAmt: number;
  @Column({ name: "total_pay", nullable: true, type: "double", comment: "จำนวนเงิน" }) totalPay: number;
  @Column({ name: "remark", comment: "หมายเหตุ" }) remark: string;
  @Column({ name: "create_dep_code", nullable: true, comment: "รหัสหน่วยงานที่สร้าง record" }) createDepCode: number;
  @Column({ name: "create_user_id", nullable: true, comment: "รหัส user ที่สร้าง record" }) createUserId: string;
  @Column({ name: "create_user", comment: "user ที่สร้าง record" }) createUser: string;
  @Column({ name: "create_date", nullable: true, type: "timestamp", comment: "วันที่เวลาสร้าง record" }) createDate: Date;
  @Column({ name: "update_dep_code", nullable: true, comment: "รหัสหน่วยงานที่ update" }) updateDepCode: number;
  @Column({ name: "update_user_id", nullable: true, comment: "รหัส user ที่ update record" }) updateUserId: string;
  @Column({ name: "update_user", comment: "user ที่ update record" }) updateUser: string;
  @Column({ name: "update_date", nullable: true, type: "timestamp", comment: "วันที่ เวลา update record" }) updateDate: Date;
  @Column({ name: "ref_id", nullable: true, comment: "transfer blackrecgen" }) refId: string;
  @Column({ name: "ref_finrecordgen", nullable: true, comment: "transfer dbo_tdFinance_Income finrecordgen" }) refFinrecordgen: string;
  @Column({ name: "ref_finrecordgen_tor", nullable: true, comment: "ntbc_gp_lawcourt.thFinanceOutSide.finrecordgen" }) refFinrecordgenTor: string;

  toResponseObject() {
    const {
      courtRunning, receiptRunning, item, receiptTypeId, subTypeId, subTypeName, cashAmt, chequeAmt, creditAmt, rcvAmt,
      defItem, defName, forfeitAmt, jailDay, jailDayAmt, totalAmt, totalPay, remark, createDepCode, createUserId, createUser,
      createDate, updateDepCode, updateUserId, updateUser, updateDate, refId, refFinrecordgen, refFinrecordgenTor,
    } = this;

    const responseObject = {
      courtRunning, receiptRunning, item, receiptTypeId, subTypeId, subTypeName, cashAmt, chequeAmt, creditAmt, rcvAmt,
      defItem, defName, forfeitAmt, jailDay, jailDayAmt, totalAmt, totalPay, remark, createDepCode, createUserId, createUser,
      createDate, updateDepCode, updateUserId, updateUser, updateDate, refId, refFinrecordgen, refFinrecordgenTor,
    };

    return responseObject;
  }
}
