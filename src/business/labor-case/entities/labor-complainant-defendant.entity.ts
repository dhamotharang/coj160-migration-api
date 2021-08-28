import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'PC_LABOR_COMPLAINANT_DEFENDANT' })
export class OraclePcLaborComplainantDefendant {
    @PrimaryGeneratedColumn({ name: 'DEFENDANT_ID', comment: 'รหัสข้อมูลระบบบันทึกคดีแรงงาน (รง.2) ส่วนผู้คัดค้าน (AUTO INCREMENT)' }) defendantId: number;
    @Column({ name: 'COMPLAINANT_ID', nullable: false, comment: 'รหัสข้อมูลระบบบันทึกคำร้องศาลแรงงาน เชื่อมโยง PC_LABOR_COMPLAINANT' }) complainantId: number;
    @Column({ name: 'CREATED_BY', nullable: false, comment: 'รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE' }) createdBy: number;
    @Column({ name: 'CREATED_DATE', nullable: false, comment: 'วันเวลาที่สร้างข้อมูล' }) createdDate: Date;
    @Column({ name: 'UPDATED_BY', nullable: true, comment: 'รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE' }) updatedBy: number;
    @Column({ name: 'UPDATED_DATE', nullable: true, comment: 'วันเวลาที่แก้ไขข้อมูลล่าสุด' }) updatedDate: Date;
    @Column({ name: 'REMOVED_BY', nullable: false, comment: 'รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE' }) removedBy: number;
    @Column({ name: 'REMOVED_DATE', nullable: true, comment: 'วันเวลาที่ลบข้อมูล' }) removedDate: Date;
    @Column({ name: 'ORDER_NO', nullable: true, comment: 'ลำดับของข้อมูล' }) orderNo: number;
    @Column({ name: 'DEFENDANT_AGE', nullable: true, comment: 'อายุจำเลย' }) defendantAge: number;
    @Column({ name: 'DEFENDANT_BIRTHDATE', nullable: true, comment: 'วันเดือนปีเกิดของจำเลย' }) defendantBirthdate: Date;
    @Column({ name: 'DEFENDANT_EMAIL', nullable: true, comment: 'อีเมล์' }) defendantEmail: string;
    @Column({ name: 'DEFENDANT_LASTNAME', nullable: true, comment: 'นามสกุลจำเลย' }) defendantLastname: string;
    @Column({ name: 'DEFENDANT_LIT_TYPE_ID', nullable: true, comment: 'รหัสประเภทคู่ความ เชื่อมโยง PC_LOOKUP_LIT_TYPE' }) defendantLitTypeId: number;
    @Column({ name: 'DEFENDANT_NAME', nullable: false, comment: 'ชื่อจำเลย' }) defendantName: string;
    @Column({ name: 'DEFENDANT_NAME_TITLE', nullable: true, comment: 'รหัสคำนำหน้า เชื่อมโยง PC_LOOKUP_TITLE' }) defendantNameTitle: number;
    @Column({ name: 'DEFENDANT_NATIONAL_ID', nullable: true, comment: 'รหัสสัญชาติ เชื่อมโยง PC_LOOKUP_INTERS' }) defendantNationalId: number;
    @Column({ name: 'DEFENDANT_NATIONAL_ID_CARD', nullable: true, comment: 'เลขบัตรประชาชนจำเลย (max length = 13)' }) defendantNationalIdCard: string;
    @Column({ name: 'DEFENDANT_OCCUPATION_ID', nullable: true, comment: 'รหัสอาชีพ เชื่อมโยง PC_LOOKUP_OCCUPATION' }) defendantOccupationId: number;
    @Column({ name: 'DEFENDANT_ORDER_NO', nullable: true, comment: 'ลำดับจำเลย' }) defendantOrderNo: number;
    @Column({ name: 'DEFENDANT_PERSONAL_TYPE_ID', nullable: true, comment: 'รหัสประเภทบุคคล เชื่อมโยง PC_LOOKUP_PERS_TYPE' }) defendantPersonalTypeId: number;
    @Column({ name: 'DEFENDANT_RACE_ID', nullable: true, comment: 'รหัสเชื้อชาติชาติ เชื่อมโยง PC_LOOKUP_NATIONS' }) defendantRaceId: number;
    @Column({ name: 'DEFENDANT_SEX_ID', nullable: true, comment: 'ตัวเลือกเพศ ชาย/หญิง (ชาย : 1, หญิง : 2)' }) defendantSexId: number;
    @Column({ name: 'DEFENDANT_TEL', nullable: true, comment: 'เบอร์ติดต่อ' }) defendantTel: string;

    toResponseObject() {
        const { defendantId, complainantId, createdBy, createdDate, updatedBy, updatedDate, removedBy, removedDate, orderNo, defendantAge, defendantBirthdate, defendantEmail, defendantLastname, defendantLitTypeId, defendantName, defendantNameTitle, defendantNationalId, defendantNationalIdCard, defendantOccupationId, defendantOrderNo, defendantPersonalTypeId, defendantRaceId, defendantSexId, defendantTel } = this;
        const responseObject = { defendantId, complainantId, createdBy, createdDate, updatedBy, updatedDate, removedBy, removedDate, orderNo, defendantAge, defendantBirthdate, defendantEmail, defendantLastname, defendantLitTypeId, defendantName, defendantNameTitle, defendantNationalId, defendantNationalIdCard, defendantOccupationId, defendantOrderNo, defendantPersonalTypeId, defendantRaceId, defendantSexId, defendantTel };
        return responseObject;
    }
}