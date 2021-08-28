import { HttpException, HttpStatus } from "@nestjs/common";
import { BeforeInsert, Column, CreateDateColumn, Entity, getManager, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OracleProceedAppoints } from "./proceed-appoint.entity";

@Entity({ name: "PC_PROCEED_APPOINT_CONTINUE" })
export class OracleProceedAppointContinues {
  @PrimaryGeneratedColumn({ name: "APPOINT_CON_ID", comment: "รหัสข้อมูลแจ้งเตือนพยาน(AUTO INCREMENT)" }) appointConId: number;
  @Column({ name: "ORDER_NO", type: "float", comment: "ลำดับของข้อมูล" }) orderNo: number;
  @Column({ name: "APPOINT_TABLE_ID", comment: "ประเภทรางนัด เชื่อมโยง PC_LOOKUP_APPOINT_TABLE" }) appointTableId: number;
  @Column({ name: "APPOINT_ID", comment: "รหัสนัดความ เชื่อมโยง PC_PROCEED_APPOINT" }) appointId: number;
  @Column({ name: "CHOICE", enum: [1, 2, 3], comment: "เช้า/บ่าย/ค่ำ(1 / 2 / 3)" }) choice: number;
  @Column({ name: "CHOICE_TIME", nullable: true, comment: "เวลา" }) choiceTime: string;
  @Column({ name: "DOCUMENT", nullable: true, comment: "ซองที่ต้องเบิก" }) document: string;
  @Column({ name: "REASON_APPOINT_ID", comment: "สาเหตุที่นัด" }) reasonAppointId: number;
  @Column({ name: "ROOM_ID", nullable: true, comment: "ห้องพิจารณาคดี เชื่อมโยง PC_LOOKUP_LEVEL_ROOM" }) roomId: number;
  @Column({ name: "START_DATE", type: "timestamp", nullable: true, comment: "เริ่มวันที่" }) start: Date;
  @Column({ name: "TRANSLATE", nullable: true, comment: "ขอล่ามภาษา" }) translate: number;
  @Column({ name: "CREATED_BY", comment: "รหัสผู้สร้างข้อมูล เชื่อมโยง PC_USER_PROFILE" }) createdBy: number;
  @Column({ name: "UPDATED_BY", nullable: true, comment: "รหัสผู้แก้ไขข้อมูลล่าสุด เชื่อมโยง PC_USER_PROFILE" }) updatedBy: number;
  @Column({ name: "REMOVED_BY", comment: "รหัสผู้ลบข้อมูล เชื่อมโยง PC_USER_PROFILE" }) removedBy: number;
  @CreateDateColumn({ name: "CREATED_DATE", type: "timestamp", comment: "วันเวลาที่สร้างข้อมูล" }) createdDate: Date;
  @UpdateDateColumn({ name: "UPDATED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่แก้ไขข้อมูลล่าสุด" }) updatedDate: Date;
  @UpdateDateColumn({ name: "REMOVED_DATE", nullable: true, type: "timestamp", comment: "วันเวลาที่ลบข้อมูล" }) removedDate: Date;

  @BeforeInsert()
  async beforeInsert() {
    try {
      const res = await getManager().query(`SELECT "${process.env.ORA_USERNAME}"."PC_PROCEED_APPOINT_CONTINUE_SEQ".nextval ID FROM DUAL`);
      this.appointId = res[0].ID;
      this.orderNo = res[0].ID;
    } catch (error) {
      throw new HttpException(`[oracle: before insert failed.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  @ManyToOne(type => OracleProceedAppoints, continunes => continunes.appointId)
  @JoinColumn({ name: "APPOINT_ID" }) proceedAppoints: OracleProceedAppoints;

  toResponseObject() {
    const {
      appointConId, orderNo, appointTableId, appointId, choice, choiceTime, document, reasonAppointId, roomId, start, translate, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate,
      proceedAppoints
    } = this;
    const responseObject = { appointConId, orderNo, appointTableId, appointId, choice, choiceTime, document, reasonAppointId, roomId, start, translate, createdBy, updatedBy, removedBy, createdDate, updatedDate, removedDate };

    Object.assign(responseObject, {
      proceedAppoints: proceedAppoints ? proceedAppoints.toResponseObject() : null
    });

    return responseObject;
  }
}