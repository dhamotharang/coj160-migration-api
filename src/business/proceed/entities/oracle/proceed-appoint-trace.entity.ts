import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_APPOINT_TRACE" })
export class OracleProceedAppointTraces {
  @PrimaryGeneratedColumn({ name: "APPOINT_TRACE_ID", comment: "รหัสข้อมูลคำสั่งสืบเสาะ(AUTO INCREMENT)" }) appointTraceId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "ACCU_ID", comment: "รหัสจำเลย" }) accuId: number;
  @Column({ name: "ADDRESS_DISTRICT", comment: "รหัสอำเภอ เชื่อมโยง PC_LOOKUP_DISTRICT" }) addressDistrict: number;
  @Column({ name: "ADDRESS_MOO", nullable: true, comment: "หมู่ที่" }) addressMoo: string;
  @Column({ name: "ADDRESS_NO", comment: "ที่อยู่เลขที่" }) addressNo: string;
  @Column({ name: "ADDRESS_POST_CODE", nullable: true, comment: "รหัสไปรษณีย์(maxlength = 5)" }) addressPostCode: string;
  @Column({ name: "ADDRESS_PROVINCE", comment: "รหัสจังหวัด เชื่อมโยง PC_LOOKUP_PROVINCE" }) addressProvince: number;
  @Column({ name: "ADDRESS_ROAD", nullable: true, comment: "ถนน" }) addressRoad: string;
  @Column({ name: "ADDRESS_SOI", nullable: true, comment: "ซอย" }) addressSoi: string;
  @Column({ name: "ADDRESS_SUB_DISTRICT", comment: "รหัสตำบล เชื่อมโยง PC_LOOKUP_SUBDISTRICT" }) addressSubDistrict: number;
  @Column({ name: "CASE_ID", comment: "รหัสคดี เชื่อมโยงตาราง PC_CASE" }) caseId: number;
  @Column({ name: "CHECK_BOX_01", nullable: true, comment: "ตัวเลือกได้รับการปล่อยตัวชั่วคราว" }) checkBox01: number;
  @Column({ name: "CHECK_BOX_02", nullable: true, comment: "ตัวเลือกต้องขังในระหว่างการพิจารณาคดี" }) checkBox02: number;
  @Column({ name: "FIND_USER_PROFILE_ID", comment: "รหัสประวัติผู้ใช้งานระบบ เชื่อมโยง PC_USER_PROFILE" }) findUserProfileId: number;
  @Column({ name: "JUDGE_ID", nullable: true, type: "timestamp", comment: "รหัสผู้พิพากษา เชื่อมโยง PC_LOOKUP_JUDGE" }) judgeId: number;
  @Column({ name: "JUDGEMENT_DATE", nullable: true, comment: "วันที่นัดคำพิพากษา" }) judgementDate: Date;
  @Column({ name: "JUDGEMENT_TIME", comment: "เวลา" }) judgementTime: number;
  @Column({ name: "MEETING_DATE", nullable: true, type: "timestamp", comment: "วันที่ให้จำเลยไปพบ" }) meetingDate: Date;
  @Column({ name: "PROS_ID", comment: "รหัสโจทก์" }) prosId: number;
  @Column({ name: "TEL_NUMBER", nullable: true, comment: "เบอร์โทรศัพท์(maxlength = 15)" }) telNumber: string;
  @Column({ name: "OFFENSE_DETAIL", nullable: true, comment: "ฐานความผิด" }) offenseDetail: string;
  @Column({ name: "TRACE_OBJECTIVE", nullable: true, comment: "ประเด็นที่สืบเสาะ" }) traceObjective: string;
  @Column({ name: "ADDITIONAL_DETAIL", nullable: true, comment: "เพิ่มเติม" }) additionalDetail: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;

  toResponseObject() {
    const { appointTraceId, orderNo, accuId, addressDistrict, addressMoo, addressNo, addressPostCode, addressProvince, addressRoad, addressSoi, addressSubDistrict, caseId, checkBox01, checkBox02, findUserProfileId, judgeId, judgementDate, judgementTime, meetingDate, prosId, telNumber, offenseDetail, traceObjective, additionalDetail, createdBy, updatedBy, removedBy, createdDate, removedDate, updatedDate } = this;
    const responseObject = { appointTraceId, orderNo, accuId, addressDistrict, addressMoo, addressNo, addressPostCode, addressProvince, addressRoad, addressSoi, addressSubDistrict, caseId, checkBox01, checkBox02, findUserProfileId, judgeId, judgementDate, judgementTime, meetingDate, prosId, telNumber, offenseDetail, traceObjective, additionalDetail, createdBy, updatedBy, removedBy, createdDate, removedDate, updatedDate };
    return responseObject;
  }
}