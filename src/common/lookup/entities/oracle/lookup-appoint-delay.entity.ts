import { HttpException, HttpStatus } from "@nestjs/common";
import { HelperService } from "src/shared/helpers/helper.service";
import { BeforeInsert, Column, Entity, getManager, PrimaryColumn } from "typeorm";

@Entity({ name: "PC_LOOKUP_APPOINT_DELAY" })
export class OracleLookupAppointDelays extends HelperService {
  constructor() {
    super();
  }
  @PrimaryColumn({ name: "APPOINT_DELAY_ID" }) appointDelayId: number;
  @Column({ name: "ORDER_NO", type: "float", default: 0.0 }) orderNo: number;
  @Column({ name: "ACTIVE_FLAG", nullable: true }) activeFlag: number;
  @Column({ name: "APPOINT_DELAY_CODE", nullable: true }) appointDelayCode: string;
  @Column({ name: "APPOINT_DELAY_NAME" }) appointDelayName: string;
  @Column({ name: "COURT_ID", nullable: true }) courtId: number;
  @Column({ name: "SELECT_CODE", nullable: true }) selectCode: string;
  @Column({ name: "CREATED_BY", default: 0 }) createdBy: number;
  @Column({ name: "UPDATED_BY", default: 0 }) updatedBy: number;
  @Column({ name: "REMOVED_BY", default: 0 }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp" }) removedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_LOOKUP_APPOINT_DELAY_SEQ".nextval ID FROM DUAL`);
      this.appointDelayId = res[0].ID;
      this.orderNo = res[0].ID;
      this.appointDelayCode = `${res[0].ID}`.padStart(3, '0');
      this.selectCode = `${res[0].ID}`.padStart(3, '0');
    } catch (error) {
      throw new HttpException(`[oracle: before insert failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  toResponseObject() {
    const { appointDelayId, orderNo, activeFlag, appointDelayCode, appointDelayName, courtId, selectCode, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = {
      appointDelayId, orderNo, activeFlag, appointDelayCode, appointDelayName, courtId, selectCode, createdBy, updatedBy, removedBy,
      createdDate: createdDate ? this.dateFormat("YYYY-MM-DD H:i:s", createdDate) : null,
      updatedDate: updatedDate ? this.dateFormat("YYYY-MM-DD H:i:s", updatedDate) : null,
      removedDate: removedDate ? this.dateFormat("YYYY-MM-DD H:i:s", removedDate) : null
    };
    return responseObject;
  }
}