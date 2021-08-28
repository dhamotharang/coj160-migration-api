import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: 'PC_LABOR_CASE' })
export class OraclePcLaborCases {
    @PrimaryGeneratedColumn({ name: 'LABOR_CASE_ID', comment: 'รหัสข้อมูลระบบบันทึกคดีแรงงาน รง.4 (AUTO INCREMENT)' }) laborCaseId: number;
    @Column({ name: 'COURT_ID', nullable: false, comment: 'รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT' }) courtId: number;
    @Column({ name: 'CASE_ID', nullable: false, comment: 'รหัสคดี เชื่อมโยงตาราง PC_CASE' }) caseId: number;
    @Column({ name: 'CREATED_BY', nullable: false, comment: 'รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE' }) createdBy: number;
    @Column({ name: 'CREATED_DATE', nullable: false, comment: 'วันเวลาที่สร้างข้อมูล' }) createdDate: Date;
    @Column({ name: 'UPDATED_BY', nullable: true, comment: 'รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE' }) updatedBy: number;
    @Column({ name: 'UPDATED_DATE', nullable: true, comment: 'วันเวลาที่แก้ไขข้อมูลล่าสุด' }) updatedDate: Date;
    @Column({ name: 'REMOVED_BY', nullable: false, comment: 'รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE' }) removedBy: number;
    @Column({ name: 'REMOVED_DATE', nullable: true, comment: 'วันเวลาที่ลบข้อมูล' }) removedDate: Date;
    @Column({ name: 'ORDER_NO', nullable: true, comment: 'ลำดับของข้อมูล' }) orderNo: number;
    @Column({ name: 'CHECK_SEND_STATUS', nullable: true, comment: 'ตรวจสอบสถานะการจ่ายหมาย' }) checkSendStatus: number;
    @Column({ name: 'IS_NOTICE_PROVINCIAL', nullable: false, comment: 'เป็นหมายต่างจังหวัดหรือไม่' }) isNoticeProvincial: number;
    @Column({ name: 'JUDGE_ID', nullable: false, comment: 'รหัสผู้พิพากษา เชื่อมโยง PC_LOOKUP_JUDGE' }) judgeId: number;
    @Column({ name: 'NOTICE_PROVINCIAL_ID', nullable: true, comment: 'รหัสหมายต่างจังหวัด PC_NOTICE_PROVINCIAL' }) noticeProvincialId: number;
    @Column({ name: 'NOTICE_SEND_STATUS', nullable: true, comment: 'สถานะการจ่ายหมาย' }) noticeSendStatus: number;
    @Column({ name: 'RELEASE_DATE', nullable: true, comment: 'วันที่ปลดหมาย' }) releaseDate: Date;
    @Column({ name: 'SEND_BY', nullable: true, comment: 'รหัสผู้เดินหมาย เชื่อมโยง PC_USER_PROFILE' }) sendBy: number;
    @Column({ name: 'SEND_DATE', nullable: true, comment: 'วันที่ส่งหมาย' }) sendDate: Date;
    @Column({ name: 'SEND_FEE', nullable: true, comment: 'ค่าส่งหมาย' }) sendFee: number;
    @Column({ name: 'SEND_METHOD', nullable: true, comment: 'วิธีการส่งหมาย 1 = ไปรษณีย์, 2 = เจ้าหน้าที่' }) sendMethod: number;

    toResponseObject() {
        const { laborCaseId, courtId, caseId, createdBy, createdDate, updatedBy, updatedDate, removedBy, removedDate, orderNo, checkSendStatus, isNoticeProvincial, judgeId, noticeProvincialId, noticeSendStatus, releaseDate, sendBy, sendDate, sendFee, sendMethod } = this;
        const responseObject = { laborCaseId, courtId, caseId, createdBy, createdDate, updatedBy, updatedDate, removedBy, removedDate, orderNo, checkSendStatus, isNoticeProvincial, judgeId, noticeProvincialId, noticeSendStatus, releaseDate, sendBy, sendDate, sendFee, sendMethod };
        return responseObject;
    }
}