import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'PC_LABOR_COMPLAINANT' })
export class OraclePcLaborComplainants {
    @PrimaryGeneratedColumn({ name: 'COMPLAINANT_ID', comment: 'รหัสข้อมูลคำร้องตามแบบ รง.2 (AUTO INCREMENT)' }) complainantId: number;
    @Column({ name: 'COURT_ID', nullable: true, comment: 'รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT' }) courtId: number;
    @Column({ name: 'CREATED_BY', nullable: false, comment: 'รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE' }) createdBy: number;
    @Column({ name: 'CREATED_DATE', nullable: false, comment: 'วันเวลาที่สร้างข้อมูล' }) createdDate: Date;
    @Column({ name: 'UPDATED_BY', nullable: true, comment: 'รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE' }) updatedBy: number;
    @Column({ name: 'UPDATED_DATE', nullable: true, comment: 'วันเวลาที่แก้ไขข้อมูลล่าสุด' }) updatedDate: Date;
    @Column({ name: 'REMOVED_BY', nullable: false, comment: 'รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE' }) removedBy: number;
    @Column({ name: 'REMOVED_DATE', nullable: true, comment: 'วันเวลาที่ลบข้อมูล' }) removedDate: Date;
    @Column({ name: 'ORDER_NO', nullable: true, comment: 'ลำดับของข้อมูล' }) orderNo: number;
    @Column({ name: 'CASE_ID', nullable: true, comment: 'รหัสคดี เชื่อมโยงตาราง PC_CASE' }) caseId: number;
    @Column({ name: 'COMPLAINANT_DETAIL', nullable: true, comment: 'ข้อมูลรายละเอียดของคำร้อง' }) complainantDetail: string;
    @Column({ name: 'ACCEPT_COMPLAINANT', nullable: true, comment: 'ตัวเลือกขอให้ศาลอนุญาตให้ผู้ร้อง' }) acceptComplainant: number;
    @Column({ name: 'APPOINTMENT_CONSIDER_DATE', nullable: true, comment: 'วันที่นัดพิจารณาและสืบพยานโจทก์' }) appointmentConsiderDate: Date;
    @Column({ name: 'APPOINTMENT_CONSIDER_TIME', nullable: true, comment: 'เวลานัดพิจารณาและสืบพยานโจทก์' }) appointmentConsiderTime: string;
    @Column({ name: 'COMPLAINANT_CODE_NO', nullable: false, comment: 'เลขที่คำร้อง (ไม่จำเป็นต้องส่งค่าใด ๆ มา)' }) complainantCodeNo: number;
    @Column({ name: 'COMPLAINANT_CODE_YEAR', nullable: false, comment: 'ปีที่ออกเลขคำร้อง' }) complainantCodeYear: string;
    @Column({ name: 'COURT_ORDER_DETAIL', nullable: true, comment: 'รายละเอียดคำสั่งศาล' }) courtOrderDetail: string;
    @Column({ name: 'JUDGE_ID', nullable: true, comment: 'รหัสผู้พิพากษา เชื่อมโยง PC_LOOKUP_JUDGE' }) judgeId: number;
    @Column({ name: 'REQUEST_COURT_ACTION_EMPLOYER', nullable: true, comment: 'ตัวเลือกขอให้ศาลพิจารณาวินิจฉัยการกระทำของนายจ้าง' }) requestCourtActionEmployer: number;
    @Column({ name: 'REQUEST_COURT_ACTION_EMPLOYER_DETAIL', nullable: true, comment: 'รายละเอียดขอให้ศาลพิจารณาวินิจฉัยการกระทำของนายจ้าง' }) requestCourtActionEmployerDetail: string;
    @Column({ name: 'REQUEST_COURT_ORDER', nullable: true, comment: 'ตัวเลือกขอให้ศาลมีคำสั่งให้' }) requestCourtOrder: number;
    @Column({ name: 'REQUEST_COURT_ORDER_DETAIL', nullable: true, comment: 'รายละเอียดขอให้ศาลมีคำสั่งให้' }) requestCourtOrderDetail: string;
    @Column({ name: 'REQUEST_COURT_RIGHT_OTHER', nullable: true, comment: 'ตัวเลือกขอใช้สิทธิ์ทางศาลในกรณีอื่น' }) requestCourtRightOther: number;
    @Column({ name: 'REQUEST_COURT_RIGHT_OTHER_DETAIL', nullable: true, comment: 'รายละเอียดขอใช้สิทธิ์ทางศาลในกรณีอื่น' }) requestCourtRightOtherDetail: string;
    @Column({ name: 'TO_PUNISH', nullable: true, comment: 'ตัวเลือกลงโทษโดย' }) toPunish: number;
    @Column({ name: 'TO_PUNISH_DETAIL', nullable: true, comment: 'รายละเอียดลงโทษโดย' }) toPunishDetail: string;
    @Column({ name: 'TO_REDUCE_WAGE', nullable: true, comment: 'ตัวเลือกลดค่าจ้าง' }) toReduceWage: number;
    @Column({ name: 'TO_REDUCE_WAGE_DETAIL', nullable: true, comment: 'รายละเอียดลดค่าจ้าง' }) toReduceWageDetail: string;
    @Column({ name: 'TO_TERMINATED', nullable: true, comment: 'ตัวเลือกเลิกจ้าง' }) toTerminated: number;
    @Column({ name: 'TO_TERMINATED_DETAIL', nullable: true, comment: 'รายละเอียดเลิกจ้าง' }) toTerminatedDetail: string;

    toResponseObject() {
        const { complainantId, courtId, createdBy, createdDate, updatedBy, updatedDate, removedBy, removedDate, orderNo, caseId, complainantDetail, acceptComplainant, appointmentConsiderDate, appointmentConsiderTime, complainantCodeNo, complainantCodeYear, courtOrderDetail, judgeId, requestCourtActionEmployer, requestCourtActionEmployerDetail, requestCourtOrder, requestCourtOrderDetail, requestCourtRightOther, requestCourtRightOtherDetail, toPunish, toPunishDetail, toReduceWage, toReduceWageDetail, toTerminated, toTerminatedDetail } = this;
        const responseObject = { complainantId, courtId, createdBy, createdDate, updatedBy, updatedDate, removedBy, removedDate, orderNo, caseId, complainantDetail, acceptComplainant, appointmentConsiderDate, appointmentConsiderTime, complainantCodeNo, complainantCodeYear, courtOrderDetail, judgeId, requestCourtActionEmployer, requestCourtActionEmployerDetail, requestCourtOrder, requestCourtOrderDetail, requestCourtRightOther, requestCourtRightOtherDetail, toPunish, toPunishDetail, toReduceWage, toReduceWageDetail, toTerminated, toTerminatedDetail };
        return responseObject;
    }
}