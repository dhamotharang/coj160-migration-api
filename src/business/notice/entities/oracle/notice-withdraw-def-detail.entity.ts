import { HttpException, HttpStatus } from "@nestjs/common";
import { HelperService } from "src/shared/helpers/helper.service";
import { BeforeInsert, Column, CreateDateColumn, Entity, getManager, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "PC_NOTICE_WITHDRAW_DEF_DETAIL" })
export class OracleNoticeWithdrawDefDetails extends HelperService {
  constructor() {
    super();
  }
  @PrimaryGeneratedColumn({ name: "DETAIL_ID", comment: "รหัสข้อมูลรายละเอียดเบิกตัวผู้ต้องขัง(AUTO INCREMENT)" }) detailId: number;
  @Column({ name: "ORDER_NO", type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "DEFENDANT_ID", comment: "รหัสจำเลย เชื่อมโยง PC_CASE_LIT" }) defendantId: number;
  @Column({ name: "NOTES", nullable: true, type: "clob", comment: "หมายเหตุ" }) notes: string;
  @Column({ name: "PRISON_ID", comment: "รหัสเรือนจำ เชื่อมโยง PC_LOOKUP_PRISON" }) prisonId: number;
  @Column({ name: "WITHDRAW_ID", comment: "รหัสเบิกตัวผู้ต้องขัง เชื่อมโยงตาราง PC_NOTICE_WITHDRAW_DEF" }) witdrawId: number;
  @Column({ name: "WITHDRAW_TYPE", nullable: true, comment: "ประเภทการเบิกผู้ต้องขังโดย" }) withdrawType: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @CreateDateColumn({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @UpdateDateColumn({ name: "UPDATED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่ลบข้อมูล" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true, comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) removedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_NOTICE_WITHDRAW_DEF_DETAIL_SEQ".nextval ID FROM DUAL`);
      this.detailId = res[0].ID;
      this.orderNo = res[0].ID;
    } catch (error) {
      throw new HttpException(`[oracle: notice withdraw def detail before insert failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  toResponseObject() {
    const { detailId, orderNo, defendantId, notes, prisonId, witdrawId, withdrawType, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = {
      detailId, orderNo, defendantId, notes, prisonId, witdrawId, withdrawType, createdBy, updatedBy, removedBy,
      createdDate: createdDate ? this.dateFormat("YYYY-MM-DD H:i:s", createdDate) : null,
      removedDate: removedDate ? this.dateFormat("YYYY-MM-DD H:i:s", removedDate) : null,
      updatedDate: updatedDate ? this.dateFormat("YYYY-MM-DD H:i:s", updatedDate) : null,
    };
    return responseObject;
  }
}