import { HttpException, HttpStatus } from "@nestjs/common";
import { HelperService } from "src/shared/helpers/helper.service";
import { BeforeInsert, Column, CreateDateColumn, Entity, getManager, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "PC_LOOKUP_APPOINT_LIST" })
export class OracleLookupAppointLists extends HelperService {
  constructor() {
    super();
  }

  @PrimaryColumn({ name: "APPOINT_LIST_ID" }) appointListId: number;
  @Column({ name: "ORDER_NO", nullable: true, default: 0.0 }) orderNo: number;
  @Column({ name: "ACTIVE_FLAG", nullable: true }) activeFlag: number;
  @Column({ name: "APP_FLAG", nullable: true }) appFlag: number;
  @Column({ name: "APPOINT_LIST_CODE", nullable: true }) appointListCode: string;
  @Column({ name: "APPOINT_LIST_NAME" }) appointListName: string;
  @Column({ name: "COURT_ID", nullable: true }) courtId: number;
  @Column({ name: "GROUP_CODE", nullable: true }) groupCode: string;
  @Column({ name: "HOLD_ID_OLD", nullable: true }) holdIdOld: number;
  @Column({ name: "SELECT_CODE", nullable: true }) selectCode: string;
  @Column({ name: "TEMP_OWN", nullable: true }) tempOwn: number;
  @Column({ name: "UD_FLAG", nullable: true }) udFlag: number;
  @Column({ name: "CREATED_BY", default: 0 }) createdBy: number;
  @Column({ name: "UPDATED_BY", default: 0 }) updatedBy: number;
  @Column({ name: "REMOVED_BY", default: 0 }) removedBy: number;
  @CreateDateColumn({ name: "CREATED_DATE", type: "timestamp" }) createdDate: Date;
  @UpdateDateColumn({ name: "UPDATED_DATE", type: "timestamp", nullable: true }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true }) removedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_LOOKUP_APPOINT_LIST_SEQ".nextval ID FROM DUAL`);
      this.appointListId = res[0].ID;
      this.orderNo = res[0].ID;
      this.appointListCode = `${res[0].ID}`.padStart(3, '0');
      this.selectCode = `${res[0].ID}`.padStart(3, '0');
    } catch (error) {
      throw new HttpException(`[oracle: before insert failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  toResponseObject() {
    const { appointListId, createdBy, createdDate, orderNo, removedBy, removedDate, updatedBy, updatedDate, activeFlag, appFlag, appointListCode, appointListName, courtId, groupCode, holdIdOld, selectCode, tempOwn, udFlag, } = this;
    const responseObject = {
      appointListId, orderNo, activeFlag, appFlag, appointListCode, appointListName, courtId, groupCode, holdIdOld, selectCode, tempOwn, udFlag,
      createdBy, updatedBy, removedBy,
      createdDate: this.dateFormat("YYYY-MM-DD H:i:s", createdDate),
      updatedDate: this.dateFormat("YYYY-MM-DD H:i:s", updatedDate),
      removedDate: this.dateFormat("YYYY-MM-DD H:i:s", removedDate),
    };
    return responseObject;
  }

}