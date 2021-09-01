import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "preturn_receipt" })
export class MySQLReturnReceipts {
  @PrimaryColumn({ name: "court_running" }) courtRunning: number;
  @PrimaryColumn({ name: "order_running" }) orderRunning: number;
  @Column({ name: "payback_running" }) paybackRunning: number;
  @Column({ name: "run_id" }) runId: number;
  @Column({ name: "receipt_running" }) receiptRunning: number;
  @Column({ name: "receipt_item" }) receiptItem: number;
  @Column({ name: "receipt_type_id" }) receiptTypeId: number;
  @Column({ name: "sub_type_id" }) subTypeId: number;
  @Column({ name: "remain_amt" }) remainAmt: number;
  @Column({ name: "pay_amt" }) payAmt: number;
  @Column({ name: "pay_amt_text" }) payAmtText: string;
  @Column({ name: "cancel_flag" }) cancelFlag: number;
  @Column({ name: "cancel_reason" }) cancelReason: string;
  @Column({ name: "remark" }) remark: string;
  @Column({ name: "create_dep_code" }) createDepCode: number;
  @Column({ name: "create_user_id" }) createUserId: string;
  @Column({ name: "create_user" }) createUser: string;
  @Column({ name: "create_date" }) createDate: Date;
  @Column({ name: "update_dep_code" }) updateDepCode: number;
  @Column({ name: "update_user_id" }) updateUserId: string;
  @Column({ name: "update_user" }) updateUser: string;
  @Column({ name: "update_date" }) updateDate: Date;
  @Column({ name: "ref_id" }) refId: string;
  @Column({ name: "ref_finrecordgen" }) refFinrecordgen: string;
  @Column({ name: "ref_fin_out_recordgen" }) refFinOutRecordgen: string;

  toResponseObject() {
    const { courtRunning, orderRunning, paybackRunning, runId, receiptRunning, receiptItem, receiptTypeId, subTypeId, remainAmt, payAmt, payAmtText, cancelFlag, cancelReason, remark, createDepCode, createUserId, createUser, createDate, updateDepCode, updateUserId, updateUser, updateDate, refId, refFinrecordgen, refFinOutRecordgen } = this;
    const responseObject = { courtRunning, orderRunning, paybackRunning, runId, receiptRunning, receiptItem, receiptTypeId, subTypeId, remainAmt, payAmt, payAmtText, cancelFlag, cancelReason, remark, createDepCode, createUserId, createUser, createDate, updateDepCode, updateUserId, updateUser, updateDate, refId, refFinrecordgen, refFinOutRecordgen };
    return responseObject;
  }
}
