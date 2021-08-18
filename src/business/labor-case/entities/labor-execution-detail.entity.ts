import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'PC_LABOR_EXECUTION_DETAIL' })
export class OraclePcLaborExecutionDetail {
    @PrimaryGeneratedColumn({ name: 'DETAIL_ID', comment: 'รหัสข้อมูลส่วนรายละเอียดการดำเนินการบังคับคดี (AUTO INCREMENT)' }) detailId: number;
    @Column({ name: 'EXECUTION_ID', nullable: true, comment: 'รหัสข้อมูลผู้ร้องบังคับคดี เชื่อมโยงตาราง PC_LABOR_EXECUTION' }) executionId: number;
    @Column({ name: 'CREATED_BY', nullable: false, comment: 'รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE' }) createdBy: number;
    @Column({ name: 'CREATED_DATE', nullable: false, comment: 'วันเวลาที่สร้างข้อมูล' }) createdDate: Date;
    @Column({ name: 'UPDATED_BY', nullable: true, comment: 'รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE' }) updatedBy: number;
    @Column({ name: 'UPDATED_DATE', nullable: true, comment: 'วันเวลาที่แก้ไขข้อมูลล่าสุด' }) updatedDate: Date;
    @Column({ name: 'REMOVED_BY', nullable: false, comment: 'รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE' }) removedBy: number;
    @Column({ name: 'REMOVED_DATE', nullable: true, comment: 'วันเวลาที่ลบข้อมูล' }) removedDate: Date;
    @Column({ name: 'ORDER_NO', nullable: true, comment: 'ลำดับของข้อมูล' }) orderNo: number;
    @Column({ name: 'HAS_PAY_DEPT', nullable: true, comment: 'ตัวเลือกหลังศาลมีคำพิพากษา - ลูกหนี้มีการชำระหนี้' }) hasPayDept: number;
    @Column({ name: 'PAY_DEPT_AMOUNT', nullable: true, comment: 'จำนวนเงินที่ลูกหนี้มีการชำระหนี้' }) payDeptAmount: number;
    @Column({ name: 'NEVER_PAY_DEPT', nullable: true, comment: 'ตัวเลือกหลังศาลมีคำพิพากษา - ลูกหนี้ไม่มีการชำระหนี้' }) neverPayDept: number;
    @Column({ name: 'RECEIVED_HIRE', nullable: true, comment: 'ตัวเลือกหลังศาลมีคำพิพากษา - เจ้าหนี้ได้รับทรัพย์ที่เช่าซื้อคืน' }) receivedHire: number;
    @Column({ name: 'RECEIVED_DATE', nullable: true, comment: 'วันที่ที่เจ้าหนี้ตามคำพิพากษาได้รับทรัพย์ที่เช่าซื้อคืน' }) receivedDate: Date;
    @Column({ name: 'HAS_CENSUS_REGISTRATION', nullable: true, comment: 'ตัวเลือกส่งหลักฐานประกอบ - ทะเบียนบ้าน' }) hasCensusRegistration: number;
    @Column({ name: 'CENSUS_REGISTRATION_DETAIL', nullable: true, comment: 'รายละเอียดของทะเบียนบ้าน' }) censusRegistrationDetail: string;
    @Column({ name: 'HAS_CERTIFICATION', nullable: true, comment: 'ตัวเลือกส่งหลักฐานประกอบ - หนังสือรับรองนิติบุคคล' }) hasCertification: number;
    @Column({ name: 'CERTIFICATION_DETAIL', nullable: true, comment: 'รายละเอียดของหนังสือรับรองนิติบุคคล' }) certificationDetail: string;
    @Column({ name: 'HAS_OTHER_DOCUMENT', nullable: true, comment: 'ตัวเลือกส่งหลักฐานประกอบ - เอกสารอื่นๆ' }) hasOtherDocument: number;
    @Column({ name: 'OTHER_DOCUMENT_DETAIL', nullable: true, comment: 'รายละเอียดของเอกสารอื่นๆ' }) otherDocumentDetail: string;
    @Column({ name: 'HAS_MAP', nullable: true, comment: 'ตัวเลือกส่งหลักฐานประกอบ - แผนที่สถานที่ยึดทรัพย์/เก็บทรัพย์' }) hasMap: number;
    @Column({ name: 'HAS_PHOTO', nullable: true, comment: 'ตัวเลือกส่งหลักฐานประกอบ - ภาพถ่ายทรัพย์ที่จะยึด' }) hasPhoto: number;
    @Column({ name: 'HAS_COPY_CAR_REGISTRATION', nullable: true, comment: 'ตัวเลือกส่งหลักฐานประกอบ - ทะเบียนรถ' }) hasCopyCarRegistration: number;
    @Column({ name: 'HAS_COPY_CERTIFICATION', nullable: true, comment: '1' }) hasCopyCertification: number;
    @Column({ name: 'HAS_OTHER', nullable: true, comment: 'ตัวเลือกส่งหลักฐานประกอบ - อื่นๆ' }) hasOther: number;
    @Column({ name: 'OTHER_DETAIL', nullable: true, comment: 'รายละเอียดของหลักฐานอื่นๆ' }) otherDetail: string;
    @Column({ name: 'IS_AGREEMENT', nullable: true, comment: 'ตัวเลือกยืนยันว่าข้อความเป็นจริงทุกประการ' }) isAgreement: number;
    @Column({ name: 'HAS_NOT_OVER_EXECUTION_VALUE', nullable: true, comment: 'ตัวเลือกยืนยันว่าลูกหนี้ตามคำพิพากษาไม่มีทรัพย์สินอื่นนอกจากทรัพย์ที่แถลงขอยึด' }) hasNotOverExecutionValue: number;
    @Column({ name: 'TRUSTEE_NAME', nullable: true, comment: 'ชื่อผู้รักษาทรัพย์' }) trusteeName: string;
    @Column({ name: 'SAVE_FEE', nullable: true, comment: 'ค่ารักษาทรัพย์' }) saveFee: number;
    @Column({ name: 'RENT_FEE', nullable: true, comment: 'ค่าเช่าสถานที่เก็บทรัพย์' }) rentFee: number;
    @Column({ name: 'HAS_LAND_NOTICE', nullable: true, comment: 'ตัวเลือกแจ้งกรมที่ดิน กรณียึดที่ดิน' }) hasLandNotice: number;
    @Column({ name: 'HAS_FOREST_NOTICE', nullable: true, comment: 'ตัวเลือกแจ้งกรมป่าไม้' }) hasForestNotice: number;
    @Column({ name: 'CONFIRM_TO_CONFISCATE', nullable: true, comment: 'ตัวเลือกว่าจำเลยได้รับทราบการยึดทรัพย์โดยชอบแล้ว' }) confirmToConfiscate: number;
    @Column({ name: 'RECEIVED_FOR', nullable: true, comment: 'รายละเอียดการรับเงิน' }) receivedFor: string;
    @Column({ name: 'AMOUNT', nullable: true, comment: 'จำนวนเงินที่รับ' }) amount: number;
    @Column({ name: 'PAYEE_NAME_TITLE', nullable: true, comment: 'รหัสคำนำหน้าชื่อ เชื่อมโยง PC_LOOKUP_TITLE' }) payeeNameTitle: number;
    @Column({ name: 'PAYEE_NAME', nullable: true, comment: 'ชื่อของผู้จ่ายเงิน' }) payeeName: string;
    @Column({ name: 'PAYEE_LASTNAME', nullable: true, comment: 'นามสกุลของผู้จ่ายเงิน' }) payeeLastname: string;
    @Column({ name: 'PAYEE_AGE', nullable: true, comment: 'อายุของผู้จ่ายเงิน' }) payeeAge: number;
    @Column({ name: 'PAYEE_NATIONAL_ID', nullable: true, comment: 'เลขประจำตัวประชาชนหรือเลข PASSPORT ของผู้จ่ายเงิน' }) payeeNationalId: string;
    @Column({ name: 'PAYEE_ADDRESS_NO', nullable: true, comment: 'เลขที่อยู่ปัจจุบันของผู้จ่ายเงิน' }) payeeAddressNo: string;
    @Column({ name: 'PAYEE_ADDRESS_MOO', nullable: true, comment: 'หมู่ที่อยู่ปัจจุบันของผู้จ่ายเงิน' }) payeeAddressMoo: string;
    @Column({ name: 'PAYEE_ADDRESS_SOI', nullable: true, comment: 'ซอยที่อยู่ปัจจุบันของผู้จ่ายเงิน' }) payeeAddressSoi: string;
    @Column({ name: 'PAYEE_ADDRESS_ROAD', nullable: true, comment: 'ถนนที่อยู่ปัจจุบันของผู้จ่ายเงิน' }) payeeAddressRoad: string;
    @Column({ name: 'PAYEE_TOMBON_ID', nullable: true, comment: 'รหัสตำบล เชื่อมโยง PC_LOOKUP_SUBDISTRICT' }) payeeTombonId: number;
    @Column({ name: 'PAYEE_AMPHOE_ID', nullable: true, comment: 'รหัสอำเภอ เชื่อมโยง PC_LOOKUP_DISTRICT' }) payeeAmphoeId: number;
    @Column({ name: 'PAYEE_PROVINCE_ID', nullable: true, comment: 'รหัสจังหวัด เชื่อมโยง PC_LOOKUP_PROVINCE' }) payeeProvinceId: number;
    @Column({ name: 'PAYEE_ADDRESS_POST', nullable: true, comment: 'รหัสไปรษณีย์ของผู้จ่ายเงิน' }) payeeAddressPost: string;
    @Column({ name: 'PAYEE_PHONE_NO', nullable: true, comment: 'หมายเลขโทรศัพท์ของผู้จ่ายเงิน' }) payeePhoneNo: string;
    @Column({ name: 'IS_PAID', nullable: true, comment: 'ตัวเลือกจ่ายแล้ว' }) isPaid: number;
    @Column({ name: 'PAID_NO', nullable: true, comment: 'เลขที่ใบสั่ง' }) paidNo: string;
    @Column({ name: 'IS_RECORD', nullable: true, comment: 'ตัวเลือกลงบัญชีแล้ว' }) isRecord: number;
    @Column({ name: 'RECORD_BOOK_NO', nullable: true, comment: 'บัญชีเล่มที่' }) recordBookNo: number;
    @Column({ name: 'RECORD_BOOK_PAGE', nullable: true, comment: 'บัญชีหน้าที่' }) recordBookPage: number;

