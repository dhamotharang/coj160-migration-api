import { HttpException, HttpStatus } from "@nestjs/common";
import { HelperService } from "src/shared/helpers/helper.service";
import { BeforeInsert, Column, CreateDateColumn, Entity, getManager, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "PC_PROCEED_HOLD_REASON" })
export class OracleProceedHoldReasons extends HelperService {
  @PrimaryGeneratedColumn({ name: "HOLD_REASON_ID", comment: "รหัสข้อมูลสาเหตุการค้างพิจารณาคดี(AUTO INCREMENT)" }) holdReasonId: number;
  @Column({ name: "ORDER_NO", type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "ACTIVE_FLAG", default: 1, nullable: true, comment: "การใช้งาน 0 ไม่ใช้ / 1 ใช้" }) activeFlag: number;
  @Column({ name: "COURT_ID", comment: "รหัสศาล เชื่อมโยงตาราง PC_LOOKUP_COURT" }) courtId: number;
  @Column({ name: "HOLD_DESCRIPTION", nullable: true, comment: "รายละเอียดสาเหตุที่ค้าง" }) holdDescription: string;
  @Column({ name: "HOLD_REASON", comment: "สาเหตุที่ค้าง" }) holdReason: string;
  @Column({ name: "HOLD_REASON_CODE", comment: "สาเหตุที่ค้าง" }) holdReasonCode: string;
  @Column({ name: "SELECT_CODE", nullable: true, comment: "สาเหตุที่ค้าง" }) selectCode: string;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", default: 0, comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @CreateDateColumn({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @UpdateDateColumn({ name: "UPDATED_DATE", type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @UpdateDateColumn({ name: "REMOVED_DATE", type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_PROCEED_HOLD_REASON_SEQ".nextval ID FROM DUAL`);
      this.holdReasonId = res[0].ID;
      this.orderNo = res[0].ID;
      this.holdReasonCode = `${res[0].ID}`.padStart(3, '0');
      this.selectCode = `${res[0].ID}`.padStart(3, '0');
    } catch (error) {
      throw new HttpException(`[generate code failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  toResponseObject() {
    const { holdReasonId, orderNo, activeFlag, courtId, holdDescription, holdReason, holdReasonCode, selectCode, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate } = this;
    const responseObject = {
      holdReasonId, orderNo, activeFlag, courtId, holdDescription, holdReason, holdReasonCode, selectCode,
      createdBy, updatedBy, removedBy,
      createdDate: this.dateFormat("YYYY-MM-DD H:i:s", createdDate),
      updatedDate: this.dateFormat("YYYY-MM-DD H:i:s", updatedDate),
      removedDate: this.dateFormat("YYYY-MM-DD H:i:s", removedDate),
    };
    return responseObject;
  }
}