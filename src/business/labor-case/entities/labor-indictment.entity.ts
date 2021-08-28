import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'PC_LABOR_INDICTMENT' })
export class OraclePcLaborIndictments {
    @PrimaryGeneratedColumn({ name: 'INDICTMENT_ID', comment: 'รหัสข้อมูลคำฟ้องตามแบบ (รง.1) (AUTO INCREMENT)' }) indictmentId: number;
    @Column({ name: 'COURT_ID', nullable: true, comment: 'รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT' }) courtId: number;
    @Column({ name: 'CASE_ID', nullable: true, comment: 'รหัสคดี เชื่อมโยงตาราง PC_CASE' }) caseId: number;
    @Column({ name: 'CREATED_BY', nullable: false, comment: 'รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE' }) createdBy: number;
    @Column({ name: 'CREATED_DATE', nullable: false, comment: 'วันเวลาที่สร้างข้อมูล' }) createdDate: Date;
    @Column({ name: 'UPDATED_BY', nullable: true, comment: 'รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE' }) updatedBy: number;
    @Column({ name: 'UPDATED_DATE', nullable: true, comment: 'วันเวลาที่แก้ไขข้อมูลล่าสุด' }) updatedDate: Date;
    @Column({ name: 'REMOVED_BY', nullable: false, comment: 'รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE' }) removedBy: number;
    @Column({ name: 'REMOVED_DATE', nullable: true, comment: 'วันเวลาที่ลบข้อมูล' }) removedDate: Date;
    @Column({ name: 'ORDER_NO', nullable: true, comment: 'ลำดับของข้อมูล' }) orderNo: number;
    @Column({ name: 'ANNUAL_HOLIDAY_AMOUNT', nullable: true, comment: 'ค่าจ้างสำหรับวันหยุดพักผ่อนประจำปีจำนวนกี่บาท' }) annualHolidayAmount: number;
    @Column({ name: 'APPOINTMENT_CONSIDER_DATE', nullable: true, comment: 'วันที่นัดพิจารณาและสืบพยานโจทก์' }) appointmentConsiderDate: Date;
    @Column({ name: 'APPOINTMENT_CONSIDER_TIME', nullable: true, comment: 'เวลานัดพิจารณาและสืบพยานโจทก์' }) appointmentConsiderTime: string;
    @Column({ name: 'COMPENSATE_AMOUNT', nullable: true, comment: 'ค่าชดเชยจำนวนกี่บาท' }) compensateAmount: number;
    @Column({ name: 'COMPENSATION_AMOUNT', nullable: true, comment: 'เงินทดแทนจำนวนกี่บาท' }) compensationAmount: number;
    @Column({ name: 'COMPENSATION_LAW', nullable: true, comment: 'ตัวเลือกกฎหมายว่าด้วยเงินทดแทน' }) compensationLaw: number;
    @Column({ name: 'COURT_ORDER_DETAIL', nullable: true, comment: 'รายละเอียดคำสั่งศาล' }) courtOrderDetail: string;
    @Column({ name: 'DEFENDANT_PAID', nullable: true, comment: 'ตัวลือกให้จำเลยใช้ค่าเสียหายที่ได้กระทำละเมิดต่อโจทก์' }) defendantPaid: number;
    @Column({ name: 'DEFENDANT_PAID_AMOUNT', nullable: true, comment: 'จำนวนเงินให้จำเลยใช้ค่าเสียหายที่ได้กระทำละเมิดต่อโจทก์เป็นเงินกี่บาท' }) defendantPaidAmount: number;
    @Column({ name: 'DEFENDANT_PAID_DETAIL', nullable: true, comment: 'ทดสอบรายละเอียดให้เพิกถอนคำวินิจฉัยของจำเลย' }) defendantPaidDetail: string;
    @Column({ name: 'ENTERPRISE_LABOR_RELATIONS_LAW', nullable: true, comment: 'ตัวเลือกฎหมายว่าด้วยแรงงานรัฐวิสาหกิจสัมพันธ์' }) enterpriseLaborRelationsLaw: number;
    @Column({ name: 'FOLLOW_AGREEMENT', nullable: true, comment: 'ตัวเลือกให้จำเลยปฏิบัติตามสัญญาจ้างแรงงานหรือข้อบังคับเกี่ยวกับการทำงาน' }) followAgreement: number;
    @Column({ name: 'FOLLOW_AGREEMENT_DETAIL', nullable: true, comment: 'รายละเอียดให้จำเลยปฏิบัติตามสัญญาจ้างแรงงานหรือข้อบังคับเกี่ยวกับการทำงาน' }) followAgreementDetail: string;
    @Column({ name: 'FOLLOW_COMPENSATION', nullable: true, comment: 'ตัวเลือกให้จำเลยปฏิบัติตามกฎหมายว่าด้วยเงินทดแทน' }) followCompensation: number;
    @Column({ name: 'FOLLOW_COMPENSATION_DETAIL', nullable: true, comment: 'รายละเอียดให้จำเลยปฏิบัติตามกฎหมายว่าด้วยเงินทดแทน' }) followCompensationDetail: string;
    @Column({ name: 'FOLLOW_HOME_WORKER_PROTECTION', nullable: true, comment: 'ตัวเลือกให้จำเลยปฏิบัติตามกฎหมายว่าด้วยการคุ้มครองผู้รับงานไปทำที่บ้าน' }) followHomeWorkerProtection: number;
    @Column({ name: 'FOLLOW_HOME_WORKER_PROTECTION_DETAIL', nullable: true, comment: 'รายละเอียดให้จำเลยปฏิบัติตามกฎหมายว่าด้วยการคุ้มครองผู้รับงานไปทำที่บ้าน' }) followHomeWorkerProtectionDetail: string;
    @Column({ name: 'FOLLOW_LABOR_LAW', nullable: true, comment: 'ตัวเลือกให้จำเลยปฏิบัติตามกฎหมายคุ้มครองแรงงาน' }) followLaborLaw: number;
    @Column({ name: 'FOLLOW_LABOR_LAW_DETAIL', nullable: true, comment: 'รายละเอียดให้จำเลยปฏิบัติตามกฎหมายคุ้มครองแรงงาน' }) followLaborLawDetail: string;
    @Column({ name: 'FOLLOW_OTHER_LAW', nullable: true, comment: 'ตัวเลือกให้จำเลยปฏิบัติตามกฎหมายแรงงานในกรณีอื่น' }) followOtherLaw: number;
    @Column({ name: 'FOLLOW_OTHER_LAW_DETAIL', nullable: true, comment: 'รายละเอียดให้จำเลยปฏิบัติตามกฎหมายแรงงานในกรณีอื่น' }) followOtherLawDetail: string;
    @Column({ name: 'FOLLOW_RECRUITMENT_AND_JOB_PROTECTION', nullable: true, comment: 'ตัวเลือกให้จำเลยปฏิบัติตามกฎหมายว่าด้วยการจัดหางานและคุ้มครองคนหางาน' }) followRecruitmentAndJobProtection: number;
    @Column({ name: 'FOLLOW_RECRUITMENT_AND_JOB_PROTECTION_DETAIL', nullable: true, comment: 'รายละเอียดให้จำเลยปฏิบัติตามกฎหมายว่าด้วยการจัดหางานและคุ้มครองคนหางาน' }) followRecruitmentAndJobProtectionDetail: string;
    @Column({ name: 'FOLLOW_RELATIONSHIP_LAW', nullable: true, comment: 'ตัวเลือกให้จำเลยปฏิบัติตามกฎหมายว่าด้วยแรงงานสัมพันธ์' }) followRelationshipLaw: number;
    @Column({ name: 'FOLLOW_RELATIONSHIP_LAW_DETAIL', nullable: true, comment: 'รายละเอียดให้จำเลยปฏิบัติตามกฎหมายว่าด้วยแรงงานสัมพันธ์' }) followRelationshipLawDetail: string;
    @Column({ name: 'FOLLOW_SSO_LAW', nullable: true, comment: 'ตัวเลือกให้จำเลยปฏิบัติตามกฎหมายประกันสังคม' }) followSsoLaw: number;
    @Column({ name: 'FOLLOW_SSO_LAW_DETAIL', nullable: true, comment: 'รายละเอียดให้จำเลยปฏิบัติตามกฎหมายประกันสังคม' }) followSsoLawDetail: string;
    @Column({ name: 'HOLIDAY_OT_AMOUNT', nullable: true, comment: 'ค่าล่วงเวลาในวันหยุดจำนวนกี่บาท' }) holidayOtAmount: number;
    @Column({ name: 'HOLIDAY_WORK_AMOUNT', nullable: true, comment: 'ค่าทำงานในวันหยุดจำนวนกี่บาท' }) holidayWorkAmount: number;
    @Column({ name: 'HOME_WORKER_PROTECTION_LAW', nullable: true, comment: 'ตัวเลือกฎหมายว่าด้วยการคุ้มครองผู้รับงานไปทำที่บ้าน' }) homeWorkerProtectionLaw: number;
    @Column({ name: 'INDICTMENT_CODE_NO', nullable: false, comment: 'เลขที่คำฟ้อง' }) indictmentCodeNo: number;
    @Column({ name: 'INDICTMENT_CODE_YEAR', nullable: false, comment: 'ปีที่ออกเลขคำฟ้อง' }) indictmentCodeYear: string;
    @Column({ name: 'JUDGE_ID', nullable: true, comment: 'รหัสผู้พิพากษา เชื่อมโยง PC_LOOKUP_JUDGE' }) judgeId: number;
    @Column({ name: 'LABOR_PROTECTION_LAW', nullable: true, comment: 'ตัวเลือกกฎหมายว่าด้วยการคุ้มครองแรงงาน' }) laborProtectionLaw: number;
    @Column({ name: 'LABOR_RELATIONSHIP_LAW', nullable: true, comment: 'ตัวเลือกกฎหมายว่าด้วยแรงงานสัมพันธ์' }) laborRelationshipLaw: number;
    @Column({ name: 'OT_AMOUNT', nullable: true, comment: 'ค่าล่วงเวลาจำนวนกี่บาท' }) otAmount: number;
    @Column({ name: 'OTHER_LAW', nullable: true, comment: 'ตัวเลือกกฎหมายอื่น ๆ' }) otherLaw: number;
    @Column({ name: 'OTHER_LAW_DETAIL', nullable: true, comment: 'รายละเอียดตัวเลือกกฎหมายอื่น ๆ' }) otherLawDetail: string;
    @Column({ name: 'RECRUITMENT_AND_JOB_PROTECTION_LAW', nullable: true, comment: 'ตัวเลือกฎหมายว่าด้วยการจัดหางานและคุ้มครองคนหางาน' }) recruitmentAndJobProtectionLaw: number;
    @Column({ name: 'REMARK', nullable: true, comment: 'หมายเหตุ' }) remark: string;
    @Column({ name: 'REVOKE_DEFENDANT_CONSIDER', nullable: true, comment: 'ตัวเลือกให้เพิกถอนคำวินิจฉัยของจำเลย' }) revokeDefendantConsider: number;
    @Column({ name: 'REVOKE_DEFENDANT_CONSIDER_DETAIL', nullable: true, comment: 'รายละเอียดให้จำเลยใช้ค่าเสียหายที่ได้กระทำละเมิดต่อโจทก์' }) revokeDefendantConsiderDetail: string;
    @Column({ name: 'SSO_LAW', nullable: true, comment: 'ตัวเลือกกฎหมายว่าด้วยการประกันสังคม' }) ssoLaw: number;
    @Column({ name: 'VIOLATE_DETAIL', nullable: true, comment: 'รายละเอียดกล่าวคือ' }) violateDetail: string;
    @Column({ name: 'WAGE_AMOUNT', nullable: true, comment: 'ค่าจ้างจำนวนกี่บาท' }) wageAmount: number;
    @Column({ name: 'WORK_AGREEMENT', nullable: true, comment: 'ตัวเลือกข้อตกลงเกี่ยวกับสภาพการจ้าง' }) workAgreement: number;
    @Column({ name: 'WORK_CONTRACT', nullable: true, comment: 'ตัวเลือกสัญญาจ้างแรงงาน' }) workContract: number;

