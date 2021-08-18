import { HttpException, HttpStatus, Logger } from "@nestjs/common";
import { BeforeInsert, Column, CreateDateColumn, Entity, getManager, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "PC_LOOKUP_REQUEST_TYPE" })
export class OracleLookupRequestTypes {
  @PrimaryColumn({ name: "REQUEST_TYPE_ID" }) requestTypeId: number;
  @Column({ name: "ORDER_NO", type: "float", default: 0.0, nullable: true }) orderNo: number;
  @Column({ name: "ACTIVE_FLAG", nullable: true }) activeFlag: number;
  @Column({ name: "COURT_ID" }) courtId: number;
  @Column({ name: "REQUEST_TYPE_CODE", nullable: true }) requestTypeCode: string;
  @Column({ name: "REQUEST_TYPE_NAME" }) requestTypeName: string;
  @Column({ name: "SELECT_CODE" }) selectCode: string;
  @Column({ name: "CREATED_BY", default: 0 }) createdBy: number;
  @Column({ name: "UPDATED_BY", default: 0, nullable: true }) updatedBy: number;
  @Column({ name: "REMOVED_BY", default: 0 }) removedBy: number;
  @CreateDateColumn({ name: "CREATED_DATE", type: "timestamp" }) createdDate: Date;
  @UpdateDateColumn({ name: "REMOVED_DATE", type: "timestamp", nullable: true }) removedDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", nullable: true }) updatedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_LOOKUP_REQUEST_TYPE_SEQ".nextval ID FROM DUAL`);
      await Logger.log(res[0].ID, "res");
      this.requestTypeId = res[0].ID;
      this.orderNo = res[0].ID;
      this.requestTypeCode = `${res[0].ID}`.padStart(3, '0');
      this.selectCode = `${res[0].ID}`.padStart(3, '0');
    } catch (error) {
      throw new HttpException(`[generate code failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }


  toResponseObject() {
    const { requestTypeId, orderNo, activeFlag, courtId, requestTypeCode, requestTypeName, selectCode, createdBy, updatedBy, removedBy, createdDate, removedDate, updatedDate } = this;
    const responseObject = { requestTypeId, orderNo, activeFlag, courtId, requestTypeCode, requestTypeName, selectCode, createdBy, updatedBy, removedBy, createdDate, removedDate, updatedDate };
    return responseObject;
  }
}