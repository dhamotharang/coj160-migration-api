import { Logger, HttpException, HttpStatus } from "@nestjs/common";
import { BeforeInsert, Column, Entity, getManager, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "PC_LOOKUP_REQUEST_SUBJECT" })
export class OracleLookupRequestSubjects {
  @PrimaryGeneratedColumn({ name: "REQUEST_SUBJECT_ID" }) requestSubjectId: number;
  @Column({ name: "REQUEST_SUBJECT_CODE", nullable: true }) requestSubjectCode: string;
  @Column({ name: "REQUEST_SUBJECT_NAME" }) requestSubjectName: string;
  @Column({ name: "ORDER_NO", default: 0.0, type: "float" }) orderNo: number;
  @Column({ name: "DATE_FLAG", type: "timestamp", nullable: true }) dateFlag: Date;
  @Column({ name: "ACTIVE_FLAG", nullable: true }) activeFlag: number;
  @Column({ name: "COURT_ID", nullable: true }) courtId: number;
  @Column({ name: "SELECT_CODE", nullable: true }) selectCode: string;
  @Column({ name: "CREATED_BY", default: 0 }) createdBy: number;
  @Column({ name: "UPDATED_BY", default: 0, nullable: true }) updatedBy: number;
  @Column({ name: "REMOVED_BY", nullable: true }) removedBy: number;
  @Column({ name: "CREATED_DATE", type: "timestamp" }) createdDate: Date;
  @Column({ name: "UPDATED_DATE", type: "timestamp", nullable: true }) updatedDate: Date;
  @Column({ name: "REMOVED_DATE", type: "timestamp", nullable: true }) removedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_LOOKUP_REQUEST_SUBJECT_SEQ".nextval ID FROM DUAL`);
      this.requestSubjectId = res[0].ID;
      this.orderNo = res[0].ID;
      this.requestSubjectCode = `${res[0].ID}`.padStart(3, '0');
      this.selectCode = `${res[0].ID}`.padStart(3, '0');
    } catch (error) {
      throw new HttpException(`[generate code failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  toResponseObject() {
    const { requestSubjectId, requestSubjectCode, requestSubjectName, orderNo, dateFlag, activeFlag, courtId, selectCode, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = { requestSubjectId, requestSubjectCode, requestSubjectName, orderNo, dateFlag, activeFlag, courtId, selectCode, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };
    return responseObject;
  }
}