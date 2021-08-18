import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "prequest_type" })
export class MySQLRequestTypes {
  @PrimaryGeneratedColumn({ name: "req_type_id", comment: "รหัสประเภทคำร้อง" }) reqTypeId: number;
  @PrimaryColumn({ name: "court_running", comment: "รหัสศาล running" }) courtId: number;
  @Column({ name: "req_type_desc", comment: "ประเภทคำร้อง" }) reqTypeDesc: string;
  @Column({ name: "create_dep_code", comment: "รหัสหน่วยงานที่สร้าง record" }) createDepCode: string;
  @Column({ name: "update_dep_code", comment: "รหัสหน่วยงานที่ update" }) updateDepCode: number;
  @Column({ name: "create_user_id", comment: "รหัส user ที่สร้าง record" }) createUserId: number;
  @Column({ name: "create_date", comment: "วันที่เวลาสร้าง record" }) createDate: Date;
  @Column({ name: "create_user", comment: "user ที่สร้าง record" }) createUser: string;
  @Column({ name: "update_date", comment: "วันที่ เวลา update record" }) updateDate: Date;
  @Column({ name: "update_user_id", comment: "รหัส user ที่ update record" }) updateUserId: number;
  @Column({ name: "update_user", comment: "user ที่ update record" }) updateUser: string;

  toResponseObject() {
    const { reqTypeId, courtId, reqTypeDesc, createDepCode, createUserId, createUser, createDate, updateDepCode, updateUserId, updateUser, updateDate } = this;
    const responseObject = { reqTypeId, courtId, reqTypeDesc, createDepCode, createUserId, createUser, createDate, updateDepCode, updateUserId, updateUser, updateDate };
    return responseObject;
  }
}