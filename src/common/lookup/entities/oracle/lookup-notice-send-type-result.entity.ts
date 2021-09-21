import { HttpException, HttpStatus } from "@nestjs/common";
import { HelperService } from "src/shared/helpers/helper.service";
import { BeforeInsert, Column, CreateDateColumn, Entity, getManager, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "PC_LOOKUP_NOTICE_SEND_TYPE_RESULT" })
export class OracleLookupNoticeSendTypeResults extends HelperService {
  constructor() {
    super();
  }

  @PrimaryColumn({ name: "NOTICE_SEND_TYPE_RESULT_ID", }) noticeSendTypeResultId: number;
  @Column({ name: "ORDER_NO", default: 0.0, type: "float" }) orderNo: number;
  @Column({ name: "ACTIVE_FLAG", nullable: true }) activeFlag: number;
  @Column({ name: "COST_FLAG", nullable: true }) costFlag: number;
  @Column({ name: "COURT_ID", nullable: true }) courtId: number;
  @Column({ name: "NOTICE_SEND_TYPE_RESULT_CODE", type: "varchar", nullable: true }) noticeSendTypeResultCode: string;
  @Column({ name: "NOTICE_SEND_TYPE_RESULT_NAME", type: "varchar" }) noticeSendTypeResultName: string;
  @Column({ name: "SELECT_CODE", type: "varchar", nullable: true }) selectCode: string;
  @Column({ name: "CREATED_BY", default: 0 }) createdBy: number;
  @Column({ name: "UPDATED_BY", default: 0 }) updatedBy: number;
  @Column({ name: "REMOVED_BY", default: 0 }) removedBy: number;
  @CreateDateColumn({ name: "CREATED_DATE", type: "timestamp" }) createdDate: Date;
  @UpdateDateColumn({ name: "UPDATED_DATE", type: "timestamp" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp" }) removedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_LOOKUP_NOTICE_SEND_TYPE_RESULT_SEQ".nextval ID FROM DUAL`);
      this.noticeSendTypeResultId = res[0].ID;
      this.orderNo = res[0].ID;
      this.noticeSendTypeResultCode = `${res[0].ID}`.padStart(3, '0');
      this.selectCode = `${res[0].ID}`.padStart(3, '0');
    } catch (error) {
      throw new HttpException(`[before insert lookup notice send type result failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  toResponseObject() {
    const {
      noticeSendTypeResultId, orderNo, activeFlag, costFlag, courtId, noticeSendTypeResultCode,
      noticeSendTypeResultName, selectCode, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate
    } = this;

    const responseObject = {
      noticeSendTypeResultId, orderNo, activeFlag, costFlag, courtId, noticeSendTypeResultCode,
      noticeSendTypeResultName, selectCode, createdBy, updatedBy, removedBy,
      createdDate: createdDate ? this.dateFormat("YYYY-MM-DD H:i:s", createdDate) : null,
      updatedDate: updatedDate ? this.dateFormat("YYYY-MM-DD H:i:s", updatedDate) : null,
      removedDate: removedDate ? this.dateFormat("YYYY-MM-DD H:i:s", removedDate) : null
    };
    return responseObject;
  }
}