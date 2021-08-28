import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'PC_LABOR_EXECUTION' })
export class OraclePcLaborExecutions {
    @PrimaryGeneratedColumn({ name: 'EXECUTION_ID', comment: 'รหัสข้อมูลการดำเนินการบังคับคดี (AUTO INCREMENT)' }) executionId: number;
    @Column({ name: 'CASE_ID', nullable: true, comment: 'รหัสคดี เชื่อมโยงตาราง PC_CASE' }) caseId: number;
    @Column({ name: 'CREATED_BY', nullable: false, comment: 'รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE' }) createdBy: number;
    @Column({ name: 'CREATED_DATE', nullable: false, comment: 'วันเวลาที่สร้างข้อมูล' }) createdDate: Date;
    @Column({ name: 'UPDATED_BY', nullable: true, comment: 'รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE' }) updatedBy: number;
    @Column({ name: 'UPDATED_DATE', nullable: true, comment: 'วันเวลาที่แก้ไขข้อมูลล่าสุด' }) updatedDate: Date;
    @Column({ name: 'REMOVED_BY', nullable: false, comment: 'รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE' }) removedBy: number;
    @Column({ name: 'REMOVED_DATE', nullable: true, comment: 'วันเวลาที่ลบข้อมูล' }) removedDate: Date;
    @Column({ name: 'ORDER_NO', nullable: true, comment: 'ลำดับของข้อมูล' }) orderNo: number;
    @Column({ name: 'EXECUTION_CODE', nullable: true, comment: 'ลำดับเลขที่เก็บของการบังคับคดี' }) executionCode: string;
    @Column({ name: 'EXECUTION_REQ_TYPE', nullable: true, comment: 'รหัสประเภทคำขอบังคับคดี เชื่อมโยง PC_LABOR_EXECUTION_REQ_TYPE' }) executionReqType: number;
    @Column({ name: 'NAME_TITLE', nullable: true, comment: 'รหัสคำนำหน้าชื่อ เชื่อมโยง PC_LOOKUP_TITLE' }) nameTitle: number;
    @Column({ name: 'NAME', nullable: true, comment: 'ชื่อของผู้ร้อง' }) name: string;
    @Column({ name: 'LASTNAME', nullable: true, comment: 'นามสกุลของผู้ร้อง' }) lastname: string;
    @Column({ name: 'AGE', nullable: true, comment: 'อายุของผู้ร้อง' }) age: number;
    @Column({ name: 'NATIONAL_ID', nullable: true, comment: 'เลขประจำตัวประชาชนหรือเลข PASSPORT ของผู้ร้อง' }) nationalId: string;
    @Column({ name: 'ADDRESS_NO', nullable: true, comment: 'เลขที่อยู่ปัจจุบันของผู้ร้อง' }) addressNo: string;
    @Column({ name: 'ADDRESS_MOO', nullable: true, comment: 'หมู่ที่อยู่ปัจจุบันของผู้ร้อง' }) addressMoo: string;
    @Column({ name: 'ADDRESS_SOI', nullable: true, comment: 'ซอยที่อยู่ปัจจุบันของผู้ร้อง' }) addressSoi: string;
    @Column({ name: 'ADDRESS_ROAD', nullable: true, comment: 'ถนนที่อยู่ปัจจุบันของผู้ร้อง' }) addressRoad: string;
    @Column({ name: 'ADDRESS_POST', nullable: true, comment: 'รหัสไปรษณีย์ของผู้ร้อง' }) addressPost: string;
    @Column({ name: 'TOMBON_ID', nullable: true, comment: 'รหัสตำบล เชื่อมโยง PC_LOOKUP_SUBDISTRICT' }) tombonId: number;
    @Column({ name: 'AMPHOE_ID', nullable: true, comment: 'รหัสอำเภอ เชื่อมโยง PC_LOOKUP_DISTRICT' }) amphoeId: number;
    @Column({ name: 'PROVINCE_ID', nullable: true, comment: 'รหัสจังหวัด เชื่อมโยง PC_LOOKUP_PROVINCE' }) provinceId: number;
    @Column({ name: 'PHONE_NO', nullable: true, comment: 'หมายเลขโทรศัพท์ของผู้ร้อง' }) phoneNo: string;

    toResponseObject() {
        const { executionId, caseId, createdBy, createdDate, updatedBy, updatedDate, removedBy, removedDate, orderNo, executionCode, executionReqType, nameTitle, name, lastname, age, nationalId, addressNo, addressMoo, addressSoi, addressRoad, addressPost, tombonId, amphoeId, provinceId, phoneNo } = this;
        const responseObject = { executionId, caseId, createdBy, createdDate, updatedBy, updatedDate, removedBy, removedDate, orderNo, executionCode, executionReqType, nameTitle, name, lastname, age, nationalId, addressNo, addressMoo, addressSoi, addressRoad, addressPost, tombonId, amphoeId, provinceId, phoneNo };
        return responseObject;
    }
}