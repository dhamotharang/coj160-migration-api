import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'PC_LABOR_CASE_ACCUSER' })
export class OraclePcLaborCaseAccusers {
    @PrimaryGeneratedColumn({ name: 'ACCUSER_ID', comment: 'รหัสข้อมูลระบบบันทึกคดีแรงงาน (รง.4) ส่วนโจทก์ (AUTO INCREMENT)' }) accuserId: number;
    @Column({ name: 'LABOR_CASE_ID', nullable: false, comment: 'รหัสระบบบันทึกคดีแรงงาน (รง.4) เชื่อมโยง PC_LABOR_CASE' }) laborCaseId: number;
    @Column({ name: 'CREATED_BY', nullable: false, comment: 'รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE' }) createdBy: number;
    @Column({ name: 'CREATED_DATE', nullable: false, comment: 'วันเวลาที่สร้างข้อมูล' }) createdDate: Date;
    @Column({ name: 'ORDER_NO', nullable: true, comment: 'ลำดับของข้อมูล' }) orderNo: number;
    @Column({ name: 'REMOVED_BY', nullable: false, comment: 'รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE' }) removedBy: number;
    @Column({ name: 'REMOVED_DATE', nullable: true, comment: 'วันเวลาที่ลบข้อมูล' }) removedDate: Date;
    @Column({ name: 'UPDATED_BY', nullable: true, comment: 'รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE' }) updatedBy: number;
    @Column({ name: 'UPDATED_DATE', nullable: true, comment: 'วันเวลาที่แก้ไขข้อมูลล่าสุด' }) updatedDate: Date;
    @Column({ name: 'ACCUSER_AGE', nullable: true, comment: 'อายุโจทก์' }) accuserAge: number;
    @Column({ name: 'ACCUSER_BIRTHDATE', nullable: true, comment: 'วันเดือนปีเกิดของโจทก์' }) accuserBirthdate: Date;
    @Column({ name: 'ACCUSER_EMAIL', nullable: true, comment: 'อีเมล์' }) accuserEmail: string;
    @Column({ name: 'ACCUSER_LASTNAME', nullable: true, comment: 'นามสกุลโจทก์' }) accuserLastname: string;
    @Column({ name: 'ACCUSER_LIT_TYPE_ID', nullable: true, comment: 'รหัสประเภทคู่ความ เชื่อมโยง PC_LOOKUP_LIT_TYPE' }) accuserLitTypeId: number;
    @Column({ name: 'ACCUSER_NAME', nullable: false, comment: 'ชื่อโจทก์' }) accuserName: string;
    @Column({ name: 'ACCUSER_NAME_TITLE', nullable: true, comment: 'รหัสคำนำหน้า เชื่อมโยง PC_LOOKUP_TITLE' }) accuserNameTitle: number;
    @Column({ name: 'ACCUSER_NATIONAL_ID', nullable: true, comment: 'รหัสสัญชาติ เชื่อมโยง PC_LOOKUP_INTERS' }) accuserNationalId: number;
    @Column({ name: 'ACCUSER_NATIONAL_ID_CARD', nullable: true, comment: 'เลขบัตรประชาชนโจทก์ (max length = 13)' }) accuserNationalIdCard: string;
    @Column({ name: 'ACCUSER_OCCUPATION_ID', nullable: true, comment: 'รหัสอาชีพ เชื่อมโยง PC_LOOKUP_OCCUPATION' }) accuserOccupationId: number;
    @Column({ name: 'ACCUSER_ORDER_NO', nullable: true, comment: 'ลำดัับโจท์' }) accuserOrderNo: number;
    @Column({ name: 'ACCUSER_PERSONAL_TYPE_ID', nullable: true, comment: 'รหัสประเภทบุคคล เชื่อมโยง PC_LOOKUP_PERS_TYPE' }) accuserPersonalTypeId: number;
    @Column({ name: 'ACCUSER_RACE_ID', nullable: true, comment: 'รหัสเชื้อชาติชาติ เชื่อมโยง PC_LOOKUP_NATIONS' }) accuserRaceId: number;
    @Column({ name: 'ACCUSER_SEX_ID', nullable: true, comment: 'ตัวเลือกเพศ ชาย/หญิง (ชาย : 1, หญิง : 2)' }) accuserSexId: number;
    @Column({ name: 'ACCUSER_TEL', nullable: true, comment: 'เบอร์ติดต่อ' }) accuserTel: string;

    toResponseObject() {
        const { accuserId, laborCaseId, createdBy, createdDate, orderNo, removedBy, removedDate, updatedBy, updatedDate, accuserAge, accuserBirthdate, accuserEmail, accuserLastname, accuserLitTypeId, accuserName, accuserNameTitle, accuserNationalId, accuserNationalIdCard, accuserOccupationId, accuserOrderNo, accuserPersonalTypeId, accuserRaceId, accuserSexId, accuserTel } = this;
        const responseObject = { accuserId, laborCaseId, createdBy, createdDate, orderNo, removedBy, removedDate, updatedBy, updatedDate, accuserAge, accuserBirthdate, accuserEmail, accuserLastname, accuserLitTypeId, accuserName, accuserNameTitle, accuserNationalId, accuserNationalIdCard, accuserOccupationId, accuserOrderNo, accuserPersonalTypeId, accuserRaceId, accuserSexId, accuserTel };
        return responseObject;
    }
}