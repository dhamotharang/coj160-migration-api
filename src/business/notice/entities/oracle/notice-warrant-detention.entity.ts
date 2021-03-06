import { HttpException, HttpStatus } from "@nestjs/common";
import { HelperService } from "src/shared/helpers/helper.service";
import { BeforeInsert, Column, Entity, getManager, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_NOTICE_WARRANT_DETENTION" })
export class OracleNoticeWarrantDetentions extends HelperService {
  constructor() {
    super();
  }
  @PrimaryGeneratedColumn({ name: "WARRANT_DETENTION_ID", comment: "รหัสข้อมูลรายละเอียดเบิกตัวผู้ต้องขัง(AUTO INCREMENT)" }) warrantDetentionId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "LITIGANT_ID", nullable: true, comment: "รหัสคู่ความ เชื่อมโยง PC_CASE_LIT" }) litigantId: number;
  @Column({ name: "LITIGANT_NAME", nullable: true, comment: "ชื่อคู่ความ" }) litigantName: string;
  @Column({ name: "NOTICE_GUARANTEE", nullable: true, comment: "ขัง/ ประกัน" }) noticeGuarantee: string;
  @Column({ name: "NOTICE_GUARANTEE_STATUS", nullable: true, comment: "สถานะขัง / ประกัน" }) noticeGuaranteeStatus: string;
  @Column({ name: "NOTICE_ID", comment: "รหัสบันทึกหมาย เชื่อมโยง PC_NOTICE" }) noticeId: number;
  @Column({ name: "PRISON_ID", nullable: true, comment: "รหัสเรือนจำ เชื่อมโยง PC_LOOKUP_PRISON" }) prisonId: number;
  @Column({ name: "PRISON_NAME", nullable: true, comment: "ชื่อเรือนจำ" }) prisonName: string;
  @Column({ name: "WARRANT_ALLE_DESC", nullable: true, comment: "ฐานความผิดขึ้นปก" }) warrantAlleDesc: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูล เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @Column({ name: "CREATED_DATE", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูล" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, comment: "วันเวลาที่ลบข้อมูลล่าสุด" }) removedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_NOTICE_WARRANT_DETENTION_SEQ".nextval ID FROM DUAL`);
      this.warrantDetentionId = res[0].ID;
      this.orderNo = res[0].ID;
    } catch (error) {
      throw new HttpException(`[oracle: notice warrant detention before insert failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  toResponseObject() {
    const { warrantDetentionId, orderNo, litigantId, litigantName, noticeGuarantee, noticeGuaranteeStatus, noticeId, prisonId, prisonName, warrantAlleDesc, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = {
      warrantDetentionId, orderNo, litigantId, litigantName, noticeGuarantee, noticeGuaranteeStatus, noticeId, prisonId,
      prisonName, warrantAlleDesc, createdBy, updatedBy, removedBy,
      createdDate: createdDate ? this.dateFormat("YYYY-MM-DD H:i:s", createdDate) : null,
      removedDate: removedDate ? this.dateFormat("YYYY-MM-DD H:i:s", removedDate) : null,
      updatedDate: updatedDate ? this.dateFormat("YYYY-MM-DD H:i:s", updatedDate) : null,
    };
    return responseObject;
  }
}