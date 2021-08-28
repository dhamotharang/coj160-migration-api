import { HttpException, HttpStatus } from "@nestjs/common";
import { HelperService } from "src/shared/helpers/helper.service";
import { BeforeInsert, Column, CreateDateColumn, Entity, getManager, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "PC_LOOKUP_NOTICE_TYPE" })
export class OracleLookupNoticeTypes extends HelperService {
  constructor() {
    super();
  }
  @PrimaryGeneratedColumn({ name: "NOTICE_TYPE_ID" }) noticeTypeId: number;
  @Column({ name: "ORDER_NO", nullable: true, type: "float" }) orderNo: number;
  @Column({ name: "ACTIVE_FLAG", nullable: true }) activeFlag: number;
  @Column({ name: "COURT_ID", nullable: true }) courtId: number;
  @Column({ name: "NOTICE_NAME_SHORT", nullable: true }) noticeNameShort: string;
  @Column({ name: "NOTICE_PRINT", nullable: true }) noticePrint: string;
  @Column({ name: "NOTICE_TYPE_CODE", nullable: true }) noticeTypeCode: string;
  @Column({ name: "NOTICE_TYPE_NAME" }) noticeTypeName: string;
  @Column({ name: "SELECT_CODE", nullable: true }) selectCode: string;
  @Column({ name: "CREATED_BY" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true }) updatedBy: number;
  @Column({ name: "REMOVED_BY" }) removedBy: number;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp" }) removedDate: Date;
  @CreateDateColumn({ name: "CREATED_DATE", type: "timestamp" }) createdDate: Date;
  @UpdateDateColumn({ name: "UPDATED_DATE", nullable: true, type: "timestamp" }) updatedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_LOOKUP_NOTICE_TYPE_SEQ".nextval ID FROM DUAL`);
      this.noticeTypeId = res[0].ID;
      this.orderNo = res[0].ID;
      this.noticeTypeCode = `${res[0].ID}`.padStart(3, '0');
      this.selectCode = `${res[0].ID}`.padStart(3, '0');
    } catch (error) {
      throw new HttpException(`[before insert lookup notice type failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  toResponseObject() {
    const { noticeTypeId, createdBy, createdDate, orderNo, removedBy, removedDate, updatedBy, updatedDate, activeFlag, courtId, noticeNameShort, noticePrint, noticeTypeCode, noticeTypeName, selectCode } = this;
    const responseObject = {
      noticeTypeId, orderNo, activeFlag, courtId, noticeNameShort, noticePrint, noticeTypeCode,
      noticeTypeName, selectCode, createdBy, updatedBy, removedBy,
      createdDate: createdDate ? this.dateFormat("YYYY-MM-DD H:i:s", createdDate) : null,
      updatedDate: updatedDate ? this.dateFormat("YYYY-MM-DD H:i:s", updatedDate) : null,
      removedDate: removedDate ? this.dateFormat("YYYY-MM-DD H:i:s", removedDate) : null,
    };

    return responseObject;
  }
}