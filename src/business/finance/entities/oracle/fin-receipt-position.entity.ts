import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_FIN_RECEIPT_POSITION" })
export class OracleFinReceiptPositions {
  @PrimaryGeneratedColumn({ name: "RECEIPT_POSITION_ID", comment: "รหัสข้อมูลตำแหน่ง Bookmark ใบเสร็จ(AUTO INCREMENT)" }) receiptPositionId: number;
  @Column({ name: "ORDER_NO", type: "float", nullable: true, comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "IS_DEFAULT", nullable: true, comment: "ค่าDefaultใบเสร็จ 1 = เงินกลาง 2 = ค่าธรรมเนียม 3 = ค่าปรับ 4 = อื่นๆ" }) isDefault: number;
  @Column({ name: "NOTE", nullable: true, comment: "หมายเหตุ" }) note: string;
  @Column({ name: "POSITION_BLACK_IDNUM", nullable: true, comment: "ตำแหน่งของเลขคดีดำ" }) positionBlackIdnum: string;
  @Column({ name: "POSITION_BLACK_YEAR", nullable: true, comment: "ตำแหน่งของปีคดีดำ" }) positionBlackYear: string;
  @Column({ name: "POSITION_CASH", nullable: true, comment: "ตำแหน่งของเงินสด" }) positionCash: string;
  @Column({ name: "POSITION_CENTRALFEE_BAHT", nullable: true, comment: "ตำแหน่งของเงินกลาง(บาท)" }) positionCentralfeeBaht: string;
  @Column({ name: "POSITION_CENTRALFEE_DESC", nullable: true, comment: "ตำแหน่งของเงินกลาง" }) positionCentralfeeDesc: string;
  @Column({ name: "POSITION_CENTRALFEE_STANG", nullable: true, comment: "ตำแหน่งของเงินกลาง(สตางค์)" }) positionCentralfeeStang: string;
  @Column({ name: "POSITION_CHOICE_CENTRALFEE", nullable: true, comment: "ตำแหน่งของเลือกเงินกลาง" }) positionChoiceCentralfee: string;
  @Column({ name: "POSITION_CHOICE_COURTFEE", nullable: true, comment: "ตำแหน่งของเลือกค่าธรรมเนียม" }) positionChoiceCourtfee: string;
  @Column({ name: "POSITION_CHOICE_FINE", nullable: true, comment: "ตำแหน่งของเลือกค่่าปรับ" }) positionChoiceFine: string;
  @Column({ name: "POSITION_CHOICE_OTHER", nullable: true, comment: "ตำแหน่งของเลือกอื่นๆ" }) positionChqiceOther: string;
  @Column({ name: "POSITION_CHQCREDIT", nullable: true, comment: "ตำแหน่งของเช็ค/บัตรเครดิต" }) positionChqcredit: string;
  @Column({ name: "POSITION_COURTFEE_BAHT", nullable: true, comment: "ตำแหน่งของค่าขึ้นศาล(บาท)" }) positionCourtfeeBaht: string;
  @Column({ name: "POSITION_COURTFEE_CASEENDDOC_BAHT", nullable: true, comment: "ตำแหน่งของค่าใบสำคัญรับรอง(บาท)" }) positionCourtfeeCaseenddocBaht: string;
  @Column({ name: "POSITION_COURTFEE_CASEENDDOC_DESC", nullable: true, comment: "ตำแหน่งของค่าใบสำคัญรับรอง" }) positionCourtfeeCaseenddocDesc: string;
  @Column({ name: "POSITION_COURTFEE_CASEENDDOC_STANG", nullable: true, comment: "ตำแหน่งของค่าใบสำคัญรับรอง(สตางค์)" }) positionCourtfeeCaseenddocStang: string;
  @Column({ name: "POSITION_COURTFEE_COPYAPPRV_BAHT", nullable: true, comment: "ตำแหน่งของค่ารับรองสำเนา(บาท)" }) positionCourtfeeCopyapprvBaht: string;
  @Column({ name: "POSITION_COURTFEE_COPYAPPRV_DESC", nullable: true, comment: "ตำแหน่งของค่ารับรองสำเนา" }) positionCourtfeeCopyapprvDesc: string;
  @Column({ name: "POSITION_COURTFEE_COPYAPPRV_STANG", nullable: true, comment: "ตำแหน่งของค่ารับรองสำเนา(สตางค์)" }) positionCourtfeeCopyapprvStang: string;
  @Column({ name: "POSITION_COURTFEE_DESC", nullable: true, comment: "ตำแหน่งของค่าขึ้นศาล" }) positionCourtfeeDesc: string;
  @Column({ name: "POSITION_COURTFEE_FUTURE_BAHT", nullable: true, comment: "ตำแหน่งของค่าขึ้นศาลอนาคต(บาท)" }) positionCourtfeeFutureBaht: string;
  @Column({ name: "POSITION_COURTFEE_FUTURE_DESC", nullable: true, comment: "ตำแหน่งของค่าขึ้นศาลอนาคต" }) positionCourtfeeFutureDesc: string;
  @Column({ name: "POSITION_COURTFEE_FUTURE_STANG", nullable: true, comment: "ตำแหน่งของค่าขึ้นศาลอนาคต(สตางค์)" }) positionCourtfeeFutureStang: string;
  @Column({ name: "POSITION_COURTFEE_STANG", nullable: true, comment: "ตำแหน่งของค่าขึ้นศาล(สตางค์)" }) positionCourtfeeStang: string;
  @Column({ name: "POSITION_COURTFEE_TESTIFY_BAHT", nullable: true, comment: "ตำแหน่งของค่าร้องขอสืบพยาน(บาท)" }) positionCourtfeeTestifyBaht: string;
  @Column({ name: "POSITION_COURTFEE_TESTIFY_DESC", nullable: true, comment: "ตำแหน่งของค่าร้องขอสืบพยาน" }) positionCourtfeeTestifyDesc: string;
  @Column({ name: "POSITION_COURTFEE_TESTIFY_STANG", nullable: true, comment: "ตำแหน่งของค่าร้องขอสืบพยาน(สตางค์)" }) positionCourtfeeTestifyStang: string;
  @Column({ name: "POSITION_COURT_NAME_TH", nullable: true, comment: "ตำแหน่งของชื่อศาล" }) positionCourtNameTH: string;
  @Column({ name: "POSITION_DIRECTOR", nullable: true, comment: "ตำแหน่งของกรรมการ" }) positionDirector: string;
  @Column({ name: "POSITION_FINE_BAHT", nullable: true, comment: "ตำแหน่งของค่าปรับ(บาท)" }) positionFineBaht: string;
  @Column({ name: "POSITION_FINE_DESC", nullable: true, comment: "ตำแหน่งของค่าปรับ" }) positionFineDesc: string;
  @Column({ name: "POSITION_FINE_STANG", nullable: true, comment: "ตำแหน่งของค่าปรับ(สตางค์)" }) positionFineStang: string;
  @Column({ name: "POSITION_LITIGANT_FEE_BAHT", nullable: true, comment: "ตำแหน่งของค่าอื่นๆ(บาท)" }) positionLitigantFeeBaht: string;
  @Column({ name: "POSITION_LITIGANT_FEE_DESC", nullable: true, comment: "ตำแหน่งของค่าอื่นๆ" }) positionLitigantFeeDesc: string;
  @Column({ name: "POSITION_LITIGANT_FEE_STANG", nullable: true, comment: "ตำแหน่งของค่าอื่นๆ(สตางค์)" }) positionLitigantFeeStang: string;
  @Column({ name: "POSITION_NO_IN_DATE_NOW", nullable: true, comment: "ตำแหน่งของลำดับที่" }) positionNoInDateNow: string;
  @Column({ name: "POSITION_OTHER_FEE_BAHT", nullable: true, comment: "ตำแหน่งของเงินอื่นๆ(บาท)" }) positionOtherFeeBaht: string;
  @Column({ name: "POSITION_OTHER_FEE_DESC", nullable: true, comment: "ตำแหน่งของเงินอื่นๆ" }) positionOtherFeeDesc: string;
  @Column({ name: "POSITION_OTHER_FEE_STANG", nullable: true, comment: "ตำแหน่งของเงินอื่นๆ(สตางค์)" }) positionOtherFeeStang: string;
  @Column({ name: "POSITION_PAYER_NAME", nullable: true, comment: "ตำแหน่งของชื่อผู้ชำระเงิน" }) positionPayerName: string;
  @Column({ name: "POSITION_POSITION_NAME", nullable: true, comment: "ตำแหน่งของตำแหน่ง" }) positionPositionName: string;
  @Column({ name: "POSITION_RECEIVED_DATE", nullable: true, comment: "ตำแหน่งของวันที่รับเงิน" }) positionReceivedDate: string;
  @Column({ name: "POSITION_RECEIVER", nullable: true, comment: "ตำแหน่งของชื่อผู้รับเงิน" }) positionReceiver: string;
  @Column({ name: "POSITION_RED_IDNUM", nullable: true, comment: "ตำแหน่งของเลขคดีแดง" }) positionRedIdnum: string;
  @Column({ name: "POSITION_RED_YEAR", nullable: true, comment: "ตำแหน่งของปีคดีแดง" }) positionRedYear: string;
  @Column({ name: "POSITION_REFAMOUNT1", nullable: true, comment: "ตำแหน่งของจำนวนเงินในรายการ 1" }) positionRefamount1: string;
  @Column({ name: "POSITION_REFAMOUNT2", nullable: true, comment: "ตำแหน่งของจำนวนเงินในรายการ 2" }) positionRefamount2: string;
  @Column({ name: "POSITION_REFDESC1", nullable: true, comment: "ตำแหน่งของธนาคารสาขา / ผู้ออกบัตร 1" }) positionRefdesc1: string;
  @Column({ name: "POSITION_REFDESC2", nullable: true, comment: "ตำแหน่งของธนาคารสาขา / ผู้ออกบัตร 2" }) positionRefdesc2: string;
  @Column({ name: "POSITION_REFNAME", nullable: true, comment: "ตำแหน่งของชื่อเจ้าของบัตร" }) positionRefname: string;
  @Column({ name: "POSITION_REVCODE1", nullable: true, comment: "ตำแหน่งของเลขที่เช็ค / เลขที่ใบบันทึกรายการ 1" }) positionRevcode1: string;
  @Column({ name: "POSITION_REVCODE2", nullable: true, comment: "ตำแหน่งของเลขที่เช็ค / เลขที่ใบบันทึกรายการ 2" }) positionRevcode2: string;
  @Column({ name: "POSITION_TH_MONTH", nullable: true, comment: "ตำแหน่งของเดือนที่รับเงิน" }) positionTHMonth: string;
  @Column({ name: "POSITION_TH_YEAR", nullable: true, comment: "ตำแหน่งของปีที่รับเงิน" }) positionTHYear: string;
  @Column({ name: "POSITION_TOTAL_AMOUNT", nullable: true, comment: "ตำแหน่งของรวมเป็นเงิน(บาท)" }) positionTotalAmount: string;
  @Column({ name: "POSITION_TOTAL_AMOUNT_TEXT", nullable: true, comment: "ตำแหน่งของรวมเป็นเงินเป็นตัวอักษร" }) positionTotalAmountText: string;
  @Column({ name: "POSITION_TOTAL_STANG", nullable: true, comment: "ตำแหน่งของรวมเป็นเงิน(สตางค์)" }) positionTotalStang: string;
  @Column({ name: "PRINT_NAME", nullable: true, comment: "ชื่อเครื่องพิมพ์" }) printName: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  toResponseObject() {
    const { receiptPositionId, orderNo, isDefault, note, positionBlackIdnum, positionBlackYear, positionCash, positionCentralfeeBaht, positionCentralfeeDesc, positionCentralfeeStang, positionChoiceCentralfee, positionChoiceCourtfee, positionChoiceFine, positionChqiceOther, positionChqcredit, positionCourtfeeBaht, positionCourtfeeCaseenddocBaht, positionCourtfeeCaseenddocDesc, positionCourtfeeCaseenddocStang, positionCourtfeeCopyapprvBaht, positionCourtfeeCopyapprvDesc, positionCourtfeeCopyapprvStang, positionCourtfeeDesc, positionCourtfeeFutureBaht, positionCourtfeeFutureDesc, positionCourtfeeFutureStang, positionCourtfeeStang, positionCourtfeeTestifyBaht, positionCourtfeeTestifyDesc, positionCourtfeeTestifyStang, positionCourtNameTH, positionDirector, positionFineBaht, positionFineDesc, positionFineStang, positionLitigantFeeBaht, positionLitigantFeeDesc, positionLitigantFeeStang, positionNoInDateNow, positionOtherFeeBaht, positionOtherFeeDesc, positionOtherFeeStang, positionPayerName, positionPositionName, positionReceivedDate, positionReceiver, positionRedIdnum, positionRedYear, positionRefamount1, positionRefamount2, positionRefdesc1, positionRefdesc2, positionRefname, positionRevcode1, positionRevcode2, positionTHMonth, positionTHYear, positionTotalAmount, positionTotalAmountText, positionTotalStang, printName, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { receiptPositionId, orderNo, isDefault, note, positionBlackIdnum, positionBlackYear, positionCash, positionCentralfeeBaht, positionCentralfeeDesc, positionCentralfeeStang, positionChoiceCentralfee, positionChoiceCourtfee, positionChoiceFine, positionChqiceOther, positionChqcredit, positionCourtfeeBaht, positionCourtfeeCaseenddocBaht, positionCourtfeeCaseenddocDesc, positionCourtfeeCaseenddocStang, positionCourtfeeCopyapprvBaht, positionCourtfeeCopyapprvDesc, positionCourtfeeCopyapprvStang, positionCourtfeeDesc, positionCourtfeeFutureBaht, positionCourtfeeFutureDesc, positionCourtfeeFutureStang, positionCourtfeeStang, positionCourtfeeTestifyBaht, positionCourtfeeTestifyDesc, positionCourtfeeTestifyStang, positionCourtNameTH, positionDirector, positionFineBaht, positionFineDesc, positionFineStang, positionLitigantFeeBaht, positionLitigantFeeDesc, positionLitigantFeeStang, positionNoInDateNow, positionOtherFeeBaht, positionOtherFeeDesc, positionOtherFeeStang, positionPayerName, positionPositionName, positionReceivedDate, positionReceiver, positionRedIdnum, positionRedYear, positionRefamount1, positionRefamount2, positionRefdesc1, positionRefdesc2, positionRefname, positionRevcode1, positionRevcode2, positionTHMonth, positionTHYear, positionTotalAmount, positionTotalAmountText, positionTotalStang, printName, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}