    toResponseObject() {
        const { detailId, executionId, createdBy, createdDate, updatedBy, updatedDate, removedBy, removedDate, orderNo, hasPayDept, payDeptAmount, neverPayDept, receivedHire, receivedDate, hasCensusRegistration, censusRegistrationDetail, hasCertification, certificationDetail, hasOtherDocument, otherDocumentDetail, hasMap, hasPhoto, hasCopyCarRegistration, hasCopyCertification, hasOther, otherDetail, isAgreement, hasNotOverExecutionValue, trusteeName, saveFee, rentFee, hasLandNotice, hasForestNotice, confirmToConfiscate, receivedFor, amount, payeeNameTitle, payeeName, payeeLastname, payeeAge, payeeNationalId, payeeAddressNo, payeeAddressMoo, payeeAddressSoi, payeeAddressRoad, payeeTombonId, payeeAmphoeId, payeeProvinceId, payeeAddressPost, payeePhoneNo, isPaid, paidNo, isRecord, recordBookNo, recordBookPage } = this;
        const responseObject = { detailId, executionId, createdBy, createdDate, updatedBy, updatedDate, removedBy, removedDate, orderNo, hasPayDept, payDeptAmount, neverPayDept, receivedHire, receivedDate, hasCensusRegistration, censusRegistrationDetail, hasCertification, certificationDetail, hasOtherDocument, otherDocumentDetail, hasMap, hasPhoto, hasCopyCarRegistration, hasCopyCertification, hasOther, otherDetail, isAgreement, hasNotOverExecutionValue, trusteeName, saveFee, rentFee, hasLandNotice, hasForestNotice, confirmToConfiscate, receivedFor, amount, payeeNameTitle, payeeName, payeeLastname, payeeAge, payeeNationalId, payeeAddressNo, payeeAddressMoo, payeeAddressSoi, payeeAddressRoad, payeeTombonId, payeeAmphoeId, payeeProvinceId, payeeAddressPost, payeePhoneNo, isPaid, paidNo, isRecord, recordBookNo, recordBookPage };
        return responseObject;
    }
}