import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'PC_LABOR_WITNESS' })
export class OraclePcLaborWitness {
    @PrimaryGeneratedColumn({ name: 'WITNESS_ID', comment: 'รหัสข้อมูลบัญชีพยาน (AUTO INCREMENT)' }) witnessId: number;
    @Column({ name: 'CREATED_BY', nullable: false, comment: 'รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE' }) createdBy: number;
    @Column({ name: 'CREATED_DATE', nullable: false, comment: 'วันเวลาที่สร้างข้อมูล' }) createdDate: Date;
    @Column({ name: 'UPDATED_BY', nullable: true, comment: 'รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE' }) updatedBy: number;
    @Column({ name: 'UPDATED_DATE', nullable: true, comment: 'วันเวลาที่แก้ไขข้อมูลล่าสุด' }) updatedDate: Date;
    @Column({ name: 'REMOVED_BY', nullable: false, comment: 'รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE' }) removedBy: number;
    @Column({ name: 'REMOVED_DATE', nullable: true, comment: 'วันเวลาที่ลบข้อมูล' }) removedDate: Date;
    @Column({ name: 'ORDER_NO', nullable: true, comment: 'ลำดับของข้อมูล' }) orderNo: number;
    @Column({ name: 'WITNESS_NAME_TITLE', nullable: true, comment: 'รหัสคำนำหน้าชื่อ เชื่อมโยง PC_LOOKUP_TITLE' }) witnessNameTitle: number;
    @Column({ name: 'WITNESS_NAME', nullable: true, comment: 'ชื่อของพยาน' }) witnessName: string;
    @Column({ name: 'WITNESS_LASTNAME', nullable: true, comment: 'นามสกุลของพยาน' }) witnessLastname: string;
    @Column({ name: 'WITNESS_AGE', nullable: true, comment: 'อายุของพยาน' }) witnessAge: number;
    @Column({ name: 'WITNESS_NATIONAL_ID', nullable: true, comment: 'เลขประจำตัวประชาชนหรือเลข PASSPORT ของพยาน' }) witnessNationalId: string;
    @Column({ name: 'WITNESS_ADDRESS_NO', nullable: true, comment: 'เลขที่อยู่ปัจจุบันของพยาน' }) witnessAddressNo: string;
    @Column({ name: 'WITNESS_ADDRESS_MOO', nullable: true, comment: 'หมู่ที่อยู่ปัจจุบันของพยาน' }) witnessAddressMoo: string;
    @Column({ name: 'WITNESS_ADDRESS_SOI', nullable: true, comment: 'ซอยที่อยู่ปัจจุบันของพยาน' }) witnessAddressSoi: string;
    @Column({ name: 'WITNESS_ADDRESS_ROAD', nullable: true, comment: 'ถนนที่อยู่ปัจจุบันของพยาน' }) witnessAddressRoad: string;
    @Column({ name: 'TOMBON_ID', nullable: true, comment: 'รหัสตำบล เชื่อมโยง PC_LOOKUP_SUBDISTRICT' }) tombonId: number;
    @Column({ name: 'AMPHOE_ID', nullable: true, comment: 'รหัสอำเภอ เชื่อมโยง PC_LOOKUP_DISTRICT' }) amphoeId: number;
    @Column({ name: 'PROVINCE_ID', nullable: true, comment: 'รหัสจังหวัด เชื่อมโยง PC_LOOKUP_PROVINCE' }) provinceId: number;
    @Column({ name: 'WITNESS_ADDRESS_POST', nullable: true, comment: 'รหัสไปรษณีย์ของพยาน' }) witnessAddressPost: string;
    @Column({ name: 'WITNESS_PHONE_NO', nullable: true, comment: 'หมายเลขโทรศัพท์ของพยาน' }) witnessPhoneNo: string;
    @Column({ name: 'CASE_ID', nullable: true, comment: 'รหัสคดี เชื่อมโยงตาราง PC_CASE' }) caseId: number;
    @Column({ name: 'REMARK', nullable: true, comment: 'หมายเหตุ' }) remark: string;
    @Column({ name: 'INDICTMENT_ID', nullable: true, comment: 'รหัสข้อมูลคำฟ้อง เชื่อมโยง PC_LABOR_INDICTMENT' }) indictmentId: number;

    toResponseObject() {
        const { witnessId, createdBy, createdDate, updatedBy, updatedDate, removedBy, removedDate, orderNo, witnessNameTitle, witnessName, witnessLastname, witnessAge, witnessNationalId, witnessAddressNo, witnessAddressMoo, witnessAddressSoi, witnessAddressRoad, tombonId, amphoeId, provinceId, witnessAddressPost, witnessPhoneNo, caseId, remark, indictmentId } = this;
        const responseObject = { witnessId, createdBy, createdDate, updatedBy, updatedDate, removedBy, removedDate, orderNo, witnessNameTitle, witnessName, witnessLastname, witnessAge, witnessNationalId, witnessAddressNo, witnessAddressMoo, witnessAddressSoi, witnessAddressRoad, tombonId, amphoeId, provinceId, witnessAddressPost, witnessPhoneNo, caseId, remark, indictmentId };
        return responseObject;
    }
}