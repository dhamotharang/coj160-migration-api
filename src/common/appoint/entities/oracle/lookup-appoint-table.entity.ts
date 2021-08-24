import { HttpException, HttpStatus } from "@nestjs/common";
import { HelperService } from "src/shared/helpers/helper.service";
import { BeforeInsert, Column, Entity, getManager, PrimaryColumn } from "typeorm";

@Entity({ name: "PC_LOOKUP_APPOINT_TABLE" })
export class OracleLookupAppointTables extends HelperService {
  constructor() {
    super();
  }

  @PrimaryColumn({ name: "APPOINT_TABLE_ID" }) appointTableId: number;
  @Column({ name: "ORDER_NO", nullable: true, default: 0.0 }) orderNo: number;
  @Column({ name: "ACTIVE_FLAG", nullable: true }) activeFlag: number;
  @Column({ name: "APPOINT_TABLE_CODE", nullable: true }) appointTableCode: string;
  @Column({ name: "APPOINT_TABLE_NAME" }) appointTableName: string;
  @Column({ name: "COURT_ID", nullable: true }) courtId: number;
  @Column({ name: "DAY_THAI" }) dayThai: string;
  @Column({ name: "FRI", nullable: true }) fri: number;
  @Column({ name: "IS_DEFAULT", nullable: true }) isDefault: number;
  @Column({ name: "MAX_QTY", nullable: true }) maxQty: number;
  @Column({ name: "MON", nullable: true }) mon: number;
  @Column({ name: "REMARK" }) remark: string;
  @Column({ name: "SAT", nullable: true }) sat: number;
  @Column({ name: "SELECT_CODE", nullable: true }) selectCode: string;
  @Column({ name: "SUN", nullable: true }) sun: number;
  @Column({ name: "THU", nullable: true }) thu: number;
  @Column({ name: "TUE", nullable: true }) tue: number;
  @Column({ name: "WED", nullable: true }) wed: number;
  @Column({ name: "CREATED_BY", default: 0 }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, default: 0 }) updatedBy: number;
  @Column({ name: "REMOVED_BY", default: 0 }) removedBy: number;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp" }) removedDate: Date;
  @Column({ name: "CREATED_DATE", type: "timestamp" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp" }) updatedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_LOOKUP_APPOINT_TABLE_SEQ".nextval ID FROM DUAL`);
      this.appointTableId = res[0].ID;
      this.orderNo = res[0].ID;
      this.appointTableCode = `${res[0].ID}`.padStart(3, '0');
      this.selectCode = `${res[0].ID}`.padStart(3, '0');
    } catch (error) {
      throw new HttpException(`[oracle: before insert failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  toResponseObject() {
    const { appointTableId, orderNo, activeFlag, appointTableCode, appointTableName, courtId, dayThai, fri, isDefault, maxQty, mon, remark, sat, selectCode, sun, thu, tue, wed, createdBy, updatedBy, removedBy, removedDate, createdDate, updatedDate } = this;
    const responseObject = {
      appointTableId, orderNo, activeFlag, appointTableCode, appointTableName,
      courtId, dayThai, fri, isDefault, maxQty, mon, remark, sat, selectCode,
      sun, thu, tue, wed, createdBy, updatedBy, removedBy,
      removedDate: this.dateFormat("YYYY-MM-DD H:i:s", removedDate),
      createdDate: this.dateFormat("YYYY-MM-DD H:i:s", createdDate),
      updatedDate: this.dateFormat("YYYY-MM-DD H:i:s", updatedDate)
    };
    return responseObject;
  }
}