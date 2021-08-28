import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_FIN_BANK_TRANSACTION" })
export class OracleFinBankTransactions {
  @PrimaryGeneratedColumn({ name: "TRANS_ID", comment: "รหัสข้อมูลจ่ายค่าตอบแทน(AUTO INCREMENT)" }) transId: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "ORDER_NO", type: "float", nullable: true, comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "H_SEQ_NO", nullable: true, comment: "HEADER - ลำดับที่" }) hSeqNo: number;
  @Column({ name: "H_BANK_CODE", nullable: true, comment: "HEADER - รหัสมาตราฐานของธนาคาร" }) hBankCode: number;
  @Column({ name: "H_COMP_ACCOUNT_NO", nullable: true, comment: "HEADER - เลขที่บัญชีของศาล" }) hCompAccountNo: string;
  @Column({ name: "H_COMP_NAME", nullable: true, comment: "HEADER - รายละเอียดบัญชีของศาล" }) hCompName: string;
  @Column({ name: "H_EFFECTIVE_DATE", type: "timestamp", nullable: true, comment: "HEADER - วันที่มีผล" }) hEffectiveDate: Date;
  @Column({ name: "H_SERVICE_CODE", nullable: true, comment: "HEADER - หมายเลข Service" }) hServiceCode: string;
  @Column({ name: "H_SPARE", nullable: true, comment: "HEADER - จองค่า" }) hSpare: string;
  @Column({ name: "D_SEQ_NO", nullable: true, comment: "DETAIL - ลำดับที่" }) dSeqNo: number;
  @Column({ name: "D_BANK_CODE", nullable: true, comment: "DETAIL - รหัสมาตราฐานของธนาคาร" }) dBankCode: number;
  @Column({ name: "D_COMP_ACCOUNT_NO", nullable: true, comment: "DETAIL - เลขที่บัญชีของศาล" }) dCompAccountNo: string;
  @Column({ name: "D_PAYMENT_DATETIME", type: "timestamp", nullable: true, comment: "DETAIL - วันที่และเวลาชำระเงิน" }) dPaymentDatetime: Date;
  @Column({ name: "D_CUST_NAME", nullable: true, comment: "DETAIL - ชื่อผู้ทำรายการชำระเงิน" }) dCustName: string;
  @Column({ name: "D_REF_1", nullable: true, comment: "DETAIL - ข้อมูล REF 1" }) dRef1: string;
  @Column({ name: "D_REF_2", nullable: true, comment: "DETAIL - ข้อมูล REF 2" }) dRef2: string;
  @Column({ name: "D_REF_3", nullable: true, comment: "DETAIL - ข้อมูล REF 3" }) dRef3: string;
  @Column({ name: "D_BRANCH_NO", nullable: true, comment: "DETAIL - หมายเลขสาขา" }) dBranchNo: string;
  @Column({ name: "D_TELLER_NO", nullable: true, comment: "DETAIL - หมายเลข Teller" }) dTelletNo: string;
  @Column({ name: "D_TRANS_TYPE", nullable: true, comment: "DETAIL - ประเภทของรายการ C = Credit, D = Debit" }) dTransType: string;
  @Column({ name: "D_TRANS_CODE", nullable: true, comment: "DETAIL - รหัสรายการ" }) dTransCode: string;
  @Column({ name: "D_CHEQUE_NO", nullable: true, comment: "DETAIL - หมายเลขเช็ค" }) dChequeNo: string;
  @Column({ name: "D_AMOUNT", type: "float", nullable: true, comment: "DETAIL - จำนวนเงิน" }) dAmount: number;
  @Column({ name: "D_CHEQUE_BANK_CODE", nullable: true, comment: "DETAIL - รหัสมาตราฐานของธนาคารที่ออกเช็ค" }) dChequeBankCode: string;
  @Column({ name: "D_SPARE", nullable: true, comment: "DETAIL - จองค่า" }) dSpare: string;
  @Column({ name: "T_SEQ_NO", nullable: true, comment: "TOTAL - ลำดับที่" }) tSeqNo: number;
  @Column({ name: "T_BANK_CODE", nullable: true, comment: "TOTAL - รหัสมาตราฐานของธนาคาร" }) tBankCode: number;
  @Column({ name: "T_COMP_ACCOUNT", nullable: true, comment: "TOTAL - เลขที่บัญชีของศาล" }) tCompAccount: string;
  @Column({ name: "T_TOTAL_DEBIT_AMOUNT", type: "float", nullable: true, comment: "TOTAL - จำนวนเงินทั้งหมดในส่วนของ Debit Transaction" }) tTotalDebitAmount: number;
  @Column({ name: "T_TOTAL_DEBIT_TRANS", nullable: true, comment: "TOTAL - จำนวน Debit Transaction" }) tTotalDebitTrans: number;
  @Column({ name: "T_TOTAL_CREDIT_AMOUNT", type: "float", nullable: true, comment: "TOTAL - จำนวนเงินทั้งหมดในส่วนของ Credit Transaction" }) tTotalCreditAmount: number;
  @Column({ name: "T_TOTAL_CREDIT_TRANS", nullable: true, comment: "TOTAL - จำนวน Credit Transaction" }) tTotalCreditTrans: number;
  @Column({ name: "T_SPARE", nullable: true, comment: "TOTAL - จองค่า" }) tSpare: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { transId, courtId, orderNo, hSeqNo, hBankCode, hCompAccountNo, hCompName, hEffectiveDate, hServiceCode, hSpare, dSeqNo, dBankCode, dCompAccountNo, dPaymentDatetime, dCustName, dRef1, dRef2, dRef3, dBranchNo, dTelletNo, dTransType, dTransCode, dChequeNo, dAmount, dChequeBankCode, dSpare, tSeqNo, tBankCode, tCompAccount, tTotalDebitAmount, tTotalDebitTrans, tTotalCreditAmount, tTotalCreditTrans, tSpare, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { transId, courtId, orderNo, hSeqNo, hBankCode, hCompAccountNo, hCompName, hEffectiveDate, hServiceCode, hSpare, dSeqNo, dBankCode, dCompAccountNo, dPaymentDatetime, dCustName, dRef1, dRef2, dRef3, dBranchNo, dTelletNo, dTransType, dTransCode, dChequeNo, dAmount, dChequeBankCode, dSpare, tSeqNo, tBankCode, tCompAccount, tTotalDebitAmount, tTotalDebitTrans, tTotalCreditAmount, tTotalCreditTrans, tSpare, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}