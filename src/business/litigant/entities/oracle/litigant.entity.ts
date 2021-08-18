import { Logger, HttpException, HttpStatus } from "@nestjs/common";
import { OracleCases } from "src/business/case/entities/oracle/case.entity";
import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, getManager, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "PC_LITIGANT" })
export class OracleLitigants {
  @PrimaryGeneratedColumn({ name: "LITIGANT_ID", comment: "รหัสข้อมูลคำคู่ความ (AUTO INCREMENT)" }) litigantId: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "CASE_ID", comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "ORDER_NO", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "REQ_NO", comment: "เลขที่คำร้อง" }) reqNo: number;
  @Column({ name: "REQ_NO_YEAR", comment: "ปีของเลขที่คำร้อง" }) reqNoYear: string;
  @Column({ name: "REF_NO", comment: "เลขที่่อ้างอิง" }) refNo: number;
  @Column({ name: "REF_NO_YEAR", comment: "ปีของเลขที่อ้างอิง" }) refNoYear: string;
  @Column({ name: "LITIGANT_TYPE_ID", comment: "รหัสประเภทคำคู่ความ เชื่อมโยง PC_LOOKUP_REQUEST_TYPE" }) litigantTypeId: number;
  @Column({ name: "LITIGANT_SUB_TYPE_CODE", comment: "รหัสเรื่องในคำคู่ความ เชื่อมโยง PC_LOOKUP_REQUEST_SUBJECT" }) litigantSubTypeCode: string;
  @Column({ name: "REQ_DESCRIPTION", comment: "ประเภทคำร้อง" }) reqDescription: string;
  @Column({ name: "REQ_DATE", comment: "วันที่รับคำร้อง 1" }) reqDate: Date;
  @Column({ name: "REQ_RECEIVED_BY", comment: "รหัสผู้รับคำร้อง เชื่อมโยง PC_USER_PROFILE" }) reqReceivedBy: number;
  @Column({ name: "REQ_NAME", comment: "ชื่อผู้ยื่นคำร้อง" }) reqName: string;
  @Column({ name: "SUBMIT_REQ_BY", comment: "รหัสผู้เสนอคำร้อง เชื่อมโยง PC_USER_PROFILE" }) submitReqBy: number;
  @Column({ name: "SUBMIT_DATE", comment: "วันที่เสนอคำร้อง (วันที่ยื่นในหน้าบริการข้อมูลคดี)" }) submitDate: Date;
  @Column({ name: "COURT_ORDER_DETAIL", comment: "คำสั่งศาล", type: "clob" }) courtOrderDetail: string;
  @Column({ name: "COURT_ORDER_DATE", comment: "วันที่ออกคำสั่ง 4" }) courtOrderDate: Date;
  @Column({ name: "JUDGE_ID", comment: "รหัสผู้พิพากษา เชื่อมโยง PC_LOOKUP_JUDGE" }) judgeId: number;
  @Column({ name: "SEND_ORDER_DATE", comment: "วันที่เสนอคำร้อง 2" }) sendOrderDate: Date;
  @Column({ name: "SEND_ORDER_DEPT", comment: "ส่งคำสั่งไปที่ส่วนงาน เชื่อมโยง PC_LOOKUP_DEPARTMENT" }) sendOrderDept: number;
  @Column({ name: "SEND_ORDER_DESCRIPTION", comment: "รายละเอียดการส่งคำสั่ง" }) sendOrderDescription: string;
  @Column({ name: "NOTES", comment: "หมายเหตุ", type: "clob" }) notes: string;
  @Column({ name: "PROPOSE", comment: "เสนอคำร้อง True/False" }) propose: number;
  @Column({ name: "PROPOSE_DATE", comment: "วันที่เสนอคำร้อง Not Used" }) proposeDate: Date;
  @Column({ name: "PROPOSE_NAME", comment: "ผู้เสนอคำร้อง" }) proposeName: string;
  @Column({ name: "PROPOSE_DEPARTMENT", comment: "รหัสหน่วยงาน(เสนอคำร้อง) เชื่อมโยง PC_LOOKUP_DEPARTMENT" }) proposeDepartment: number;
  @Column({ name: "ACCEPT_REQUEST", comment: "รับคำร้องคืน True/False" }) acceptRequest: number;
  @Column({ name: "ACCEPT_REQUEST_DATE", comment: "วันที่รับคำร้องคืน 2" }) acceptRequestDate: Date;
  @Column({ name: "ACCEPT_REQUEST_NAME", comment: "ผู้เสนอคำร้อง" }) acceptRequestName: string;
  @Column({ name: "ACCEPT_REQUEST_DEPARTMENT", comment: "รหัสหน่วยงาน(เสนอคำร้อง) เชื่อมโยง PC_LOOKUP_DEPARTMENT" }) acceptRequestDepartment: number;
  @Column({ name: "COURT_ORDER_RECORD_DATE", comment: "วันที่บันทึกคำสั่งศาล 3" }) courtOrderRecordDate: Date;
  @Column({ name: "COURT_ORDER_RECORD_NAME", comment: "ผู้ที่บันทึกคำสั่งศาล" }) courtOrderRecordName: string;
  @Column({ name: "COURT_ORDER_RECORD_DEPARTMENT", comment: "รหัสหน่วยงาน(เสนอคำร้อง) เชื่อมโยง PC_LOOKUP_DEPARTMENT" }) courtOrderRecordDepartment: number;
  @Column({ name: "PRINT_BY_ID", comment: "รหัสผู้ออกเอกสาร เชื่อมโยง PC_USER_PROFILE" }) printById: number;
  @Column({ name: "REQ_ORDER_ID", comment: "รหัสคำสั่งศาล เชื่อมโยง PC_LOOKUP_REQ_ORDERS" }) reqOrderId: number;
  @Column({ name: "LITIGANT_SUB_TYPE_NAME", comment: "ชื่อเรื่องในคำคู่ความ เชื่อมโยง PC_LOOKUP_REQUEST_SUBJECT " }) litigantSubTypeName: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @CreateDateColumn({ name: "CREATED_DATE", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_BY", comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @UpdateDateColumn({ name: "UPDATED_DATE", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @Column({ name: "REMOVED_BY", default: 0, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @DeleteDateColumn({ name: "REMOVED_DATE", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_LITIGANT_SEQ".nextval nextID FROM DUAL`);
      this.litigantId = res[0].nextID;
      this.orderNo = res[0].nextID;
    } catch (error) {
      throw new HttpException(`[generate code failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  @ManyToOne(type => OracleCases, cases => cases.caseId)
  @JoinColumn({ name: "CASE_ID" }) cases: OracleCases;

  toResponseObject() {
    const { litigantId, courtId, caseId, orderNo, reqNo, reqNoYear, refNo, refNoYear, litigantTypeId, litigantSubTypeCode, reqDescription, reqDate, reqReceivedBy, reqName, submitReqBy, submitDate, courtOrderDetail, courtOrderDate, judgeId, sendOrderDate, sendOrderDept, sendOrderDescription, notes, propose, proposeDate, proposeName, proposeDepartment, acceptRequest, acceptRequestDate, acceptRequestName, acceptRequestDepartment, courtOrderRecordDate, courtOrderRecordName, courtOrderRecordDepartment, printById, reqOrderId, litigantSubTypeName, createdBy, createdDate, updatedBy, updatedDate, removedBy, removedDate, cases } = this;
    const responseObject = { litigantId, courtId, caseId, orderNo, reqNo, reqNoYear, refNo, refNoYear, litigantTypeId, litigantSubTypeCode, reqDescription, reqDate, reqReceivedBy, reqName, submitReqBy, submitDate, courtOrderDetail, courtOrderDate, judgeId, sendOrderDate, sendOrderDept, sendOrderDescription, notes, propose, proposeDate, proposeName, proposeDepartment, acceptRequest, acceptRequestDate, acceptRequestName, acceptRequestDepartment, courtOrderRecordDate, courtOrderRecordName, courtOrderRecordDepartment, printById, reqOrderId, litigantSubTypeName, createdBy, createdDate, updatedBy, updatedDate, removedBy, removedDate };

    Object.assign(responseObject, {
      cases: cases.toResponseObject()
    });

    return responseObject;
  }
}