    toResponseObject() {
        const { indictmentId, courtId, caseId, createdBy, createdDate, updatedBy, updatedDate, removedBy, removedDate, orderNo, annualHolidayAmount, appointmentConsiderDate, appointmentConsiderTime, compensateAmount, compensationAmount, compensationLaw, courtOrderDetail, defendantPaid, defendantPaidAmount, defendantPaidDetail, enterpriseLaborRelationsLaw, followAgreement, followAgreementDetail, followCompensation, followCompensationDetail, followHomeWorkerProtection, followHomeWorkerProtectionDetail, followLaborLaw, followLaborLawDetail, followOtherLaw, followOtherLawDetail, followRecruitmentAndJobProtection, followRecruitmentAndJobProtectionDetail, followRelationshipLaw, followRelationshipLawDetail, followSsoLaw, followSsoLawDetail, holidayOtAmount, holidayWorkAmount, homeWorkerProtectionLaw, indictmentCodeNo, indictmentCodeYear, judgeId, laborProtectionLaw, laborRelationshipLaw, otAmount, otherLaw, otherLawDetail, recruitmentAndJobProtectionLaw, remark, revokeDefendantConsider, revokeDefendantConsiderDetail, ssoLaw, violateDetail, wageAmount, workAgreement, workContract } = this;
        const responseObject = { indictmentId, courtId, caseId, createdBy, createdDate, updatedBy, updatedDate, removedBy, removedDate, orderNo, annualHolidayAmount, appointmentConsiderDate, appointmentConsiderTime, compensateAmount, compensationAmount, compensationLaw, courtOrderDetail, defendantPaid, defendantPaidAmount, defendantPaidDetail, enterpriseLaborRelationsLaw, followAgreement, followAgreementDetail, followCompensation, followCompensationDetail, followHomeWorkerProtection, followHomeWorkerProtectionDetail, followLaborLaw, followLaborLawDetail, followOtherLaw, followOtherLawDetail, followRecruitmentAndJobProtection, followRecruitmentAndJobProtectionDetail, followRelationshipLaw, followRelationshipLawDetail, followSsoLaw, followSsoLawDetail, holidayOtAmount, holidayWorkAmount, homeWorkerProtectionLaw, indictmentCodeNo, indictmentCodeYear, judgeId, laborProtectionLaw, laborRelationshipLaw, otAmount, otherLaw, otherLawDetail, recruitmentAndJobProtectionLaw, remark, revokeDefendantConsider, revokeDefendantConsiderDetail, ssoLaw, violateDetail, wageAmount, workAgreement, workContract };
        return responseObject;
    }
}