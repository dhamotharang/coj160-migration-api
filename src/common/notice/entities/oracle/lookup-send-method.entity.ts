import { HttpException, HttpStatus } from "@nestjs/common";
import { HelperService } from "src/shared/helpers/helper.service";
import { BeforeInsert, Column, Entity, getManager, PrimaryColumn } from "typeorm";

@Entity({ name: "PC_LOOKUP_SEND_METHOD" })
export class OracleLookupSendMethods extends HelperService {
  constructor() {
    super();
  }

  @PrimaryColumn({ name: "SEND_METHOD_ID" }) sendMethodId: number;
  @Column({ name: "ORDER_NO", type: "float", nullable: true }) orderNo: number;
  @Column({ name: "ACTIVE_FLAG", nullable: true }) activeFlag: number;
  @Column({ name: "COURT_ID", nullable: true }) courtId: number;
  @Column({ name: "SELECT_CODE", nullable: true }) selectCode: string;
  @Column({ name: "SEND_METHOD_CODE", nullable: true }) sendMethodCode: string;
  @Column({ name: "SEND_METHOD_NAME" }) sendMethodName: string;
  @Column({ name: "CREATED_BY", default: 0 }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, default: 0 }) updatedBy: number;
  @Column({ name: "REMOVED_BY", default: 0 }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", nullable: true, type: "timestamp" }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", nullable: true, type: "timestamp" }) removedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_LOOKUP_SEND_METHOD_SEQ".nextval ID FROM DUAL`);
      this.sendMethodId = res[0].ID;
      this.orderNo = res[0].ID;
      this.sendMethodCode = `${res[0].ID}`.padStart(3, '0');
      this.selectCode = `${res[0].ID}`.padStart(3, '0');
    } catch (error) {
      throw new HttpException(`[before insert lookup send method failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  toResponseObject() {
    const {
      sendMethodId, createdBy, createdDate, orderNo, removedBy, removedDate, updatedBy,
      updatedDate, activeFlag, courtId, selectCode, sendMethodCode, sendMethodName
    } = this;

    const responseOject = {
      sendMethodId, orderNo, activeFlag, courtId, selectCode, sendMethodCode,
      sendMethodName, createdBy, updatedBy, removedBy,
      createdDate: createdDate ? this.dateFormat("YYYY-MM-DD H:i:s", createdDate) : null,
      removedDate: removedDate ? this.dateFormat("YYYY-MM-DD H:i:s", removedDate) : null,
      updatedDate: updatedDate ? this.dateFormat("YYYY-MM-DD H:i:s", updatedDate) : null,
    };

    return responseOject;
  }
}